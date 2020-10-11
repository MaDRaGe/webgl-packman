import Scene from "./Scene";
import Mesh from "./Mesh";
import ShaderProgram from "./ShaderProgram";
import gl from "./GL";

const scene: Scene = new Scene();
/*
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();*/
const box = new Mesh();
gl.init("#scene");
box.load("Box", gl.getGL());
scene.addMesh(box);
const shaderProgram: ShaderProgram = new ShaderProgram(gl.getGL());
shaderProgram.initShader(gl.getGL(), "vertex", "#vertex-shader-2d");
shaderProgram.initShader(gl.getGL(), "fragment", "#fragment-shader-2d");
shaderProgram.initShaderProgram(gl.getGL());
shaderProgram.initUniform(gl.getGL(), "u_MVMatrix");
shaderProgram.initUniform(gl.getGL(), "u_PMatrix");
shaderProgram.initUniform(gl.getGL(), "u_NMatrix");
shaderProgram.initUniform(gl.getGL(), "u_lightPosition");
shaderProgram.initUniform(gl.getGL(), "u_ambientLightColor");
shaderProgram.initUniform(gl.getGL(), "u_diffuseLightColor");
shaderProgram.initUniform(gl.getGL(), "u_specularLightColor");
shaderProgram.initAttr(gl.getGL(), "a_vertexPosition");
shaderProgram.initAttr(gl.getGL(), "a_vertexTextureCoords");
shaderProgram.initAttr(gl.getGL(), "a_vertexNormal");
gl.setShaderProgram(shaderProgram);
requestAnimationFrame(scene.draw.bind(scene, gl));
