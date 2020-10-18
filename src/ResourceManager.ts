import GraphicObject from './GraphicObject';
import Mesh from './Mesh'
import { ObjectType } from './data';
import { glm } from './glm';
import GameObject from './GameObject';

class ResourceManager {
  private meshes: Map<string, Mesh> = new Map();
  private meshNames: Map<ObjectType, string> = new Map();

  public async init(filepath: string): Promise<void> {
    const response = await (await fetch(`http://127.0.0.1:8887/assets/${filepath}`)).json();
    this.initObject(ObjectType.Border, response["border"]);
    this.initObject(ObjectType.Player, response["player"]);
  }

  private initObject(type: ObjectType, data: any): void {
    if (this.meshNames.get(type)) {
      this.meshNames.set(type, data.mesh.name);
    } else {
      let mesh: Mesh = new Mesh();
      mesh.load(data.mesh.name);
      this.meshNames.set(type, data.mesh.name);
      this.meshes.set(data.mesh.name, mesh);
    }
  }

  public createObject(type: ObjectType, position: glm.vec2): GameObject {
    let graphicObject: GraphicObject = 
      new GraphicObject(
        this.meshes.get(
          <string>this.meshNames.get(type)
        )
      );
    let newGameObject: GameObject = new GameObject();
    newGameObject.setGraphicObject(graphicObject);
    newGameObject.setPosition(position);
    return newGameObject;
  }
}
const resourceManager: ResourceManager = new ResourceManager();

export default resourceManager;