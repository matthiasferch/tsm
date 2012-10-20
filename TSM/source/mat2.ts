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

    export class mat2 {

        private values = new Float32Array(4);

        constructor (values: number[] = null) {
            if (values) {
                this.init(values);
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        init(values: number[]): mat2 {
            for (var i = 0; i < 4; i++) {
                this.values[i] = values[i];
            }

            return this;
        }

        reset(): void {
            for (var i = 0; i < 4; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: mat2 = null): mat2 {
            if (!dest) dest = new mat2();

            for (var i = 0; i < 4; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        all(): number[] {
            var data: number[] = [];
            for (var i = 0; i < 4; i++) {
                data[i] = this.values[i];
            }

            return data;
        }

        row(index: number): number[] {
            return [
                this.values[index * 2 + 0],
                this.values[index * 2 + 1]
            ];
        }

        col(index: number): number[] {
            return [
                this.values[index],
                this.values[index + 2]
            ];
        }

        equals(matrix: mat2): bool {
            for (var i = 0; i < 4; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > EPSILON)
                    return false;
            }

            return true;
        }

        determinant(): number {
            return this.values[00] * this.values[03] - this.values[02] * this.values[01];
        }

        setIdentity(): mat2 {
            this.values[00] = 1;
            this.values[01] = 0;
            this.values[02] = 0;
            this.values[03] = 1;

            return this;
        }

        transpose(): mat2 {
            var temp = this.values[01];

            this.values[01] = this.values[02];
            this.values[02] = temp;

            return this;
        }

        inverse(): mat2 {
            var det = this.determinant();

            if (!det) return null;

            det = 1.0 / det;

            this.values[00] = det * (this.values[03]);
            this.values[01] = det * (-this.values[01]);
            this.values[02] = det * (-this.values[02]);
            this.values[03] = det * (this.values[00]);

            return this;
        }

        multiply(matrix: mat2): mat2 {
            var a11 = this.values[00],
                a12 = this.values[01],
                a21 = this.values[02],
                a22 = this.values[03];

            this.values[00] = a11 * matrix.at(00) + a12 * matrix.at(02);
            this.values[01] = a11 * matrix.at(01) + a12 * matrix.at(03);
            this.values[02] = a21 * matrix.at(00) + a22 * matrix.at(02);
            this.values[03] = a21 * matrix.at(01) + a22 * matrix.at(03);

            return this;
        }

        rotate(angle: number): mat2 {
            var a11 = this.values[00],
                a12 = this.values[01],
                a21 = this.values[02],
                a22 = this.values[03];

            var sin = Math.sin(angle),
                cos = Math.cos(angle);

            this.values[00] = a11 * cos + a12 * sin;
            this.values[01] = a11 * -sin + a12 * cos;
            this.values[02] = a21 * cos + a22 * sin;
            this.values[03] = a21 * -sin + a22 * cos;

            return this;
        }

        multiplyVec2(vector: vec2): vec2 {
           var x = vector.x,
               y = vector.y;

            return new vec2([
                x * this.values[00] + y * this.values[01],
                x * this.values[02] + y * this.values[03]
            ]);
        }

        scale(vector: vec2): mat2 {
            var a11 = this.values[00],
                a12 = this.values[01],
                a21 = this.values[02],
                a22 = this.values[03];

            var x = vector.x,
                y = vector.y;

            this.values[00] = a11 * x;
            this.values[01] = a12 * y;
            this.values[02] = a21 * x;
            this.values[03] = a22 * y;

            return this;
        }

        static product(m1: mat2, m2: mat2, result: mat2 = null): mat2 {
            var a11 = m1.at(00),
                a12 = m1.at(01),
                a21 = m1.at(02),
                a22 = m1.at(03);

            if (result) {
                result.init([
                    a11 * m2.at(00) + a12 * m2.at(02),
                    a11 * m2.at(01) + a12 * m2.at(03),
                    a21 * m2.at(00) + a22 * m2.at(02),
                    a21 * m2.at(01) + a22 * m2.at(03)
                ]);
            }
            else {
                return new mat2([
                    a11 * m2.at(00) + a12 * m2.at(02),
                    a11 * m2.at(01) + a12 * m2.at(03),
                    a21 * m2.at(00) + a22 * m2.at(02),
                    a21 * m2.at(01) + a22 * m2.at(03)
                ]);
            }
        }

        static identity = new mat2().setIdentity();

    }

}



