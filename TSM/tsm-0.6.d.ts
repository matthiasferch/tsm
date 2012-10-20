module TSM {
    export class vec3 {
        private values: Float32Array;
        public x : number;
        public y : number;
        public z : number;
        public xy : number[];
        public xyz : number[];
        constructor (values?: number[]);
        public at(index: number): number;
        public reset(): void;
        public copy(dest?: vec3): vec3;
        public negate(): vec3;
        public equals(vector: vec3): bool;
        public length(): number;
        public squaredLength(): number;
        public add(vector: vec3): vec3;
        public subtract(vector: vec3): vec3;
        public multiply(vector: vec3): vec3;
        public divide(vector: vec3): vec3;
        public scale(value: number): vec3;
        public normalize(): vec3;
        static cross(vector: vec3, vector2: vec3, result?: vec3): vec3;
        static dot(vector: vec3, vector2: vec3): number;
        static distance(vector: vec3, vector2: vec3): number;
        static squaredDistance(vector: vec3, vector2: vec3): number;
        static direction(vector: vec3, vector2: vec3, result?: vec3): vec3;
        static interpolate(vector: vec3, vector2: vec3, time: number, result?: vec3): vec3;
        static sum(vector: vec3, vector2: vec3, result?: vec3): vec3;
        static difference(vector: vec3, vector2: vec3, result?: vec3): vec3;
        static product(vector: vec3, vector2: vec3, result?: vec3): vec3;
        static quotient(vector: vec3, vector2: vec3, result?: vec3): vec3;
        public toQuat(): quat;
        static zero: vec3;
        static up: vec3;
        static right: vec3;
        static forward: vec3;
    }
}
module TSM {
    export class vec4 {
        private values: Float32Array;
        public x : number;
        public y : number;
        public z : number;
        public w : number;
        public xy : number[];
        public xyz : number[];
        public xyzw : number[];
        public r : number;
        public g : number;
        public b : number;
        public a : number;
        public rg : number[];
        public rgb : number[];
        public rgba : number[];
        constructor (values?: number[]);
        public at(index: number): number;
        public reset(): void;
        public copy(dest?: vec4): vec4;
        public negate(): vec4;
        public equals(vector: vec4): bool;
        public length(): number;
        public squaredLength(): number;
        public add(vector: vec4): vec4;
        public subtract(vector: vec4): vec4;
        public multiply(vector: vec4): vec4;
        public divide(vector: vec4): vec4;
        public scale(value: number): vec4;
        public normalize(): vec4;
        static interpolate(vector: vec4, vector2: vec4, time: number, result?: vec4): vec4;
        static sum(vector: vec4, vector2: vec4, result?: vec4): vec4;
        static difference(vector: vec4, vector2: vec4, result?: vec4): vec4;
        static product(vector: vec4, vector2: vec4, result?: vec4): vec4;
        static quotient(vector: vec4, vector2: vec4, result?: vec4): vec4;
        static zero: vec4;
    }
}
module TSM {
    export class mat2 {
        private values: Float32Array;
        constructor (values?: number[]);
        public at(index: number): number;
        public init(values: number[]): mat2;
        public reset(): void;
        public copy(dest?: mat2): mat2;
        public all(): number[];
        public row(index: number): number[];
        public col(index: number): number[];
        public equals(matrix: mat2): bool;
        public determinant(): number;
        public setIdentity(): mat2;
        public transpose(): mat2;
        public inverse(): mat2;
        public multiply(matrix: mat2): mat2;
        public rotate(angle: number): mat2;
        public multiplyVec2(vector: vec2): vec2;
        public scale(vector: vec2): mat2;
        static product(m1: mat2, m2: mat2, result?: mat2): mat2;
        static identity: mat2;
    }
}
module TSM {
    export class mat3 {
        private values: Float32Array;
        constructor (values?: number[]);
        public at(index: number): number;
        public init(values: number[]): mat3;
        public reset(): void;
        public copy(dest?: mat3): mat3;
        public all(): number[];
        public row(index: number): number[];
        public col(index: number): number[];
        public equals(matrix: mat3): bool;
        public determinant(): number;
        public setIdentity(): mat3;
        public transpose(): mat3;
        public inverse(): mat3;
        public multiply(matrix: mat3): mat3;
        public multiplyVec2(vector: vec2): vec2;
        public multiplyVec3(vector: vec3): vec3;
        public toMat4(): mat4;
        public rotate(angle: number, axis: vec3): mat3;
        static product(m1: mat3, m2: mat3, result?: mat3): mat3;
        static identity: mat3;
    }
}
module TSM {
    export class mat4 {
        private values: Float32Array;
        constructor (values?: number[]);
        public at(index: number): number;
        public init(values: number[]): mat4;
        public reset(): void;
        public copy(dest?: mat4): mat4;
        public all(): number[];
        public row(index: number): number[];
        public col(index: number): number[];
        public equals(matrix: mat4): bool;
        public determinant(): number;
        public setIdentity(): mat4;
        public transpose(): mat4;
        public inverse(): mat4;
        public multiply(matrix: mat4): mat4;
        public multiplyVec3(vector: vec3): vec3;
        public multiplyVec4(vector: vec4): vec4;
        public toMat3(): mat3;
        public toInverseMat3(): mat3;
        public translate(vector: vec3): mat4;
        public scale(vector: vec3): mat4;
        public rotate(angle: number, axis: vec3): mat4;
        static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
        static perspective(fov: number, aspect: number, near: number, far: number): mat4;
        static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
        static lookAt(eye: vec3, center: vec3, up: vec3): mat4;
        static product(m1: mat4, m2: mat4, result?: mat4): mat4;
        static identity: mat4;
    }
}
module TSM {
    export class quat {
        private values: Float32Array;
        public x : number;
        public y : number;
        public z : number;
        public w : number;
        public xy : number[];
        public xyz : number[];
        public xyzw : number[];
        constructor (values?: number[]);
        public at(index: number): number;
        public reset(): void;
        public copy(dest?: quat): quat;
        public roll(): number;
        public pitch(): number;
        public yaw(): number;
        public equals(vector: vec4): bool;
        public setIdentity(): quat;
        public calculateW(): quat;
        static dot(q1: quat, q2: quat): number;
        public inverse(): quat;
        public conjugate(): quat;
        public length(): number;
        public normalize(): quat;
        public add(other: quat): quat;
        public multiply(other: quat): quat;
        public multiplyVec3(vector: vec3): vec3;
        public toMat3(): mat3;
        public toMat4(): mat4;
        static sum(q1: quat, q2: quat, result?: quat): quat;
        static product(q1: quat, q2: quat, result?: quat): quat;
        static interpolate(q1: quat, q2: quat, time: number, result?: quat): quat;
        static identity: quat;
    }
}
var EPSILON: number;
module TSM {
    export class vec2 {
        private values: Float32Array;
        public x : number;
        public y : number;
        public xy : number[];
        constructor (values?: number[]);
        public at(index: number): number;
        public reset(): void;
        public copy(dest?: vec2): vec2;
        public negate(): vec2;
        public equals(vector: vec2): bool;
        public length(): number;
        public squaredLength(): number;
        public add(vector: vec2): vec2;
        public subtract(vector: vec2): vec2;
        public multiply(vector: vec2): vec2;
        public divide(vector: vec2): vec2;
        public scale(value: number): vec2;
        public normalize(): vec2;
        static cross(vector: vec2, vector2: vec2, result?: vec3): vec3;
        static dot(vector: vec2, vector2: vec2): number;
        static distance(vector: vec2, vector2: vec2): number;
        static squaredDistance(vector: vec2, vector2: vec2): number;
        static direction(vector: vec2, vector2: vec2, result?: vec2): vec2;
        static interpolate(vector: vec2, vector2: vec2, time: number, result?: vec2): vec2;
        static sum(vector: vec2, vector2: vec2, result?: vec2): vec2;
        static difference(vector: vec2, vector2: vec2, result?: vec2): vec2;
        static product(vector: vec2, vector2: vec2, result?: vec2): vec2;
        static quotient(vector: vec2, vector2: vec2, result?: vec2): vec2;
        static zero: vec2;
    }
}
