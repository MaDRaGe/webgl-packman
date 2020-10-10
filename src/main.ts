import Scene from "./Scene";
import Mesh from "./Mesh";

const cameraDist: Element | null = document.querySelector("#cameraDist");
cameraDist?.addEventListener("input", function(event: Event) {
  console.log((<HTMLInputElement>event?.target).value);
})

const scene: Scene = new Scene("#scene");
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();
const box = new Mesh();
box.load("Box", scene.getGl());
scene.addMesh(box);

requestAnimationFrame(scene.draw.bind(scene));
