import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CylinderGrid from '../maze/CylinderGrid';
import RecursiveBacktracker from '../maze/gen/recursiveBacktracker';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const colors = ['#ffffff', '#ff0000', '#00ff00', '#ffff00'];

export default function CylinderMaze() {

    const threeContiner = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(null);

    const genSvg = () => {
        const grid = new CylinderGrid(7, 16);
        const gen = new RecursiveBacktracker();
        gen.on(grid);
        const color = colors[Math.floor(Math.random() * colors.length)]
        const svgStr = grid.toSVG(() => color);
        return svgStr;
    }

    const buildMaze = async (scene?: THREE.Scene | null) => {
        if (!scene) return;
        scene.clear();

        const canvas = document.createElement('canvas'); // 创建 Canvas 元素
        const ctx = canvas.getContext('2d');
        const svgData = genSvg();

        const img = new Image();
        img.onload = () => {
            console.log(img);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0, img.width - 1, img.height, 0, 0, img.width, img.height)
    
            const texture = new THREE.CanvasTexture(canvas)
            const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: false});
            const geometry = new THREE.CylinderGeometry(5, 5, 10, 32, 1);

            const mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
    
            const axesHelper = new THREE.AxesHelper( 5 ); // 创建一个长度为 5 的坐标轴
            axesHelper.position.set(0, 0, 0);
            scene.add(axesHelper); // 将坐标轴添加到场景中
            img.remove();
        }
        img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgData); 
        img.style.display = 'none';
        document.body.appendChild(img);
    }

    useEffect(() => {
        let renderer: THREE.WebGLRenderer;

        genSvg();

        if (threeContiner.current) {
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            const width = threeContiner.current.clientWidth;
            const height = threeContiner.current.clientHeight;
            const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10000 );
            // const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
            
            camera.position.y = 10;
            camera.position.z = 10;
            camera.lookAt(0, 0, 0);
            
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(threeContiner.current.clientWidth, threeContiner.current.clientHeight);
            // renderer.setClearColor(0xffffff, 1);

            const controls = new OrbitControls(camera, renderer.domElement);

            threeContiner.current.appendChild(renderer.domElement);

            buildMaze(sceneRef?.current);
        
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
                    buildMaze(sceneRef?.current)
                }}>
                    Click me
                </button>
            </div>
            <div>
                <div className='threeContainer' ref={threeContiner}></div>
            </div>
        </>
    )
}