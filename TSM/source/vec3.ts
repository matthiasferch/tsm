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

    export class vec3 {

        private values = new Float32Array(3);

        get x(): number {
            return this.values[0];
        }

        get y(): number {
            return this.values[1];
        }

        get z(): number {
            return this.values[2];
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

        set x(value: number) {
            this.values[0] = value;
        }

        set y(value: number) {
            this.values[1] = value;
        }

        set z(value: number) {
            this.values[2] = value;
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

        constructor(values: number[]= null) {
            if (values) {
                this.xyz = values;
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        reset(): void {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }

        copy(dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = this.x;
            dest.y = this.y;
            dest.z = this.z;

            return dest;
        }

        negate(dest: vec3 = null): vec3 {
            if (!dest) dest = this;

            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;

            return dest;
        }

        equals(vector: vec3, threshold = EPSILON): boolean {
            if (Math.abs(this.x - vector.x) > threshold)
                return false;

            if (Math.abs(this.y - vector.y) > threshold)
                return false;

            if (Math.abs(this.z - vector.z) > threshold)
                return false;

            return true;
        }

        length(): number {
            return Math.sqrt(this.squaredLength());
        }

        squaredLength(): number {
            var x = this.x,
                y = this.y,
                z = this.z;

            return (x * x + y * y + z * z);
        }

        add(vector: vec3): vec3 {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;

            return this;
        }

        subtract(vector: vec3): vec3 {
            this.x -= vector.x;
            this.y -= vector.y;
            this.z -= vector.z;

            return this;
        }

        multiply(vector: vec3): vec3 {
            this.x *= vector.x;
            this.y *= vector.y;
            this.z *= vector.z;

            return this;
        }

        divide(vector: vec3): vec3 {
            this.x /= vector.x;
            this.y /= vector.y;
            this.z /= vector.z;

            return this;
        }

        scale(value: number, dest: vec3 = null): vec3 {
            if (!dest) dest = this;

            dest.x *= value;
            dest.y *= value;
            dest.z *= value;

            return dest;
        }

        normalize(dest: vec3 = null): vec3 {
            if (!dest) dest = this;

            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                dest.x = 0;
                dest.y = 0;
                dest.z = 0;

                return dest;
            }

            length = 1.0 / length;

            dest.x *= length;
            dest.y *= length;
            dest.z *= length;

            return dest;
        }

        multiplyByMat3(matrix: mat3, dest: vec3 = null): vec3 {
            if (!dest) dest = this;

            return matrix.multiplyVec3(this, dest);
        }

        multiplyByQuat(quat: quat, dest: vec3 = null): vec3 {
            if (!dest) dest = this;

            return quat.multiplyVec3(this, dest);
        }

        static cross(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            var x = vector.x,
                y = vector.y,
                z = vector.z;

            var x2 = vector2.x,
                y2 = vector2.y,
                z2 = vector2.z;

            dest.x = y * z2 - z * y2;
            dest.y = z * x2 - x * z2;
            dest.z = x * y2 - y * x2;

            return dest;
        }

        static dot(vector: vec3, vector2: vec3): number {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            var x2 = vector2.x,
                y2 = vector2.y,
                z2 = vector2.z;

            return (x * x2 + y * y2 + z * z2);
        }

        static distance(vector: vec3, vector2: vec3): number {
            var x = vector2.x - vector.x,
                y = vector2.y - vector.y,
                z = vector2.z - vector.z;

            return Math.sqrt(this.squaredDistance(vector, vector2));
        }

        static squaredDistance(vector: vec3, vector2: vec3): number {
            var x = vector2.x - vector.x,
                y = vector2.y - vector.y,
                z = vector2.z - vector.z;

            return (x * x + y * y + z * z);
        }

        static direction(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            var x = vector.x - vector2.x,
                y = vector.y - vector2.y,
                z = vector.z - vector2.z;

            var length = Math.sqrt(x * x + y * y + z * z);

            if (length === 0) {
                dest.x = 0;
                dest.y = 0;
                dest.z = 0;

                return dest;
            }

            length = 1 / length;

            dest.x = x * length;
            dest.y = y * length;
            dest.z = z * length;

            return dest;
        }

        static mix(vector: vec3, vector2: vec3, time: number, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = vector.x + time * (vector2.x - vector.x);
            dest.y = vector.y + time * (vector2.y - vector.y);
            dest.z = vector.z + time * (vector2.z - vector.z);

            return dest;
        }

        static sum(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = vector.x + vector2.x;
            dest.y = vector.y + vector2.y;
            dest.z = vector.z + vector2.z;

            return dest;
        }

        static difference(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = vector.x - vector2.x;
            dest.y = vector.y - vector2.y;
            dest.z = vector.z - vector2.z;

            return dest;
        }

        static product(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = vector.x * vector2.x;
            dest.y = vector.y * vector2.y;
            dest.z = vector.z * vector2.z;

            return dest;
        }

        static quotient(vector: vec3, vector2: vec3, dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            dest.x = vector.x / vector2.x;
            dest.y = vector.y / vector2.y;
            dest.z = vector.z / vector2.z;

            return dest;
        }

        toQuat(dest: quat = null): quat {
            if (!dest) dest = new quat();

            var c = new vec3();
            var s = new vec3();

            c.x = Math.cos(this.x * 0.5);
            s.x = Math.sin(this.x * 0.5);

            c.y = Math.cos(this.y * 0.5);
            s.y = Math.sin(this.y * 0.5);

            c.z = Math.cos(this.z * 0.5);
            s.z = Math.sin(this.z * 0.5);

            dest.x = s.x * c.y * c.z - c.x * s.y * s.z;
            dest.y = c.x * s.y * c.z + s.x * c.y * s.z;
            dest.z = c.x * c.y * s.z - s.x * s.y * c.z;
            dest.w = c.x * c.y * c.z + s.x * s.y * s.z;

            return dest;
        }

        static zero = new vec3([0, 0, 0]);

        static up = new vec3([0, 1, 0]);
        static right = new vec3([1, 0, 0]);
        static forward = new vec3([0, 0, 1]);
    }

}



