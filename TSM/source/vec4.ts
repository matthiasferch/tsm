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

    export class vec4 {

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

        get r(): number {
            return this.values[0];
        }

        get g(): number {
            return this.values[1];
        }

        get b(): number {
            return this.values[2];
        }

        get a(): number {
            return this.values[3];
        }

        get rg(): number[] {
            return [
                this.values[0],
                this.values[1]
            ];
        }

        get rgb(): number[] {
            return [
                this.values[0],
                this.values[1],
                this.values[2]
            ];
        }

        get rgba(): number[] {
            return [
                this.values[0],
                this.values[1],
                this.values[2],
                this.values[3]
            ];
        }

        set r(value: number) {
            this.values[0] = value;
        }

        set g(value: number) {
            this.values[1] = value;
        }

        set b(value: number) {
            this.values[2] = value;
        }

        set a(value: number) {
            this.values[3] = value;
        }

        set rg(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        }

        set rgb(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        }

        set rgba(values: number[]) {
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

        copy(dest: vec4 = null): vec4 {
            if (!dest) dest = new vec4();

            for (var i = 0; i < 4; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        negate(): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] *= -1;
            }

            return this;
        }

        equals(vector: vec4, threshold = EPSILON): bool {
            for (var i = 0; i < 4; i++) {
                if (Math.abs(this.values[i] - vector.at(i)) > threshold)
                    return false;
            }

            return true;
        }

        length(): number {
            return Math.sqrt(this.squaredLength());
        }

        squaredLength(): number {
            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;

            return (x * x + y * y + z * z + w * w);
        }

        add(vector: vec4): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] += vector.at(i);
            }

            return this;
        }

        subtract(vector: vec4): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] -= vector.at(i);
            }

            return this;
        }

        multiply(vector: vec4): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] *= vector.at(i);
            }

            return this;
        }

        divide(vector: vec4): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] /= vector.at(i);
            }

            return this;
        }

        scale(value: number): vec4 {
            for (var i = 0; i < 4; i++) {
                this.values[i] *= value;
            }

            return this;
        }

        normalize(): vec4 {
            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                for (var i = 0; i < 4; i++) {
                    this.values[i] = 0;
                }

                return this;
            }

            length = 1.0 / length;

            for (var i = 0; i < 4; i++) {
                this.values[i] *= length;
            }

            return this;
        }

        static interpolate(vector: vec4, vector2: vec4, time: number, result: vec4 = null): vec4 {
            if (result) {
                result.xyzw = [
                    vector.x + time * (vector2.x - vector.x),
                    vector.y + time * (vector2.y - vector.y),
                    vector.z + time * (vector2.z - vector.z),
                    vector.w + time * (vector2.w - vector.w)
                ];
            }
            else {
                return new vec4([
                    vector.x + time * (vector2.x - vector.x),
                    vector.y + time * (vector2.y - vector.y),
                    vector.z + time * (vector2.z - vector.z),
                    vector.w + time * (vector2.w - vector.w)
                ]);
            }
        }

        static sum(vector: vec4, vector2: vec4, result: vec4 = null): vec4 {
            if (result) {
                result.xyzw = [
                    vector.x + vector2.x,
                    vector.y + vector2.y,
                    vector.z + vector2.z,
                    vector.w + vector2.w
                ];
            }
            else {
                return new vec4([
                    vector.x + vector2.x,
                    vector.y + vector2.y,
                    vector.z + vector2.z,
                    vector.w + vector2.w
                ]);
            }
        }

        static difference(vector: vec4, vector2: vec4, result: vec4 = null): vec4 {
            if (result) {
                result.xyzw = [
                    vector.x - vector2.x,
                    vector.y - vector2.y,
                    vector.z - vector2.z,
                    vector.w - vector2.w
                ];
            }
            else {
                return new vec4([
                    vector.x - vector2.x,
                    vector.y - vector2.y,
                    vector.z - vector2.z,
                    vector.w - vector2.w
                ]);
            }
        }

        static product(vector: vec4, vector2: vec4, result: vec4 = null): vec4 {
            if (result) {
                result.xyzw = [
                    vector.x * vector2.x,
                    vector.y * vector2.y,
                    vector.z * vector2.z,
                    vector.w * vector2.w
                ];
            }
            else {
                return new vec4([
                    vector.x * vector2.x,
                    vector.y * vector2.y,
                    vector.z * vector2.z,
                    vector.w * vector2.w
                ]);
            }
        }

        static quotient(vector: vec4, vector2: vec4, result: vec4 = null): vec4 {
            if (result) {
                result.xyzw = [
                    vector.x / vector2.x,
                    vector.y / vector2.y,
                    vector.z / vector2.z,
                    vector.w / vector2.w
                ];
            }
            else {
                return new vec4([
                    vector.x / vector2.x,
                    vector.y / vector2.y,
                    vector.z / vector2.z,
                    vector.w / vector2.w
                ]);
            }
        }

        static zero = new vec4([0, 0, 0, 1]);
    }

}



