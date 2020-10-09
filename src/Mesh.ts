import { glm } from "./glm";

class Vertex {
  public coord: glm.vec3;
  public normal: glm.vec3;
  public texCoord: glm.vec2;

  constructor(coord: glm.vec3, normal: glm.vec3, texCoord: glm.vec2) {
    this.coord = coord;
    this.normal = normal;
    this.texCoord = texCoord;
  }
}

class Mesh {
  // @ts-ignore

  private vertices: Vertex[] = [];

  // @ts-ignore
  private indices: number[] = [];

  // @ts-ignore
  private vertexToIndex: Map<String, number> = new Map();

  // @ts-ignore
  public arrayBuffer: WebGLBuffer;

  // @ts-ignore
  private elementArrayBuffer: WebGLBuffer;

  constructor() {}

  public async load(name: String, gl: WebGLRenderingContext): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:8887/dist/assets/meshes/${name}.obj`
      );
      const text = await response.text();
      this.parseAttributes(text);

      this.arrayBuffer = <WebGLBuffer>gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(this.getVerticesPoints()),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      this.elementArrayBuffer = <WebGLBuffer>gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.indices),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    } catch (error) {
      console.error(error);
    }
  }

  private parseAttributes(text: string) {
    const keywordRE = /(\w*)(?: )*(.*)/;
    const lines = text.split("\n");
    let v: glm.vec3[] = [];
    let vn: glm.vec3[] = [];
    let vt: glm.vec3[] = [];
    for (let linesNo = 0; linesNo < lines.length; linesNo++) {
      const line = lines[linesNo].trim();
      if (line === "" || line.startsWith("#")) {
        continue;
      }
      const m = keywordRE.exec(line);
      if (!m) {
        continue;
      }
      const [, keyword, unparsedArgs] = m;
      const parts = line.split(/\s+/);
      switch (keyword) {
        case "v":
          v.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;
        case "vn":
          vn.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;
        case "vt":
          vt.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;
        case "f":
          unparsedArgs.split(/\s+/).forEach((param) => {
            this.addNewVertex(param, v, vn, vt);
          });
          break;
      }
    }
  }

  private addNewVertex(
    param: string,
    v: glm.vec3[],
    vn: glm.vec3[],
    vt: glm.vec3[]
  ) {
    if (!this.vertexToIndex.has(param)) {
      this.vertexToIndex.set(param, this.vertexToIndex.size + 1);
      const indices: number[] = param.split("/").map((item) => {
        return +item;
      });
      this.vertices.push(
        new Vertex(v[indices[0] - 1], vn[indices[1] - 1], vt[indices[2] - 1])
      );
    } else {
      this.indices.push(<number>this.vertexToIndex.get(param));
    }
  }

  public draw(gl: WebGLRenderingContext) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  private getVerticesPoints(): number[] {
    const verticesPoints: number[] = this.vertices
      .map((vertex) => {
        return [vertex.coord.x, vertex.coord.y, vertex.coord.z];
      })
      .flat();
    return verticesPoints;
  }

  public getArrayBuffer(): WebGLBuffer {
    return this.arrayBuffer;
  }
}

export default Mesh;
