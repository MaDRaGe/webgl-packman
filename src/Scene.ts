import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";
import { glm } from "./glm";
import GL from "./GL";
import Light from "./Light";
import { shaderProgram, gameObjects, Player, texture } from "./data";
import Camera from "./Camera";
import GameObject from "./GameObject";

class Scene {
  private objects: GraphicObject[] = [];
  private meshes: Mesh[] = [];
  private light: Light = new Light();
  private camera: Camera = new Camera();

  /*
    Constructor

    @param domSelector - determines a selector of the canvas
  */
  constructor() {}

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

    // Texture
    texture.apply()
    shaderProgram.setUniform1i('uTexture', 0);

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

    /*
    shaderProgram.setUniformMatrix4fv("u_MMatrix", Player.getModelMatrix());
    let MVMatrix = glm.m4.multiply(this.camera.getViewMatrix(), Player.getModelMatrix())
    let NMatrix = glm.transpose(glm.m4.inverse(MVMatrix));
    shaderProgram.setUniformMatrix4fv("u_NMatrix", NMatrix);
    Player.draw();*/
    
    this.angle += 0.1;
  }
}

export default Scene;
