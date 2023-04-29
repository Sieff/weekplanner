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

    public GetExcludedAppointments() {
        const mergedSets = Object.values(this._exclusionEdges).reduce((previous, current) => {
            return new Set([...Object.values(previous), ...Object.values(current)]);
        }, new Set<string>());

        return Object.values(mergedSets);
    }

    public GetNonConflictingCandidates(candidates: AppointmentModel[][]): AppointmentModel[] {
        const indices = candidates.map(() => 0);
        const stop = candidates.map((section) => section.length - 1);
        do {
            const combinationWorks = this.CheckCombination(candidates.map((section, idx) => {
                return section[indices[idx]]
            }));
            if (combinationWorks) {
                return candidates.map((section, idx) => section[indices[idx]]);
            }
        } while (this.NextIndices(indices, stop))
        return [];
    }

    private CheckCombination(candidates: AppointmentModel[]): boolean {
        let combinationWorks = true;
        candidates.forEach((candidate1, idx1) => {
            candidates.forEach((candidate2, idx2) => {
                if (idx1 === idx2) return;
                if (this._conflictEdges[candidate1.id].has(candidate2.id)) {
                    combinationWorks = false;
                }
            });
        });
        return combinationWorks;
    }

    private NextIndices(indices: number[], stop: number[]): boolean {
        let generatedNext = false;
        for (let i = 0; i < indices.length; i++) {
            if (indices[i] < stop[i]) {
                indices[i]++;
                generatedNext = true;
                break;
            }
            indices[i] = 0;
        }
        return generatedNext;
    }

    get exclusionEdges(): { [key: string]: Set<string> } {
        return this._exclusionEdges;
    }

    get conflictEdges(): { [key: string]: Set<string> } {
        return this._conflictEdges;
    }
}