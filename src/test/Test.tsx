import { useRef, useState } from 'react';
import binaryTreeTest from './binaryTreeTest';
import sidewinderTest from './sidewinderTest';
import distanceGridTest from './distanceGridTest';
import distanceGridTest2 from './distanceGridTest2';
import colorGridTest from './colorGridCanvasTest';
import maskGridTest from './MaskGridTest';
import pollarGridTest from './PollarGridTest';
import cubeGridTest from './cubeGridTest';

export default function Test() {
    const [mazeStr, setMazeStr] = useState('');
    const canvas = useRef<HTMLCanvasElement>(null);  

    return <div>
      <div className="card">
        <button onClick={() => { 
          const tmp = cubeGridTest();
          setMazeStr(tmp)
        }}>
          Click me (Cube Grid)
        </button>
      </div>
      <div className="card">
        <button onClick={() => { 
          colorGridTest(canvas.current!);
        }}>
          Click me (Colored Grid)
        </button>
      </div>
      <div className="card">
        <button onClick={() => {
          const tmp = pollarGridTest();
          setMazeStr(tmp)
        }}>
          Click me (Pollar Grid)
        </button>
      </div>
      <div className="card">
        <button onClick={() => {
          const tmp = maskGridTest();
          setMazeStr(tmp)
        }}>
          Click me (Mask Grid)
        </button>
      </div>
      <div className="card">
        <button onClick={() => { 
          const tmp = distanceGridTest2()
          setMazeStr(tmp)
        }}>
          Click me (Dijkstra)
        </button>
      </div>
      <div className="card">
        <button onClick={() => { 
          const tmp = distanceGridTest()
          setMazeStr(tmp)
        }}>
          Click me (Dijkstra shortest path)
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
      <canvas ref={canvas} />
    </div>
}