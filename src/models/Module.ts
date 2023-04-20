import {OptionalAppointment} from "./appointment/OptionalAppointment";
import {FixedAppointmentModel} from "./appointment/FixedAppointmentModel";
import { v4 as uuid } from "uuid";
import {immerable} from "immer"

export class Module {
    [immerable] = true
    private _id: string;
    private _title: string;
    private _optionalAppointments: { [key: string]: OptionalAppointment };
    private _fixedAppointments: { [key: string]: FixedAppointmentModel };

    constructor(title: string);
    constructor(title: string, optionalAppointments: { [key: string]: OptionalAppointment }, fixedAppointments: { [key: string]: FixedAppointmentModel });
    constructor(title: string, optionalAppointments?: { [key: string]: OptionalAppointment }, fixedAppointments?: { [key: string]: FixedAppointmentModel }) {
        this._id = uuid();
        this._title = title;
        this._optionalAppointments = optionalAppointments ?? {};
        this._fixedAppointments = fixedAppointments ?? {};
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get optionalAppointments(): { [key: string]: OptionalAppointment } {
        return this._optionalAppointments;
    }

    get fixedAppointments(): { [key: string]: FixedAppointmentModel } {
        return this._fixedAppointments;
    }
}