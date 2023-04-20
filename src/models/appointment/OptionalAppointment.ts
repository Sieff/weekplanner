import {Appointment} from "./Appointment";

export class OptionalAppointment {
    private _title: string;
    private _options: Appointment[] = [];

    constructor(title: string) {
        this._title = title;
    }

    public AddOption(option: Appointment) {
        this._options.push(option);
    }

    public AddOptions(options: Appointment[]) {
        this._options.push(...options);
    }

    public RemoveOption(option: Appointment) {
        this._options.filter((existingOption) => existingOption !== option);
    }

    get options(): Appointment[] {
        return this._options;
    }

    static from(optionalAppointment: OptionalAppointment): OptionalAppointment {
        const newAppointment = new OptionalAppointment(optionalAppointment._title);
        newAppointment.AddOptions(optionalAppointment.options);
        return newAppointment;
    }
}