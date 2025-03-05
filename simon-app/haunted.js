import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

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
camera.position.set(4, 2, 5);
scene.add(camera);

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

// Floor

const floorAlphaTexture = textureLoader.load('textures/floor/alpha.webp'); 
const floorColorTexture = textureLoader.load('textures/floor/aerial_rocks_02_1k/aerial_rocks_02_diff_1k.webp');
const floorARMTexture = textureLoader.load('textures/floor/aerial_rocks_02_1k/aerial_rocks_02_arm_1k.webp');
const floorNormalTexture = textureLoader.load('textures/floor/aerial_rocks_02_1k/aerial_rocks_02_nor_gl_1k.webp');
const floorDisplacementTexture = textureLoader.load('textures/floor/aerial_rocks_02_1k/aerial_rocks_02_disp_1k.webp');

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Wall

const wallColorTexture = textureLoader.load('textures/wall/red_bricks_02_1k/red_bricks_02_diff_1k.webp');
const wallARMTexture = textureLoader.load('textures/wall/red_bricks_02_1k/red_bricks_02_arm_1k.webp');
const wallNormalTexture = textureLoader.load('textures/wall/red_bricks_02_1k/red_bricks_02_nor_gl_1k.webp');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof

const roofColorTexture = textureLoader.load('textures/roof/roof_3_1k/roof_3_diff_1k.webp');
const roofARMTexture = textureLoader.load('textures/roof/roof_3_1k/roof_3_arm_1k.webp');
const roofNormalTexture = textureLoader.load('textures/roof/roof_3_1k/roof_3_nor_gl_1k.webp');

roofColorTexture.repeat.set(6, 1);
roofARMTexture.repeat.set(6, 1);
roofNormalTexture.repeat.set(6, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

// Bush

const bushColorTexture = textureLoader.load('textures/bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.webp');
const bushARMTexture = textureLoader.load('textures/bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.webp');
const bushNormalTexture = textureLoader.load('textures/bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.webp');

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

// Grave

const graveColorTexture = textureLoader.load('textures/grave/rough_concrete_1k/rough_concrete_diff_1k.webp');
const graveARMTexture = textureLoader.load('textures/grave/rough_concrete_1k/rough_concrete_arm_1k.webp');
const graveNormalTexture = textureLoader.load('textures/grave/rough_concrete_1k/rough_concrete_nor_gl_1k.webp');

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

// Door

const doorColorTexture = textureLoader.load('textures/door/color.webp');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.webp');
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.webp');
const doorHeightTexture = textureLoader.load('textures/door/height.webp');
const doorNormalTexture = textureLoader.load('textures/door/normal.webp');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.webp');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.webp');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, - 8);
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionalLightHelper.visible = false;
scene.add(directionalLight, directionalLightHelper);

const doorLight = new THREE.PointLight('#ff7d46', 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
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

/**
 * Floor
 */

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.4,
        displacementBias: -0.2
    })
);
floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);

/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

// Walls

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
);
walls.position.y = 1.25;
house.add(walls);

// Roof

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: doorAlphaTexture,
        transparent: true,
        map: doorColorTexture,
        aoMap: doorAmbientOcclusionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.05,
        normalMap: doorNormalTexture
    })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
// door.rotation.x =Math.PI * 0.5;
// door.rotation.y =Math.PI * 0.5;
house.add(door);

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#84DB33',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = - 0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = - 0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(- 0.8, 0.1, 2.2);
bush3.rotation.x = - 0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(- 1, 0.05, 2.6);
bush4.rotation.x = - 0.75;

house.add(bush1, bush2, bush3, bush4);

/**
 * Graves
 */
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    color: '#616161',
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
});

for (let i = 0; i < 30; i++) {

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);

    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    grave.position.x = x;
    grave.position.y = Math.random() * 0.4;
    grave.position.z = z;

    grave.rotation.x = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    graves.add(grave);
}

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#ff0000', 6);

scene.add(ghost1, ghost2, ghost3);

/**
 * Shadows
 */

// Cast and receive

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
}

// Mappings
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = - 8;
directionalLight.shadow.camera.left = - 8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */

const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);
sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

/**
 * Fog
 */

// scene.fog = new THREE.Fog('#04343f', 1, 13);
scene.fog = new THREE.FogExp2('#04343f', 0.1);

/**
 * GUI
 */

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale');
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementScale');


/**
 * Animation
 */

const timer = new Timer();

function animate() {

    timer.update();
    const elapsedTime = timer.getElapsed();
    window.requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45);

    const ghost2Angle = - elapsedTime * 0.38;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);

    const ghost3Angle = - elapsedTime * 0.23;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);
    
}

animate();