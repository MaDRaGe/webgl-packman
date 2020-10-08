import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";

type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};

class Scene {
  private objects: GraphicObject[] = [];
  private meshes: Mesh[] = [];

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

  public initShaderProgram(): Boolean {
    this.shaderProgram = <WebGLProgram>this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, this.shaders.vertex);
    this.gl.attachShader(this.shaderProgram, this.shaders.fragment);
    this.gl.linkProgram(this.shaderProgram);
    if (this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      return true;
    }
    console.log(this.gl.getProgramInfoLog(this.shaderProgram));
    return false;
  }

  public addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  public draw() {
    const resolUniformLocation = this.gl.getUniformLocation(
      this.shaderProgram,
      "u_resolution"
    );
    this.gl.uniform2f(
      resolUniformLocation,
      this.gl.canvas.width,
      this.gl.canvas.height
    );
    const posAttribLocation = this.gl.getAttribLocation(
      this.shaderProgram,
      "a_position"
    );
    this.gl.enableVertexAttribArray(posAttribLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshes[0].getArrayBuffer());
    this.gl.vertexAttribPointer(
      posAttribLocation,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    this.gl.useProgram(this.shaderProgram);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.meshes[0].draw(this.gl);
    //this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

    requestAnimationFrame(this.draw.bind(this));
  }

  public getGl(): WebGLRenderingContext {
    return this.gl;
  }
}

export default Scene;
