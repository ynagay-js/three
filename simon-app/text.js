import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry'

/**
 * Scene
 */
const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');
const size = {
    height: window.innerHeight,
    width: window.innerWidth
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.01,
    100
);
camera.position.set(1, 1, 3);
scene.add(camera);

/**
 * Controls
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);

/**
 * Texture
 */

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/static/textures/matcaps/7.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */

const fontLoader = new FontLoader();
fontLoader.load(
    '/static/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);

        /**
         * Center Text
         */

        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
        // )

        textGeometry.center();

        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(
                new THREE.TorusGeometry(0.3, 0.2, 20, 45),
                material
            );
            scene.add(donut);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;
            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);
        }
        
       
    }
)

const clock = new THREE.Clock();

/**
 * Animation Function
 */

function animate() {
    const elapsedTime = clock.getElapsedTime();
    window.requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}
animate();