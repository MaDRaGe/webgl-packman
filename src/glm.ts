namespace glm {
  export class vec2 {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  export class vec3 extends vec2 {
    z: number = 0;
    r: number = 0;
    g: number = 0;
    b: number = 0;

    constructor(x: number, y: number, z: number) {
      super(x, y);
      this.z = z;
      this.r = x;
      this.g = y;
      this.b = z;
    }
  }

  export class vec4 extends vec3 {
    w: number = 0;
    a: number = 0;

    constructor(x: number, y: number, z: number, w: number) {
      super(x, y, z);
      this.w = w;
      this.r = x;
      this.g = y;
      this.b = z;
      this.a = z;
    }
  }

  export function translation(tx: number, ty: number): number[] {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
  }

  export function rotation(angle: number): number[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
  }

  export function scaling(sx: number, sy: number): number[] {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  }
}

export { glm };
