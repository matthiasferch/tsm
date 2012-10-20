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

    export class mat4 {

        private values = new Float32Array(16);

        constructor (values: number[] = null) {
            if (values) {
                this.init(values);
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        init(values: number[]): mat4 {
            for (var i = 0; i < 16; i++) {
                this.values[i] = values[i];
            }

            return this;
        }

        reset(): void {
            for (var i = 0; i < 16; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: mat4 = null): mat4 {
            if (!dest) dest = new mat4();

            for (var i = 0; i < 16; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        all(): number[] {
            var data: number[] = [];
            for (var i = 0; i < 16; i++) {
                data[i] = this.values[i];
            }

            return data;
        }

        row(index: number): number[] {
            return [
                this.values[index * 4 + 0],
                this.values[index * 4 + 1],
                this.values[index * 4 + 2],
                this.values[index * 4 + 3]
            ];
        }

        col(index: number): number[] {
            return [
                this.values[index],
                this.values[index + 4],
                this.values[index + 8],
                this.values[index + 12]
            ];
        }

        equals(matrix: mat4): bool {
            for (var i = 0; i < 16; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > EPSILON)
                    return false;
            }

            return true;
        }

        determinant(): number {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02], a03 = this.values[03],
                a10 = this.values[04], a11 = this.values[05], a12 = this.values[06], a13 = this.values[07],
                a20 = this.values[08], a21 = this.values[09], a22 = this.values[10], a23 = this.values[11],
                a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var det00 = a00 * a11 - a01 * a10,
                det01 = a00 * a12 - a02 * a10,
                det02 = a00 * a13 - a03 * a10,
                det03 = a01 * a12 - a02 * a11,
                det04 = a01 * a13 - a03 * a11,
                det05 = a02 * a13 - a03 * a12,
                det06 = a20 * a31 - a21 * a30,
                det07 = a20 * a32 - a22 * a30,
                det08 = a20 * a33 - a23 * a30,
                det09 = a21 * a32 - a22 * a31,
                det10 = a21 * a33 - a23 * a31,
                det11 = a22 * a33 - a23 * a32;

            return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
        }

        setIdentity(): mat4 {
            this.values[00] = 1;
            this.values[01] = 0;
            this.values[02] = 0;
            this.values[03] = 0;
            this.values[04] = 0;
            this.values[05] = 1;
            this.values[06] = 0;
            this.values[07] = 0;
            this.values[08] = 0;
            this.values[09] = 0;
            this.values[10] = 1;
            this.values[11] = 0;
            this.values[12] = 0;
            this.values[13] = 0;
            this.values[14] = 0;
            this.values[15] = 1;

            return this;
        }

        transpose(): mat4 {
            var temp01 = this.values[01], temp02 = this.values[02],
                temp03 = this.values[03], temp12 = this.values[06],
                temp13 = this.values[07], temp23 = this.values[11];

            this.values[01] = this.values[04];
            this.values[02] = this.values[08];
            this.values[03] = this.values[12];
            this.values[04] = temp01;
            this.values[06] = this.values[09];
            this.values[07] = this.values[13];
            this.values[08] = temp02;
            this.values[09] = temp12;
            this.values[11] = this.values[14];
            this.values[12] = temp03;
            this.values[13] = temp13;
            this.values[14] = temp23;

            return this;
        }

        inverse(): mat4 {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02], a03 = this.values[03],
                a10 = this.values[04], a11 = this.values[05], a12 = this.values[06], a13 = this.values[07],
                a20 = this.values[08], a21 = this.values[09], a22 = this.values[10], a23 = this.values[11],
                a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var det00 = a00 * a11 - a01 * a10,
                det01 = a00 * a12 - a02 * a10,
                det02 = a00 * a13 - a03 * a10,
                det03 = a01 * a12 - a02 * a11,
                det04 = a01 * a13 - a03 * a11,
                det05 = a02 * a13 - a03 * a12,
                det06 = a20 * a31 - a21 * a30,
                det07 = a20 * a32 - a22 * a30,
                det08 = a20 * a33 - a23 * a30,
                det09 = a21 * a32 - a22 * a31,
                det10 = a21 * a33 - a23 * a31,
                det11 = a22 * a33 - a23 * a32;

            var det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);

            if (!det)
                return null;

            det = 1.0 / det;

            this.values[00] = (a11 * det11 - a12 * det10 + a13 * det09) * det;
            this.values[01] = (-a01 * det11 + a02 * det10 - a03 * det09) * det;
            this.values[02] = (a31 * det05 - a32 * det04 + a33 * det03) * det;
            this.values[03] = (-a21 * det05 + a22 * det04 - a23 * det03) * det;
            this.values[04] = (-a10 * det11 + a12 * det08 - a13 * det07) * det;
            this.values[05] = (a00 * det11 - a02 * det08 + a03 * det07) * det;
            this.values[06] = (-a30 * det05 + a32 * det02 - a33 * det01) * det;
            this.values[07] = (a20 * det05 - a22 * det02 + a23 * det01) * det;
            this.values[08] = (a10 * det10 - a11 * det08 + a13 * det06) * det;
            this.values[09] = (-a00 * det10 + a01 * det08 - a03 * det06) * det;
            this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det;
            this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det;
            this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det;
            this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det;
            this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det;
            this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det;

            return this;
        }

        multiply(matrix: mat4): mat4 {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02], a03 = this.values[03];
            var a10 = this.values[04], a11 = this.values[05], a12 = this.values[06], a13 = this.values[07];
            var a20 = this.values[08], a21 = this.values[09], a22 = this.values[10], a23 = this.values[11];
            var a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var b0 = matrix.at(00),
                b1 = matrix.at(01),
                b2 = matrix.at(02),
                b3 = matrix.at(03);

            this.values[00] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[01] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[02] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[03] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = matrix.at(04);
            b1 = matrix.at(05);
            b2 = matrix.at(06);
            b3 = matrix.at(07);

            this.values[04] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[05] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[06] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[07] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = matrix.at(08);
            b1 = matrix.at(09);
            b2 = matrix.at(10);
            b3 = matrix.at(11);

            this.values[08] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[09] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = matrix.at(12);
            b1 = matrix.at(13);
            b2 = matrix.at(14);
            b3 = matrix.at(15);

            this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            return this;
        }

        multiplyVec3(vector: vec3): vec3 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            return new vec3([
                this.values[00] * x + this.values[04] * y + this.values[08] * z + this.values[12],
                this.values[01] * x + this.values[05] * y + this.values[09] * z + this.values[13],
                this.values[02] * x + this.values[06] * y + this.values[10] * z + this.values[14]
            ]);
        }

        multiplyVec4(vector: vec4): vec4 {
            var x = vector.x,
                y = vector.y,
                z = vector.z,
                w = vector.w;

            return new vec4([
                this.values[00] * x + this.values[04] * y + this.values[08] * z + this.values[12] * w,
                this.values[01] * x + this.values[05] * y + this.values[09] * z + this.values[13] * w,
                this.values[02] * x + this.values[06] * y + this.values[10] * z + this.values[14] * w,
                this.values[03] * x + this.values[07] * y + this.values[11] * z + this.values[15] * w
            ]);
        }

        toMat3(): mat3 {
            return new mat3([
                this.values[00],
                this.values[01],
                this.values[02],
                this.values[04],
                this.values[05],
                this.values[06],
                this.values[08],
                this.values[09],
                this.values[10]
            ]);
        }

        toInverseMat3(): mat3 {
            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02],
                a10 = this.values[04], a11 = this.values[05], a12 = this.values[06],
                a20 = this.values[08], a21 = this.values[09], a22 = this.values[10];

            var det01 = a22 * a11 - a12 * a21,
                det11 = -a22 * a10 + a12 * a20,
                det21 = a21 * a10 - a11 * a20;

            var det = a00 * det01 + a01 * det11 + a02 * det21;

            if (!det)
                return null;

            det = 1.0 / det;

            return new mat3([
                det01 * det,
                (-a22 * a01 + a02 * a21) * det,
                (a12 * a01 - a02 * a11) * det,
                det11 * det,
                (a22 * a00 - a02 * a20) * det,
                (-a12 * a00 + a02 * a10) * det,
                det21 * det,
                (-a21 * a00 + a01 * a20) * det,
                (a11 * a00 - a01 * a10) * det
            ]);
        }

        translate(vector: vec3): mat4 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            this.values[12] += this.values[00] * x + this.values[04] * y + this.values[08] * z;
            this.values[13] += this.values[01] * x + this.values[05] * y + this.values[09] * z;
            this.values[14] += this.values[02] * x + this.values[06] * y + this.values[10] * z;
            this.values[15] += this.values[03] * x + this.values[07] * y + this.values[11] * z;

            return this;
        }

        scale(vector: vec3): mat4 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            this.values[00] *= x;
            this.values[01] *= x;
            this.values[02] *= x;
            this.values[03] *= x;

            this.values[04] *= y;
            this.values[05] *= y;
            this.values[06] *= y;
            this.values[07] *= y;

            this.values[08] *= z;
            this.values[09] *= z;
            this.values[10] *= z;
            this.values[11] *= z;

            return this;
        }

        rotate(angle: number, axis: vec3): mat4 {
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

            var a00 = this.values[00], a01 = this.values[01], a02 = this.values[02], a03 = this.values[03],
                a10 = this.values[04], a11 = this.values[05], a12 = this.values[06], a13 = this.values[07],
                a20 = this.values[08], a21 = this.values[09], a22 = this.values[10], a23 = this.values[11];

            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s,
                b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s,
                b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

            this.values[00] = a00 * b00 + a10 * b01 + a20 * b02;
            this.values[01] = a01 * b00 + a11 * b01 + a21 * b02;
            this.values[02] = a02 * b00 + a12 * b01 + a22 * b02;
            this.values[03] = a03 * b00 + a13 * b01 + a23 * b02;

            this.values[04] = a00 * b10 + a10 * b11 + a20 * b12;
            this.values[05] = a01 * b10 + a11 * b11 + a21 * b12;
            this.values[06] = a02 * b10 + a12 * b11 + a22 * b12;
            this.values[07] = a03 * b10 + a13 * b11 + a23 * b12;

            this.values[08] = a00 * b20 + a10 * b21 + a20 * b22;
            this.values[09] = a01 * b20 + a11 * b21 + a21 * b22;
            this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
            this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;

            return this;
        }

        static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
            var rl = (right - left),
                tb = (top - bottom),
                fn = (far - near);

            return new mat4([
                (near * 2) / rl,
                0,
                0,
                0,

                0,
                (near * 2) / tb,
                0,
                0,

                (right + left) / rl,
                (top + bottom) / tb,
                -(far + near) / fn,
                -1,

                0,
                0,
                -(far * near * 2) / fn,
                0
            ]);
        }

        static perspective(fov: number, aspect: number, near: number, far: number): mat4 {
            var top = near * Math.tan(fov * Math.PI / 360.0),
                right = top * aspect;

            return frustum(-right, right, -top, top, near, far);
        }

        static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4 {
            var rl = (right - left),
                tb = (top - bottom),
                fn = (far - near);

            return new mat4([
                2 / rl,
                0,
                0,
                0,

                0,
                2 / tb,
                0,
                0,

                0,
                0,
                -2 / fn,
                0,

                -(left + right) / rl,
                -(top + bottom) / tb,
                -(far + near) / fn,
                1
            ]);
        }

        static lookAt(eye: vec3, center: vec3, up: vec3): mat4 {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2;

            var eyex = eye.x,
                eyey = eye.y,
                eyez = eye.z;

            var upx = up.x,
                upy = up.y,
                upz = up.z;

            var centerx = center.x,
                centery = center.y,
                centerz = center.z;

            if (eyex === centerx && eyey === centery && eyez === centerz) {
                return this.setIdentity();
            }

            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;

            var length = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);

            z0 *= length;
            z1 *= length;
            z2 *= length;

            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;

            length = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

            if (!length) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                length = 1 / length;

                x0 *= length;
                x1 *= length;
                x2 *= length;
            }

            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            length = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

            if (!length) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                length = 1 / length;

                y0 *= length;
                y1 *= length;
                y2 *= length;
            }

            return new mat4([
                x0,
                y0,
                z0,
                0,

                x1,
                y1,
                z1,
                0,

                x2,
                y2,
                z2,
                0,

                -(x0 * eyex + x1 * eyey + x2 * eyez),
                -(y0 * eyex + y1 * eyey + y2 * eyez),
                -(z0 * eyex + z1 * eyey + z2 * eyez),
                1
            ]);
        }

        static product(m1: mat4, m2: mat4, result: mat4 = null): mat4 {
            var a00 = m1.at(00), a01 = m1.at(01), a02 = m1.at(02), a03 = m1.at(03),
                a10 = m1.at(04), a11 = m1.at(05), a12 = m1.at(06), a13 = m1.at(07),
                a20 = m1.at(08), a21 = m1.at(09), a22 = m1.at(10), a23 = m1.at(11),
                a30 = m1.at(12), a31 = m1.at(13), a32 = m1.at(14), a33 = m1.at(15);

            var b00 = m2.at(00), b01 = m2.at(01), b02 = m2.at(02), b03 = m2.at(03),
                b10 = m2.at(04), b11 = m2.at(05), b12 = m2.at(06), b13 = m2.at(07),
                b20 = m2.at(08), b21 = m2.at(09), b22 = m2.at(10), b23 = m2.at(11),
                b30 = m2.at(12), b31 = m2.at(13), b32 = m2.at(14), b33 = m2.at(15);

            if (result) {
                result.init([
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
                    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
                ]);
            }
            else {
                return new mat4([
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
                    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
                ]);
            }
        }

        static identity = new mat4().setIdentity();

    }

}



