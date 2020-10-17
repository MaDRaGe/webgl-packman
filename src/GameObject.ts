import GraphicObject from "./GraphicObject";
import { glm } from './glm';

class GameObject {
  private graphicObject: GraphicObject = new GraphicObject();
  private position: glm.vec2 = new glm.vec2(0, 0);

  public setPosition(position: glm.vec2): void {
    this.position = position;
    this.graphicObject.setPosition(new glm.vec3(position.x, 0, position.y))
  }

  public setGraphicObject(graphicObject: GraphicObject): void {
    this.graphicObject = graphicObject;
  }

  public draw(): void {
    this.graphicObject.setPosition(new glm.vec3(this.position.x, 0, this.position.y));
    this.graphicObject.draw();
  }

  public getModelMatrix(): number[] {
    return this.graphicObject.getModelMatrix();
  }
}

export default GameObject;