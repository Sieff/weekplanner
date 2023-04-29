import {Moment} from "moment";
import moment from "moment/moment";
import {TimeUnitModel} from "../models/TimeUnitModel";
import {AppointmentModel} from "../models/AppointmentModel";
import {TimeTableCoordinates} from "../components/module-display/TimetableColumn";
import {SectionModel} from "../models/SectionModel";
import {AppointmentGraphModel} from "../models/AppointmentGraphModel";

export class TimeService {
    private _timetableStart: Moment = moment("08:00", 'HH:mm').utc(true);
    private _timetableEnd: Moment = moment("20:00", 'HH:mm').utc(true);
    private _timetableStep: number = 15;
    private readonly _units = [] as TimeUnitModel[];
    private _lastSolution?: number[] = undefined;

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

        const solution = this.GetNonConflictingCandidates(sectionedCandidates, appointmentGraph.conflictEdges, this._lastSolution);
        this._lastSolution = solution;
        if (solution) {
            const choosenOptions = sectionedCandidates.map((section, idx) => section[solution[idx]])
            return this.CombineAppointments(fixedAppointments, flexibleAppointments, choosenOptions);
        }
        return {}
    }

    public GetNonConflictingCandidates(candidates: AppointmentModel[][], conflictEdges: {[key: string]: Set<string>}, startIndices?: number[]): number[] | undefined {
        const maxIndices = candidates.map((section) => section.length - 1);

        let indices: number[] = candidates.map(() => 0);
        if (startIndices && this.SolutionInBound(startIndices, maxIndices) && this.CheckCombination(candidates.map((section, idx) => {
            return section[startIndices[idx]]
        }), conflictEdges)) {
            indices = Object.assign([], startIndices);
            this.IterateIndices(indices, maxIndices);
        }

        do {
            const combinationWorks = this.CheckCombination(candidates.map((section, idx) => {
                return section[indices[idx]]
            }), conflictEdges);
            if (combinationWorks) {
                return indices;
            }
        } while (this.IterateIndices(indices, maxIndices, startIndices))
        return undefined;
    }

    private CheckCombination(candidates: AppointmentModel[], conflictEdges: {[key: string]: Set<string>}): boolean {
        let combinationWorks = true;

        candidates.forEach((candidate1, idx1) => {
            candidates.forEach((candidate2, idx2) => {
                if (idx1 === idx2) return;
                if (conflictEdges[candidate1.id].has(candidate2.id)) {
                    combinationWorks = false;
                }
            });
        });
        return combinationWorks;
    }

    private IterateIndices(indices: number[], max: number[], stop?: number[]): boolean {
        for (let i = 0; i < indices.length; i++) {
            if (indices[i] < max[i]) {
                indices[i]++;
                break;
            }
            indices[i] = 0;
        }
        return stop ? !this.ArraysEqual(stop, indices) : !this.ArraysEqual(max, indices);
    }

    private ArraysEqual(a: number[], b: number[]): boolean {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    private SolutionInBound(solution: number[], maxIndices: number[]): boolean {
        if (solution === maxIndices) return true;
        if (solution == null || maxIndices == null) return false;
        if (solution.length !== maxIndices.length) return false;

        for (var i = 0; i < solution.length; ++i) {
            if (solution[i] > maxIndices[i]) return false;
        }
        return true;
    }

    private CombineAppointments(fixedAppointments: { [p: string]: AppointmentModel }, flexibleAppointments: { [p: string]: AppointmentModel }, choosenOptions: AppointmentModel[]) {
        const fixed = Object.fromEntries(Object.keys(fixedAppointments).map(key => [key, true]));
        const flexible = Object.fromEntries(Object.keys(flexibleAppointments).map(key => [key, false]));
        const chosenFlexible = Object.fromEntries(choosenOptions.map(appointment => [appointment.id, true]));
        return Object.assign({}, fixed, flexible, chosenFlexible);
    }
}