import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { RGBELoader } from './node_modules/three/examples/jsm/loaders/RGBELoader'

/**
 * Debug
 */
const gui = new GUI();


const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.set(1, 1, 2);
scene.add(camera);

/**
 * Light
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLight);
// scene.add(pointLightHelper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/static/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/static/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/static/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/static/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/static/textures/matcaps/8.png');
const gradientTexture = textureLoader.load('/static/textures/gradients/5.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Environment loader
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load('/static/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
})

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.FrontSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;


// MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.map = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandartMaterial
// const material = new THREE.MeshStandardMaterial();
const material = new THREE.MeshPhysicalMaterial();
material.roughness = 0;
material.metalness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// MeshPhysicalMaterial
// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;
// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);
// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];
// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;



gui.add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.0001);

gui.add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.0001);

gui.add(material, 'clearcoat')
    .min(0)
    .max(1)
    .step(0.0001);

gui.add(material, 'clearcoatRoughness')
    .min(0)
    .max(1)
    .step(0.0001);

gui.add(material, 'sheen')
    .min(0)
    .max(1)
    .step(0.0001);

gui.add(material, 'sheenRoughness')
    .min(0)
    .max(1)
    .step(0.0001);

gui.addColor(material, 'sheenColor');

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const clock = new THREE.Clock();

function animate() {

    const elapsedTime = clock.getElapsedTime();

    window.requestAnimationFrame(animate);

    sphere.rotation.x = - 0.15 * elapsedTime;
    plane.rotation.x = - 0.15 * elapsedTime;
    torus.rotation.x = - 0.15 * elapsedTime;

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    controls.update();
  
    renderer.render(scene, camera);
}

animate();
