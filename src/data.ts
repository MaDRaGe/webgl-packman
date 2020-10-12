import Shader from "./Shader";
import ShaderProgram from "./ShaderProgram";

let shaderProgram: ShaderProgram;

function dataInit() {
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
  dataInit,
  shaderProgram
};