import { glm } from "./glm";

class Camera {
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private horizRotateAngle: number = 0;
  private vertRotateAngle: number = 0;
  private distanceToCenter: number = 0;

  public calcPosition() {}
  public setPosition() {}
  public getPosition(): glm.vec3 { return new glm.vec3(0, 0, 0) }

  public apply(gl: WebGLRenderingContext) {}
}

export default Camera;