import './App.css'
import { useState } from 'react';
import binaryTreeTest from './test/binaryTreeTest';
import sidewinderTest from './test/sidewinderTest';
import distanceGridTest from './test/distanceGridTest';

function App() {

  const [mazeStr, setMazeStr] = useState('');

  return (
    <>
      <h1>Maze Gen</h1>
      <div className="card">
        <button onClick={() => { 
          const tmp = distanceGridTest()
          setMazeStr(tmp)
        }}>
          Click me (sidewinder with Dijkstra)
        </button>
      </div>
      <div className="card">
        <button onClick={() => { 
          const tmp = binaryTreeTest()
          setMazeStr(tmp)
        }}>
          Click me (binary Tree)
        </button>
      </div>
      <div className="card">
        <button onClick={() => { 
          const tmp = sidewinderTest()
          setMazeStr(tmp)
        }}>
          Click me (sidewinder)
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: mazeStr }} />
    </>
  )
}

export default App
