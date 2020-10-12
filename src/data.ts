import ShaderProgram from "./ShaderProgram";
import GraphicObject from "./GraphicObject";
import Mesh from "./Mesh";
import Scene from "./Scene";
import GL from "./GL";
import { glm } from "./glm";

let shaderProgram: ShaderProgram;
let scene: Scene;

async function dataInit() {
  GL.init("#scene");
  scene = new Scene();
  shaderProgram = new ShaderProgram()
  shaderProgram.initShader("vertex", "#vertex-shader-2d");
  shaderProgram.initShader("fragment", "#fragment-shader-2d");
  shaderProgram.initShaderProgram();
  shaderProgram.initUniform("u_MMatrix");
  shaderProgram.initUniform("u_PMatrix");
  shaderProgram.initUniform("u_NMatrix");
  shaderProgram.initUniform("u_lightPosition");
  shaderProgram.initUniform("u_ambientLightColor");
  shaderProgram.initUniform("u_diffuseLightColor");
  shaderProgram.initUniform("u_specularLightColor");
  shaderProgram.initUniform("u_VMatrix");
  shaderProgram.initAttr("a_vertexPosition");
  shaderProgram.initAttr("a_vertexTextureCoords");
  shaderProgram.initAttr("a_vertexNormal");
  const objects: GraphicObject[] = await loadObjectsFromFile("objectList.json");
  objects.forEach((object: GraphicObject) => {
    scene.addObject(object);
  });
  const planeMesh: Mesh = new Mesh();
  await planeMesh.load("simple_plane");
  const plane: GraphicObject = new GraphicObject(planeMesh, 0);
  scene.addObject(plane);
}

async function loadObjectsFromFile(filename: string): Promise<GraphicObject[]> {
  const box = new Mesh();
  await box.load("Box");
  const response = await (await fetch(`http://127.0.0.1:8887/dist/assets/${filename}`)).json();
  return response.objects.map((object: any) => {
    return new GraphicObject(box, 0, new glm.vec3(object.position[0], object.position[1], object.position[2]));
  });
}

export {
  dataInit,
  shaderProgram,
  scene
};