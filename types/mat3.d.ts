import mat4 from './mat4';
import quat from './quat';
import vec2 from './vec2';
import vec3 from './vec3';
export default class mat3 {
    constructor(values?: number[]);
    private values;
    static readonly identity: mat3;
    at(index: number): number;
    init(values: number[]): mat3;
    reset(): void;
    copy(dest?: mat3): mat3;
    all(): number[];
    row(index: number): number[];
    col(index: number): number[];
    equals(matrix: mat3, threshold?: number): boolean;
    determinant(): number;
    setIdentity(): mat3;
    transpose(): mat3;
    inverse(): mat3;
    multiply(matrix: mat3): mat3;
    multiplyVec2(vector: vec2, result: vec2): vec2;
    multiplyVec3(vector: vec3, result: vec3): vec3;
    toMat4(result: mat4): mat4;
    toQuat(): quat;
    rotate(angle: number, axis: vec3): mat3;
    static product(m1: mat3, m2: mat3, result: mat3): mat3;
}
