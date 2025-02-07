import './App.css';
import { Tabs } from 'antd';
import Test from './test/Test';
import SvgMaze from './components/svgMaze';
function App() {
  return (
    <>
      <h1>Maze Gen</h1>
      <Tabs>
        <Tabs.TabPane tab='BinaryTree' key='binaryTree'>
          <div className='tabWrapper'>
            <SvgMaze size={10} genMethod='binaryTree' num={8} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Sidewinder' key='sidewinder'>
        <div className='tabWrapper'>
           <SvgMaze size={10} genMethod='sidewinder' num={8} />
           </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab='乱七八糟' key='test'>
        <div className='tabWrapper'>
          <Test />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default App
