import Mesh from "./Mesh";
import { glm } from "./glm";

class GraphicObject {
  private mesh: Mesh | null;
  private angle: number = 0;
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private modelMatrix: number[] = [];

  constructor(mesh: Mesh = new Mesh(), angle: number = 0, position: glm.vec3 = new glm.vec3(0, 0, 0)) {
    this.mesh = mesh;
    this.angle = angle;
    this.position = position;
    this.modelMatrix = new Array(16).fill(0);
    this.modelMatrix[0] = 1;
    this.modelMatrix[5] = 1;
    this.modelMatrix[10] = 1;
    this.modelMatrix[15] = 1;
    this.calcModelMatrix();
  }

  public draw(): void {
    this.mesh?.draw();
  }

  public setMesh(mesh: Mesh): void {
    this.mesh = mesh;
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

  private calcModelMatrix(): void {
    this.modelMatrix[0] = Math.cos(glm.radToDeg(this.angle));
    this.modelMatrix[2] = Math.sin(glm.radToDeg(this.angle));

    this.modelMatrix[8] = -Math.sin(glm.radToDeg(this.angle));
    this.modelMatrix[10] = Math.cos(glm.radToDeg(this.angle));

    this.modelMatrix[12] = this.position.x;
    this.modelMatrix[13] = this.position.y;
    this.modelMatrix[14] = this.position.z;
  }

  public getModelMatrix(): number[] {
    return this.modelMatrix;
  }
}

export default GraphicObject;
