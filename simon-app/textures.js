import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const canvas = document.querySelector('.webgl');

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.z = 3;
scene.add(camera);

const light = new THREE.AmbientLight('white', 50);
scene.add(light);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;



const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Native JS Texture Load

/* const image = new Image();
const texture = new THREE.Texture(image);
texture.colorSpace = THREE.SRGBColorSpace;

image.addEventListener('load', () => {
    texture.needsUpdate = true;
})
image.src = '/static/textures/door/color.jpg'; */

// TextureLoader

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>
    {
        console.log('loading started')
    }
    loadingManager.onLoad = () =>
    {
        console.log('loading finished')
    }
    loadingManager.onProgress = () =>
    {
        console.log('loading progressing')
    }
    loadingManager.onError = () =>
    {
        console.log('loading error')
    }
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/static/textures/door/color.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.repeat.x = 2;
// texture.repeat.y = 3;

// offcet uv coordinates
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

// rotate texture
texture.rotation = Math.PI * 0.5;
texture.center.x = 0.5;
texture.center.y = 0.5;


const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.ConeGeometry(1, 1, 32);
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);

// console.log(geometry.attributes.uv);


const cube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({map: texture, wireframe: false})
)
scene.add(cube);


function animate() {

    window.requestAnimationFrame(animate);

    controls.update();
  
    renderer.render(scene, camera);
}

animate();
