import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'

// Scene

const scene = new THREE.Scene();

// Camera

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const aspectRatio = size.width / size.height;

// Resize Listener

window.addEventListener('resize', () => {
    // Update sizes
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    // console.log('Window has been resized');

    // Update camera
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Fullscreen Listener

document.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }        
    }
})

// Cursor

const cursor = {
    x: 0,
    y: 0
}

// Mouse Coordinate Listener

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = - (event.clientY / size.height - 0.5); 
    // console.log(cursor.x, cursor.y);
})

const camera = new THREE.PerspectiveCamera(
    75,
    aspectRatio,
    1,
    100
);

// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

camera.position.z = 3;

scene.add(camera);

// Canvas

const canvas = document.querySelector('.webgl');

// Orbit controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(size.width, size.height);

// Group

const group = new THREE.Group();
group.scale.y = 0.8;
scene.add(group);

// Object

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)

// console.log(cube.position.length());
// console.log(cube.position.distanceTo(camera.position));

// cube.scale.x = 0.5;
// cube.scale.y = 2;
// cube.scale.z = 0.25;

cube.position.x = -2;
cube.rotation.x = Math.PI * 0.25;
cube.rotation.y = Math.PI * 0.25;

// scene.add(cube);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'blue', wireframe: true})
)
cube2.position.x = 0;
cube2.rotation.y = Math.PI * 0.25;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
cube3.position.x = 2;
cube3.rotation.y = Math.PI;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({color: 'white', wireframe: true})
)
sphere.position.set(-1, -1.5, 0);

// Creating own Buffer Geometry (triangle)

const geometry = new THREE.BufferGeometry();
// add vertices with Float32Array
const positionArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
]);
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute('position', positionAttribute);

const triangle = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true})
);
triangle.position.set(0, 1, 0);

group.add(cube);
group.add(cube2);
group.add(cube3);
group.add(sphere);
group.add(triangle);
// camera.lookAt(new THREE.Vector3(0, 1, 0));

// Axes Helper

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);


// Animate 

let time = Date.now();
const clock = new THREE.Clock();

// GSAP

gsap.to(sphere.position, {
    duration: 1,
    delay: 1,
    x: 1,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
})

// GSAP END

const tick = () => {

    window.requestAnimationFrame(tick);

    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    // clock
    const elapsedTime = clock.getElapsedTime();

    cube.rotation.x += 0.01 * deltaTime;
    // cube2.rotation.y = elapsedTime;
    // cube2.position.y = Math.cos(elapsedTime);
    cube3.rotation.z += 0.01;
    cube3.position.z = Math.sin(elapsedTime);

    // Animate camera position

    // camera.position.y = Math.sin(elapsedTime);
    // camera.lookAt(group.position);    

    // Control camera position with mouse (multiplying * 2 for more camera amplitude)

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2; 
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2; 
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(cube2.position);

    controls.update();

    renderer.render(scene, camera);
} 

tick();



