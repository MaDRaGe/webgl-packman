class GL {
  private simulationFunc: Function = () => {};
  private displayFunc: Function = () => {};
  private lastSimulationTime: number = 0;
  private nextSimulationTime: number = 0;
  private simulationTime: number = 0;

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
    this.simulationFunc = () => {
      this.lastSimulationTime = this.nextSimulationTime;
      this.nextSimulationTime = new Date().valueOf();
      this.simulationTime = this.nextSimulationTime - this.lastSimulationTime;
      func(this.simulationTime);
    }
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