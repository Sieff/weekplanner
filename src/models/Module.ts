import {OptionalAppointmentModel} from "./appointment/OptionalAppointmentModel";
import { v4 as uuid } from "uuid";
import {immerable} from "immer"
import {AppointmentModel} from "./appointment/AppointmentModel";

export class Module {
    [immerable] = true
    private _id: string;
    private _title: string;
    private _appointments: { [key: string]: AppointmentModel };

    constructor(title: string);
    constructor(title: string, appointments: { [key: string]: OptionalAppointmentModel });
    constructor(title: string, appointments?: { [key: string]: OptionalAppointmentModel }) {
        this._id = uuid();
        this._title = title;
        this._appointments = appointments ?? {};
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
}