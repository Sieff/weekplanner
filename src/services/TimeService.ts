import {Moment} from "moment";
import moment from "moment/moment";
import {TimeUnitModel} from "../models/TimeUnitModel";
import {AppointmentModel} from "../models/AppointmentModel";
import {TimeTableCoordinates} from "../components/module-display/TimetableColumn";
import {SectionModel} from "../models/SectionModel";
import {AppointmentGraphModel} from "../models/AppointmentGraphModel";
import {ScheduleSolverModel} from "../models/ScheduleSolverModel";

export class TimeService {
    private _timetableStart: Moment = moment("08:00", 'HH:mm').utc(true);
    private _timetableEnd: Moment = moment("20:00", 'HH:mm').utc(true);
    private _timetableStep: number = 15;
    private readonly _units = [] as TimeUnitModel[];
    private _scheduleSolver?: ScheduleSolverModel;

    constructor() {
        this._units = this.GenerateTimeUnits();
    }

    get units(): TimeUnitModel[] {
        return this._units;
    }

    public ParseTime(time: string): Moment {
        return moment(time, 'HH:mm').utc(true);
    }

    public Render(time: Moment): string {
        return time.format("HH:mm");
    }

    private GenerateTimeUnits(): TimeUnitModel[] {
        const timeUnits = [];

        let current = moment(this._timetableStart);
        while (current < this._timetableEnd) {
            const start = moment(current);
            const end = moment(current).add(this._timetableStep, "minutes");
            timeUnits.push(new TimeUnitModel(start, end));
            current.add(this._timetableStep, "minutes");
        }

        return timeUnits;
    }

    public GenerateHours(): Moment[] {
        const hours = [];

        let current = moment(this._timetableStart);
        while (current <= this._timetableEnd) {
            hours.push(moment(current));
            current.add(2, "hour");
        }

        return hours;
    }

    public GetTimeUnitId(time: Moment): number {
        if (time < this._timetableStart) return 1;
        if (time >= this._timetableEnd) return this._units.length;

        let current: number = 1;
        this._units.forEach((unit, idx) => {
            if (time >= unit.start && time) {
                current = idx+1;
            }
        });

        return current;
    }

    public GetEmptySlots(appointments: AppointmentModel[]): number[] {
        const filledSlots: number[] = [];
        appointments.forEach((appointment) => {
            const start = this.GetTimeUnitId(appointment.start);
            const end = this.GetTimeUnitId(appointment.end);
            filledSlots.push(start)
            for (let i = start + 1; i < end; i++) {
                filledSlots.push(i);
            }
        });

        return Array.from(Array(this._units.length).keys()).map((number) => number + 1).filter((number) => filledSlots.indexOf(number) === -1);
    }

    private IsLaneFree(lane: AppointmentModel[], appointment: AppointmentModel): boolean {
        let hasCollision = false;
        lane.forEach((laneAppointment) => {
            if (laneAppointment.CollidesWith(appointment)) {
                hasCollision = true;
            }
        })

        return !hasCollision;
    }

    public GenerateCoordinates(appointments: AppointmentModel[]): [{[key: string]: TimeTableCoordinates}, number] {
        const lanes: AppointmentModel[][] = [[]];
        for (let i = 0; i < appointments.length; i++) {
            let appointmentAssigned = false;
            for (let j = 0; j < lanes.length; j++) {
                if (this.IsLaneFree(lanes[j], appointments[i])) {
                    lanes[j].push(appointments[i]);
                    appointmentAssigned = true;
                    break;
                }
            }
            if (!appointmentAssigned) {
                lanes.push([appointments[i]]);
            }
        }

        const coordinates: {[key: string]: TimeTableCoordinates} = {}
        lanes.forEach((appointments, laneIndex) => {
            appointments.forEach((appointment) => {
                const start = this.GetTimeUnitId(appointment.start);
                const end = this.GetTimeUnitId(appointment.end);
                coordinates[appointment.id] = {yStart: start, yEnd: end, xStart: laneIndex + 1, xEnd: laneIndex + 2};
            })
        });

        return [coordinates, lanes.length];
    }

    public GenerateSchedule(sections: SectionModel[], appointments: AppointmentModel[]): {[key: string]: boolean} {
        const {fixedAppointments, flexibleAppointments, sectionedCandidates, appointmentGraph} = this.GenerateSolverSetup(sections, appointments);

        const scheduleSolver = this.PrepareSolver(appointmentGraph.conflictEdges);

        scheduleSolver.GenerateSolutions(sectionedCandidates);

        const solution = scheduleSolver.GetSolution();

        if (solution) {
            const choosenOptions = sectionedCandidates.map((section, idx) => section[solution[idx]])
            return this.CombineAppointments(fixedAppointments, flexibleAppointments, choosenOptions);
        }
        return {}
    }

    private GenerateSolverSetup(sections: SectionModel[], appointments: AppointmentModel[]): SolverSetup {
        const sectionLookup = Object.fromEntries(sections.map((section) => {
            return [section.id, section];
        }));

        const flexibleSections = sections.filter((section) => section.optional);

        const fixedAppointments = Object.fromEntries(appointments
            .filter((appointment) => !sectionLookup[appointment.sectionId].optional)
            .map((appointment) => [appointment.id, appointment]));

        const flexibleAppointments = Object.fromEntries(appointments
            .filter((appointment) => sectionLookup[appointment.sectionId].optional)
            .map((appointment) => [appointment.id, appointment]));

        const appointmentGraph = new AppointmentGraphModel(fixedAppointments, flexibleAppointments);
        const excluded = appointmentGraph.GetExcludedAppointments();
        const candidates = Object.values(flexibleAppointments).filter((appointment) => {
            return !excluded.some((excludedId) => excludedId === appointment.id);
        });

        const sectionedCandidates = flexibleSections.map((section) => {
            return candidates.filter((candidate) => candidate.sectionId === section.id)
        }).filter((section) => section.length > 0);

        return {fixedAppointments, flexibleAppointments, sectionedCandidates, appointmentGraph};
    }

    private PrepareSolver(conflictEdges: {[key: string]: Set<string>}): ScheduleSolverModel {
        if (!this._scheduleSolver) {
            this._scheduleSolver = new ScheduleSolverModel(conflictEdges);
        } else {
            this._scheduleSolver.conflictEdges = conflictEdges;
        }

        return this._scheduleSolver;
    }

    private CombineAppointments(fixedAppointments: { [p: string]: AppointmentModel }, flexibleAppointments: { [p: string]: AppointmentModel }, choosenOptions: AppointmentModel[]) {
        const fixed = Object.fromEntries(Object.keys(fixedAppointments).map(key => [key, true]));
        const flexible = Object.fromEntries(Object.keys(flexibleAppointments).map(key => [key, false]));
        const chosenFlexible = Object.fromEntries(choosenOptions.map(appointment => [appointment.id, true]));
        return Object.assign({}, fixed, flexible, chosenFlexible);
    }
}

type SolverSetup = {
    fixedAppointments: {[p: string]: AppointmentModel};
    flexibleAppointments: {[p: string]: AppointmentModel};
    sectionedCandidates: AppointmentModel[][];
    appointmentGraph: AppointmentGraphModel;
}