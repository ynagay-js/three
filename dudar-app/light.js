import * as THREE from 'three';

const scene = new THREE.Scene();

//light
// const light = new THREE.AmbientLight('white', 1);
// scene.add(light);

// const directLight = new THREE.DirectionalLight('white', 0.5);
// directLight.position.set(5, 5, 5);
// scene.add(directLight);

// const pointLight = new THREE.PointLight('blue', 10, 100);
// pointLight.position.set(0.5, 1, 1);
// scene.add(pointLight);


//visualization light source
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
// scene.add(pointLightHelper);

const spotLight = new THREE.SpotLight('pink', 1);
spotLight.position.set(1, 1, 1);
scene.add(spotLight);

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

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color : 'red'});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();