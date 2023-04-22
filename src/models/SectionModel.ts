import { v4 as uuid } from "uuid";
import {immerable} from "immer"
import {AppointmentModel} from "./AppointmentModel";

export class SectionModel {
    [immerable] = true

    private _moduleId: string;
    private _id: string;
    private _title: string;
    private _appointments: { [key: string]: AppointmentModel } = {};
    private _optional: boolean;

    constructor(moduleId: string, title: string, optional: boolean) {
        this._id = uuid();
        this._title = title;
        this._optional = optional;
        this._moduleId = moduleId;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get appointments(): { [key: string]: AppointmentModel } {
        return this._appointments;
    }

    get moduleId(): string {
        return this._moduleId;
    }

    get optional(): boolean {
        return this._optional;
    }
}