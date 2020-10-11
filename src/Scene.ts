import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";
import { glm } from "./glm";

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

  private scene: HTMLCanvasElement = <HTMLCanvasElement>(
    document.createElement("canvas")
  );

  private gl: WebGLRenderingContext = <WebGLRenderingContext>(
    this.scene.getContext("webgl")
  );

  private shaderProgram: WebGLProgram = <WebGLProgram>this.gl.createProgram();

  private shaders: ShaderArray = {
    vertex: <WebGLShader>this.gl.createShader(this.gl.VERTEX_SHADER),
    fragment: <WebGLShader>this.gl.createShader(this.gl.FRAGMENT_SHADER),
  };

  /*
    Constructor

    @param domSelector - determines a selector of the canvas
  */
  constructor(domSelector: String) {
    this.scene = <HTMLCanvasElement>document.querySelector(`${domSelector}`);
    if (this.scene) {
      this.gl =
        <WebGLRenderingContext>this.scene.getContext("webgl") ||
        this.scene.getContext("experimental-webgl");
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
  }

  public addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  angle = 0.1;
  public draw() {
    /*this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.shaderProgram);

    // gluPerspective
    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 1;
    const zFar = 2000;
    let pMatrix = glm.m4.perspective(10, aspect, zNear, zFar);
    this.gl.uniformMatrix4fv(this.PMatrix,false, pMatrix);

    // View matrix
    let cameraMatrix = glm.m4.yRotation(0);
    cameraMatrix = glm.m4.translate(cameraMatrix, 0, 0, this.cameraDist * 1.5);
    let viewMatrix = glm.m4.inverse(cameraMatrix);
    //let viewProjectionMatrix = glm.m4.multiply(matrix, viewMatrix);
    const matrixLocation = this.gl.getUniformLocation(this.shaderProgram, "u_matrix");
    const projectionMatrix = glm.projection(this.gl.canvas.width, this.gl.canvas.height);

    // Move object
    let MVMatrix = glm.m4.translate(viewMatrix, 0, 0, 0);
    MVMatrix = glm.m4.yRotate(MVMatrix, this.angle);
    this.angle += 0.1;
    MVMatrix = glm.m4.xRotate(MVMatrix, this.xRotate);
    MVMatrix = glm.m4.zRotate(MVMatrix, this.zRotate);
    this.gl.uniformMatrix4fv(this.MVMatrix, false, MVMatrix);

    let NMatrix = glm.transpose(glm.m4.inverse(MVMatrix));
    this.gl.uniformMatrix4fv(this.NMatrix, false, NMatrix);

    // Set attributes
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshes[0].getArrayBuffer());
    this.gl.vertexAttribPointer(
      this.vertexPosAttr,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshes[0].getNormalCoordBuffer());
    this.gl.vertexAttribPointer(
      this.vertexNormalAttr,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshes[0].getTexCoordBuffer());
    this.gl.vertexAttribPointer(
      this.vertexTextureAttr,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    // Draw objects
    this.meshes[0].draw(this.gl);
    requestAnimationFrame(this.draw.bind(this));*/
  }

  public getGl(): WebGLRenderingContext {
    return this.gl;
  }
}

export default Scene;
