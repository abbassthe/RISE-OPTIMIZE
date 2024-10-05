// @ts-nocheck
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
class Orbit extends OrbitControls {
  public enablePan: boolean;
  public enableZoom: boolean;
  public minDistance: number;
  public maxDistance: number;
  public autoRotateSpeed: number;
  public autoRotate: boolean;
  public minPolarAngle: number;
  public maxPolarAngle: number;
  update(): any {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(camera: PerspectiveCamera, canvas?: HTMLCanvasElement) {
    super(camera, canvas);
  }

  tick = () => this.update();
}

export { Orbit };
