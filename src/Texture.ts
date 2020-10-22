import gl from './GL';

class Texture {
  private texture: WebGLTexture = <WebGLTexture>gl.getGL().createTexture();
  private image: HTMLImageElement = new Image();

  public load(name: string): void {
    const GL: WebGLRenderingContext = gl.getGL();
    this.texture = <WebGLTexture>GL.createTexture();
    this.image.crossOrigin = 'anonymous';
    this.image.src = `http://127.0.0.1:8887/assets/textures/${name}.png`;
    this.image.addEventListener('load', () => {
      GL.bindTexture(GL.TEXTURE_2D, this.texture);
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.image);
      GL.generateMipmap(GL.TEXTURE_2D);
    })
  }

  public apply(): void {
    const GL: WebGLRenderingContext = gl.getGL();  
    GL.bindTexture(GL.TEXTURE_2D, this.texture);
    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.image);
    GL.generateMipmap(GL.TEXTURE_2D);  
  }
}

export default Texture;