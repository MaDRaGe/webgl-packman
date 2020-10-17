import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";
import { glm } from "./glm";
import GL from "./GL";
import Light from "./Light";
import { shaderProgram, gameObjects } from "./data";
import Camera from "./Camera";
import GameObject from "./GameObject";

class Scene {
  private objects: GraphicObject[] = [];
  private meshes: Mesh[] = [];
  private light: Light = new Light();
  private camera: Camera = new Camera();
  private keysPressed: { [key: string]: boolean } = {};

  /*
    Constructor

    @param domSelector - determines a selector of the canvas
  */
  constructor() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      this.keysPressed[event.code] = true;
      if (this.keysPressed["Space"]) {
        setTimeout(() => {
          this.camera.zoom(1);
        }, 10);
      }
      if (this.keysPressed["KeyD"]) {
        setTimeout(() => {
          this.camera.rotateHoriz(-5);
        }, 10)
      }
      if (this.keysPressed["KeyA"]) {
        setTimeout(() => {
          this.camera.rotateHoriz(5);
        }, 10)
      }
    })
    document.addEventListener("keyup", (event) => {
      delete this.keysPressed[event.code];
    })
  }

  public simulate() {

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
    this.camera.setProjectionMatrix(45, gl.canvas.width / gl.canvas.height, 1, 2000);
    shaderProgram.setUniformMatrix4fv("u_PMatrix", this.camera.getProjectionMatrix());

    // View matrix
    shaderProgram.setUniformMatrix4fv("u_VMatrix", this.camera.getViewMatrix());

    // Draw objects
    gameObjects.forEach((gameObject: GameObject) => {
      shaderProgram.setUniformMatrix4fv("u_MMatrix", gameObject.getModelMatrix());

      let MVMatrix = glm.m4.multiply(this.camera.getViewMatrix(), gameObject.getModelMatrix())
      let NMatrix = glm.transpose(glm.m4.inverse(MVMatrix));
      shaderProgram.setUniformMatrix4fv("u_NMatrix", NMatrix);

      // Draw object
      gameObject.draw();
    })

    this.angle += 0.1;
  }
}

export default Scene;
