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

    export class mat3 {

        private values = new Float32Array(9);

        constructor(values: number[]= null) {
            if (values) {
                this.init(values);
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        init(values: number[]): mat3 {
            for (var i = 0; i < 9; i++) {
                this.values[i] = values[i];
            }

            return this;
        }

        reset(): void {
            for (var i = 0; i < 9; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: mat3 = null): mat3 {
            if (!dest) dest = new mat3();

            for (var i = 0; i < 9; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        all(): number[] {
            var data: number[] = [];
            for (var i = 0; i < 9; i++) {
                data[i] = this.values[i];
            }

            return data;
        }

        row(index: number): number[] {
            return [
                this.values[index * 3 + 0],
                this.values[index * 3 + 1],
                this.values[index * 3 + 2]
            ];
        }

        col(index: number): number[] {
            return [
                this.values[index],
                this.values[index + 3],
                this.values[index + 6]
            ];
        }

        equals(matrix: mat3, threshold = EPSILON): boolean {
            for (var i = 0; i < 9; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > threshold)
                    return false;
            }

            return true;
        }

        determinant(): number {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2],
                a10 = this.values[3], a11 = this.values[4], a12 = this.values[5],
                a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var det01 = a22 * a11 - a12 * a21,
                det11 = -a22 * a10 + a12 * a20,
                det21 = a21 * a10 - a11 * a20;

            return a00 * det01 + a01 * det11 + a02 * det21;
        }

        setIdentity(): mat3 {
            this.values[0] = 1;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 1;
            this.values[5] = 0;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = 1;

            return this;
        }

        transpose(): mat3 {
            var temp01 = this.values[1],
                temp02 = this.values[2],
                temp12 = this.values[5];

            this.values[1] = this.values[3];
            this.values[2] = this.values[6];
            this.values[3] = temp01;
            this.values[5] = this.values[7];
            this.values[6] = temp02;
            this.values[7] = temp12;

            return this;
        }

        inverse(): mat3 {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2],
                a10 = this.values[3], a11 = this.values[4], a12 = this.values[5],
                a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var det01 = a22 * a11 - a12 * a21,
                det11 = -a22 * a10 + a12 * a20,
                det21 = a21 * a10 - a11 * a20;

            var det = a00 * det01 + a01 * det11 + a02 * det21;

            if (!det)
                return null;

            det = 1.0 / det;

            this.values[0] = det01 * det;
            this.values[1] = (-a22 * a01 + a02 * a21) * det;
            this.values[2] = (a12 * a01 - a02 * a11) * det;
            this.values[3] = det11 * det;
            this.values[4] = (a22 * a00 - a02 * a20) * det;
            this.values[5] = (-a12 * a00 + a02 * a10) * det;
            this.values[6] = det21 * det;
            this.values[7] = (-a21 * a00 + a01 * a20) * det;
            this.values[8] = (a11 * a00 - a01 * a10) * det;

            return this;
        }

        multiply(matrix: mat3): mat3 {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2],
                a10 = this.values[3], a11 = this.values[4], a12 = this.values[5],
                a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var b00 = matrix.at(0), b01 = matrix.at(1), b02 = matrix.at(2),
                b10 = matrix.at(3), b11 = matrix.at(4), b12 = matrix.at(5),
                b20 = matrix.at(6), b21 = matrix.at(7), b22 = matrix.at(8);

            this.values[0] = b00 * a00 + b01 * a10 + b02 * a20;
            this.values[1] = b00 * a01 + b01 * a11 + b02 * a21;
            this.values[2] = b00 * a02 + b01 * a12 + b02 * a22;

            this.values[3] = b10 * a00 + b11 * a10 + b12 * a20;
            this.values[4] = b10 * a01 + b11 * a11 + b12 * a21;
            this.values[5] = b10 * a02 + b11 * a12 + b12 * a22;

            this.values[6] = b20 * a00 + b21 * a10 + b22 * a20;
            this.values[7] = b20 * a01 + b21 * a11 + b22 * a21;
            this.values[8] = b20 * a02 + b21 * a12 + b22 * a22;

            return this;
        }

        multiplyVec2(vector: vec2, result: vec2 = null): vec2 {
            var x = vector.x,
                y = vector.y;

            if (result) {
                result.xy = [
                    x * this.values[0] + y * this.values[3] + this.values[6],
                    x * this.values[1] + y * this.values[4] + this.values[7]
                ];

                return result;
            }
            else {
                return new vec2([
                    x * this.values[0] + y * this.values[3] + this.values[6],
                    x * this.values[1] + y * this.values[4] + this.values[7]
                ]);
            }
        }

        multiplyVec3(vector: vec3, result: vec3 = null): vec3 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            if (result) {
                result.xyz = [
                    x * this.values[0] + y * this.values[3] + z * this.values[6],
                    x * this.values[1] + y * this.values[4] + z * this.values[7],
                    x * this.values[2] + y * this.values[5] + z * this.values[8]
                ];

                return result;
            }
            else {
                return new vec3([
                    x * this.values[0] + y * this.values[3] + z * this.values[6],
                    x * this.values[1] + y * this.values[4] + z * this.values[7],
                    x * this.values[2] + y * this.values[5] + z * this.values[8]
                ]);
            }
        }

        toMat4(result: mat4 = null): mat4 {
            if (result) {
                result.init([
                    this.values[0],
                    this.values[1],
                    this.values[2],
                    0,

                    this.values[3],
                    this.values[4],
                    this.values[5],
                    0,

                    this.values[6],
                    this.values[7],
                    this.values[8],
                    0,

                    0,
                    0,
                    0,
                    1
                ]);

                return result;
            }
            else {
                return new mat4([
                    this.values[0],
                    this.values[1],
                    this.values[2],
                    0,

                    this.values[3],
                    this.values[4],
                    this.values[5],
                    0,

                    this.values[6],
                    this.values[7],
                    this.values[8],
                    0,

                    0,
                    0,
                    0,
                    1
                ]);
            }
        }

        toQuat(): quat {
            var m00 = this.values[0], m01 = this.values[1], m02 = this.values[2],
                m10 = this.values[3], m11 = this.values[4], m12 = this.values[5],
                m20 = this.values[6], m21 = this.values[7], m22 = this.values[8];

            var fourXSquaredMinus1 = m00 - m11 - m22;
            var fourYSquaredMinus1 = m11 - m00 - m22;
            var fourZSquaredMinus1 = m22 - m00 - m11;
            var fourWSquaredMinus1 = m00 + m11 + m22;

            var biggestIndex = 0;

            var fourBiggestSquaredMinus1 = fourWSquaredMinus1;

            if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
                fourBiggestSquaredMinus1 = fourXSquaredMinus1;
                biggestIndex = 1;
            }

            if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
                fourBiggestSquaredMinus1 = fourYSquaredMinus1;
                biggestIndex = 2;
            }

            if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
                fourBiggestSquaredMinus1 = fourZSquaredMinus1;
                biggestIndex = 3;
            }

            var biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
            var mult = 0.25 / biggestVal;

            var result = new quat();

            switch (biggestIndex) {
                case 0:

                    result.w = biggestVal;
                    result.x = (m12 - m21) * mult;
                    result.y = (m20 - m02) * mult;
                    result.z = (m01 - m10) * mult;

                    break;

                case 1:

                    result.w = (m12 - m21) * mult;
                    result.x = biggestVal;
                    result.y = (m01 + m10) * mult;
                    result.z = (m20 + m02) * mult;

                    break;

                case 2:

                    result.w = (m20 - m02) * mult;
                    result.x = (m01 + m10) * mult;
                    result.y = biggestVal;
                    result.z = (m12 + m21) * mult;

                    break;

                case 3:

                    result.w = (m01 - m10) * mult;
                    result.x = (m20 + m02) * mult;
                    result.y = (m12 + m21) * mult;
                    result.z = biggestVal;

                    break;
            }

            return result;
        }

        rotate(angle: number, axis: vec3): mat3 {
            var x = axis.x,
                y = axis.y,
                z = axis.z;

            var length = Math.sqrt(x * x + y * y + z * z);

            if (!length)
                return null;

            if (length !== 1) {
                length = 1 / length;
                x *= length;
                y *= length;
                z *= length;
            }

            var s = Math.sin(angle);
            var c = Math.cos(angle);

            var t = 1.0 - c;

            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2],
                a10 = this.values[4], a11 = this.values[5], a12 = this.values[6],
                a20 = this.values[8], a21 = this.values[9], a22 = this.values[10];

            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s,
                b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s,
                b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

            this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
            this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
            this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;

            this.values[3] = a00 * b10 + a10 * b11 + a20 * b12;
            this.values[4] = a01 * b10 + a11 * b11 + a21 * b12;
            this.values[5] = a02 * b10 + a12 * b11 + a22 * b12;

            this.values[6] = a00 * b20 + a10 * b21 + a20 * b22;
            this.values[7] = a01 * b20 + a11 * b21 + a21 * b22;
            this.values[8] = a02 * b20 + a12 * b21 + a22 * b22;

            return this;
        }

        static product(m1: mat3, m2: mat3, result: mat3 = null): mat3 {
            var a00 = m1.at(0), a01 = m1.at(1), a02 = m1.at(2),
                a10 = m1.at(3), a11 = m1.at(4), a12 = m1.at(5),
                a20 = m1.at(6), a21 = m1.at(7), a22 = m1.at(8);

            var b00 = m2.at(0), b01 = m2.at(1), b02 = m2.at(2),
                b10 = m2.at(3), b11 = m2.at(4), b12 = m2.at(5),
                b20 = m2.at(6), b21 = m2.at(7), b22 = m2.at(8);

            if (result) {
                result.init([
                    b00 * a00 + b01 * a10 + b02 * a20,
                    b00 * a01 + b01 * a11 + b02 * a21,
                    b00 * a02 + b01 * a12 + b02 * a22,

                    b10 * a00 + b11 * a10 + b12 * a20,
                    b10 * a01 + b11 * a11 + b12 * a21,
                    b10 * a02 + b11 * a12 + b12 * a22,

                    b20 * a00 + b21 * a10 + b22 * a20,
                    b20 * a01 + b21 * a11 + b22 * a21,
                    b20 * a02 + b21 * a12 + b22 * a22
                ]);

                return result;
            }
            else {
                return new mat3([
                    b00 * a00 + b01 * a10 + b02 * a20,
                    b00 * a01 + b01 * a11 + b02 * a21,
                    b00 * a02 + b01 * a12 + b02 * a22,

                    b10 * a00 + b11 * a10 + b12 * a20,
                    b10 * a01 + b11 * a11 + b12 * a21,
                    b10 * a02 + b11 * a12 + b12 * a22,

                    b20 * a00 + b21 * a10 + b22 * a20,
                    b20 * a01 + b21 * a11 + b22 * a21,
                    b20 * a02 + b21 * a12 + b22 * a22
                ]);
            }
        }

        static identity = new mat3().setIdentity();

    }

}



