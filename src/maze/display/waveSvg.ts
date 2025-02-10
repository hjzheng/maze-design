import { ICell } from "../Cell";
import Grid from "../Grid";
import { OverCell } from "../WaveCells";
import { toSvgWithInset, toSvgWithoutInset, cellPointsWithInset } from "./svg";

export default function waveSvg<T extends ICell>(grid: Grid<T>, cellContent?: (cell: T) => string, cellBgColor?: (cell: T) => string, inset: number = 0): string {
    const cellSize = 30; // 单元格大小，可调整
    const strokeWidth = 1; // 线条粗细，可调整

    let svgStr = `<svg width="${grid.cols * cellSize + 1}" height="${grid.rows * cellSize + 1}">`;

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: T) => {
        if (!cell) return; // 跳过空单元格

        if (inset === 0) {
            svgStr += toSvgWithoutInset<T>(cell, cellSize, strokeWidth, cellContent, cellBgColor);
        } else {
            svgStr += toWaveSvgWithInset<T>(cell, cellSize, strokeWidth, inset, cellContent, cellBgColor);
        }
    });

    svgStr += '</svg>';
    return svgStr;
}

function toWaveSvgWithInset<T extends ICell>(cell: T, cellSize: number, strokeWidth: number, inset: number, cellContent?: (cell: T) => string, cellBgColor?: (cell: T) => string) {
    let svgStr = '';
    if (cell instanceof OverCell) {
        svgStr += toSvgWithInset(cell, cellSize, strokeWidth, inset, cellContent, cellBgColor);
    } else {
        const x = cell.col * cellSize;
        const y = cell.row * cellSize;
        const { x1, x2, x3, x4, y1, y2, y3, y4 } = cellPointsWithInset(x, y, cellSize, inset);

        if (cell?.verticalPassage?.()) {
            svgStr += `<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; 
            svgStr += `<line x1="${x3}" y1="${y1}" x2="${x3}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; 
            svgStr += `<line x1="${x2}" y1="${y3}" x2="${x2}" y2="${y4}" stroke="black" stroke-width="${strokeWidth}" />`; 
            svgStr += `<line x1="${x3}" y1="${y3}" x2="${x3}" y2="${y4}" stroke="black" stroke-width="${strokeWidth}" />`; 
        } else {
            svgStr += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`;
            svgStr += `<line x1="${x1}" y1="${y3}" x2="${x2}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`;
            svgStr += `<line x1="${x3}" y1="${y2}" x2="${x4}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`;
            svgStr += `<line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`;
        }
    }

    return svgStr;
}