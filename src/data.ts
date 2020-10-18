import ShaderProgram from "./ShaderProgram";
import GameObject from './GameObject';
import Scene from "./Scene";
import GL from "./GL";
import { glm } from "./glm";
import ResourceManager from './ResourceManager';

enum ObjectType {
  Space,
  Border,
  LightBorder,
  Player
}

let map: ObjectType[][] = [
[ObjectType.Border, ObjectType.Border, ObjectType.Border, ObjectType.Border, ObjectType.Border],
[ObjectType.Border, ObjectType.Space, ObjectType.Space, ObjectType.Space,ObjectType.Border],
[ObjectType.Border, ObjectType.Space, ObjectType.Border, ObjectType.Space,ObjectType.Border],
[ObjectType.Border, ObjectType.Space, ObjectType.Border, ObjectType.Space,ObjectType.Border],
[ObjectType.Border, ObjectType.Border, ObjectType.Border, ObjectType.Border,ObjectType.Border]]

let Player: GameObject = new GameObject();
let gameObjects: GameObject[] = [];
let shaderProgram: ShaderProgram;
let scene: Scene;
async function dataInit() {
  GL.init("#scene");
  scene = new Scene();
  await ResourceManager.init('object.json');
  shaderInit();
  loadObjects();
}

function loadObjects() {
  map.forEach((row: ObjectType[], rowIndex: number) => {
    row.forEach((objectTypeNumber: ObjectType, columnIndex: number) => {
      gameObjects.push(ResourceManager.createObject(objectTypeNumber, new glm.vec2(columnIndex, rowIndex)));
    })
  })
  Player = ResourceManager.createObject(ObjectType.Player, new glm.vec2(1, 1));
}

function shaderInit() {
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
}

export {
  ObjectType,
  map,
  dataInit,
  shaderProgram,
  scene,
  gameObjects,
  Player
};