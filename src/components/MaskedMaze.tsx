
import Mask from "../maze/tools/Mask";
import MaskGrid from "../maze/MaskGrid";
import RecursiveBacktracker from "../maze/gen/recursiveBacktracker";
import { useState, useEffect } from "react";
import mazeUrl from "../assets/maze_text.png"


function genMaskByImage(imagePath: string) {
    return new Promise((reslove) => {
        const img = new Image();
        img.onload = () => {
            // 创建一个 OffscreenCanvas，提高性能
            const canvas = new OffscreenCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const mask = new Mask(img.height, img.width);

            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                // 判断是否为黑色像素（可以根据实际情况调整阈值）
                if (r === 0 && g === 0 && b === 0) {
                    const x = (i / 4) % img.width;
                    const y = Math.floor((i / 4) / img.width);
                    // 注意: x y 是需要反过来的
                    mask.set(y, x, false);
                }
            }
            reslove(mask);
        };
        img.src = imagePath;
    })
}

export default function MaskedMaze() {
    const [mazeStr, setMazeStr] = useState('');

    const genMazeByImage = () => {
        genMaskByImage(mazeUrl).then((mask) => {
            const maskGrid = new MaskGrid(mask as Mask);
            const recursiveBacktracker = new RecursiveBacktracker();
            recursiveBacktracker.on(maskGrid);
            console.log(maskGrid.toString());
            setMazeStr(maskGrid.toSVG());
        })
    }


    useEffect(() => {
        genMaskByImage(mazeUrl).then((mask) => {
            const maskGrid = new MaskGrid(mask as Mask);
            const recursiveBacktracker = new RecursiveBacktracker();
            recursiveBacktracker.on(maskGrid);
            console.log(maskGrid.toString());
            setMazeStr(maskGrid.toSVG());
        })
    }, [])
    return (
        <div>
            <div className="card">
                <button onClick={() => {
                    genMazeByImage();
                }}>
                    Click me (Image Mask Grid)
                </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: mazeStr }} />
        </div>
    );
}