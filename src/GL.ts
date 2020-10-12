import Camera from "./Camera";
import Light from "./Light";
import Shader from "./Shader";
import ShaderProgram from "./ShaderProgram";

type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};

class GL {
  private light: Light = new Light();
  private camera: Camera = new Camera();

  private gl: WebGLRenderingContext = <WebGLRenderingContext>
    document.createElement("canvas").getContext("webgl");
  
  //private shaderProgram: ShaderProgram = new ShaderProgram();

  public init(canvasDOMSelector: string): void {
    const scene = <HTMLCanvasElement>document.querySelector(canvasDOMSelector);
    if (scene) {
      this.gl = <WebGLRenderingContext>scene.getContext("webgl") 
        || scene.getContext("experimental-webgl");
      //this.shaderProgram = new ShaderProgram();
    }
  }
/*
  public setShaderProgram(shaderProgram: ShaderProgram): void {
    this.shaderProgram = shaderProgram;
  }

  public setUniform3fv(uniformName: string, value: number[]): void {
    this.shaderProgram.setUniform3fv(uniformName, value);
  }

  public setUniformMatrix4fv(uniformName: string, value: number[]): void {
    this.shaderProgram.setUniformMatrix4fv(uniformName, value);
  }

  public getVertexAttr(name: string): number {
    return this.shaderProgram.getVertexAttr(name);
  }*/

  public getGL(): WebGLRenderingContext {
    return this.gl;
  }
}

const gl: GL = new GL();
export default gl;