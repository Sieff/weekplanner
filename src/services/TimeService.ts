import {Moment} from "moment";
import moment from "moment/moment";
import {TimeUnitModel} from "../models/TimeUnitModel";
import {AppointmentModel} from "../models/AppointmentModel";

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
        if (time >= this._timetableEnd) return this._units.length + 1;

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
}