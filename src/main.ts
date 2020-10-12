import { dataInit, scene } from "./data";

async function main(): Promise<void> {
  await dataInit();
  requestAnimationFrame(scene.draw.bind(scene));
}

main();
