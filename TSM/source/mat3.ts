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

        constructor (values: number[] = null) {
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

        equals(matrix: mat3): bool {
            for (var i = 0; i < 9; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > EPSILON)
                    return false;
            }

            return true;
        }

        determinant(): number {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02],
                a10 = this.values[03], a11 = this.values[04], a12 = this.values[05],
                a20 = this.values[06], a21 = this.values[07], a22 = this.values[08];

            var det01 = a22 * a11 - a12 * a21,
                det11 = -a22 * a10 + a12 * a20,
                det21 = a21 * a10 - a11 * a20;

            return a00 * det01 + a01 * det11 + a02 * det21;
        }

        setIdentity(): mat3 {
            this.values[00] = 1;
            this.values[01] = 0;
            this.values[02] = 0;
            this.values[03] = 0;
            this.values[04] = 1;
            this.values[05] = 0;
            this.values[06] = 0;
            this.values[07] = 0;
            this.values[08] = 1;

            return this;
        }

        transpose(): mat3 {
            var temp01 = this.values[01],
                temp02 = this.values[02],
                temp12 = this.values[05];

            this.values[01] = this.values[03];
            this.values[02] = this.values[06];
            this.values[03] = temp01;
            this.values[05] = this.values[07];
            this.values[06] = temp02;
            this.values[07] = temp12;

            return this;
        }

        inverse(): mat3 {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02],
                a10 = this.values[03], a11 = this.values[04], a12 = this.values[05],
                a20 = this.values[06], a21 = this.values[07], a22 = this.values[08];

            var det01 = a22 * a11 - a12 * a21,
                det11 = -a22 * a10 + a12 * a20,
                det21 = a21 * a10 - a11 * a20;

            var det = a00 * det01 + a01 * det11 + a02 * det21;

            if (!det)
                return null;

            det = 1.0 / det;

            this.values[00] = det01 * det;
            this.values[01] = (-a22 * a01 + a02 * a21) * det;
            this.values[02] = (a12 * a01 - a02 * a11) * det;
            this.values[03] = det11 * det;
            this.values[04] = (a22 * a00 - a02 * a20) * det;
            this.values[05] = (-a12 * a00 + a02 * a10) * det;
            this.values[06] = det21 * det;
            this.values[07] = (-a21 * a00 + a01 * a20) * det;
            this.values[08] = (a11 * a00 - a01 * a10) * det;

            return this;
        }

        multiply(matrix: mat3): mat3 {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02],
                a10 = this.values[03], a11 = this.values[04], a12 = this.values[05],
                a20 = this.values[06], a21 = this.values[07], a22 = this.values[08];

            var b00 = matrix.at(00), b01 = matrix.at(01), b02 = matrix.at(02),
                b10 = matrix.at(03), b11 = matrix.at(04), b12 = matrix.at(05),
                b20 = matrix.at(06), b21 = matrix.at(07), b22 = matrix.at(08);

            this.values[00] = b00 * a00 + b01 * a10 + b02 * a20;
            this.values[01] = b00 * a01 + b01 * a11 + b02 * a21;
            this.values[02] = b00 * a02 + b01 * a12 + b02 * a22;

            this.values[03] = b10 * a00 + b11 * a10 + b12 * a20;
            this.values[04] = b10 * a01 + b11 * a11 + b12 * a21;
            this.values[05] = b10 * a02 + b11 * a12 + b12 * a22;

            this.values[06] = b20 * a00 + b21 * a10 + b22 * a20;
            this.values[07] = b20 * a01 + b21 * a11 + b22 * a21;
            this.values[08] = b20 * a02 + b21 * a12 + b22 * a22;

            return this;
        }

        multiplyVec2(vector: vec2): vec2 {
            var x = vector.x,
                y = vector.y;

            return new vec2([
                x * this.values[00] + y * this.values[03] + this.values[06],
                x * this.values[01] + y * this.values[04] + this.values[07]
            ]);
        }

        multiplyVec3(vector: vec3): vec3 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            return new vec3([
                x * this.values[00] + y * this.values[03] + z * this.values[06],
                x * this.values[01] + y * this.values[04] + z * this.values[07],
                x * this.values[02] + y * this.values[05] + z * this.values[08]
            ]);
        }

        toMat4(): mat4 {
            return new mat4([
                this.values[00], this.values[01], this.values[02], 0,
                this.values[03], this.values[04], this.values[05], 0,
                this.values[06], this.values[07], this.values[08], 0,
                0, 0, 0, 1
            ]);
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

            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02],
                a10 = this.values[04], a11 = this.values[05], a12 = this.values[06],
                a20 = this.values[08], a21 = this.values[09], a22 = this.values[10];

            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s,
                b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s,
                b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

            this.values[00] = a00 * b00 + a10 * b01 + a20 * b02;
            this.values[01] = a01 * b00 + a11 * b01 + a21 * b02;
            this.values[02] = a02 * b00 + a12 * b01 + a22 * b02;

            this.values[03] = a00 * b10 + a10 * b11 + a20 * b12;
            this.values[04] = a01 * b10 + a11 * b11 + a21 * b12;
            this.values[05] = a02 * b10 + a12 * b11 + a22 * b12;

            this.values[06] = a00 * b20 + a10 * b21 + a20 * b22;
            this.values[07] = a01 * b20 + a11 * b21 + a21 * b22;
            this.values[08] = a02 * b20 + a12 * b21 + a22 * b22;

            return this;
        }

        static product(m1: mat3, m2: mat3, result: mat3 = null): mat3 {
            var a00 = m1.at(00), a01 = m1.at(01), a02 = m1.at(02),
                a10 = m1.at(03), a11 = m1.at(04), a12 = m1.at(05),
                a20 = m1.at(06), a21 = m1.at(07), a22 = m1.at(08);

            var b00 = m2.at(00), b01 = m2.at(01), b02 = m2.at(02),
                b10 = m2.at(03), b11 = m2.at(04), b12 = m2.at(05),
                b20 = m2.at(06), b21 = m2.at(07), b22 = m2.at(08);

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



