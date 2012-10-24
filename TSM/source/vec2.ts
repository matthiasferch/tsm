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

    export class vec2 {

        private values = new Float32Array(2);

        get x(): number {
            return this.values[0];
        }

        get y(): number {
            return this.values[1];
        }

        get xy(): number[] {
            return [
                this.values[0],
                this.values[1]
            ];
        }

        set x(value: number) {
            this.values[0] = value;
        }

        set y(value: number) {
            this.values[1] = value;
        }

        set xy(values: number[]) {
            this.values[0] = values[0];
            this.values[1] = values[1];
        }

        constructor (values: number[] = null) {
            if (values) {
                this.xy = values;
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        reset(): void {
            for (var i = 0; i < 2; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: vec2 = null): vec2 {
            if (!dest) dest = new vec2();

            for (var i = 0; i < 2; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        negate(): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] *= -1;
            }

            return this;
        }

        equals(vector: vec2, threshold = EPSILON): bool {
            for (var i = 0; i < 2; i++) {
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
                y = this.y;

            return (x * x + y * y);
        }

        add(vector: vec2): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] += vector.at(i);
            }

            return this;
        }

        subtract(vector: vec2): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] -= vector.at(i);
            }

            return this;
        }

        multiply(vector: vec2): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] *= vector.at(i);
            }

            return this;
        }

        divide(vector: vec2): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] /= vector.at(i);
            }

            return this;
        }

        scale(value: number): vec2 {
            for (var i = 0; i < 2; i++) {
                this.values[i] *= value;
            }

            return this;
        }

        normalize(): vec2 {
            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                for (var i = 0; i < 2; i++) {
                    this.values[i] = 0;
                }

                return this;
            }

            length = 1.0 / length;

            for (var i = 0; i < 2; i++) {
                this.values[i] *= length;
            }

            return this;
        }

        static cross(vector: vec2, vector2: vec2, result: vec3 = null): vec3 {
            var x = vector.x,
                y = vector.y;

            var x2 = vector2.x,
                y2 = vector2.y;

            var z = x * y2 - y * x2;

            if (result) {
                result.xyz = [0, 0, z];
            }
            else {
                return new vec3([0, 0, z]);
            }
        }

        static dot(vector: vec2, vector2: vec2): number {
            return (vector.x * vector2.x + vector.y * vector2.y);
        }

        static distance(vector: vec2, vector2: vec2): number {
            return Math.sqrt(this.squaredDistance(vector, vector2));
        }

        static squaredDistance(vector: vec2, vector2: vec2): number {
            var x = vector2.x - vector.x,
                y = vector2.y - vector.y;

            return (x * x + y * y);
        }

        static direction(vector: vec2, vector2: vec2, result: vec2 = null): vec2 {
            var x = vector.x - vector2.x,
                y = vector.y - vector2.y;

            var length = Math.sqrt(x * x + y * y);

            if (length === 0) {
                return new vec2([0, 0]);
            }

            length = 1 / length;

            if (result) {
                result.xy = [x * length, y * length];
            }
            else {
                return new vec2([x * length, y * length]);
            }
        }

        static interpolate(vector: vec2, vector2: vec2, time: number, result: vec2 = null): vec2 {
            var x = vector.x,
                y = vector.y;

            var x2 = vector2.x,
                y2 = vector2.y;

            if (result) {
                result.xy = [
                    x + time * (x2 - x),
                    y + time * (y2 - y)
                ];
            }
            else {
                return new vec2([
                    x + time * (x2 - x),
                    y + time * (y2 - y)
                ]);
            }
        }

        static sum(vector: vec2, vector2: vec2, result: vec2 = null): vec2 {
            if (result) {
                result.xy = [
                    vector.x + vector2.x,
                    vector.y + vector2.y
                ];
            }
            else {
                return new vec2([
                    vector.x + vector2.x,
                    vector.y + vector2.y
                ]);
            }
        }

        static difference(vector: vec2, vector2: vec2, result: vec2 = null): vec2 {
            if (result) {
                result.xy = [
                    vector.x - vector2.x,
                    vector.y - vector2.y
                ];
            }
            else {
                return new vec2([
                    vector.x - vector2.x,
                    vector.y - vector2.y
                ]);
            }
        }

        static product(vector: vec2, vector2: vec2, result: vec2 = null): vec2 {
            if (result) {
                result.xy = [
                    vector.x * vector2.x,
                    vector.y * vector2.y
                ];
            }
            else {
                return new vec2([
                    vector.x * vector2.x,
                    vector.y * vector2.y
                ]);
            }
        }

        static quotient(vector: vec2, vector2: vec2, result: vec2 = null): vec2 {
            if (result) {
                result.xy = [
                    vector.x / vector2.x,
                    vector.y / vector2.y
                ];
            }
            else {
                return new vec2([
                    vector.x / vector2.x,
                    vector.y / vector2.y
                ]);
            }
        }

        static zero = new vec2([0, 0]);

    }

}



