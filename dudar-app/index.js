import * as THREE from 'three'


// create scene
const scene = new THREE.Scene();

//light
// const ambientLight = new THREE.AmbientLight('red', 0.5);
// scene.add(ambientLight);


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

// create texture

const texture = new THREE.TextureLoader().load('img/ducks.jpg');
const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

// create cube figure
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial(textureMaterial);
const cube = new THREE.Mesh(geometry, material);

// position cube on scene
cube.position.set(-3, 0, 0);

// add cube on scene
scene.add(cube);

//create sphere figure
const sphereGeometry = new THREE.SphereGeometry(0.6, 40, 40);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 'blue',
    emissive: 'white',
    shininess: 100
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// position sphere on scene
sphere.position.set(3, 0, 0);

// add sphere on scene
scene.add(sphere);

//create torus figure

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({color: 'green'})
);

// position torus on scene
torus.position.set(0, 1.5, -1);

// add torus on scene
scene.add(torus);

//create plane figure
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    textureMaterial
);

plane.position.set(0, -2, 0);
scene.add(plane);


// ongoing render

function animate() {
    requestAnimationFrame(animate); //continuous function call

    // cube rotate animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // sphere rotate animation
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // torus rotate animation
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// manual function call
animate();