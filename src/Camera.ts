import { glm } from "./glm";
import gl from "./GL";

class Camera {
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private horizRotateAngle: number = -90;
  private vertRotateAngle: number = 45;
  private distanceToCenter: number = 20;
  private projectionMatrix: number[] = [];

  constructor() {
    this.calcPosition();
  }


  public setProjectionMatrix(fovy: number, aspect: number, zNear: number, zFar: number): void {
    this.projectionMatrix = glm.m4.perspective(fovy, aspect, zNear, zFar);
  }

  public getProjectionMatrix(): number[] {
    return this.projectionMatrix;
  }

  public getViewMatrix(): number[] {
    console.log(this.position)
    return glm.m4.inverse(glm.lookAt(this.position, new glm.vec3(0, 0, 0), new glm.vec3(0, 1, 0)));
  }

  public calcPosition(): void {
    this.position.y = this.distanceToCenter * Math.sin(glm.degToRad(this.vertRotateAngle));
    this.position.x = this.distanceToCenter * Math.cos(glm.degToRad(this.vertRotateAngle)) * Math.cos(glm.degToRad(this.horizRotateAngle));
    this.position.z = this.distanceToCenter * Math.cos(glm.degToRad(this.vertRotateAngle)) * Math.sin(glm.degToRad(this.horizRotateAngle));
  }

  public setPosition(): void {}
  public getPosition(): glm.vec3 { return new glm.vec3(0, 0, 0) }

  public zoom(delta: number): void {
    this.distanceToCenter += delta;
    if (this.distanceToCenter > 100) {
      this.distanceToCenter = 100;
    }
    this.calcPosition();
  }

  public rotateHoriz(angle: number): void {
    this.horizRotateAngle += angle;
    if (this.horizRotateAngle > 360) {
      this.horizRotateAngle -= 360;
    } else {
      this.horizRotateAngle += 360;
    }
    this.calcPosition();
  }

  public apply(): void {}
}

export default Camera;