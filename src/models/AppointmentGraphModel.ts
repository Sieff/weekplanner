import {AppointmentModel} from "./AppointmentModel";

export class AppointmentGraphModel {
    private _exclusionEdges: { [key: string]: Set<string> };
    private _conflictEdges: { [key: string]: Set<string> };


    constructor(fixedAppointments: {[key: string]: AppointmentModel }, flexibleAppointments: {[key: string]: AppointmentModel }) {
        this._exclusionEdges = this.GenerateEdges(fixedAppointments, flexibleAppointments);
        this._conflictEdges = this.GenerateEdges(flexibleAppointments, flexibleAppointments);
    }

    private GenerateEdges(appointments1: {[key: string]: AppointmentModel }, appointments2: {[key: string]: AppointmentModel }): { [key: string]: Set<string> } {
        const edges = Object.fromEntries(Object.keys(appointments1).map((key) => {
            return [key, new Set<string>()]
        }));

        Object.entries(appointments1).forEach(([key1, appointment1]) => {
            Object.entries(appointments2).forEach(([key2, appointment2]) => {
                if (appointment2.end > appointment1.start && appointment1.end > appointment2.start && appointment1.weekday === appointment2.weekday) {
                    edges[key1].add(key2);
                }
            });
        });
        return edges;
    }

    public GetExcludedAppointments(): string[] {
        const excludedAppointments = [] as string[];
        for (const exclusionSet of Object.values(this._exclusionEdges)) {
            exclusionSet.forEach((appointments) => {
                excludedAppointments.push(appointments);
            });
        }
        return excludedAppointments;
    }

    get exclusionEdges(): { [key: string]: Set<string> } {
        return this._exclusionEdges;
    }

    get conflictEdges(): { [key: string]: Set<string> } {
        return this._conflictEdges;
    }
}