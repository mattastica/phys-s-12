// Interactive .stl viewer. Usage: <div class="stl-viewer" data-src="./path/to/model.stl"></div>
// Requires an importmap for 'three' and 'three/addons/' (see 05_3Dprinting/index.html).
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function initViewer(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
  keyLight.position.set(1, 1, 1);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(-1, 0.5, -1);
  scene.add(rimLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;
  controls.enablePan = false;
  // don't hijack the page's scroll wheel until the viewer is engaged
  controls.enableZoom = false;
  renderer.domElement.addEventListener('pointerdown', () => { controls.enableZoom = true; });
  container.addEventListener('pointerleave', () => { controls.enableZoom = false; });

  new STLLoader().load(container.dataset.src, onLoad, undefined, (err) => {
    container.dataset.loading = 'Failed to load model';
    console.error('stl-viewer: could not fetch', container.dataset.src, err);
  });

  function onLoad(geometry) {
    geometry.computeVertexNormals();
    geometry.center();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: 0xcfc6b8, // plaster
      roughness: 0.7,
      metalness: 0.05,
    }));
    if (container.dataset.zUp !== undefined) mesh.rotation.x = -Math.PI / 2; // opt-in for Z-up STLs
    scene.add(mesh);

    const size = new THREE.Box3().setFromObject(mesh).getSize(new THREE.Vector3()).length();
    camera.near = size / 100;
    camera.far = size * 10;
    camera.position.set(0, size * 0.15, size * 0.9);
    camera.updateProjectionMatrix();
    controls.minDistance = size * 0.4; // zoom can never enter the mesh
    controls.maxDistance = size * 2.5;
    controls.update();
    container.classList.add('loaded');
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
}

document.querySelectorAll('.stl-viewer[data-src]').forEach(initViewer);
