import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import ColorGrid from '../maze/ColorGrid';
import BinaryTree from '../maze/gen/binaryTree';
import Sidewinder from '../maze/gen/sidewinder';
import AldousBroder from '../maze/gen/aldousBroder';
import Wilson from '../maze/gen/wilson';
import HuntAndKill from '../maze/gen/huntAndKill';

type Porps = {
  size: number;
  genMethod?: 'binaryTree' | 'sidewinder' | 'aldous-broder' | 'wilson' | 'hunt-and-kill';
  num?: number;
}

const genMap = {
  binaryTree: BinaryTree,
  sidewinder: Sidewinder,
  'aldous-broder': AldousBroder,
  'wilson': Wilson,
  'hunt-and-kill': HuntAndKill,
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