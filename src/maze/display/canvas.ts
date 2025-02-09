import { ICell } from "../Cell";
import Grid from "../Grid";

export default function canvas(canvas: HTMLCanvasElement, grid: Grid<ICell>, cellContent?: (cell: ICell) => string, cellBgColor?: (cell: ICell) => string) {
    const cellSize = 30; // 单元格大小，可调整
    const strokeWidth = 1; // 线条粗细，可调整

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';

    const dpr = window.devicePixelRatio || 1;
    const width = grid.cols * cellSize + 1
    const height = grid.rows * cellSize + 1
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    grid.eachCell((cell: ICell) => {
        if (!cell) return; // 跳过空单元格

        const x1 = cell.col * cellSize;
        const y1 = cell.row * cellSize;
        const x2 = (cell.col + 1) * cellSize;
        const y2 = (cell.row + 1) * cellSize;

        // 绘制文字 (如果有)
        if (cellContent) {
            // 添加背景
            if (cellBgColor) {
                ctx.fillStyle = cellBgColor(cell);
                ctx.fillRect(x1, y1, cellSize, cellSize);
            }
            const textX = x1 + cellSize / 2;
            const textY = y1 + cellSize / 2;
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cellContent(cell), textX, textY);
        }
       
        // 绘制墙壁 (根据链接情况)
        if (!cell?.north) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke();
        }

        if (!cell.west) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1, y2);
            ctx.stroke();
        }

        if (!cell.linked(cell?.east)) {
            ctx.beginPath();
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        if (!cell.linked(cell?.south)) {
            ctx.beginPath();
            ctx.moveTo(x1, y2);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    });
}