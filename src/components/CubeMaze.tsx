import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mazeUrl from '../assets/cube_maze_color.jpg';

export default function CubeMaze() {

    const threeContiner = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>(null);
    /**
     *  前面：  左上 -> 右上 -> 左下 -> 右下 
        后面： 左上 -> 右上 -> 左下 -> 右下 
        上面： 左上 -> 右上 -> 左下 -> 右下 
        下面：  左上 -> 右上 -> 左下 -> 右下
        左面：  左上 -> 右上 -> 左下 -> 右下 
        右面： 左上 -> 右上 -> 左下 -> 右下 
     */
    const uv = [
        // 前面
        1/4, 2/3, 1/2, 2/3, 1/4, 1/3, 1/2, 1/3, 
        // 后面
        3/4, 2/3, 1, 2/3,  3/4, 1/3, 1, 1/3,
        // 上面
        1/4, 1, 1/2, 1, 1/4, 2/3, 1/2, 2/3,
        // 下面
        1/4, 1/3, 1/2, 1/3, 1/4, 0, 1/2, 0, 
        // 左面
        0, 2/3, 1/4, 2/3, 0, 1/3, 0.25, 1/3, 
        // 右面
        1/2, 2/3, 3/4, 2/3, 1/2, 1/3, 3/4, 1/3, 
      ];


    const buildMaze = async (scene?: THREE.Scene | null) => {
        if (!scene) return;
        scene.clear();

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(mazeUrl);
        const material = new THREE.MeshBasicMaterial({ map: texture});
        const geometry = new THREE.BoxGeometry( 10, 10, 10 );
        const uvAttribute = new THREE.BufferAttribute(new Float32Array(uv), 2);
        geometry.attributes.uv = uvAttribute;
        geometry.attributes.uv.needsUpdate = true;

        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        const axesHelper = new THREE.AxesHelper( 5 ); // 创建一个长度为 5 的坐标轴
        axesHelper.position.set(0, 0, 0);
        scene.add(axesHelper); // 将坐标轴添加到场景中
    }

    useEffect(() => {
        let renderer: THREE.WebGLRenderer;

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
            <div>
                <div className='threeContainer' ref={threeContiner}></div>
            </div>
        </>
    )
}