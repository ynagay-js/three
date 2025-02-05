import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

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


// Post Process

const renderPass = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
);

const composer = new EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(bloomPass);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 5;

// Shader

const vertexShader = `
    varying vec3 vPosition;

    void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = `
    varying vec3 vPosition;

    void main() {
        gl_FragColor = vec4(abs(vPosition.x), abs(vPosition.y), abs(vPosition.z), 1.0);
    }
`

const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
})

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    shaderMaterial
);
cube.position.set(0, 0, 0);
scene.add(cube);

//load 3D-model

const loader = new GLTFLoader();
loader.load(
    'models/fox_in_a_cape/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(2, 0, 0);
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

    controls.update();    
    renderer.setClearColor('lightblue');
    composer.render(scene, camera);
}

animate();