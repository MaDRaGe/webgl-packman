import { dataInit, scene } from "./data";
import GL from "./GL";
import simulate from "./simulate";
import display from "./display";

async function main(): Promise<void> {
  await dataInit();
  GL.setDisplayFunc(display);
  GL.setSimulationFunc(simulate);
  requestAnimationFrame(GL.mainLoop.bind(GL));
  //requestAnimationFrame(scene.draw.bind(scene));
}

main();
