import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import PolarGrid from '../maze/PolarGrid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';

type Porps = {
  size: number;
  genMethod?: 'recursive-backtracker';
  num?: number;
}

const genMap = {
  'recursive-backtracker': RecursiveBacktracker,
}
export default function PollarMaze({ size, num, genMethod = 'recursive-backtracker' }: Porps) {

    const [mazeStrs, setMazeStrs] = useState<string[]>([]);
    
    const clickHandler = () => {
        const temps = Array(num).fill(0).map(() => {
            const grid = new PolarGrid(size);
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