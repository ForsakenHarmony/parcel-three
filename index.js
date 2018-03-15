import { PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer } from 'three';

let frame = null;
let renderer = null;

function init() {

  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  const scene = new Scene();

  const geometry = new BoxGeometry(0.2, 0.2, 0.3);
  const material = new MeshNormalMaterial();

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function animate() {
    frame = requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
  }

  animate();
}

if (module.hot) {
  module.hot.dispose(function () {
    // module is about to be replaced
    cancelAnimationFrame(frame);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.context=undefined;
    renderer.domElement=undefined;
    document.getElementsByTagName('canvas')[0].remove();
  });

  module.hot.accept(function () {
    // module or one of its dependencies was just updated
    // cancelAnimationFrame(frame);
    document.getElementsByTagName('canvas')[0].remove();
    init();
  });
}

init();
