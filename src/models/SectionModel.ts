import { v4 as uuid } from "uuid";
import {immerable} from "immer"
import {AppointmentModel} from "./AppointmentModel";
import {ColorVariant} from "./Variant";

export class SectionModel {
    [immerable] = true

    private _moduleId: string;
    private _id: string;
    private _variant: ColorVariant;
    private _title: string;
    private _appointments: { [key: string]: AppointmentModel } = {};
    private _optional: boolean;

    constructor(moduleId: string, title: string, optional: boolean, variant: ColorVariant) {
        this._id = uuid();
        this._title = title;
        this._optional = optional;
        this._moduleId = moduleId;
        this._variant = variant;
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