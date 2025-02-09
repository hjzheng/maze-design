import Grid from '../Grid';
import { ICell } from '../Cell';

function randomCell(set: Set<ICell>): ICell {
    const randomIndex = Math.floor(Math.random() * set.size);
    
    let i = 0;
    
    for (const value of set) {
      if (i === randomIndex) {
        return value;
      }
      i++;
    }

    throw new Error('set is empty');
  }


export default class Wilson {
    on(grid: Grid<ICell>) {
        let unvisited: Set<ICell> = new Set();
        grid.eachCell((cell: ICell) => {
            unvisited.add(cell);
        });
    
        let cell: ICell = randomCell(unvisited);
        unvisited.delete(cell);
    
        while (unvisited.size > 0) {
            cell = randomCell(unvisited);
            let path: ICell[] = [cell] 
            
            while (unvisited.has(cell)) {
                const neighbor = cell.randomNeighbor();
                if (neighbor) {
                    const position = path.indexOf(neighbor);
                    if (position !== -1) {
                        path = path.slice(0, position);
                    } else {
                        path.push(neighbor);
                    }
                    cell = neighbor;
                }
            }

            for (let i = 0; i < path.length - 1; i++) {
                path[i].link(path[i + 1]);
                unvisited.delete(path[i]);
            }
        }
        return grid;
    }
}