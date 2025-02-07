import './App.css'
import { useState } from 'react';
import binaryTreeTest from './test/binaryTreeTest';

function App() {

  const [mazeStr, setMazeStr] = useState('');

  return (
    <>
      <h1>Maze Gen</h1>
      <div className="card">
        <button onClick={() => { 
          const tmp = binaryTreeTest()
          setMazeStr(tmp)
        }}>
          Click me (binary Tree)
        </button>
      </div>
      <p className="read-the-docs">
        <div dangerouslySetInnerHTML={{ __html: mazeStr }} />
      </p>
    </>
  )
}

export default App
