import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

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
camera.position.set(1, 1, 3);
scene.add(camera);

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
directionalLight.position.set(1, 0,25, 0);
scene.add(directionalLight, directionalLightHelper);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLight, hemisphereLightHelper);

const pointLight = new THREE.PointLight(0xff9000, 1.5, 0, 2);
pointLight.position.x = 1;
pointLight.position.y = - 0.5;
pointLight.position.z = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLight, pointLightHelper);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(- 1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLight, rectAreaLightHelper);

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1);
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = - 0.75; // rotation
scene.add(spotLight, spotLightHelper);
scene.add(spotLight.target);

// gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);

/**
 * Controls
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Objects
 */

const material = new THREE.MeshStandardMaterial({
    roughness: 0.4
});
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);
plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.65
;

scene.add(sphere, cube, torus, plane);

/**
 * Animation
 */

const clock = new THREE.Clock();

function animate() {

    const elapsedTime = clock.getElapsedTime();
    window.requestAnimationFrame(animate);

    sphere.rotation.x = elapsedTime * 0.15;
    cube.rotation.x = elapsedTime * 0.15;
    torus.rotation.x = elapsedTime * 0.15;

    sphere.rotation.y = elapsedTime * 0.1;
    cube.rotation.y = elapsedTime * 0.1;
    torus.rotation.y = elapsedTime * 0.1;


    controls.update();

    renderer.render(scene, camera);
    
}

animate();