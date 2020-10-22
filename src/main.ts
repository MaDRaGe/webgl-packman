import { dataInit } from "./data";
import GL from "./GL";
import simulate from "./simulate";
import display from "./display";
import { wsConnect } from './ServerConnection';
import '@/redux/store'


async function main(): Promise<void> {
  //wsConnect();
  
  await dataInit();
  GL.setDisplayFunc(display);
  GL.setSimulationFunc(simulate);
  requestAnimationFrame(GL.mainLoop.bind(GL));
}

main();
