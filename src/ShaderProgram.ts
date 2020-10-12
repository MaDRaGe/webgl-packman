import GL from "./GL";

type ShaderArray = {
  vertex: WebGLShader;
  fragment: WebGLShader;
};
class ShaderProgram {
  private shaderProgram: WebGLProgram;
  private shaders: ShaderArray;
  private uniforms: Map<string, WebGLUniformLocation> = new Map();
  private attributes: Map<string, number> = new Map();

  constructor() {
    const gl = GL.getGL();
    this.shaderProgram = <WebGLProgram>gl.createProgram();
    this.shaders = {
      vertex: <WebGLShader>gl.createShader(gl.VERTEX_SHADER),
      fragment: <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER)
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
    const gl = GL.getGL();
    if (type === "vertex") {
      this.shaders[type] = <WebGLShader>(
        gl?.createShader(gl.VERTEX_SHADER)
      );
    } else {
      this.shaders[type] = <WebGLShader>(
        gl?.createShader(gl.FRAGMENT_SHADER)
      );
    }
    gl?.shaderSource(
      this.shaders[type],
      document.querySelector(`${sourceDom}`)?.textContent || ""
    );
    gl.compileShader(this.shaders[type]);
    if (
      gl.getShaderParameter(this.shaders[type], gl.COMPILE_STATUS)
    ) {
      return true;
    }
    console.log(gl.getShaderInfoLog(this.shaders[type]));
    return false;
  }

  public initShaderProgram(): Boolean {
    const gl = GL.getGL();
    this.shaderProgram = <WebGLProgram>gl.createProgram();
    gl.attachShader(this.shaderProgram, this.shaders.vertex);
    gl.attachShader(this.shaderProgram, this.shaders.fragment);
    gl.linkProgram(this.shaderProgram);
    if (gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      gl.useProgram(this.shaderProgram); 
      return true;
    }
    console.log(gl.getProgramInfoLog(this.shaderProgram));
    return false;
  }

  public initUniform(name: string): void {
    const gl = GL.getGL();
    if (!this.uniforms.has(name)) {
      const uniform = <WebGLUniformLocation>gl.getUniformLocation(this.shaderProgram, name);
      this.uniforms.set(name, uniform);
    }
  }

  public initAttr(name: string): void {
    const gl = GL.getGL();
    if (!this.attributes.has(name)) {
      const attribute = <number>gl.getAttribLocation(this.shaderProgram, name);
      gl.enableVertexAttribArray(attribute);
      this.attributes.set(name, attribute);
    }
  }

  public setUniform3fv(name: string, value: number[]): void {
    const gl = GL.getGL();
    gl.uniform3fv(<WebGLUniformLocation>this.uniforms.get(name), value);
  }

  public setUniformMatrix4fv(name: string, value: number[]): void {
    const gl = GL.getGL();
    gl.uniformMatrix4fv(<WebGLUniformLocation>this.uniforms.get(name), false, value);
  }

  public apply(): void {
    const gl = GL.getGL();
    gl.useProgram(this.shaderProgram);
  }

  public getVertexAttr(name: string): number {
    return <number>this.attributes.get(name);
  }
}
export default ShaderProgram;