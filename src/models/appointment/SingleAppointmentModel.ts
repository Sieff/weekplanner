import {AppointmentModel} from "./AppointmentModel";
import {Weekday} from "../Weekday";
import {Moment} from "moment/moment";
import {v4 as uuid} from "uuid";
import {immerable} from "immer";

export class SingleAppointmentModel implements AppointmentModel {
    [immerable] = true

    private _id: string;
    private _moduleId: string;
    private _title: string;
    private _weekday: Weekday;
    private _start: Moment;
    private _end: Moment;

    constructor(moduleId: string, title: string, weekday: Weekday, start: Moment, end: Moment) {
        this._id = uuid();
        this._moduleId = moduleId;
        this._title = title;
        this._weekday = weekday;
        this._start = start;
        this._end = end;
    }

    get id(): string {
        return this._id;
    }

    get moduleId(): string {
        return this._moduleId;
    }

    get title(): string {
        return this._title;
    }

    get weekday(): Weekday {
        return this._weekday;
    }

    get start(): Moment {
        return this._start;
    }

    get end(): Moment {
        return this._end;
    }
}