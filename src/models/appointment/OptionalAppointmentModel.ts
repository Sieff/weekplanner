import {AppointmentModel} from "./AppointmentModel";
import {v4 as uuid} from "uuid";
import {SingleAppointmentModel} from "./SingleAppointmentModel";

export class OptionalAppointmentModel implements AppointmentModel {
    private _id: string;
    private _title: string;
    private _options: { [key: string]: SingleAppointmentModel } = {};

    constructor(title: string) {
        this._id = uuid();
        this._title = title;
    }

    get id(): string {
        return this._id;
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

    get options(): SingleAppointmentModel[] {
        return Object.entries(this._options).map(([_, option]) => option);
    }
}