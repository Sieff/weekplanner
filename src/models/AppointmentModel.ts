import {Weekday} from "./Weekday";
import moment, {Moment} from "moment/moment";
import {v4 as uuid} from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";
import {AppointmentFormRawData} from "../components/modal/AppointmentCreatorModal";

export interface AppointmentModelData {
    sectionId: string;
    variant: string;
    id: string;
    title: string;
    weekday: string;
    start: string;
    end: string;
    active: boolean;
}

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

    constructor(sectionId: string, variant: ColorVariant, title: string, weekday: Weekday, start: Moment, end: Moment)
    constructor(sectionId: string, variant: ColorVariant, title: string, weekday: Weekday, start: Moment, end: Moment, id: string)
    constructor(sectionId: string, variant: ColorVariant, title: string, weekday: Weekday, start: Moment, end: Moment, id?: string) {
        this._id = id ?? uuid();
        this._title = title;
        this._weekday = weekday;
        this._start = start;
        this._end = end;
        this._sectionId = sectionId;
        this._variant = variant;
    }

    static from(data: AppointmentModelData) {
        const variant = Object.values(ColorVariant).find((variant) => variant === data.variant)!;
        const weekday = Object.values(Weekday).find((weekday) => weekday === data.weekday)!;

        return new AppointmentModel(data.sectionId, variant, data.title, weekday, moment(data.start, 'HH:mm').utc(true), moment(data.end, 'HH:mm').utc(true), data.id);
    }

    asData(): AppointmentModelData {
        return {
            sectionId: this._sectionId,
            id: this._id,
            variant: this._variant,
            title: this._title,
            weekday: this._weekday,
            start: this._start.format('HH:mm'),
            end: this._end.format('HH:mm'),
            active: this._active
        }
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