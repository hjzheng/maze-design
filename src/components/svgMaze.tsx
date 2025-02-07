import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import ColorGrid from '../maze/ColorGrid';
import BinaryTree from '../maze/gen/binaryTree';
import Sidewinder from '../maze/gen/sidewinder';

type Porps = {
  size: number;
  genMethod?: 'binaryTree' | 'sidewinder';
  num?: number;
}

const genMap = {
  binaryTree: BinaryTree,
  sidewinder: Sidewinder,
}
export default function SvgMaze({ size, num, genMethod = 'binaryTree' }: Porps) {

    const [mazeStrs, setMazeStrs] = useState<string[]>([]);
    
    const clickHandler = () => {
        const temps = Array(num).fill(0).map(() => {
            const grid = new ColorGrid(size, size);
            const gen = new genMap[genMethod]();
            gen.on(grid);
            let distances = grid.getCell(0, 0)?.distances();
            grid.setDistances(distances);
            return grid.toSVG();
        })
        setMazeStrs(temps);
    }

    useEffect(() => {
        clickHandler();
    }, [])


    return (
    <>
        <div className="card">
            <button onClick={() => { 
                clickHandler()
            }}>
                Click me ({genMethod})
            </button>
        </div>
        <Flex wrap gap={20}>
            {
                mazeStrs.map((svgStr, i) => {
                    return <div key={i} dangerouslySetInnerHTML={{ __html: svgStr }} />
                })
            }
        </Flex>
    </>
    )
}