import Camera from "./Camera";
import Light from "./Light";

type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};

class GL {
  private light: Light = new Light();
  private camera: Camera = new Camera();

  private gl: WebGLRenderingContext = <WebGLRenderingContext>
    document.createElement("canvas").getContext("webgl");
  
  private shaderProgram: WebGLProgram = <WebGLProgram>this.gl.createProgram();

  constructor(canvasDOMSelector: string) {
    const scene = <HTMLCanvasElement>document.querySelector(canvasDOMSelector);
    if (scene) {
      this.gl = <WebGLRenderingContext>scene.getContext("webgl") 
        || scene.getContext("experimental-webgl");
    }
  }

  public setShaderProgram(shaderProgram: WebGLProgram): void {
    this.shaderProgram = shaderProgram;
  }

  public setUniform(uniformName: string): void {}

  public getGL(): WebGLRenderingContext {
    return this.gl;
  }
}
export default GL;