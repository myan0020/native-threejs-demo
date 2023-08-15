import "./index.css";

import * as THREE from "three";
import GUI from "lil-gui";

const objects = [];

function resizeRendererToDisplaySize(renderer) {
  const canvasElement = renderer.domElement;

  const pixelRatio = window.devicePixelRatio;

  const width = (canvasElement.clientWidth * pixelRatio * 10) | 0;
  const height = (canvasElement.clientHeight * pixelRatio) | 0;
  const needResize = canvasElement.width !== width || canvasElement.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function main() {
  const canvasElement = document.getElementById("c");
  canvasElement.width = 500;
  canvasElement.height = 250;

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasElement });

  const gui = new GUI();

  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 30, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 5;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const sumMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sumMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);
  objects.push(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, "visible").name(label);
  }

  makeAxisGrid(solarSystem, "solarSystem", 25);
  makeAxisGrid(sunMesh, "sunMesh");
  makeAxisGrid(earthOrbit, "earthOrbit");
  makeAxisGrid(earthMesh, "earthMesh");
  makeAxisGrid(moonOrbit, "moonOrbit");
  makeAxisGrid(moonMesh, "moonMesh");

  function render(performanceTime) {
    const seconds = performanceTime * 0.001;

    // renderer.setPixelRatio(window.devicePixelRatio);

    if (resizeRendererToDisplaySize(renderer)) {
      const canvasElement = renderer.domElement;
      camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
      camera.updateProjectionMatrix();
    }

    // objects.forEach((obj, index) => {
    //   const speed = 1 + index * 0.1;
    //   const rot = seconds * speed;
    //   obj.rotation.y = rot;
    // });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(grid);

    this.axes = axes;
    this.grid = grid;
    this.visible = false;
  }

  get visible() {
    return this._visible;
  }

  set visible(v) {
    this._visible = v;
    this.axes.visible = v;
    this.grid.visible = v;
  }
}

main();

// Renderring this react root component into DOM
// as a child element of a div with the id of 'root'
// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
// // ReactDOM.render(<App />, container)
// root.render(<React.StrictMode>{/* <App /> */}</React.StrictMode>);
