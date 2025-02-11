import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import PreconfiguredWaveGrid from '../maze/PreconfiguredWaveGrid';
import Kruskal, { State } from '../maze/gen/kruskal';

type Porps = {
  size: number;
  num?: number;
}

export default function KruskalWaveMaze({ size, num }: Porps) {

    const [mazeStrs, setMazeStrs] = useState<string[]>([]);
    
    const clickHandler = () => {
        const temps = Array(num).fill(0).map(() => {
            const grid = new PreconfiguredWaveGrid(size, size);
            const state = new State(grid);
            
            for (let i=0; i<grid.size(); i++) {
                let row = 1 + Math.round(Math.random() * (grid.rows - 3));
                let col = 1 + Math.round(Math.random() * (grid.cols - 3));

                let cell = grid.getCell(row, col);
                if (cell) {
                    state.addCrossing(cell);
                }
            }

            const gen = new Kruskal();
            gen.on(grid, state);

            return grid.toSVG(undefined, 10);
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
                Click me (Kruskal)
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