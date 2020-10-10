import Mesh from "./Mesh";
import { glm } from "./glm";

class GraphicObject {
  private mesh: Mesh | null;
  private angle: number = 0;
  private position: glm.vec3 = new glm.vec3(0, 0, 0);

  constructor(mesh: Mesh, angle: number = 0, position: glm.vec3 = new glm.vec3(0, 0, 0)) {
    this.mesh = mesh;
    this.angle = angle;
    this.position = position;
  }

  public draw(): void {
    this.mesh?.draw;
  }

  public setMesh(mesh: Mesh): void {
    this.mesh = mesh;
  }

  public getMesh(): Mesh | null {
    return this.mesh;
  }

  public setAngle(angle: number): void {
    this.angle = angle;
  }

  public getAngle(): number {
    return this.angle;
  }

  public setPosition(pos: glm.vec3): void {
    this.position = pos;
  }

  public getPosition(): glm.vec3 {
    return this.position;
  }
}

export default GraphicObject;
