import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";
import { glm } from "./glm";
import GL from "./GL";
import Light from "./Light";
import { shaderProgram } from "./data";

type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};

class Scene {
  private objects: GraphicObject[] = [];
  private meshes: Mesh[] = [];
  private cameraDist: number = 0;
  private xRotate: number = 0;
  private yRotate: number = 0;
  private zRotate: number = 0;
  private light: Light = new Light();

  /*
    Constructor

    @param domSelector - determines a selector of the canvas
  */
  constructor() {
    this.cameraDist = <number><unknown>(<HTMLInputElement>document.querySelector("#cameraDist")).value
    document.querySelector("#cameraDist")?.addEventListener("input", (event) => {
      this.cameraDist = <number><unknown>(<HTMLInputElement>event.target).value;
    });
    document.querySelector("#xRotate")?.addEventListener("input", (event) => {
      this.xRotate = <number><unknown>(<HTMLInputElement>event.target).value;
    });
    document.querySelector("#yRotate")?.addEventListener("input", (event) => {
      this.yRotate = <number><unknown>(<HTMLInputElement>event.target).value;
    });
    document.querySelector("#zRotate")?.addEventListener("input", (event) => {
      this.zRotate = <number><unknown>(<HTMLInputElement>event.target).value;
    });
  }

  public addMesh(mesh: Mesh): void {
    this.meshes.push(mesh);
  }

  public addObject(object: GraphicObject): void {
    this.objects.push(object);
  }

  angle = 0.1;
  init = true;
  public draw(): void {
    const gl = GL.getGL();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.1, 0.1, 0.5, 0.9);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    this.light.apply();
    // gluPerspective
    const aspect = gl.canvas.width / gl.canvas.height;
    const zNear = 1;
    const zFar = 2000;
    let pMatrix = glm.m4.perspective(45, aspect, zNear, zFar);
    shaderProgram.setUniformMatrix4fv("u_PMatrix", pMatrix);

    // View matrix
    let cameraMatrix = glm.m4.yRotation(0);
    cameraMatrix = glm.m4.translate(cameraMatrix, 0, 0, this.cameraDist * 1.5);
    let viewMatrix = glm.m4.inverse(cameraMatrix);
    viewMatrix = glm.m4.xRotate(viewMatrix, this.xRotate);
    viewMatrix = glm.m4.yRotate(viewMatrix, this.yRotate);
    viewMatrix = glm.m4.zRotate(viewMatrix, this.zRotate);
    shaderProgram.setUniformMatrix4fv("u_VMatrix", viewMatrix);

    this.objects[4].setAngle(this.angle);
    shaderProgram.setUniformMatrix4fv("u_MMatrix", this.objects[4].getModelMatrix());

    let MVMatrix = glm.m4.multiply(viewMatrix, this.objects[4].getModelMatrix())
    let NMatrix = glm.transpose(glm.m4.inverse(MVMatrix));
    shaderProgram.setUniformMatrix4fv("u_NMatrix", NMatrix);

    // Draw objects
    this.objects[4].draw();
    /*this.objects.forEach((object: GraphicObject) => {
      // Move object
      object.setAngle(this.angle);
      shaderProgram.setUniformMatrix4fv("u_MMatrix", object.getModelMatrix());

      let MVMatrix = glm.m4.multiply(viewMatrix, object.getModelMatrix())
      let NMatrix = glm.transpose(glm.m4.inverse(MVMatrix));
      shaderProgram.setUniformMatrix4fv("u_NMatrix", NMatrix);

      // Draw objects
      object.draw();
    })*/

    requestAnimationFrame(this.draw.bind(this));
  }
}

export default Scene;
