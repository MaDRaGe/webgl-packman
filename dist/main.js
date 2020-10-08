import Scene from "./Scene";
import Mesh from "./Mesh";
var scene = new Scene("#scene");
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();
var box = new Mesh();
box.load("Box", scene.getGl());
scene.addMesh(box);
requestAnimationFrame(scene.draw.bind(scene));
//# sourceMappingURL=main.js.map