import Cell from "./Cell";
import Distances from "./solution/Distance";

export default class WeightedCell extends Cell {
    weight: number;
    constructor(row: number, column: number) {
        super(row, column);
        this.weight = 1;
    }

    distances(): Distances {
        const weights = new Distances(this);
        let pending = [this as WeightedCell];

        while (pending.length > 0) {
            pending.sort((a, b) => weights.get(a) - weights.get(b))
            let cell = pending.shift() as WeightedCell;

            let neighbors = cell.links as WeightedCell[];

            for (let i = 0; i < neighbors.length; i++) {
                let totalWeight = weights.get(cell) + neighbors[i].weight;

                if (weights.get(neighbors[i]) === undefined || totalWeight < weights.get(neighbors[i])) {
                    weights.set(neighbors[i], totalWeight);
                    pending.push(neighbors[i]);
                }
            }
        }
        return weights;
    }
}