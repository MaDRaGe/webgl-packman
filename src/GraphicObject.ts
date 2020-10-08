import Mesh from "./Mesh";

class GraphicObject {
  private mesh: Mesh | null;

  constructor(mesh: Mesh) {
    this.mesh = mesh;
  }

  public setMesh(mesh: Mesh): void {
    this.mesh = mesh;
  }

  public getMesh(): Mesh | null {
    return this.mesh;
  }
}

export default GraphicObject;
