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
    const deep = grid.levels * cellSize + 1;

    let points: Line[] = [];

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: Cell3D) => {
        if (!cell) return; // 跳过空单元格
        points = points.concat(...toPoints(cell, cellSize));

        const x = cell.col * cellSize;
        const y = cell.row * cellSize;
        const z = cell.level * cellSize;

        // 上下通道
        if (cell.linked(cell.down as Cell3D)) {
            points.push({
                start: {
                    x: x + cellSize / 2,
                    y: y + cellSize / 2,
                    z: z,
                },
                end: {
                    x: x + cellSize / 2,
                    y: y + cellSize / 2,
                    z: z - cellSize,
                },
                direction: 'DOWN'
            })
        }

        if (cell.linked(cell.up as Cell3D)) {
            points.push({
                start: {
                    x: x + cellSize / 2,
                    y: y + cellSize / 2,
                    z: z,
                },
                end: {
                    x: x + cellSize / 2,
                    y: y + cellSize / 2,
                    z: z + cellSize,
                },
                direction: 'UP'
            })
        }
    });



    return {
        points,
        width,
        height,
        deep,
    };
}

// 同一层的点
export function toPoints(cell: Cell3D, cellSize: number) {
    let linePoints: Line[] = [];
    
    const x1 = cell.col * cellSize;
    const y1 = cell.row * cellSize;
    const z = cell.level * cellSize;

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