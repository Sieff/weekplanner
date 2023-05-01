import {Weekday} from "./Weekday";
import {Moment} from "moment/moment";
import {v4 as uuid} from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";
import {AppointmentFormRawData} from "../components/modal/AppointmentCreatorModal";

export class AppointmentModel {
    [immerable] = true;

    private _sectionId: string;
    private _variant: ColorVariant;
    private _id: string;
    private _title: string;
    private _weekday: Weekday;
    private _start: Moment;
    private _end: Moment;
    private _active: boolean = true;

    constructor(sectionId: string, variant: ColorVariant, title: string, weekday: Weekday, start: Moment, end: Moment) {
        this._id = uuid();
        this._title = title;
        this._weekday = weekday;
        this._start = start;
        this._end = end;
        this._sectionId = sectionId;
        this._variant = variant;
    }

    public CollidesWith(other: AppointmentModel): boolean {
        return other.end > this.start && this.end > other.start && this.weekday === other.weekday;
    }

    public GetRawData(): AppointmentFormRawData {
        return {
            title: this._title,
            start: this._start.format("HH:mm"),
            end: this.end.format("HH:mm"),
            weekday: this._weekday
        }
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get variant(): ColorVariant {
        return this._variant;
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

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    set title(value: string) {
        this._title = value;
    }

    set weekday(value: Weekday) {
        this._weekday = value;
    }

    set start(value: moment.Moment) {
        this._start = value;
    }

    set end(value: moment.Moment) {
        this._end = value;
    }
}