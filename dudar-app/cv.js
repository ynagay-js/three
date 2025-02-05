import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 5, 10);
camera.rotation.x = 6;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight('white', 0.5);
scene.add(light);

const directLight = new THREE.DirectionalLight('white', 1);
directLight.position.set(5, 5, 5);
directLight.castShadow = true;
scene.add(directLight);

// add road

const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 15),
    new THREE.MeshStandardMaterial({color: 'lightgreen'})
);
road.rotation.x = -Math.PI / 2;
scene.add(road);

// load 3D-model

const loader = new GLTFLoader();
let fox;

loader.load(
    'models/fox_in_a_cape/scene.gltf',
    (gltf) => {
        fox = gltf.scene;
        fox.scale.set(2, 2, 2);
        fox.position.set(0, 0, 0);
        scene.add(fox);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded" );
    },
    (error) => {
        console.error('Error: ' + error);
    }
)

let angle = 0;

let isMoving = false;

// manual fox moving

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        isMoving = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        isMoving = false;
    }
})

function moveFox() {
    if (!fox || !isMoving) return

    angle += 0.01;
    fox.position.x = 5 * Math.cos(angle);
    fox.position.z = 5 * Math.sin(angle);
    fox.rotation.y = -angle;
}

// Points

const infoPoints = [
    { position: new THREE.Vector3(5, 0, 0), message: 'About me' },
    { position: new THREE.Vector3(-5, 0, 0), message: 'Skills' },
    { position: new THREE.Vector3(0, 0, 5), message: 'Contacts' }
]

infoPoints.forEach(point => {
    createInfoSphere(point.position);
})

function checkInfoPoints() {
    infoPoints.forEach(point => {
        const distance = fox.position.distanceTo(point.position);
        if (distance < 0.5) {
            showInfo(point.message);
        }
    })
}

function showInfo(message) {
    const infoBox = document.querySelector('.info-block');
    infoBox.innerText = message;
    infoBox.style.display = 'block';
}

function createInfoSphere(position) {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({color: 'red'})
    )
    sphere.position.copy(position);
    sphere.position.y = 3;
    scene.add(sphere);
}

function animate() {
    requestAnimationFrame(animate);

    moveFox();
    checkInfoPoints();

    renderer.setClearColor('lightblue');
    renderer.render(scene, camera);
}

animate();