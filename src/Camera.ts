import { glm } from "./glm";

class Camera {
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private horizRotateAngle: number = 0;
  private vertRotateAngle: number = 45;
  private distanceToCenter: number = 20;
  private projectionMatrix: number[] = [];
  private keysPressed: { [key: string]: boolean } = {};

  constructor() {
    this.calcPosition();
    
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      this.keysPressed[event.code] = true;
      if (this.keysPressed["Space"]) {
        setTimeout(() => {
          this.zoom(1);
        }, 10);
      }
      if (this.keysPressed["KeyD"]) {
        setTimeout(() => {
          this.rotateHoriz(-5);
        }, 10)
      }
      if (this.keysPressed["KeyA"]) {
        setTimeout(() => {
          this.rotateHoriz(5);
        }, 10)
      }
    })
    document.addEventListener("keyup", (event) => {
      delete this.keysPressed[event.code];
    })
  
  }


  public setProjectionMatrix(fovy: number, aspect: number, zNear: number, zFar: number): void {
    this.projectionMatrix = glm.m4.perspective(fovy, aspect, zNear, zFar);
  }

  public getProjectionMatrix(): number[] {
    return this.projectionMatrix;
  }

  public getViewMatrix(): number[] {
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