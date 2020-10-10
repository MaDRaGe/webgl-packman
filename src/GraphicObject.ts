import Mesh from "./Mesh";
import { glm } from "./glm";

class GraphicObject {
  private mesh: Mesh | null;
  private angle: number = 0;
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private modelMatrix: number[] = [];

  constructor(mesh: Mesh, angle: number = 0, position: glm.vec3 = new glm.vec3(0, 0, 0)) {
    this.mesh = mesh;
    this.angle = angle;
    this.position = position;
    this.calcModelMatrix();
  }

  public draw(): void {
    this.mesh?.draw;
  }

  public setMesh(mesh: Mesh): void {
    this.mesh = mesh;
    this.calcModelMatrix();
  }

  public getMesh(): Mesh | null {
    return this.mesh;
  }

  public setAngle(angle: number): void {
    this.angle = angle;
    this.calcModelMatrix();
  }

  public getAngle(): number {
    return this.angle;
  }

  public setPosition(pos: glm.vec3): void {
    this.position = pos;
    this.calcModelMatrix();
  }

  public getPosition(): glm.vec3 {
    return this.position;
  }

  private calcModelMatrix():void {

  }
}

export default GraphicObject;
