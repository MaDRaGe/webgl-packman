import Scene from "./Scene";
import Mesh from "./Mesh";

const scene: Scene = new Scene("#scene");
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();
const box = new Mesh();
box.load("Box", scene.getGl());
scene.addMesh(box);
//scene.draw();

requestAnimationFrame(scene.draw.bind(scene));

/*
let canvas = null;
let gl = null;

function init() {
  canvas = document.querySelector("#glcanvas");
  gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Error init gl");
  }
}

init();

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

let vertexShaderSource = document.querySelector("#vertex-shader-2d")
  .textContent;
let fragmentShaderSource = document.querySelector("#fragment-shader-2d")
  .textContent;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
let program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// Create buffer
const positions = [0.5, 0.5, 0, 0, 0.5, 0];
let posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
let posAttribLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(posAttribLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.vertexAttribPointer(posAttribLocation, 2, gl.FLOAT, false, 0, 0);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0.5, 0.5, 0.5, 0.9);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.drawArrays(gl.TRIANGLES, 0, 3);
*/
