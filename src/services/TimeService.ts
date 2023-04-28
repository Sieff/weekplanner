import {Moment} from "moment";
import moment from "moment/moment";
import {TimeUnitModel} from "../models/TimeUnitModel";
import {AppointmentModel} from "../models/AppointmentModel";
import {TimeTableCoordinates} from "../components/module-display/TimetableColumn";
import {SectionModel} from "../models/SectionModel";

export class TimeService {
    private _timetableStart: Moment = moment("08:00", 'HH:mm').utc(true);
    private _timetableEnd: Moment = moment("20:00", 'HH:mm').utc(true);
    private _timetableStep: number = 15;
    private readonly _units = [] as TimeUnitModel[];

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

    public GenerateCoordinates(appointments: {[key: string]: AppointmentModel }): [{[key: string]: TimeTableCoordinates}, number] {
        const lanes: AppointmentModel[][] = [[]];
        const appointmentsArray = Object.values(appointments);
        for (let i = 0; i < appointmentsArray.length; i++) {
            let appointmentAssigned = false;
            for (let j = 0; j < lanes.length; j++) {
                if (this.IsLaneFree(lanes[j], appointmentsArray[i])) {
                    lanes[j].push(appointmentsArray[i]);
                    appointmentAssigned = true;
                    break;
                }
            }
            if (!appointmentAssigned) {
                lanes.push([appointmentsArray[i]]);
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

    public GenerateSchedule(sections: { [p: string]: SectionModel }): {[key: string]: boolean} {
        const schedule: {[key: string]: boolean} = {};
        //TODO: Actual algorithm;

        Object.entries(sections).forEach(([key, section]) => {
            Object.values(section.appointments).forEach((appointment) => {
                schedule[appointment.id] = false;
            });
        });

        return schedule;
    }
}