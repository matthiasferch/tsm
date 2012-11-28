/**
 * @fileoverview TSM - A TypeScript vector and matrix math library
 * @author Matthias Ferch
 * @version 0.6
 */

/*
 * Copyright (c) 2012 Matthias Ferch
 *
 * Project homepage: https://github.com/vexator/TSM
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */


///<reference path='./common.ts' />


module TSM {

    export class quat {

        private values = new Float32Array(4);

        get x(): number {
            return this.values[0];
        }

        get y(): number {
            return this.values[1];
        }

        get z(): number {
            return this.values[2];
        }

        get w(): number {
            return this.values[3];
        }

        get xy(): number[] {
            return [
                this.values[0],
                this.values[1]
            ];
        }

        get xyz(): number[] {
            return [
                this.values[0],
                this.values[1],
                this.values[2]
            ];
        }

        get xyzw(): number[] {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
                this.values[3]
            ];
        }

        set x(value: number) {
            this.values[0] = value;
        }

        set y(value: number) {
            this.values[1] = value;
        }

        set z(value: number) {
            this.values[2] = value;
        }

        set w(value: number) {
            this.values[3] = value;
        }

        set xy(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        }

        set xyz(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        }

        set xyzw(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
            this.values[3] = values[3];
        }

        constructor (values: number[] = null) {
            if (values) {
                this.xyzw = values;
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        reset(): void {
            for (var i = 0; i < 4; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: quat = null): quat {
            if (!dest) dest = new quat();

            for (var i = 0; i < 4; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        roll(): number {
            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
        }

        pitch(): number {
            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
        }

        yaw(): number {
            return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
        }

        equals(vector: quat, threshold = EPSILON): bool {
            for (var i = 0; i < 4; i++) {
                if (Math.abs(this.values[i] - vector.at(i)) > threshold)
                    return false;
            }

            return true;
        }

        setIdentity(): quat {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;

            return this;
        }

        calculateW(): quat {
            var x = this.x,
                y = this.y,
                z = this.z;

            this.w = -(Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z)));

            return this;
        }

        static dot(q1: quat, q2: quat): number {
            return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
        }

        inverse(dest: quat = null): quat {
            if (!dest) dest = this;

            var dot = quat.dot(this, this);

            if (!dot) {
                for (var i = 0; i < 4; i++) {
                    dest.values[i] = 0;
                }

                return dest;
            }

            var invDot = dot ? 1.0 / dot : 0;

            dest.x = this.x * -invDot;
            dest.y = this.y * -invDot;
            dest.z = this.z * -invDot;
            dest.w = this.w * invDot;

            return dest;
        }

        conjugate(dest: quat = null): quat {
            if (!dest) dest = this;

            dest.x = this.x * -1;
            dest.y = this.y * -1;
            dest.z = this.z * -1;

            return dest;
        }

        length(): number {
            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return Math.sqrt(x * x + y * y + z * z + w * w);
        }

        normalize(dest: quat = null): quat {
            if (!dest) dest = this;

            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            var length = Math.sqrt(x * x + y * y + z * z + w * w);

            if (!length) {
                for (var i = 0; i < 4; i++) {
                    dest.values[i] = 0;
                }

                return dest;
            }

            length = 1 / length;

            dest.x = x * length;
            dest.y = y * length;
            dest.z = z * length;
            dest.w = w * length;

            return dest;
        }

        add(other: quat): quat {
            for (var i = 0; i < 4; i++) {
                this.values[i] += other.values[i];
            }

            return this;
        }

        multiply(other: quat): quat {
            var qax = this.x,
                qay = this.y,
                qaz = this.z,
                qaw = this.w;

            var qbx = other.x,
                qby = other.y,
                qbz = other.z,
                qbw = other.w;

            this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

            return this;
        }

        multiplyVec3(vector: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            var x = vector.x,
                y = vector.y,
                z = vector.z;

            var qx = this.x,
                qy = this.y,
                qz = this.z,
                qw = this.w;

            var ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return dest;
        }

        toMat3(dest: mat3 = null): mat3 {
            if (!dest) dest = new mat3();

            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            var x2 = x + x,
                y2 = y + y,
                z2 = z + z;

            var xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            dest.init([
                    1 - (yy + zz),
                    xy + wz,
                    xz - wy,

                    xy - wz,
                    1 - (xx + zz),
                    yz + wx,

                    xz + wy,
                    yz - wx,
                    1 - (xx + yy)
            ]);

            return dest;
        }

        toMat4(dest: mat4 = null): mat4 {
            if (!dest) dest = new mat4();

            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            var x2 = x + x,
                y2 = y + y,
                z2 = z + z;

            var xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            dest.init([
                1 - (yy + zz),
                xy + wz,
                xz - wy,
                0,

                xy - wz,
                1 - (xx + zz),
                yz + wx,
                0,

                xz + wy,
                yz - wx,
                1 - (xx + yy),
                0,

                0,
                0,
                0,
                1
            ]);

            return dest;
        }

        static sum(q1: quat, q2: quat, dest: quat = null): quat {
            if (!dest) dest = new quat();

            dest.x = q1.x + q2.x;
            dest.y = q1.y + q2.y;
            dest.z = q1.z + q2.z;
            dest.w = q1.w + q2.w;

            return dest;
        }

        static product(q1: quat, q2: quat, dest: quat = null): quat {
            if (!dest) dest = new quat();

            var qax = q1.x,
                qay = q1.y,
                qaz = q1.z,
                qaw = q1.w;

            var qbx = q2.x,
                qby = q2.y,
                qbz = q2.z,
                qbw = q2.w;

            dest.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            dest.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            dest.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            dest.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

            return dest;
        }

        static interpolate(q1: quat, q2: quat, time: number, dest: quat = null): quat {
            if (!dest) dest = new quat();

            var cosHalfTheta = q1.x * q2.x +
                                q1.y * q2.y +
                                q1.z * q2.z +
                                q1.w * q2.w;

            if (Math.abs(cosHalfTheta) >= 1.0) {
                q1.copy(dest);

                return dest;
            }

            var halfTheta = Math.acos(cosHalfTheta);
            var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

            if (Math.abs(sinHalfTheta) < 0.001) {
                dest.x = (q1.x * 0.5 + q2.x * 0.5);
                dest.y = (q1.y * 0.5 + q2.y * 0.5);
                dest.z = (q1.z * 0.5 + q2.z * 0.5);
                dest.w = (q1.w * 0.5 + q2.w * 0.5);

                return dest;
            }

            var ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta;
            var ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

            dest.x = (q1.x * ratioA + q2.x * ratioB);
            dest.y = (q1.y * ratioA + q2.y * ratioB);
            dest.z = (q1.z * ratioA + q2.z * ratioB);
            dest.w = (q1.w * ratioA + q2.w * ratioB);

            return dest;
        }

        static identity = new quat().setIdentity();

    }

}



