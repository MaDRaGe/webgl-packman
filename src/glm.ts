namespace glm {
  export function degToRad(angleDeg: number): number {
    return angleDeg / 180 * Math.PI;
  }

  export function radToDeg(angleRad: number): number {
    return angleRad * Math.PI / 180;
  }
  
  export function get2dMatrix(m: number[]): number[][] {
    let matrix2d: number[][] = [];
    while(m.length) matrix2d.push(m.splice(0,4));
    return matrix2d;
  }
  export function transpose(m: number[]): number[] {
    const matrix2d: number[][] = get2dMatrix(m);
    return matrix2d[0].map((x,i) => matrix2d.map(x => x[i])).flat();
  }
  export function inverse(){}
  export function cross(a: vec3, b: vec3): vec3 {
    return new vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }

  export function subtractVectors(a: vec3, b: vec3): vec3 {
    return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  export function normalize(v: vec3): vec3 {
    var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if (length > 0.00001) {
      return new vec3(v.x / length, v.y / length, v.z / length);
    } else {
      return new vec3(0, 0, 0);
    }
  }

  export function lookAt(cameraPosition: vec3, target: vec3, up: vec3): number[] {
    const zAxis = normalize(subtractVectors(cameraPosition, target));
    const xAxis = normalize(cross(up, zAxis));
    const yAxis = normalize(cross(zAxis, xAxis));

    return [
      xAxis.x, xAxis.y, xAxis.z, 0,
      yAxis.x, yAxis.y, yAxis.z, 0,
      zAxis.x, zAxis.y, zAxis.z, 0,
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
      1,
   ];
  }

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
    const cos = Math.cos(angle / 180 * 3.14);
    const sin = Math.sin(angle / 180 * 3.14);
    return [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
  }

  export function scaling(sx: number, sy: number): number[] {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  }

  export function projection(width: number, height: number): number[] {
    return [
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ]
  }

  export function perspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number): number[] {
    const f: number = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians / 180 * Math.PI);
    const rangeInv: number = 1.0 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, - 1,
      0, 0, near * far * rangeInv * 2, 0
    ]
  }

  export function multiply3v(a: number[], b: number[]): number[]  {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];
    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  }


  export namespace m4 {
    export function perspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number): number[] {
      const f:number = Math.tan(Math.PI * 0.5 - 0.5 * degToRad(fieldOfViewInRadians));
      const rangeInv:number = 1.0 / (near - far);

      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ];
    };

    export function projection(width: number, height: number, depth: number): number[] {
      // Note: This matrix flips the Y axis so 0 is at the top.
      return [
         2 / width, 0, 0, 0,
         0, -2 / height, 0, 0,
         0, 0, 2 / depth, 0,
        -1, 1, 0, 1,
      ];
    };

    export function multiply(a: number[], b: number[]): number[] {
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    };


    export function translation(tx: number, ty: number, tz: number): number[] {
      return [
         1,  0,  0,  0,
         0,  1,  0,  0,
         0,  0,  1,  0,
         tx, ty, tz, 1,
      ];
    };

    export function xRotation(angleInRadians: number): number[] {
      const c: number = Math.cos(degToRad(angleInRadians));
      const s: number = Math.sin(degToRad(angleInRadians));

      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
      ];
    };

    export function yRotation(angleInRadians: number): number[] {
      const c: number = Math.cos(degToRad(angleInRadians));
      const s: number = Math.sin(degToRad(angleInRadians));

      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
      ];
    };

    export function zRotation(angleInRadians:number): number[] {
      const c:number = Math.cos(degToRad(angleInRadians));
      const s:number = Math.sin(degToRad(angleInRadians));

      return [
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1,
      ];
    };

    export function scaling(sx: number, sy: number, sz: number): number[] {
      return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
      ];
    };

    export function translate(m: number[], tx: number, ty: number, tz: number): number[] {
      return m4.multiply(m, m4.translation(tx, ty, tz));
    };

    export function xRotate(m: number[], angleInRadians: number): number[] {
      return m4.multiply(m, m4.xRotation(angleInRadians));
    };

    export function yRotate(m: number[], angleInRadians: number): number[] {
      return m4.multiply(m, m4.yRotation(angleInRadians));
    };

    export function zRotate(m: number[], angleInRadians: number): number[] {
      return m4.multiply(m, m4.zRotation(angleInRadians));
    };

    export function scale(m: number[], sx: number, sy: number, sz: number) {
      return m4.multiply(m, m4.scaling(sx, sy, sz));
    };

    export function inverse(m: number[]): number[] {
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0  = m22 * m33;
      var tmp_1  = m32 * m23;
      var tmp_2  = m12 * m33;
      var tmp_3  = m32 * m13;
      var tmp_4  = m12 * m23;
      var tmp_5  = m22 * m13;
      var tmp_6  = m02 * m33;
      var tmp_7  = m32 * m03;
      var tmp_8  = m02 * m23;
      var tmp_9  = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;
      var tmp_12 = m20 * m31;
      var tmp_13 = m30 * m21;
      var tmp_14 = m10 * m31;
      var tmp_15 = m30 * m11;
      var tmp_16 = m10 * m21;
      var tmp_17 = m20 * m11;
      var tmp_18 = m00 * m31;
      var tmp_19 = m30 * m01;
      var tmp_20 = m00 * m21;
      var tmp_21 = m20 * m01;
      var tmp_22 = m00 * m11;
      var tmp_23 = m10 * m01;
  
      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
          (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
          (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
          (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
          (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  
      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  
      return [
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
              (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
              (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
              (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
              (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
              (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
              (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
              (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
              (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
              (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
              (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
              (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
              (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
      ];
    };
  }
}

export { glm };
