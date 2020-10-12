import { glm } from "./glm";
import GL from "./GL";
import { shaderProgram } from "./data";

type LightSettings = {
  position: glm.vec3,
  ambient: glm.vec3,
  diffuse: glm.vec3,
  specular: glm.vec3,
  shininess: number,
}

class Light {
  private position: glm.vec3 = new glm.vec3(0, 0, 0);
  private ambient: glm.vec3 = new glm.vec3(0, 0, 0);
  private diffuse: glm.vec3 = new glm.vec3(0, 0, 0);
  private specular: glm.vec3 = new glm.vec3(0, 0, 0);
  private shininess: number = 0;

  constructor(
    position: glm.vec3 = new glm.vec3(0.0, 10.0, 5.0),
    ambient: glm.vec3 = new glm.vec3(0.1, 0.1, 0.1),
    diffuse: glm.vec3 = new glm.vec3(0.7, 0.7, 0.7),
    specular: glm.vec3 = new glm.vec3(1.0, 1.0, 1.0),
    shininess: number = 0
  ) {
    this.position = position;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
  }

  public setPosition(position: glm.vec3): void {
    this.position = position;
  }

  public getPosition(): glm.vec3 {
    return this.position;
  }
  public setAmbient(ambient: glm.vec3): void {
    this.ambient = ambient;
  }

  public getAmbient(): glm.vec3 {
    return this.ambient;
  }

  public setDiffuse(diffuse: glm.vec3): void {
    this.diffuse = diffuse;
  }

  public getDiffuse(): glm.vec3 {
    return this.diffuse;
  }

  public setSpecular(specular: glm.vec3): void {
    this.specular = specular;
  }

  public getSpecular(): glm.vec3 {
    return this.specular;
  }

  public setShininess(shininess: number): void {
    this.shininess = shininess;
  }

  public getShininess(): number {
    return this.shininess;
  }

  public apply() {
    shaderProgram.setUniform3fv("u_lightPosition", [this.position.x, this.position.y, this.position.z]);
    shaderProgram.setUniform3fv("u_ambientLightColor", [this.ambient.x, this.ambient.y, this.ambient.z]);
    shaderProgram.setUniform3fv("u_diffuseLightColor", [this.diffuse.x, this.diffuse.y, this.diffuse.z]);
    shaderProgram.setUniform3fv("u_specularLightColor", [this.specular.x, this.specular.y, this.specular.z]);
  }
}
export default Light;