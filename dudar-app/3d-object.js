import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const light = new THREE.AmbientLight('white', 1);
scene.add(light);
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({color: 'green'})
);
cube.position.set(0, 0, 0);
//scene.add(cube);

//load 3D-model

const loader = new GLTFLoader();
loader.load(
    'models/fox_in_a_cape/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded" );
    },
    (error) => {
        console.error('Error: ' + error);
    }
)

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    renderer.setClearColor('lightblue')
}

animate();