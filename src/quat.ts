import { EPSILON } from './constants';
import { Vector } from './ts-matrix';

/**
 * Class representing a Math Quat
 *
 * TODO: To refactor with 'Matrix.ts' style.
 */
export default class Quat {

    get x(): number {
        return this.values[0];
    }

    set x(value: number) {
        this.values[0] = value;
    }

    get y(): number {
        return this.values[1];
    }

    set y(value: number) {
        this.values[1] = value;
    }

    get z(): number {
        return this.values[2];
    }

    set z(value: number) {
        this.values[2] = value;
    }
    
    get w(): number {
        return this.values[3];
    }
    
    set w(value: number) {
        this.values[3] = value;
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ];
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0];
        this.values[1] = values[1];
    }


    get xyz(): [number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
        ];
    }

    set xyz(values: [number, number, number]) {
        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
    }

    get xyzw(): [number, number, number, number] {
        return [
            this.values[0],
            this.values[1],
            this.values[2],
            this.values[3],
        ];
    }

    set xyzw(values: [number, number, number, number]) {
        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
        this.values[3] = values[3];
    }

    constructor(values?: [number, number, number, number]) {
        if (values !== undefined) {
            this.xyzw = values;
        }
    }

    private values = new Float32Array(4);

    static readonly identity = new Quat().setIdentity();

    at(index: number): number {
        return this.values[index];
    }

    reset(): void {
        for (let i = 0; i < 4; i++) {
            this.values[i] = 0;
        }
    }

    copy(dest?: Quat): Quat {
        if (!dest) { dest = new Quat(); }

        for (let i = 0; i < 4; i++) {
            dest.values[i] = this.values[i];
        }

        return dest;
    }

    roll(): number {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
    }

    pitch(): number {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
    }

    yaw(): number {
        return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
    }

    equals(vector: Quat, threshold = EPSILON): boolean {
        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - vector.at(i)) > threshold) {
                return false;
            }
        }

        return true;
    }

    setIdentity(): Quat {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

        return this;
    }

    calculateW(): Quat {
        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.w = -(Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z)));

        return this;
    }

    inverse(): Quat {
        const dot = Quat.dot(this, this);

        if (!dot) {
            this.xyzw = [0, 0, 0, 0];

            return this;
        }

        const invDot = dot ? 1.0 / dot : 0;

        this.x *= -invDot;
        this.y *= -invDot;
        this.z *= -invDot;
        this.w *= invDot;

        return this;
    }

    conjugate(): Quat {
        this.values[0] *= -1;
        this.values[1] *= -1;
        this.values[2] *= -1;

        return this;
    }

    length(): number {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    normalize(dest?: Quat): Quat {
        if (!dest) { dest = this; }

        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        let length = Math.sqrt(x * x + y * y + z * z + w * w);

        if (!length) {
            dest.x = 0;
            dest.y = 0;
            dest.z = 0;
            dest.w = 0;

            return dest;
        }

        length = 1 / length;

        dest.x = x * length;
        dest.y = y * length;
        dest.z = z * length;
        dest.w = w * length;

        return dest;
    }

    add(other: Quat): Quat {
        for (let i = 0; i < 4; i++) {
            this.values[i] += other.at(i);
        }

        return this;
    }

    multiply(other: Quat): Quat {
        const q1x = this.values[0];
        const q1y = this.values[1];
        const q1z = this.values[2];
        const q1w = this.values[3];

        const q2x = other.x;
        const q2y = other.y;
        const q2z = other.z;
        const q2w = other.w;

        this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return this;
    }

    static dot(q1: Quat, q2: Quat): number {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }

    static sum(q1: Quat, q2: Quat): Quat {
        const dest = new Quat();

        dest.x = q1.x + q2.x;
        dest.y = q1.y + q2.y;
        dest.z = q1.z + q2.z;
        dest.w = q1.w + q2.w;

        return dest;
    }

    static product(q1: Quat, q2: Quat): Quat {
        const dest = new Quat();

        const q1x = q1.x;
        const q1y = q1.y;
        const q1z = q1.z;
        const q1w = q1.w;

        const q2x = q2.x;
        const q2y = q2.y;
        const q2z = q2.z;
        const q2w = q2.w;

        dest.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        dest.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        dest.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        dest.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return dest;
    }

    static cross(q1: Quat, q2: Quat): Quat {
        const dest = new Quat();

        const q1x = q1.x;
        const q1y = q1.y;
        const q1z = q1.z;
        const q1w = q1.w;

        const q2x = q2.x;
        const q2y = q2.y;
        const q2z = q2.z;
        const q2w = q2.w;

        dest.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        dest.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        dest.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        dest.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;

        return dest;
    }

    static shortMix(q1: Quat, q2: Quat, time: number): Quat {
        const dest = new Quat();

        if (time <= 0.0) {
            dest.xyzw = q1.xyzw;

            return dest;
        } else if (time >= 1.0) {
            dest.xyzw = q2.xyzw;

            return dest;
        }

        let cos = Quat.dot(q1, q2);
        const q2a = q2.copy();

        if (cos < 0.0) {
            q2a.inverse();
            cos = -cos;
        }

        let k0: number;
        let k1: number;

        if (cos > 0.9999) {
            k0 = 1 - time;
            k1 = 0 + time;
        } else {
            const sin: number = Math.sqrt(1 - cos * cos);
            const angle: number = Math.atan2(sin, cos);

            const oneOverSin: number = 1 / sin;

            k0 = Math.sin((1 - time) * angle) * oneOverSin;
            k1 = Math.sin((0 + time) * angle) * oneOverSin;
        }

        dest.x = k0 * q1.x + k1 * q2a.x;
        dest.y = k0 * q1.y + k1 * q2a.y;
        dest.z = k0 * q1.z + k1 * q2a.z;
        dest.w = k0 * q1.w + k1 * q2a.w;

        return dest;
    }

    static mix(q1: Quat, q2: Quat, time: number): Quat {
        const dest = new Quat();

        const cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

        if (Math.abs(cosHalfTheta) >= 1.0) {
            dest.xyzw = q1.xyzw;

            return dest;
        }

        const halfTheta = Math.acos(cosHalfTheta);
        const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest.x = q1.x * 0.5 + q2.x * 0.5;
            dest.y = q1.y * 0.5 + q2.y * 0.5;
            dest.z = q1.z * 0.5 + q2.z * 0.5;
            dest.w = q1.w * 0.5 + q2.w * 0.5;

            return dest;
        }

        const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta;
        const ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

        dest.x = q1.x * ratioA + q2.x * ratioB;
        dest.y = q1.y * ratioA + q2.y * ratioB;
        dest.z = q1.z * ratioA + q2.z * ratioB;
        dest.w = q1.w * ratioA + q2.w * ratioB;

        return dest;
    }

    static fromAxisAngle(axis: Vector, angle: number): Quat {
        if (axis.rows !== 3) throw new Error('The axis vector must be in 3D!');
        const dest = new Quat();

        angle *= 0.5;
        const sin = Math.sin(angle);

        dest.x = axis.at(0) * sin;
        dest.y = axis.at(1) * sin;
        dest.z = axis.at(2) * sin;
        dest.w = Math.cos(angle);

        return dest;
    }

}
