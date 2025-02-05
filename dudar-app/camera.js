import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const light = new THREE.AmbientLight('white', 1)
scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //плавное замедление
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; //панорамирование
controls.minDistance = 3;
controls.maxDistance = 10;


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 'red'});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-3, 0, 0);
scene.add(cube);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshStandardMaterial({color: 'green'})
);
sphere.position.x = 2;
scene.add(sphere);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseHover(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if(intersects.length > 0) {
        intersects[0].object.material.color.set('pink')
    }
}

window.addEventListener('mousemove', onMouseHover);

function animate(){
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}
animate();