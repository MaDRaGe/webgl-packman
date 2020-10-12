import Scene from "./Scene";
import Mesh from "./Mesh";
import ShaderProgram from "./ShaderProgram";
import GraphicObject from "./GraphicObject";
import gl from "./GL";
import { dataInit } from "./data";

const scene: Scene = new Scene();
/*
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();*/
const box = new Mesh();
const object = new GraphicObject();
gl.init("#scene");
box.load("Box");
object.setMesh(box);
scene.addMesh(box);
scene.addObject(object);
dataInit();
/*
const shaderProgram: ShaderProgram = new ShaderProgram();
shaderProgram.initShader("vertex", "#vertex-shader-2d");
shaderProgram.initShader("fragment", "#fragment-shader-2d");
shaderProgram.initShaderProgram();
shaderProgram.initUniform("u_MVMatrix");
shaderProgram.initUniform("u_PMatrix");
shaderProgram.initUniform("u_NMatrix");
shaderProgram.initUniform("u_lightPosition");
shaderProgram.initUniform("u_ambientLightColor");
shaderProgram.initUniform("u_diffuseLightColor");
shaderProgram.initUniform("u_specularLightColor");
shaderProgram.initAttr("a_vertexPosition");
shaderProgram.initAttr("a_vertexTextureCoords");
shaderProgram.initAttr("a_vertexNormal");
gl.setShaderProgram(shaderProgram);*/
requestAnimationFrame(scene.draw.bind(scene));
