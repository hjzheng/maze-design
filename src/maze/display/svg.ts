import { ICell } from "../Cell";
import Grid from "../Grid";

export default function svg<T extends ICell>(grid: Grid<T>, cellContent?: (cell: T) => string, cellBgColor?: (cell: T) => string, inset: number = 0): string {
    const cellSize = 30; // 单元格大小，可调整
    const strokeWidth = 1; // 线条粗细，可调整

    let svgStr = `<svg width="${grid.cols * cellSize + 1}" height="${grid.rows * cellSize + 1}">`;

    // 绘制墙壁 (根据链接情况)
    grid.eachCell((cell: T) => {
        if (!cell) return; // 跳过空单元格

        if (inset === 0) {
            svgStr += toSvgWithoutInset<T>(cell, cellSize, strokeWidth, cellContent, cellBgColor);
        } else {
            svgStr += toSvgWithInset<T>(cell, cellSize, strokeWidth, inset, cellContent, cellBgColor);
        }
    });

    svgStr += '</svg>';
    return svgStr;
}

export function cellPointsWithInset(x: number, y: number, cellSize: number, inset: number) {
  
  const x1 = x;
  const x2 = x1 + inset;
  const x4 = x1 + cellSize;
  const x3 = x4 - inset;

  const y1 = y;
  const y2 = y1 + inset;
  const y4 = y1 + cellSize;
  const y3 = y4 - inset;

  return { x1, x2, x3, x4, y1, y2, y3, y4 };
}

export function toSvgWithInset<T extends ICell>(cell: T, cellSize: number, strokeWidth: number, inset: number, cellContent?: (cell: T) => string, cellBgColor?: (cell: T) => string) {

    let svgStr = '';
    const x = cell.col * cellSize;
    const y = cell.row * cellSize;

    const { x1, x2, x3, x4, y1, y2, y3, y4 } = cellPointsWithInset(x, y, cellSize, inset);
    // 添加背景颜色
    if (cellBgColor) svgStr += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${cellBgColor(cell)}" />`;

    // 绘制文字 (如果有)
    if (cellContent) {
        const textX = x + cellSize / 2;
        const textY = y + cellSize / 2;
        svgStr += `<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle">${cellContent(cell)}</text>`;
    }

    // 绘制单元格的四条边
    if (cell.linked(cell?.north as T)) {
        svgStr += `<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边相连
        svgStr += `<line x1="${x3}" y1="${y1}" x2="${x3}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边相连
    } else {
        svgStr += `<line x1="${x2}" y1="${y2}" x2="${x3}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边未相连
    }

    if (cell.linked(cell?.south)) {
        svgStr += `<line x1="${x2}" y1="${y3}" x2="${x2}" y2="${y4}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果南边相连
        svgStr += `<line x1="${x3}" y1="${y3}" x2="${x3}" y2="${y4}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果南边相连
    } else {
        svgStr += `<line x1="${x2}" y1="${y3}" x2="${x3}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果南边未相连
    }

    if (cell.linked(cell?.west)) {
        svgStr += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边相连
        svgStr += `<line x1="${x1}" y1="${y3}" x2="${x2}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边相连
    } else {
        svgStr += `<line x1="${x2}" y1="${y2}" x2="${x2}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边未相连
    }

    if (cell.linked(cell?.east)) {
        svgStr += `<line x1="${x3}" y1="${y2}" x2="${x4}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果东边相连
        svgStr += `<line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果东边相连
    } else {    
        svgStr += `<line x1="${x3}" y1="${y2}" x2="${x3}" y2="${y3}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果东边未相连
    }

    return svgStr;
}

export function toSvgWithoutInset<T extends ICell>(cell: T, cellSize: number, strokeWidth: number, cellContent?: (cell: T) => string, cellBgColor?: (cell: T) => string) {
    let svgStr = '';
    const x1 = cell.col * cellSize;
    const y1 = cell.row * cellSize;
    const x2 = (cell.col + 1) * cellSize;
    const y2 = (cell.row + 1) * cellSize;

    // 添加背景颜色
    if (cellBgColor) svgStr += `<rect x="${x1}" y="${y1}" width="${cellSize}" height="${cellSize}" fill="${cellBgColor(cell)}" />`;
    // 绘制文字 (如果有)
    if (cellContent) {
        const textX = x1 + cellSize / 2;
        const textY = y1 + cellSize / 2;
        svgStr += `<text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="middle">${cellContent(cell)}</text>`;
    }

    if (!cell?.north) {
        svgStr += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果北边没有邻居，绘制北边墙壁
    }

    if (!cell.west) {
        svgStr += `<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 如果西边没有邻居，绘制西边墙壁
    }

    if (!cell.linked(cell?.east)) {
        svgStr += `<line x1="${x2}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`; // 东边墙壁
    }
    if (!cell.linked(cell?.south)) {
        svgStr += `<line x1="${x1}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${strokeWidth}" />`;
    }

    return svgStr;
}