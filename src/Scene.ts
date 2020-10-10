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

  /*
    Initialize vertex or fragment shader

    @param type - means the type of the creating shader ("vertex" or "fragment")
    @param sourceDom - means the script tag selector which contains shader's code
    @return true - if the shader was initialized successefuly
            false - otherwise
  */
  public initShader(type: "vertex" | "fragment", sourceDom: String): Boolean {
    if (type === "vertex") {
      this.shaders[type] = <WebGLShader>(
        this.gl?.createShader(this.gl.VERTEX_SHADER)
      );
    } else {
      this.shaders[type] = <WebGLShader>(
        this.gl?.createShader(this.gl.FRAGMENT_SHADER)
      );
    }
    this.gl?.shaderSource(
      this.shaders[type],
      document.querySelector(`${sourceDom}`)?.textContent || ""
    );
    this.gl.compileShader(this.shaders[type]);
    if (
      this.gl.getShaderParameter(this.shaders[type], this.gl.COMPILE_STATUS)
    ) {
      return true;
    }
    console.log(this.gl.getShaderInfoLog(this.shaders[type]));
    return false;
  }

  private vertexPosAttr: number = 0;
  private vertexTextureAttr: number = 0;
  private vertexNormalAttr: number = 0;
  private MVMatrix:any = null;
  private PMatrix:any = null;
  private NMatrix:any = null;
  private lightPosition:any = null;
  private ambient:any = null;
  private diffuse:any = null;
  private specular:any = null;
  public initShaderProgram(): Boolean {
    this.shaderProgram = <WebGLProgram>this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, this.shaders.vertex);
    this.gl.attachShader(this.shaderProgram, this.shaders.fragment);
    this.gl.linkProgram(this.shaderProgram);
    if (this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      this.gl.useProgram(this.shaderProgram);  
      this.vertexPosAttr = this.gl.getAttribLocation(this.shaderProgram, "a_vertexPosition");
      this.gl.enableVertexAttribArray(this.vertexPosAttr);
      this.vertexTextureAttr = this.gl.getAttribLocation(this.shaderProgram, "a_vertexTextureCoords");
      this.gl.enableVertexAttribArray(this.vertexTextureAttr);
      this.vertexNormalAttr = this.gl.getAttribLocation(this.shaderProgram, "a_vertexNormal");
      this.gl.enableVertexAttribArray(this.vertexNormalAttr);
      console.log(this.vertexPosAttr, this.vertexTextureAttr, this.vertexNormalAttr);
      this.MVMatrix = this.gl.getUniformLocation(this.shaderProgram, "u_MVMatrix");
      this.PMatrix = this.gl.getUniformLocation(this.shaderProgram, "u_PMatrix");
      this.NMatrix = this.gl.getUniformLocation(this.shaderProgram, "u_NMatrix");
      this.lightPosition = this.gl.getUniformLocation(this.shaderProgram, "u_lightPosition");
      this.ambient = this.gl.getUniformLocation(this.shaderProgram, "u_ambientLightColor");
      this.diffuse = this.gl.getUniformLocation(this.shaderProgram, "u_diffuseLightColor");
      this.specular = this.gl.getUniformLocation(this.shaderProgram, "u_specularLightColor");
      this.gl.uniform3fv(this.lightPosition, [0.0, 10.0, 5.0]);
      this.gl.uniform3fv(this.ambient, [0.1, 0.1, 0.1]);
      this.gl.uniform3fv(this.diffuse, [0.7, 0.7, 0.7]);
      this.gl.uniform3fv(this.specular, [1.0, 1.0, 1.0]);
      this.gl.uniformMatrix4fv(this.PMatrix,false, []);
      this.gl.uniformMatrix4fv(this.MVMatrix, false, []);
      this.gl.uniformMatrix3fv(this.NMatrix, false, []);
      return true;
    }
    console.log(this.gl.getProgramInfoLog(this.shaderProgram));
    return false;
  }

  public addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  angle = 0.1;
  public draw() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.shaderProgram);

    const aspect = this.gl.canvas.width / this.gl.canvas.height;
    const zNear = 1;
    const zFar = 2000;
    let matrix = glm.m4.perspective(10, aspect, zNear, zFar);

    let cameraMatrix = glm.m4.yRotation(0);
    cameraMatrix = glm.m4.translate(cameraMatrix, 0, 0, this.cameraDist * 1.5);

    let viewMatrix = glm.m4.inverse(cameraMatrix);
    
    let viewProjectionMatrix = glm.m4.multiply(matrix, viewMatrix);

    const matrixLocation = this.gl.getUniformLocation(this.shaderProgram, "u_matrix");

    const projectionMatrix = glm.projection(this.gl.canvas.width, this.gl.canvas.height);
    matrix = glm.m4.translate(viewProjectionMatrix, 0, 0, 0);
    matrix = glm.m4.yRotate(matrix, this.angle);
    this.angle += 0.1;
    matrix = glm.m4.xRotate(matrix, this.xRotate);
    matrix = glm.m4.zRotate(matrix, this.zRotate);
    this.gl.uniformMatrix4fv(matrixLocation, false, matrix);

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

    this.meshes[0].draw(this.gl);

    requestAnimationFrame(this.draw.bind(this));
  }

  public getGl(): WebGLRenderingContext {
    return this.gl;
  }
}

export default Scene;
