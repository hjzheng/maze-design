import { ICell } from "../Cell";
import Grid from "../Grid";

class RowState {
    nextSet: number
    cellsInSet: Record<number, ICell[]> = {} // setNo. => cells[]
    setForCell: number[] = [] // colNo. => setNo.
    constructor(startingSet: number = 0) {
        this.nextSet = startingSet
        this.cellsInSet = {};
        this.setForCell = [];
    }

    record(set: number, cell: ICell) {
        this.setForCell[cell.col] = set;
        if (!(set in this.cellsInSet)) {
            this.cellsInSet[set] = [];
        } 
        this.cellsInSet[set].push(cell)
    }

    setFor(cell: ICell) {
        if (!this.setForCell[cell.col]) {
            this.record(this.nextSet, cell);
            this.nextSet += 1;
        }

        return this.setForCell[cell.col];
    }

    merge(winner: number, loser: number) {
        this.cellsInSet[loser].forEach((cell: ICell) => {
            this.setForCell[cell.col] = winner
            this.cellsInSet[winner].push(cell)
        })

        delete this.cellsInSet[loser];
    }

    next() {
        return new RowState(this.nextSet);
    }

    eachSet(callback: (set: number, cells: ICell[]) => void) {
        Object.entries(this.cellsInSet).forEach(([set, cells]) => {
            callback(Number(set), cells);
        })
    }
}




export default class Ellers {
    on(grid: Grid<ICell>) {
        let rowState = new RowState();
        grid.eachRow((row: ICell[]) => {
            row.forEach((cell: ICell) => {
                if (!cell.west) return;
                let setNumber = rowState.setFor(cell);
                let prioritySetNumber = rowState.setFor(cell.west);
                const shouldLink = setNumber !== prioritySetNumber && (!cell.south || Math.floor(Math.random() * 2) === 0)

                if (shouldLink) {
                    cell.link(cell.west);
                    rowState.merge(prioritySetNumber, setNumber);
                }
            }) 

            if (row[0].south) {
                let nextRow = rowState.next()
                rowState.eachSet((_, cells) => {
                    cells.sort(() => Math.random() - 0.5).forEach((cell, index) => {
                        if (index === 0 || Math.floor(Math.random() * 3) === 0) {
                            if (cell.south) {
                                cell.link(cell.south as ICell)
                                nextRow.record(rowState.setFor(cell), cell.south as ICell)
                            }
                        }
                    })
                })
                rowState = nextRow;
            }
        })
    }
}