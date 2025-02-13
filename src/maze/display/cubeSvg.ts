import CubeCell from "../CubeCell";
import Grid from "../Grid";

export default function cubeSvg(grid: Grid<CubeCell>): string {
    const cellSize = 30; // 单元格大小，可调整
    const strokeWidth = 1; // 线条粗细，可调整

    const faceWidth = cellSize * grid.rows;
    const faceHeight = cellSize * grid.cols;

    const imageWidth = 4 * faceWidth;
    const imageHeight = 3 * faceHeight;


    let svgStr = `<svg width="${imageWidth + 1}" height="${imageHeight + 1}">`;

    const offsets = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]]

    svgStr += `<rect x="${0}" y="${faceHeight}" width="${faceWidth}" height="${faceHeight}" fill="red" opacity="0.6"/>` // face 0
    svgStr += `<rect x="${faceWidth}" y="${faceHeight}" width="${faceWidth}" height="${faceHeight}" fill="yellow" opacity="0.6"/>` // face 1
    svgStr += `<rect x="${faceWidth*2}" y="${faceHeight}" width="${faceWidth}" height="${faceHeight}" fill="blue" opacity="0.6"/>` // face 2
    svgStr += `<rect x="${faceWidth*3}" y="${faceHeight}" width="${faceWidth}" height="${faceHeight}" fill="purple" opacity="0.6"/>` // face 3
    svgStr += `<rect x="${faceWidth}" y="${0}" width="${faceWidth}" height="${faceHeight}" fill="teal" opacity="0.6"/>` // face 4
    svgStr += `<rect x="${faceWidth}" y="${faceHeight*2}" width="${faceWidth}" height="${faceHeight}" fill="gray" opacity="0.6"/>` // face 5

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: CubeCell) => {
        if (!cell) return; // 跳过空单元格
        let x = offsets[cell?.face || 0][0] * faceWidth + cell.col * cellSize;
        let y = offsets[cell?.face || 0][1] * faceHeight + cell.row * cellSize;

        svgStr += toSvgWithoutInset(x, y, cell, cellSize, strokeWidth);
    });

    svgStr += '</svg>';
    return svgStr;
}

export function toSvgWithoutInset(x: number, y: number, cell: CubeCell, cellSize: number, strokeWidth: number) {
    let svgStr = '';
    const x1 = x;
    const y1 = y;
    const x2 = x1 + cellSize;
    const y2 = y1 + cellSize;

    if ((cell?.north as CubeCell)?.face !== cell.face && !cell.linked(cell.north as CubeCell)) {
        svgStr += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="black" stroke-width="${strokeWidth}" />`; 
    }

    if ((cell?.west as CubeCell)?.face !== cell.face && !cell.linked(cell.west as CubeCell)) {
        svgStr += `<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; 
    }

    if (!cell.linked(cell?.east as CubeCell)) {
        svgStr += `<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; 
    }
    if (!cell.linked(cell?.south as CubeCell)) {
        svgStr += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`;
    }

    return svgStr;
}