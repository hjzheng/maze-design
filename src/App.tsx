import './App.css';
import { Tabs } from 'antd';
import Test from './test/Test';
import SvgMaze from './components/svgMaze';
import MaskedMaze from './components/MaskedMaze';
import PollarMaze from './components/PollarMaze';
import HexMaze from './components/HexMaze';
import TrangleMaze from './components/TrangleMaze';
import mazeUrl from './assets/maze_text.png';

function App() {
  return (
    <>
      <h1><img src={mazeUrl} /> Maze</h1>
      <Tabs>
        <Tabs.TabPane tab='binary-tree' key='binaryTree'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='binary-tree' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sidewinder' key='sidewinder'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='sidewinder' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='aldous-broder' key='aldous-broder'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='aldous-broder' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='wilson' key='wilson'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='wilson' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='hunt-and-kill' key='hunt-and-kill'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='hunt-and-kill' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='recursive-backtracker' key='recursive-backtracker'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='recursive-backtracker' num={8} />
          </div>
        </Tabs.TabPane>
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
