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

        constructor (values: number[] = null) {
            if (values) {
                this.xyz = values;
            }
        }

        at(index: number): number {
            return this.values[index];
        }

        reset(): void {
            for (var i = 0; i < 3; i++) {
                this.values[i] = 0;
            }
        }

        copy(dest: vec3 = null): vec3 {
            if (!dest) dest = new vec3();

            for (var i = 0; i < 3; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        }

        negate(): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] *= -1;
            }

            return this;
        }

        equals(vector: vec3): bool {
            for (var i = 0; i < 3; i++) {
                if (Math.abs(this.values[i] - vector.at(i)) > EPSILON)
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
                z = this.z;

            return (x * x + y * y + z * z);
        }

        add(vector: vec3): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] += vector.at(i);
            }

            return this;
        }

        subtract(vector: vec3): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] -= vector.at(i);
            }

            return this;
        }

        multiply(vector: vec3): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] *= vector.at(i);
            }

            return this;
        }

        divide(vector: vec3): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] /= vector.at(i);
            }

            return this;
        }

        scale(value: number): vec3 {
            for (var i = 0; i < 3; i++) {
                this.values[i] *= value;
            }

            return this;
        }

        normalize(): vec3 {
            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                for (var i = 0; i < 3; i++) {
                    this.values[i] = 0;
                }

                return this;
            }

            length = 1.0 / length;

            for (var i = 0; i < 3; i++) {
                this.values[i] *= length;
            }

            return this;
        }

        static cross(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            var x2 = vector2.x,
                y2 = vector2.y,
                z2 = vector2.z;

            if (result) {
                result.xyz = [
                    y * z2 - z * y2,
                    z * x2 - x * z2,
                    x * y2 - y * x2
                ];
            }
            else {
                return new vec3([
                    y * z2 - z * y2,
                    z * x2 - x * z2,
                    x * y2 - y * x2
                ]);
            }
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

        static direction(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            var x = vector.x - vector2.x,
                y = vector.y - vector2.y,
                z = vector.z - vector2.z;

            var length = Math.sqrt(x * x + y * y + z * z);

            if (length === 0) {
                return new vec3([0, 0, 0]);
            }

            length = 1 / length;

            if (result) {
                result.xyz = [
                    x * length,
                    y * length,
                    z * length
                ];
            }
            else {
                return new vec3([
                    x * length,
                    y * length,
                    z * length
                ]);
            }
        }

        static interpolate(vector: vec3, vector2: vec3, time: number, result: vec3 = null): vec3 {
            var x = vector.x,
                y = vector.y,
                z = vector.z;

            var x2 = vector2.x,
                y2 = vector2.y,
                z2 = vector2.z;

            if (result) {
                result.xyz = [
                    x + time * (x2 - x),
                    y + time * (y2 - y),
                    z + time * (z2 - z)
                ];
            }
            else {
                return new vec3([
                    x + time * (x2 - x),
                    y + time * (y2 - y),
                    z + time * (z2 - z)
                ]);
            }
        }

        static sum(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            if (result) {
                result.xyz = [
                    vector.x + vector2.x,
                    vector.y + vector2.y,
                    vector.z + vector2.z
                ];
            }
            else {
                return new vec3([
                    vector.x + vector2.x,
                    vector.y + vector2.y,
                    vector.z + vector2.z
                ]);
            }
        }

        static difference(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            if (result) {
                result.xyz = [
                    vector.x - vector2.x,
                    vector.y - vector2.y,
                    vector.z - vector2.z
                ];
            }
            else {
                return new vec3([
                    vector.x - vector2.x,
                    vector.y - vector2.y,
                    vector.z - vector2.z
                ]);
            }
        }

        static product(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            if (result) {
                result.xyz = [
                    vector.x * vector2.x,
                    vector.y * vector2.y,
                    vector.z * vector2.z
                ];
            }
            else {
                return new vec3([
                    vector.x * vector2.x,
                    vector.y * vector2.y,
                    vector.z * vector2.z
                ]);
            }
        }

        static quotient(vector: vec3, vector2: vec3, result: vec3 = null): vec3 {
            if (result) {
                result.xyz = [
                    vector.x / vector2.x,
                    vector.y / vector2.y,
                    vector.z / vector2.z
                ];
            }
            else {
                return new vec3([
                    vector.x / vector2.x,
                    vector.y / vector2.y,
                    vector.z / vector2.z
                ]);
            }
        }

        toQuat(): quat {
            var c = new vec3();
            var s = new vec3();

            c.x = Math.cos(this.x * 0.5);
            s.x = Math.sin(this.x * 0.5);

            c.y = Math.cos(this.y * 0.5);
            s.y = Math.sin(this.y * 0.5);

            c.z = Math.cos(this.z * 0.5);
            s.z = Math.sin(this.z * 0.5);

            return new quat([
                s.x * c.y * c.z - c.x * s.y * s.z,
                c.x * s.y * c.z + s.x * c.y * s.z,
                c.x * c.y * s.z - s.x * s.y * c.z,
                c.x * c.y * c.z + s.x * s.y * s.z
            ]);
        }

        static zero = new vec3([0, 0, 0]);

        static up = new vec3([0, 1, 0]);
        static right = new vec3([1, 0, 0]);
        static forward = new vec3([0, 0, 1]);
    }

}



