import {AppointmentModel} from "./AppointmentModel";
import {v4 as uuid} from "uuid";
import {SingleAppointmentModel} from "./SingleAppointmentModel";
import {immerable} from "immer";

export class OptionalAppointmentModel implements AppointmentModel {
    [immerable] = true
    private _id: string;
    private _moduleId: string;
    private _title: string;
    private _options: { [key: string]: SingleAppointmentModel } = {};

    constructor(title: string, moduleId: string);
    constructor(title: string, moduleId: string, id: string);
    constructor(title: string, moduleId: string, id?: string) {
        this._id = id ? id : uuid();
        this._title = title;
        this._moduleId = moduleId;
    }

    static from(appointment: SingleAppointmentModel): OptionalAppointmentModel {
        const newAppointment = new OptionalAppointmentModel(appointment.title, appointment.moduleId, appointment.id);
        newAppointment.AddOption(appointment);
        return newAppointment
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

    public AddOption(option: SingleAppointmentModel) {
        this._options[option.id] = option;
    }

    public RemoveOption(option: SingleAppointmentModel) {
        delete this._options[option.id];
    }

    get options(): { [key: string]: SingleAppointmentModel } {
        return this._options;
    }
}