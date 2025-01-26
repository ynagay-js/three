import * as THREE from 'three'


// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;

// create rendered for scene
const renderer = new THREE.WebGLRenderer();

// view all of a browser window
renderer.setSize(window.innerWidth, window.innerHeight);

// add renderer to html body output as html tag (domElement)
document.body.appendChild(renderer.domElement);

// create figure
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 'green'});
const cube = new THREE.Mesh(geometry, material);

// add figure on scene
scene.add(cube);

// ongoing render

function animate() {
    requestAnimationFrame(animate); //continuous function call

    // figure rotate animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

//manual function call
animate();