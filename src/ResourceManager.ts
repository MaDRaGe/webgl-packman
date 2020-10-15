import GraphicObject from './GraphicObject';
import Mesh from './Mesh'
import { ObjectTypes } from './data';

class ResourceManager {

  private meshes: Map<ObjectTypes, Mesh> = new Map();

  public createObject(type: ObjectTypes): GraphicObject {
    switch (type) {
      case ObjectTypes.Border:
        return new GraphicObject()
        break;
    }
    return new GraphicObject()
  }
}
const resourceManager: ResourceManager = new ResourceManager();

export default resourceManager;