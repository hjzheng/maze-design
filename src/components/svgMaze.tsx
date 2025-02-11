import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import ColorGrid from '../maze/ColorGrid';
import BinaryTree from '../maze/gen/binaryTree';
import Sidewinder from '../maze/gen/sidewinder';
import AldousBroder from '../maze/gen/aldousBroder';
import Wilson from '../maze/gen/wilson';
import HuntAndKill from '../maze/gen/huntAndKill';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';
import { SimplifiedPrims, Prims } from '../maze/gen/prims';
import GrowingTree from '../maze/gen/growingTree';

export const genMap = {
    'binary-tree': BinaryTree,
    sidewinder: Sidewinder,
    'aldous-broder': AldousBroder,
    'wilson': Wilson,
    'hunt-and-kill': HuntAndKill,
    'recursive-backtracker': RecursiveBacktracker,
    'simplified-prims': SimplifiedPrims,
    prims: Prims,
   'growing-tree-random': GrowingTree,
   'growing-tree-last': GrowingTree,
   'growing-tree-mix': GrowingTree,
  }

type Porps = {
  size: number;
  genMethod?: keyof typeof genMap;
  num?: number;
}

export default function SvgMaze({ size, num, genMethod = 'binary-tree' }: Porps) {

    const [mazeStrs, setMazeStrs] = useState<string[]>([]);
    
    const clickHandler = () => {
        const temps = Array(num).fill(0).map(() => {
            const grid = new ColorGrid(size, size);
            const gen = new genMap[genMethod]();

            if (genMethod === 'growing-tree-random') {
                gen.on(grid, (active) => active[Math.floor(Math.random() * active.length)]);
            } else if(genMethod === 'growing-tree-last') {
                gen.on(grid, (active) => active[active.length - 1]);
            } else if(genMethod === 'growing-tree-mix') {
                gen.on(grid, (active) => { 
                    return Math.random() > 0.5 ? active[Math.floor(Math.random() * active.length)] : active[active.length - 1];
                });
            } else {
                gen.on(grid);
            }

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