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
var EPSILON = 0.000001;
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
var TSM;
(function (TSM) {
    var vec2 = (function () {
        function vec2(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(2);
            if (values) {
                this.xy = values;
            }
        }
        Object.defineProperty(vec2.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (value) {
                this.values[0] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec2.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (value) {
                this.values[1] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec2.prototype, "xy", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
            },
            enumerable: true,
            configurable: true
        });




        vec2.prototype.at = function (index) {
            return this.values[index];
        };

        vec2.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
        };

        vec2.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            dest.x = this.x;
            dest.y = this.y;

            return dest;
        };

        vec2.prototype.negate = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x = -this.x;
            dest.y = -this.y;

            return dest;
        };

        vec2.prototype.equals = function (vector, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            if (Math.abs(this.x - vector.x) > threshold)
                return false;

            if (Math.abs(this.y - vector.y) > threshold)
                return false;

            return true;
        };

        vec2.prototype.length = function () {
            return Math.sqrt(this.squaredLength());
        };

        vec2.prototype.squaredLength = function () {
            var x = this.x, y = this.y;

            return (x * x + y * y);
        };

        vec2.prototype.add = function (vector) {
            this.x += vector.x;
            this.y += vector.y;

            return this;
        };

        vec2.prototype.subtract = function (vector) {
            this.x -= vector.x;
            this.y -= vector.y;

            return this;
        };

        vec2.prototype.multiply = function (vector) {
            this.x *= vector.x;
            this.y *= vector.y;

            return this;
        };

        vec2.prototype.divide = function (vector) {
            this.x /= vector.x;
            this.y /= vector.y;

            return this;
        };

        vec2.prototype.scale = function (value, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x *= value;
            dest.y *= value;

            return dest;
        };

        vec2.prototype.normalize = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                dest.x = 0;
                dest.y = 0;

                return dest;
            }

            length = 1.0 / length;

            dest.x *= length;
            dest.y *= length;

            return dest;
        };

        vec2.prototype.multiplyMat2 = function (matrix, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            return matrix.multiplyVec2(this, dest);
        };

        vec2.prototype.multiplyMat3 = function (matrix, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            return matrix.multiplyVec2(this, dest);
        };

        vec2.cross = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.vec3();

            var x = vector.x, y = vector.y;

            var x2 = vector2.x, y2 = vector2.y;

            var z = x * y2 - y * x2;

            dest.x = 0;
            dest.y = 0;
            dest.z = z;

            return dest;
        };

        vec2.dot = function (vector, vector2) {
            return (vector.x * vector2.x + vector.y * vector2.y);
        };

        vec2.distance = function (vector, vector2) {
            return Math.sqrt(this.squaredDistance(vector, vector2));
        };

        vec2.squaredDistance = function (vector, vector2) {
            var x = vector2.x - vector.x, y = vector2.y - vector.y;

            return (x * x + y * y);
        };

        vec2.direction = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            var x = vector.x - vector2.x, y = vector.y - vector2.y;

            var length = Math.sqrt(x * x + y * y);

            if (length === 0) {
                dest.x = 0;
                dest.y = 0;

                return dest;
            }

            length = 1 / length;

            dest.x = x * length;
            dest.y = y * length;

            return dest;
        };

        vec2.mix = function (vector, vector2, time, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            var x = vector.x, y = vector.y;

            var x2 = vector2.x, y2 = vector2.y;

            dest.x = x + time * (x2 - x);
            dest.y = y + time * (y2 - y);

            return dest;
        };

        vec2.sum = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            dest.x = vector.x + vector2.x;
            dest.y = vector.y + vector2.y;

            return dest;
        };

        vec2.difference = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            dest.x = vector.x - vector2.x;
            dest.y = vector.y - vector2.y;

            return dest;
        };

        vec2.product = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            dest.x = vector.x * vector2.x;
            dest.y = vector.y * vector2.y;

            return dest;
        };

        vec2.quotient = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec2();

            dest.x = vector.x / vector2.x;
            dest.y = vector.y / vector2.y;

            return dest;
        };

        vec2.zero = new vec2([0, 0]);
        return vec2;
    })();
    TSM.vec2 = vec2;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var vec3 = (function () {
        function vec3(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(3);
            if (values) {
                this.xyz = values;
            }
        }
        Object.defineProperty(vec3.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (value) {
                this.values[0] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec3.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (value) {
                this.values[1] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec3.prototype, "z", {
            get: function () {
                return this.values[2];
            },
            set: function (value) {
                this.values[2] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec3.prototype, "xy", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec3.prototype, "xyz", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
            },
            enumerable: true,
            configurable: true
        });






        vec3.prototype.at = function (index) {
            return this.values[index];
        };

        vec3.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        };

        vec3.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = this.x;
            dest.y = this.y;
            dest.z = this.z;

            return dest;
        };

        vec3.prototype.negate = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;

            return dest;
        };

        vec3.prototype.equals = function (vector, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            if (Math.abs(this.x - vector.x) > threshold)
                return false;

            if (Math.abs(this.y - vector.y) > threshold)
                return false;

            if (Math.abs(this.z - vector.z) > threshold)
                return false;

            return true;
        };

        vec3.prototype.length = function () {
            return Math.sqrt(this.squaredLength());
        };

        vec3.prototype.squaredLength = function () {
            var x = this.x, y = this.y, z = this.z;

            return (x * x + y * y + z * z);
        };

        vec3.prototype.add = function (vector) {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;

            return this;
        };

        vec3.prototype.subtract = function (vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            this.z -= vector.z;

            return this;
        };

        vec3.prototype.multiply = function (vector) {
            this.x *= vector.x;
            this.y *= vector.y;
            this.z *= vector.z;

            return this;
        };

        vec3.prototype.divide = function (vector) {
            this.x /= vector.x;
            this.y /= vector.y;
            this.z /= vector.z;

            return this;
        };

        vec3.prototype.scale = function (value, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x *= value;
            dest.y *= value;
            dest.z *= value;

            return dest;
        };

        vec3.prototype.normalize = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

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
        };

        vec3.prototype.multiplyByMat3 = function (matrix, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            return matrix.multiplyVec3(this, dest);
        };

        vec3.prototype.multiplyByQuat = function (quat, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            return quat.multiplyVec3(this, dest);
        };

        vec3.cross = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            var x = vector.x, y = vector.y, z = vector.z;

            var x2 = vector2.x, y2 = vector2.y, z2 = vector2.z;

            dest.x = y * z2 - z * y2;
            dest.y = z * x2 - x * z2;
            dest.z = x * y2 - y * x2;

            return dest;
        };

        vec3.dot = function (vector, vector2) {
            var x = vector.x, y = vector.y, z = vector.z;

            var x2 = vector2.x, y2 = vector2.y, z2 = vector2.z;

            return (x * x2 + y * y2 + z * z2);
        };

        vec3.distance = function (vector, vector2) {
            var x = vector2.x - vector.x, y = vector2.y - vector.y, z = vector2.z - vector.z;

            return Math.sqrt(this.squaredDistance(vector, vector2));
        };

        vec3.squaredDistance = function (vector, vector2) {
            var x = vector2.x - vector.x, y = vector2.y - vector.y, z = vector2.z - vector.z;

            return (x * x + y * y + z * z);
        };

        vec3.direction = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            var x = vector.x - vector2.x, y = vector.y - vector2.y, z = vector.z - vector2.z;

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
        };

        vec3.mix = function (vector, vector2, time, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = vector.x + time * (vector2.x - vector.x);
            dest.y = vector.y + time * (vector2.y - vector.y);
            dest.z = vector.z + time * (vector2.z - vector.z);

            return dest;
        };

        vec3.sum = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = vector.x + vector2.x;
            dest.y = vector.y + vector2.y;
            dest.z = vector.z + vector2.z;

            return dest;
        };

        vec3.difference = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = vector.x - vector2.x;
            dest.y = vector.y - vector2.y;
            dest.z = vector.z - vector2.z;

            return dest;
        };

        vec3.product = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = vector.x * vector2.x;
            dest.y = vector.y * vector2.y;
            dest.z = vector.z * vector2.z;

            return dest;
        };

        vec3.quotient = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec3();

            dest.x = vector.x / vector2.x;
            dest.y = vector.y / vector2.y;
            dest.z = vector.z / vector2.z;

            return dest;
        };

        vec3.prototype.toQuat = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.quat();

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
        };

        vec3.zero = new vec3([0, 0, 0]);

        vec3.up = new vec3([0, 1, 0]);
        vec3.right = new vec3([1, 0, 0]);
        vec3.forward = new vec3([0, 0, 1]);
        return vec3;
    })();
    TSM.vec3 = vec3;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var vec4 = (function () {
        function vec4(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(4);
            if (values) {
                this.xyzw = values;
            }
        }
        Object.defineProperty(vec4.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (value) {
                this.values[0] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (value) {
                this.values[1] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "z", {
            get: function () {
                return this.values[2];
            },
            set: function (value) {
                this.values[2] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "w", {
            get: function () {
                return this.values[3];
            },
            set: function (value) {
                this.values[3] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "xy", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "xyz", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "xyzw", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2],
                    this.values[3]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
                this.values[3] = values[3];
            },
            enumerable: true,
            configurable: true
        });








        Object.defineProperty(vec4.prototype, "r", {
            get: function () {
                return this.values[0];
            },
            set: function (value) {
                this.values[0] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "g", {
            get: function () {
                return this.values[1];
            },
            set: function (value) {
                this.values[1] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "b", {
            get: function () {
                return this.values[2];
            },
            set: function (value) {
                this.values[2] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "a", {
            get: function () {
                return this.values[3];
            },
            set: function (value) {
                this.values[3] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "rg", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "rgb", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(vec4.prototype, "rgba", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2],
                    this.values[3]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
                this.values[3] = values[3];
            },
            enumerable: true,
            configurable: true
        });








        vec4.prototype.at = function (index) {
            return this.values[index];
        };

        vec4.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        };

        vec4.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = this.x;
            dest.y = this.y;
            dest.z = this.z;
            dest.w = this.w;

            return dest;
        };

        vec4.prototype.negate = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;
            dest.w = -this.w;

            return dest;
        };

        vec4.prototype.equals = function (vector, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            if (Math.abs(this.x - vector.x) > threshold)
                return false;

            if (Math.abs(this.y - vector.y) > threshold)
                return false;

            if (Math.abs(this.z - vector.z) > threshold)
                return false;

            if (Math.abs(this.w - vector.w) > threshold)
                return false;

            return true;
        };

        vec4.prototype.length = function () {
            return Math.sqrt(this.squaredLength());
        };

        vec4.prototype.squaredLength = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;

            return (x * x + y * y + z * z + w * w);
        };

        vec4.prototype.add = function (vector) {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;
            this.w += vector.w;

            return this;
        };

        vec4.prototype.subtract = function (vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            this.z -= vector.z;
            this.w -= vector.w;

            return this;
        };

        vec4.prototype.multiply = function (vector) {
            this.x *= vector.x;
            this.y *= vector.y;
            this.z *= vector.z;
            this.w *= vector.w;

            return this;
        };

        vec4.prototype.divide = function (vector) {
            this.x /= vector.x;
            this.y /= vector.y;
            this.z /= vector.z;
            this.w /= vector.w;

            return this;
        };

        vec4.prototype.scale = function (value, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            dest.x *= value;
            dest.y *= value;
            dest.z *= value;
            dest.w *= value;

            return dest;
        };

        vec4.prototype.normalize = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            var length = this.length();

            if (length === 1) {
                return this;
            }

            if (length === 0) {
                dest.x *= 0;
                dest.y *= 0;
                dest.z *= 0;
                dest.w *= 0;

                return dest;
            }

            length = 1.0 / length;

            dest.x *= length;
            dest.y *= length;
            dest.z *= length;
            dest.w *= length;

            return dest;
        };

        vec4.prototype.multiplyMat4 = function (matrix, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            return matrix.multiplyVec4(this, dest);
        };

        vec4.mix = function (vector, vector2, time, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = vector.x + time * (vector2.x - vector.x);
            dest.y = vector.y + time * (vector2.y - vector.y);
            dest.z = vector.z + time * (vector2.z - vector.z);
            dest.w = vector.w + time * (vector2.w - vector.w);

            return dest;
        };

        vec4.sum = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = vector.x + vector2.x, dest.y = vector.y + vector2.y, dest.z = vector.z + vector2.z, dest.w = vector.w + vector2.w;

            return dest;
        };

        vec4.difference = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = vector.x - vector2.x, dest.y = vector.y - vector2.y, dest.z = vector.z - vector2.z, dest.w = vector.w - vector2.w;

            return dest;
        };

        vec4.product = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = vector.x * vector2.x, dest.y = vector.y * vector2.y, dest.z = vector.z * vector2.z, dest.w = vector.w * vector2.w;

            return dest;
        };

        vec4.quotient = function (vector, vector2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new vec4();

            dest.x = vector.x / vector2.x, dest.y = vector.y / vector2.y, dest.z = vector.z / vector2.z, dest.w = vector.w / vector2.w;

            return dest;
        };

        vec4.zero = new vec4([0, 0, 0, 1]);
        return vec4;
    })();
    TSM.vec4 = vec4;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var mat2 = (function () {
        function mat2(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(4);
            if (values) {
                this.init(values);
            }
        }
        mat2.prototype.at = function (index) {
            return this.values[index];
        };

        mat2.prototype.init = function (values) {
            for (var i = 0; i < 4; i++) {
                this.values[i] = values[i];
            }

            return this;
        };

        mat2.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this.values[i] = 0;
            }
        };

        mat2.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new mat2();

            for (var i = 0; i < 4; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        };

        mat2.prototype.all = function () {
            var data = [];
            for (var i = 0; i < 4; i++) {
                data[i] = this.values[i];
            }

            return data;
        };

        mat2.prototype.row = function (index) {
            return [
                this.values[index * 2 + 0],
                this.values[index * 2 + 1]
            ];
        };

        mat2.prototype.col = function (index) {
            return [
                this.values[index],
                this.values[index + 2]
            ];
        };

        mat2.prototype.equals = function (matrix, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            for (var i = 0; i < 4; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > threshold)
                    return false;
            }

            return true;
        };

        mat2.prototype.determinant = function () {
            return this.values[0] * this.values[3] - this.values[2] * this.values[1];
        };

        mat2.prototype.setIdentity = function () {
            this.values[0] = 1;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 1;

            return this;
        };

        mat2.prototype.transpose = function () {
            var temp = this.values[1];

            this.values[1] = this.values[2];
            this.values[2] = temp;

            return this;
        };

        mat2.prototype.inverse = function () {
            var det = this.determinant();

            if (!det)
                return null;

            det = 1.0 / det;

            this.values[0] = det * (this.values[3]);
            this.values[1] = det * (-this.values[1]);
            this.values[2] = det * (-this.values[2]);
            this.values[3] = det * (this.values[0]);

            return this;
        };

        mat2.prototype.multiply = function (matrix) {
            var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];

            this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2);
            this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3);
            this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2);
            this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3);

            return this;
        };

        mat2.prototype.rotate = function (angle) {
            var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];

            var sin = Math.sin(angle), cos = Math.cos(angle);

            this.values[0] = a11 * cos + a12 * sin;
            this.values[1] = a11 * -sin + a12 * cos;
            this.values[2] = a21 * cos + a22 * sin;
            this.values[3] = a21 * -sin + a22 * cos;

            return this;
        };

        mat2.prototype.multiplyVec2 = function (vector, result) {
            if (typeof result === "undefined") { result = null; }
            var x = vector.x, y = vector.y;

            if (result) {
                result.xy = [
                    x * this.values[0] + y * this.values[1],
                    x * this.values[2] + y * this.values[3]
                ];

                return result;
            } else {
                return new TSM.vec2([
                    x * this.values[0] + y * this.values[1],
                    x * this.values[2] + y * this.values[3]
                ]);
            }
        };

        mat2.prototype.scale = function (vector) {
            var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];

            var x = vector.x, y = vector.y;

            this.values[0] = a11 * x;
            this.values[1] = a12 * y;
            this.values[2] = a21 * x;
            this.values[3] = a22 * y;

            return this;
        };

        mat2.product = function (m1, m2, result) {
            if (typeof result === "undefined") { result = null; }
            var a11 = m1.at(0), a12 = m1.at(1), a21 = m1.at(2), a22 = m1.at(3);

            if (result) {
                result.init([
                    a11 * m2.at(0) + a12 * m2.at(2),
                    a11 * m2.at(1) + a12 * m2.at(3),
                    a21 * m2.at(0) + a22 * m2.at(2),
                    a21 * m2.at(1) + a22 * m2.at(3)
                ]);

                return result;
            } else {
                return new mat2([
                    a11 * m2.at(0) + a12 * m2.at(2),
                    a11 * m2.at(1) + a12 * m2.at(3),
                    a21 * m2.at(0) + a22 * m2.at(2),
                    a21 * m2.at(1) + a22 * m2.at(3)
                ]);
            }
        };

        mat2.identity = new mat2().setIdentity();
        return mat2;
    })();
    TSM.mat2 = mat2;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var mat3 = (function () {
        function mat3(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(9);
            if (values) {
                this.init(values);
            }
        }
        mat3.prototype.at = function (index) {
            return this.values[index];
        };

        mat3.prototype.init = function (values) {
            for (var i = 0; i < 9; i++) {
                this.values[i] = values[i];
            }

            return this;
        };

        mat3.prototype.reset = function () {
            for (var i = 0; i < 9; i++) {
                this.values[i] = 0;
            }
        };

        mat3.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new mat3();

            for (var i = 0; i < 9; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        };

        mat3.prototype.all = function () {
            var data = [];
            for (var i = 0; i < 9; i++) {
                data[i] = this.values[i];
            }

            return data;
        };

        mat3.prototype.row = function (index) {
            return [
                this.values[index * 3 + 0],
                this.values[index * 3 + 1],
                this.values[index * 3 + 2]
            ];
        };

        mat3.prototype.col = function (index) {
            return [
                this.values[index],
                this.values[index + 3],
                this.values[index + 6]
            ];
        };

        mat3.prototype.equals = function (matrix, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            for (var i = 0; i < 9; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > threshold)
                    return false;
            }

            return true;
        };

        mat3.prototype.determinant = function () {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a10 = this.values[3], a11 = this.values[4], a12 = this.values[5], a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;

            return a00 * det01 + a01 * det11 + a02 * det21;
        };

        mat3.prototype.setIdentity = function () {
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
        };

        mat3.prototype.transpose = function () {
            var temp01 = this.values[1], temp02 = this.values[2], temp12 = this.values[5];

            this.values[1] = this.values[3];
            this.values[2] = this.values[6];
            this.values[3] = temp01;
            this.values[5] = this.values[7];
            this.values[6] = temp02;
            this.values[7] = temp12;

            return this;
        };

        mat3.prototype.inverse = function () {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a10 = this.values[3], a11 = this.values[4], a12 = this.values[5], a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;

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
        };

        mat3.prototype.multiply = function (matrix) {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a10 = this.values[3], a11 = this.values[4], a12 = this.values[5], a20 = this.values[6], a21 = this.values[7], a22 = this.values[8];

            var b00 = matrix.at(0), b01 = matrix.at(1), b02 = matrix.at(2), b10 = matrix.at(3), b11 = matrix.at(4), b12 = matrix.at(5), b20 = matrix.at(6), b21 = matrix.at(7), b22 = matrix.at(8);

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
        };

        mat3.prototype.multiplyVec2 = function (vector, result) {
            if (typeof result === "undefined") { result = null; }
            var x = vector.x, y = vector.y;

            if (result) {
                result.xy = [
                    x * this.values[0] + y * this.values[3] + this.values[6],
                    x * this.values[1] + y * this.values[4] + this.values[7]
                ];

                return result;
            } else {
                return new TSM.vec2([
                    x * this.values[0] + y * this.values[3] + this.values[6],
                    x * this.values[1] + y * this.values[4] + this.values[7]
                ]);
            }
        };

        mat3.prototype.multiplyVec3 = function (vector, result) {
            if (typeof result === "undefined") { result = null; }
            var x = vector.x, y = vector.y, z = vector.z;

            if (result) {
                result.xyz = [
                    x * this.values[0] + y * this.values[3] + z * this.values[6],
                    x * this.values[1] + y * this.values[4] + z * this.values[7],
                    x * this.values[2] + y * this.values[5] + z * this.values[8]
                ];

                return result;
            } else {
                return new TSM.vec3([
                    x * this.values[0] + y * this.values[3] + z * this.values[6],
                    x * this.values[1] + y * this.values[4] + z * this.values[7],
                    x * this.values[2] + y * this.values[5] + z * this.values[8]
                ]);
            }
        };

        mat3.prototype.toMat4 = function (result) {
            if (typeof result === "undefined") { result = null; }
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
            } else {
                return new TSM.mat4([
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
        };

        mat3.prototype.toQuat = function () {
            var m00 = this.values[0], m01 = this.values[1], m02 = this.values[2], m10 = this.values[3], m11 = this.values[4], m12 = this.values[5], m20 = this.values[6], m21 = this.values[7], m22 = this.values[8];

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

            var result = new TSM.quat();

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
        };

        mat3.prototype.rotate = function (angle, axis) {
            var x = axis.x, y = axis.y, z = axis.z;

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

            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a20 = this.values[8], a21 = this.values[9], a22 = this.values[10];

            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s, b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s, b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

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
        };

        mat3.product = function (m1, m2, result) {
            if (typeof result === "undefined") { result = null; }
            var a00 = m1.at(0), a01 = m1.at(1), a02 = m1.at(2), a10 = m1.at(3), a11 = m1.at(4), a12 = m1.at(5), a20 = m1.at(6), a21 = m1.at(7), a22 = m1.at(8);

            var b00 = m2.at(0), b01 = m2.at(1), b02 = m2.at(2), b10 = m2.at(3), b11 = m2.at(4), b12 = m2.at(5), b20 = m2.at(6), b21 = m2.at(7), b22 = m2.at(8);

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
            } else {
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
        };

        mat3.identity = new mat3().setIdentity();
        return mat3;
    })();
    TSM.mat3 = mat3;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var mat4 = (function () {
        function mat4(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(16);
            if (values) {
                this.init(values);
            }
        }
        mat4.prototype.at = function (index) {
            return this.values[index];
        };

        mat4.prototype.init = function (values) {
            for (var i = 0; i < 16; i++) {
                this.values[i] = values[i];
            }

            return this;
        };

        mat4.prototype.reset = function () {
            for (var i = 0; i < 16; i++) {
                this.values[i] = 0;
            }
        };

        mat4.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new mat4();

            for (var i = 0; i < 16; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        };

        mat4.prototype.all = function () {
            var data = [];
            for (var i = 0; i < 16; i++) {
                data[i] = this.values[i];
            }

            return data;
        };

        mat4.prototype.row = function (index) {
            return [
                this.values[index * 4 + 0],
                this.values[index * 4 + 1],
                this.values[index * 4 + 2],
                this.values[index * 4 + 3]
            ];
        };

        mat4.prototype.col = function (index) {
            return [
                this.values[index],
                this.values[index + 4],
                this.values[index + 8],
                this.values[index + 12]
            ];
        };

        mat4.prototype.equals = function (matrix, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            for (var i = 0; i < 16; i++) {
                if (Math.abs(this.values[i] - matrix.at(i)) > threshold)
                    return false;
            }

            return true;
        };

        mat4.prototype.determinant = function () {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3], a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7], a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11], a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var det00 = a00 * a11 - a01 * a10, det01 = a00 * a12 - a02 * a10, det02 = a00 * a13 - a03 * a10, det03 = a01 * a12 - a02 * a11, det04 = a01 * a13 - a03 * a11, det05 = a02 * a13 - a03 * a12, det06 = a20 * a31 - a21 * a30, det07 = a20 * a32 - a22 * a30, det08 = a20 * a33 - a23 * a30, det09 = a21 * a32 - a22 * a31, det10 = a21 * a33 - a23 * a31, det11 = a22 * a33 - a23 * a32;

            return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
        };

        mat4.prototype.setIdentity = function () {
            this.values[0] = 1;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = 1;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = 0;
            this.values[9] = 0;
            this.values[10] = 1;
            this.values[11] = 0;
            this.values[12] = 0;
            this.values[13] = 0;
            this.values[14] = 0;
            this.values[15] = 1;

            return this;
        };

        mat4.prototype.transpose = function () {
            var temp01 = this.values[1], temp02 = this.values[2], temp03 = this.values[3], temp12 = this.values[6], temp13 = this.values[7], temp23 = this.values[11];

            this.values[1] = this.values[4];
            this.values[2] = this.values[8];
            this.values[3] = this.values[12];
            this.values[4] = temp01;
            this.values[6] = this.values[9];
            this.values[7] = this.values[13];
            this.values[8] = temp02;
            this.values[9] = temp12;
            this.values[11] = this.values[14];
            this.values[12] = temp03;
            this.values[13] = temp13;
            this.values[14] = temp23;

            return this;
        };

        mat4.prototype.inverse = function () {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3], a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7], a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11], a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var det00 = a00 * a11 - a01 * a10, det01 = a00 * a12 - a02 * a10, det02 = a00 * a13 - a03 * a10, det03 = a01 * a12 - a02 * a11, det04 = a01 * a13 - a03 * a11, det05 = a02 * a13 - a03 * a12, det06 = a20 * a31 - a21 * a30, det07 = a20 * a32 - a22 * a30, det08 = a20 * a33 - a23 * a30, det09 = a21 * a32 - a22 * a31, det10 = a21 * a33 - a23 * a31, det11 = a22 * a33 - a23 * a32;

            var det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);

            if (!det)
                return null;

            det = 1.0 / det;

            this.values[0] = (a11 * det11 - a12 * det10 + a13 * det09) * det;
            this.values[1] = (-a01 * det11 + a02 * det10 - a03 * det09) * det;
            this.values[2] = (a31 * det05 - a32 * det04 + a33 * det03) * det;
            this.values[3] = (-a21 * det05 + a22 * det04 - a23 * det03) * det;
            this.values[4] = (-a10 * det11 + a12 * det08 - a13 * det07) * det;
            this.values[5] = (a00 * det11 - a02 * det08 + a03 * det07) * det;
            this.values[6] = (-a30 * det05 + a32 * det02 - a33 * det01) * det;
            this.values[7] = (a20 * det05 - a22 * det02 + a23 * det01) * det;
            this.values[8] = (a10 * det10 - a11 * det08 + a13 * det06) * det;
            this.values[9] = (-a00 * det10 + a01 * det08 - a03 * det06) * det;
            this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det;
            this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det;
            this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det;
            this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det;
            this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det;
            this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det;

            return this;
        };

        mat4.prototype.multiply = function (matrix) {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3];
            var a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7];
            var a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11];
            var a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

            var b0 = matrix.at(0), b1 = matrix.at(1), b2 = matrix.at(2), b3 = matrix.at(3);

            this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = matrix.at(4);
            b1 = matrix.at(5);
            b2 = matrix.at(6);
            b3 = matrix.at(7);

            this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = matrix.at(8);
            b1 = matrix.at(9);
            b2 = matrix.at(10);
            b3 = matrix.at(11);

            this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
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
        };

        mat4.prototype.multiplyVec3 = function (vector) {
            var x = vector.x, y = vector.y, z = vector.z;

            return new TSM.vec3([
                this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12],
                this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13],
                this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14]
            ]);
        };

        mat4.prototype.multiplyVec4 = function (vector, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.vec4();

            var x = vector.x, y = vector.y, z = vector.z, w = vector.w;

            dest.x = this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12] * w;
            dest.y = this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13] * w;
            dest.z = this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14] * w;
            dest.w = this.values[3] * x + this.values[7] * y + this.values[11] * z + this.values[15] * w;

            return dest;
        };

        mat4.prototype.toMat3 = function () {
            return new TSM.mat3([
                this.values[0],
                this.values[1],
                this.values[2],
                this.values[4],
                this.values[5],
                this.values[6],
                this.values[8],
                this.values[9],
                this.values[10]
            ]);
        };

        mat4.prototype.toInverseMat3 = function () {
            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a20 = this.values[8], a21 = this.values[9], a22 = this.values[10];

            var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;

            var det = a00 * det01 + a01 * det11 + a02 * det21;

            if (!det)
                return null;

            det = 1.0 / det;

            return new TSM.mat3([
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
        };

        mat4.prototype.translate = function (vector) {
            var x = vector.x, y = vector.y, z = vector.z;

            this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z;
            this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z;
            this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z;
            this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z;

            return this;
        };

        mat4.prototype.scale = function (vector) {
            var x = vector.x, y = vector.y, z = vector.z;

            this.values[0] *= x;
            this.values[1] *= x;
            this.values[2] *= x;
            this.values[3] *= x;

            this.values[4] *= y;
            this.values[5] *= y;
            this.values[6] *= y;
            this.values[7] *= y;

            this.values[8] *= z;
            this.values[9] *= z;
            this.values[10] *= z;
            this.values[11] *= z;

            return this;
        };

        mat4.prototype.rotate = function (angle, axis) {
            var x = axis.x, y = axis.y, z = axis.z;

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

            var a00 = this.values[0], a01 = this.values[1], a02 = this.values[2], a03 = this.values[3], a10 = this.values[4], a11 = this.values[5], a12 = this.values[6], a13 = this.values[7], a20 = this.values[8], a21 = this.values[9], a22 = this.values[10], a23 = this.values[11];

            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s, b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s, b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;

            this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
            this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
            this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
            this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;

            this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
            this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
            this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
            this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;

            this.values[8] = a00 * b20 + a10 * b21 + a20 * b22;
            this.values[9] = a01 * b20 + a11 * b21 + a21 * b22;
            this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
            this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;

            return this;
        };

        mat4.frustum = function (left, right, bottom, top, near, far) {
            var rl = (right - left), tb = (top - bottom), fn = (far - near);

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
        };

        mat4.perspective = function (fov, aspect, near, far) {
            var top = near * Math.tan(fov * Math.PI / 360.0), right = top * aspect;

            return mat4.frustum(-right, right, -top, top, near, far);
        };

        mat4.orthographic = function (left, right, bottom, top, near, far) {
            var rl = (right - left), tb = (top - bottom), fn = (far - near);

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
        };

        mat4.lookAt = function (position, target, up) {
            if (typeof up === "undefined") { up = TSM.vec3.up; }
            if (position.equals(target)) {
                return this.identity;
            }

            var z = TSM.vec3.difference(position, target).normalize();

            var x = TSM.vec3.cross(up, z).normalize();
            var y = TSM.vec3.cross(z, x).normalize();

            return new mat4([
                x.x,
                y.x,
                z.x,
                0,
                x.y,
                y.y,
                z.y,
                0,
                x.z,
                y.z,
                z.z,
                0,
                -TSM.vec3.dot(x, position),
                -TSM.vec3.dot(y, position),
                -TSM.vec3.dot(z, position),
                1
            ]);
        };

        mat4.product = function (m1, m2, result) {
            if (typeof result === "undefined") { result = null; }
            var a00 = m1.at(0), a01 = m1.at(1), a02 = m1.at(2), a03 = m1.at(3), a10 = m1.at(4), a11 = m1.at(5), a12 = m1.at(6), a13 = m1.at(7), a20 = m1.at(8), a21 = m1.at(9), a22 = m1.at(10), a23 = m1.at(11), a30 = m1.at(12), a31 = m1.at(13), a32 = m1.at(14), a33 = m1.at(15);

            var b00 = m2.at(0), b01 = m2.at(1), b02 = m2.at(2), b03 = m2.at(3), b10 = m2.at(4), b11 = m2.at(5), b12 = m2.at(6), b13 = m2.at(7), b20 = m2.at(8), b21 = m2.at(9), b22 = m2.at(10), b23 = m2.at(11), b30 = m2.at(12), b31 = m2.at(13), b32 = m2.at(14), b33 = m2.at(15);

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

                return result;
            } else {
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
        };

        mat4.identity = new mat4().setIdentity();
        return mat4;
    })();
    TSM.mat4 = mat4;
})(TSM || (TSM = {}));
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
var TSM;
(function (TSM) {
    var quat = (function () {
        function quat(values) {
            if (typeof values === "undefined") { values = null; }
            this.values = new Float32Array(4);
            if (values) {
                this.xyzw = values;
            }
        }
        Object.defineProperty(quat.prototype, "x", {
            get: function () {
                return this.values[0];
            },
            set: function (value) {
                this.values[0] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "y", {
            get: function () {
                return this.values[1];
            },
            set: function (value) {
                this.values[1] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "z", {
            get: function () {
                return this.values[2];
            },
            set: function (value) {
                this.values[2] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "w", {
            get: function () {
                return this.values[3];
            },
            set: function (value) {
                this.values[3] = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "xy", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "xyz", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(quat.prototype, "xyzw", {
            get: function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[2],
                    this.values[3]
                ];
            },
            set: function (values) {
                this.values[0] = values[0];
                this.values[1] = values[1];
                this.values[2] = values[2];
                this.values[3] = values[3];
            },
            enumerable: true,
            configurable: true
        });








        quat.prototype.at = function (index) {
            return this.values[index];
        };

        quat.prototype.reset = function () {
            for (var i = 0; i < 4; i++) {
                this.values[i] = 0;
            }
        };

        quat.prototype.copy = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            for (var i = 0; i < 4; i++) {
                dest.values[i] = this.values[i];
            }

            return dest;
        };

        quat.prototype.roll = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;

            return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
        };

        quat.prototype.pitch = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;

            return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
        };

        quat.prototype.yaw = function () {
            return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
        };

        quat.prototype.equals = function (vector, threshold) {
            if (typeof threshold === "undefined") { threshold = EPSILON; }
            for (var i = 0; i < 4; i++) {
                if (Math.abs(this.values[i] - vector.at(i)) > threshold)
                    return false;
            }

            return true;
        };

        quat.prototype.setIdentity = function () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;

            return this;
        };

        quat.prototype.calculateW = function () {
            var x = this.x, y = this.y, z = this.z;

            this.w = -(Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z)));

            return this;
        };

        quat.dot = function (q1, q2) {
            return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
        };

        quat.prototype.inverse = function () {
            var dot = quat.dot(this, this);

            if (!dot) {
                this.xyzw = [0, 0, 0, 0];

                return this;
            }

            var invDot = dot ? 1.0 / dot : 0;

            this.x *= -invDot;
            this.y *= -invDot;
            this.z *= -invDot;
            this.w *= invDot;

            return this;
        };

        quat.prototype.conjugate = function () {
            this.values[0] *= -1;
            this.values[1] *= -1;
            this.values[2] *= -1;

            return this;
        };

        quat.prototype.length = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;

            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        quat.prototype.normalize = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = this;

            var x = this.x, y = this.y, z = this.z, w = this.w;

            var length = Math.sqrt(x * x + y * y + z * z + w * w);

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
        };

        quat.prototype.add = function (other) {
            for (var i = 0; i < 4; i++) {
                this.values[i] += other.at(i);
            }

            return this;
        };

        quat.prototype.multiply = function (other) {
            var q1x = this.values[0], q1y = this.values[1], q1z = this.values[2], q1w = this.values[3];

            var q2x = other.x, q2y = other.y, q2z = other.z, q2w = other.w;

            this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
            this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
            this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
            this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

            return this;
        };

        quat.prototype.multiplyVec3 = function (vector, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.vec3();

            var x = vector.x, y = vector.y, z = vector.z;

            var qx = this.x, qy = this.y, qz = this.z, qw = this.w;

            var ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;

            dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return dest;
        };

        quat.prototype.toMat3 = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.mat3();

            var x = this.x, y = this.y, z = this.z, w = this.w;

            var x2 = x + x, y2 = y + y, z2 = z + z;

            var xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;

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
        };

        quat.prototype.toMat4 = function (dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new TSM.mat4();

            var x = this.x, y = this.y, z = this.z, w = this.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;

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
        };

        quat.sum = function (q1, q2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            dest.x = q1.x + q2.x;
            dest.y = q1.y + q2.y;
            dest.z = q1.z + q2.z;
            dest.w = q1.w + q2.w;

            return dest;
        };

        quat.product = function (q1, q2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            var q1x = q1.x, q1y = q1.y, q1z = q1.z, q1w = q1.w, q2x = q2.x, q2y = q2.y, q2z = q2.z, q2w = q2.w;

            dest.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
            dest.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
            dest.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
            dest.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

            return dest;
        };

        quat.cross = function (q1, q2, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            var q1x = q1.x, q1y = q1.y, q1z = q1.z, q1w = q1.w, q2x = q2.x, q2y = q2.y, q2z = q2.z, q2w = q2.w;

            dest.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
            dest.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
            dest.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
            dest.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;

            return dest;
        };

        quat.shortMix = function (q1, q2, time, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            if (time <= 0.0) {
                dest.xyzw = q1.xyzw;

                return dest;
            } else if (time >= 1.0) {
                dest.xyzw = q2.xyzw;

                return dest;
            }

            var cos = quat.dot(q1, q2), q2a = q2.copy();

            if (cos < 0.0) {
                q2a.inverse();
                cos = -cos;
            }

            var k0, k1;

            if (cos > 0.9999) {
                k0 = 1 - time;
                k1 = 0 + time;
            } else {
                var sin = Math.sqrt(1 - cos * cos);
                var angle = Math.atan2(sin, cos);

                var oneOverSin = 1 / sin;

                k0 = Math.sin((1 - time) * angle) * oneOverSin;
                k1 = Math.sin((0 + time) * angle) * oneOverSin;
            }

            dest.x = k0 * q1.x + k1 * q2a.x;
            dest.y = k0 * q1.y + k1 * q2a.y;
            dest.z = k0 * q1.z + k1 * q2a.z;
            dest.w = k0 * q1.w + k1 * q2a.w;

            return dest;
        };

        quat.mix = function (q1, q2, time, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            var cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

            if (Math.abs(cosHalfTheta) >= 1.0) {
                dest.xyzw = q1.xyzw;

                return dest;
            }

            var halfTheta = Math.acos(cosHalfTheta), sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

            if (Math.abs(sinHalfTheta) < 0.001) {
                dest.x = q1.x * 0.5 + q2.x * 0.5;
                dest.y = q1.y * 0.5 + q2.y * 0.5;
                dest.z = q1.z * 0.5 + q2.z * 0.5;
                dest.w = q1.w * 0.5 + q2.w * 0.5;

                return dest;
            }

            var ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta, ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

            dest.x = q1.x * ratioA + q2.x * ratioB;
            dest.y = q1.y * ratioA + q2.y * ratioB;
            dest.z = q1.z * ratioA + q2.z * ratioB;
            dest.w = q1.w * ratioA + q2.w * ratioB;

            return dest;
        };

        quat.fromAxis = function (axis, angle, dest) {
            if (typeof dest === "undefined") { dest = null; }
            if (!dest)
                dest = new quat();

            angle *= 0.5;
            var sin = Math.sin(angle);

            dest.x = axis.x * sin;
            dest.y = axis.y * sin;
            dest.z = axis.z * sin;
            dest.w = Math.cos(angle);

            return dest;
        };

        quat.identity = new quat().setIdentity();
        return quat;
    })();
    TSM.quat = quat;
})(TSM || (TSM = {}));
//# sourceMappingURL=tsm-0.7.js.map
