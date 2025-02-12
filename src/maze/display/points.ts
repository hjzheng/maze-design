import Cell3D from "../Cell3D";
import Grid3D from "../Grid3D";

type P = {
    x: number,
    y: number,
    z: number,
}

type Line = {
    start: P,
    end: P,
    direction ?: 'UP' | 'DOWN' 
}

export default function points(grid: Grid3D) {
    const cellSize = 30; // 单元格大小，可调整

    const width = grid.cols * cellSize + 1;
    const height = grid.rows * cellSize + 1;
    const deeps = [];
    const levelGap = cellSize * 4;

    for (let d=0; d<grid.levels; d++) {
        deeps.push(d * levelGap + 1)
    }

    let points: Line[] = [];

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: Cell3D) => {
        if (!cell) return; // 跳过空单元格
        points = points.concat(...toPoints(cell, cellSize, levelGap));

        const x = cell.col * cellSize;
        const y = cell.row * cellSize;
        const z = cell.level * levelGap;

        // 上下通道
        if (cell.linked(cell.down as Cell3D)) {
            points.push({
                start: {
                    x: x + cellSize / 4 * 3,
                    y: y + cellSize / 4 * 3,
                    z: z + 10,
                },
                end: {
                    x: x + cellSize / 4 * 3,
                    y: y + cellSize / 4 * 3,
                    z: z - levelGap - 10,
                },
                direction: 'DOWN'
            })
        }

        if (cell.linked(cell.up as Cell3D)) {
            points.push({
                start: {
                    x: x + cellSize / 4,
                    y: y + cellSize / 4,
                    z: z - 2,
                },
                end: {
                    x: x + cellSize / 4,
                    y: y + cellSize / 4,
                    z: z + levelGap + 10,
                },
                direction: 'UP'
            })
        }
    });



    return {
        points,
        width,
        height,
        deeps: deeps,
    };
}

// 同一层的点
export function toPoints(cell: Cell3D, cellSize: number, levelGap: number) {
    let linePoints: Line[] = [];
    
    const x1 = cell.col * cellSize;
    const y1 = cell.row * cellSize;
    const z = cell.level * levelGap;

    const x2 = (cell.col + 1) * cellSize;
    const y2 = (cell.row + 1) * cellSize;

    if (!cell?.north) {
        linePoints.push({
            start: {x: x1, y: y1, z},
            end: {x: x2, y: y1, z},
        })
    }

    if (!cell.west) {
        linePoints.push({
            start: {x: x1, y: y1, z},
            end: {x: x1, y: y2, z},
        })
    }

    if (!cell.linked(cell?.east as Cell3D)) {
        linePoints.push({
            start: {x: x2, y: y1, z},
            end: {x: x2, y: y2, z},
        })
    }
    if (!cell.linked(cell?.south as Cell3D)) {
        linePoints.push({
            start: {x: x1, y: y2, z},
            end: {x: x2, y: y2, z},
        })
    }

    return linePoints;
}