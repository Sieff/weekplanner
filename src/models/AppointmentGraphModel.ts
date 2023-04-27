import {AppointmentModel} from "./AppointmentModel";

export class AppointmentGraphModel {
    private _edges: [string, string][];

    constructor(appointments: {[key: string]: AppointmentModel }) {
        this._edges = this.GenerateEdges(appointments);
    }

    private GenerateEdges(appointments: {[key: string]: AppointmentModel }): [string, string][] {
        const edges: [string, string][] = [];
        Object.entries(appointments).forEach(([key1, appointment1]) => {
            Object.entries(appointments).forEach(([key2, appointment2]) => {
                if (appointment2.end > appointment1.start && appointment1.end > appointment2.start) {
                    edges.push([key1, key2]);
                }
            });
        });
        return edges;
    }

    get edges(): [string, string][] {
        return this._edges;
    }

    public MaxClique(): number {
        const edges = this._edges;
        // Build the graph as an adjacency list
        const graph = new Map<string, Set<string>>();
        for (const [a, b] of edges) {
            if (!graph.has(a)) graph.set(a, new Set());
            if (!graph.has(b)) graph.set(b, new Set());
            graph.get(a)!.add(b);
            graph.get(b)!.add(a);
        }

        // Recursive function to find the maximum clique size containing nodes in R, candidates in P, and excluded nodes in X
        function bronKerbosch(P: Set<string>, R: Set<string>, X: Set<string>): number {
            if (P.size === 0 && X.size === 0) {
                // Found a clique, return its size
                return R.size;
            }

            // Choose a pivot node (any node in P or X will do)
            const pivot: string = [...Object.values(P), ...Object.values(X)][0];

            // Recursively find maximum clique sizes that contain the pivot node
            let maxCliqueSize = 0;
            for (const v of Object.values(P)) {
                if (graph.get(v)!.has(pivot)) {
                    // v is adjacent to the pivot, add it to R and find maximum clique sizes containing R + v
                    const newP = new Set([...Object.values(P)].filter(x => graph.get(v)!.has(x)));
                    const newR = new Set(R);
                    newR.add(v);
                    const cliqueSize = bronKerbosch(newP, newR, new Set([...Object.values(X)].filter(x => graph.get(v)!.has(x))));
                    maxCliqueSize = Math.max(maxCliqueSize, cliqueSize);
                    P.delete(v);
                    X.add(v);
                }
            }

            return maxCliqueSize;
        }

        // Start with all nodes as candidates and no nodes selected or excluded
        let maxCliqueSize = 0;
        const visited = new Set<string>();
        for (const node of Object.keys(graph)) {
            if (!visited.has(node)) {
                const connectedComponent = new Set<string>();
                const queue = [node];
                while (queue.length > 0) {
                    const currentNode = queue.shift()!;
                    if (!visited.has(currentNode)) {
                        visited.add(currentNode);
                        connectedComponent.add(currentNode);
                        for (const neighbor of Object.values(graph.get(currentNode)!)) {
                            queue.push(neighbor);
                        }
                    }
                }
                const P = connectedComponent;
                const R = new Set<string>();
                const X = new Set<string>();
                maxCliqueSize = Math.max(maxCliqueSize, bronKerbosch(P, R, X));
            }
        }

        return maxCliqueSize;
    }
}