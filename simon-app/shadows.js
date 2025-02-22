import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debag
 */

const gui = new GUI();

/**
 * Scene
 */
const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');
const size = {
    width: window.innerWidth,
    height: innerHeight
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
camera.position.set(1, 1, 2);
scene.add(camera);

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
bakedShadow.colorSpace = THREE.SRGBColorSpace;
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg');

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
directionalLight.position.set(2, 2, - 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = - 2;
directionalLight.shadow.camera.left = - 2;
// directionalLight.shadow.radius = 10;
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionalLightHelper.visible = false;
scene.add(directionalLight, directionalLightHelper);

const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLight, spotLight.target, spotLightCameraHelper);

const pointLight = new THREE.PointLight(0xffffff, 2.7);
pointLight.castShadow = true;
pointLight.position.set( -1, 1, 0);
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false;
scene.add(pointLight, pointLightCameraHelper);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Controls
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Objects
 */

const material = new THREE.MeshStandardMaterial({
    roughness: 0.7
});
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    // new THREE.MeshBasicMaterial({
    //     map: bakedShadow
    // })
    material
);
plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.5;

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
);
sphereShadow.rotation.x = - Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01


scene.add(sphere, sphereShadow, plane);

/**
 * GUI
 */

gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001);
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);
gui.add(material, 'metalness').min(0).max(1).step(0.001);

/**
 * Shadows
 */

sphere.castShadow = true;
plane.receiveShadow = true;

/**
 * Animation
 */

const clock = new THREE.Clock();

function animate() {

    const elapsedTime = clock.getElapsedTime();
    window.requestAnimationFrame(animate);

    /**
     * Jumping around ball
     */

    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    /**
     * Update sphere shadow
     */

    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;

    controls.update();

    renderer.render(scene, camera);
    
}

animate();