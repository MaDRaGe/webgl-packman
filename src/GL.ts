type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};

class GL {
  private simulationFunc: Function = () => {};
  private displayFunc: Function = () => {};

  private gl: WebGLRenderingContext = <WebGLRenderingContext>
    document.createElement("canvas").getContext("webgl");
  
  public init(canvasDOMSelector: string): void {
    const scene = <HTMLCanvasElement>document.querySelector(canvasDOMSelector);
    if (scene) {
      this.gl = <WebGLRenderingContext>scene.getContext("webgl") 
        || scene.getContext("experimental-webgl");
    }
  }

  public getGL(): WebGLRenderingContext {
    return this.gl;
  }

  public setSimulationFunc(func: Function): void {
    this.simulationFunc = func;
  }

  public setDisplayFunc(func: Function): void {
    this.displayFunc = func;
  }

  public mainLoop(): void {
    this.simulationFunc();
    this.displayFunc();
    requestAnimationFrame(this.mainLoop.bind(this))
  }
}

const gl: GL = new GL();
export default gl;