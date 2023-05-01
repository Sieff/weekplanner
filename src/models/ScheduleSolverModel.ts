import {AppointmentModel} from "./AppointmentModel";

export class ScheduleSolverModel {
    private _conflictEdges: { [key: string]: Set<string> };
    private _solutions?: number[][];
    private _currentSolution?: number;

    constructor(conflictEdges: { [key: string]: Set<string> }) {
        this._conflictEdges = conflictEdges;
    }

    public GetSolution(): number[] | undefined {
        console.log(this._solutions);
        if (!this._solutions) return undefined;

        if (this._currentSolution === undefined) {
            this._currentSolution = 0;
        } else {
            this._currentSolution = (this._currentSolution + 1) % this._solutions.length;
        }

        return this._solutions[this._currentSolution];
    }

    public GenerateSolutions(candidates: AppointmentModel[][]) {
        const maxIndices = candidates.map((section) => section.length - 1);
        const indices: number[] = candidates.map(() => 0);

        this._solutions = [];

        let next = true;
        while (next) {
            const currentCandidates = candidates.map((section, idx) => {
                return section[indices[idx]]
            });

            if (this.CheckCombination(currentCandidates)) {
                this._solutions.push(Object.assign([], indices));
            }

            next = this.IterateIndices(indices, maxIndices);
        }
    }

    private IterateIndices(indices: number[], max: number[]): boolean {
        for (let i = 0; i < indices.length; i++) {
            if (indices[i] < max[i]) {
                indices[i]++;
                break;
            }
            indices[i] = 0;
        }
        return !this.ArraysEqual(indices, indices.map(() => 0));
    }

    private ArraysEqual(a: number[], b: number[]): boolean {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
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

    get conflictEdges(): { [p: string]: Set<string> } {
        return this._conflictEdges;
    }

    set conflictEdges(value: { [p: string]: Set<string> }) {
        this._conflictEdges = value;
    }
}