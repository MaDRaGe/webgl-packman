import GraphicObject from "./GraphicObject";
import { glm } from './glm';

class GameObject {
  private graphicObject: GraphicObject = new GraphicObject();
  private position: glm.vec2 = new glm.vec2(0, 0);

  public setPosition(position: glm.vec2): void {
    this.position = position;
  }

  public setGraphicObject(graphicObject: GraphicObject): void {
    this.graphicObject = graphicObject;
  }
}

export default GameObject;