import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import WaveGird from '../maze/WaveGrid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';

type Porps = {
  size: number;
  genMethod?: 'recursive-backtracker';
  num?: number;
}

const genMap = {
  'recursive-backtracker': RecursiveBacktracker,
}
export default function WaveMaze({ size, num, genMethod = 'recursive-backtracker' }: Porps) {

    const [mazeStrs, setMazeStrs] = useState<string[]>([]);
    
    const clickHandler = () => {
        const temps = Array(num).fill(0).map(() => {
            const grid = new WaveGird(size, size);
            const gen = new genMap[genMethod]();
            gen.on(grid);
            // grid.braid(0.5);
            let distances = grid.getCell(0, 0)?.distances().toGoal(grid.getCell(size - 1, size - 1));
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