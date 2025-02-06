import * as THREE from 'three'

// Scene

const scene = new THREE.Scene();

// Camera

const size = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height
);
camera.position.z = 3;

scene.add(camera);

// Canvas

const canvas = document.querySelector('.webgl');

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(size.width, size.height);

// Object

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)

scene.add(cube);

renderer.render(scene, camera);

