import "./index.css";

import GUI from "lil-gui";
import {
  AxesHelper,
  BoxGeometry,
  Color,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";

import { World } from "./World/world";

function main() {
  const container = document.getElementById("container");
  // canvas.width = 500;
  // canvas.height = 250;

  // 1. Create an instance of the World app
  const world = new World(container);
  // 2. Render the scene
  world.render();

  // const canvasRatio = canvas.clientWidth / canvas.clientHeight;

  // // const gui = new GUI();
  // const scene = new Scene();
  // scene.background = new Color("skyblue");

  // // Create a camera
  // const fov = 35; // AKA Field of View
  // const aspect = canvasRatio;
  // const near = 0.1; // the near clipping plane
  // const far = 100; // the far clipping plane
  // const camera = new PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(0, 0, 10);
  // // camera.up.set(0, 0, 1);
  // // camera.lookAt(0, 0, 0);

  // // const color = 0xffffff;
  // // const intensity = 5;
  // // const poinyLight = new PointLight(color, intensity);
  // // scene.add(poinyLight);

  // // create a geometry
  // const geometry = new BoxGeometry(2, 2, 2);
  // // create a default (white) Basic material
  // const material = new MeshBasicMaterial();
  // // create a Mesh containing the geometry and material
  // const cube = new Mesh(geometry, material);
  // // add the mesh to the scene
  // scene.add(cube);

  // const renderer = new WebGLRenderer({ antialias: true, canvas: canvas });

  // function render() {
  //   if (resizeRendererToDisplaySize(renderer)) {
  //     const canvas = renderer.domElement;
  //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //     camera.updateProjectionMatrix();
  //   }

  //   renderer.render(scene, camera);
  //   requestAnimationFrame(render);
  // }
  // requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio * 10) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function makeAxisGrid(node, gui, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, "visible").name(label);
}

class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;
    node.add(axes);

    const grid = new GridHelper(units, units);
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
