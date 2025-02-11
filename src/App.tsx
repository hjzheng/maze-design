import './App.css';
import { Tabs } from 'antd';
import Test from './test/Test';
import SvgMaze, { genMap } from './components/svgMaze';
import MaskedMaze from './components/MaskedMaze';
import PollarMaze from './components/PollarMaze';
import HexMaze from './components/HexMaze';
import TrangleMaze from './components/TrangleMaze';
import WeightedMaze from './components/WeightedMaze';
import WaveMaze from './components/WaveMaze';
import KruskalWaveMaze from './components/KruskalWaveMaze';
import mazeUrl from './assets/maze_text.png';

function App() {
  return (
    <>
      <h1><img src={mazeUrl} /> Maze</h1>
      <Tabs>
        { Object.keys(genMap).map((key, i) => {
          return <Tabs.TabPane tab={key} key={i}>
            <div className='tabWrapper'>
              <SvgMaze size={10} genMethod={key as keyof typeof genMap} num={8} />
            </div>
          </Tabs.TabPane>
        })}
        <Tabs.TabPane tab='Image Masks Maze' key='image-mask-maze'>
          <div className='tabWrapper'>
            <MaskedMaze />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Pollar Maze' key='pollar-maze'>
          <div className='tabWrapper'>
            <PollarMaze size={8} num={8}/>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Hex Maze' key='hex-maze'>
          <div className='tabWrapper'>
            <HexMaze size={8} num={8}/>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Trangle Maze' key='trangle-maze'>
          <div className='tabWrapper'>
            <TrangleMaze size={10} num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Weighted Maze' key='weighted-maze'>
          <div className='tabWrapper'>
            <WeightedMaze size={10} num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Wave Maze' key='wave-maze'>
          <div className='tabWrapper'>
            <WaveMaze size={10} num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Kruskal Wave Maze' key='kruskal-wave-maze'>
          <div className='tabWrapper'>
            <KruskalWaveMaze size={20} num={4} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='test' key='test'>
          <div className='tabWrapper'>
            <Test />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default App
