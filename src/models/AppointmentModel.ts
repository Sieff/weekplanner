import {Weekday} from "./Weekday";
import {Moment} from "moment/moment";
import {v4 as uuid} from "uuid";
import {immerable} from "immer";

export class AppointmentModel {
    [immerable] = true

    private _sectionId: string;
    private _id: string;
    private _title: string;
    private _weekday: Weekday;
    private _start: Moment;
    private _end: Moment;

    constructor(sectionId: string, title: string, weekday: Weekday, start: Moment, end: Moment) {
        this._id = uuid();
        this._title = title;
        this._weekday = weekday;
        this._start = start;
        this._end = end;
        this._sectionId = sectionId;
    }

    get id(): string {
        return this._id;
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

    get sectionId(): string {
        return this._sectionId;
    }
}