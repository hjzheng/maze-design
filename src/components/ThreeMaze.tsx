import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Grid from '../maze/Grid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';


type Porps = {
    size: number;
    genMethod?: 'recursive-backtracker';
}

const genMap = {
    'recursive-backtracker': RecursiveBacktracker,
}

// 坐标转换
function svgToThree(x: number, y: number, svgWidth: number, svgHeight: number, sceneWidth: number, sceneHeight: number) {
    // 缩放
    const scaleX = sceneWidth / svgWidth;
    const scaleY = sceneHeight / svgHeight;
  
    // 翻转 Y 轴
    const yFlipped = svgHeight - y;
  
    // 平移
    const xThree = (x - svgWidth / 2) * scaleX;
    const yThree = (yFlipped - svgHeight / 2) * scaleY;
  
    return {
        x: xThree,
        y: yThree,
    };
  }

export default function ThreeMaze({ size, genMethod = 'recursive-backtracker' }: Porps) {

    const threeContiner = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(null);


    const buildMaze = (scene?: THREE.Scene | null, width?: number, height?: number) => {
        if (!scene) return;
        scene.clear();
        const grid = new Grid(size, size);
        const gen = new genMap[genMethod]();
        gen.on(grid);
        const svgStr = grid.toSVG();
        const div = document.createElement('div')
        div.innerHTML = svgStr;

        const svg = div.querySelector('svg');
        const lines = div.querySelectorAll('line');

        const planeGeometry = new THREE.PlaneGeometry(height || 800, height || 800);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        
        plane.position.set(0, 0, 0);

        scene.add(plane);

        const extrudeSettings = {
            steps: 2,
            depth: 16,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        
        lines.forEach((line) => {
            const x1 = line.getAttribute("x1");
            const y1 = line.getAttribute("y1");
            const x2 = line.getAttribute("x2");
            const y2 = line.getAttribute("y2");

            const p1 = svgToThree(Number(x1), Number(y1), Number(svg?.getAttribute('width') || 1000), Number(svg?.getAttribute('height') || 800), height || 800, height || 800);
            const p2 = svgToThree(Number(x2), Number(y2), Number(svg?.getAttribute('width') || 1000), Number(svg?.getAttribute('height') || 800), height || 800, height || 800);

            const shape = new THREE.Shape();

            shape.moveTo(p1.x, p1.y);
            shape.lineTo(p2.x, p2.y);

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });
    }

    useEffect(() => {
        let renderer: THREE.WebGLRenderer;

        if (threeContiner.current) {
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            const camera = new THREE.PerspectiveCamera( 75, threeContiner.current.clientWidth / threeContiner.current.clientHeight, 0.1, 1000 );
            camera.position.z = 600;
            camera.lookAt(0, 0, 0);
            
            renderer = new THREE.WebGLRenderer();
            renderer.setSize( threeContiner.current.clientWidth, threeContiner.current.clientHeight);

            const controls = new OrbitControls(camera, renderer.domElement);

            threeContiner.current.appendChild(renderer.domElement);
            
            buildMaze(sceneRef?.current, threeContiner.current.clientWidth, threeContiner.current.clientHeight);

            function animate() {
                requestAnimationFrame(animate);
                controls.update(); // 更新 OrbitControls
                renderer.render(scene, camera);
            }
            animate();
        }

        return () => { // Cleanup function
            if (threeContiner.current && renderer.domElement) {
                 threeContiner.current.removeChild(renderer.domElement); 
            }
        };
    }, [])

    return (
        <>
            <div className="card">
                <button onClick={() => {
                    buildMaze(sceneRef?.current, threeContiner.current?.clientWidth, threeContiner.current?.clientHeight)
                }}>
                    Click me ({genMethod})
                </button>
            </div>
            <div>
                <div className='threeContainer' ref={threeContiner}></div>
            </div>
        </>
    )
}