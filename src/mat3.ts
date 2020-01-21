import Mat4 from './Mat4'
import Quat from './Quat'
import Vec2 from './Vec2'
import Vec3 from './Vec3'

import { EPSILON } from './constants'

export default class Mat3 {

    constructor(values?: number[]) {
        if (values !== undefined) {
            this.init(values)
        }
    }

    private values = new Float32Array(9)

    static readonly identity = new Mat3().setIdentity()

    at(index: number): number {
        return this.values[index]
    }

    init(values: number[]): Mat3 {
        for (let i = 0; i < 9; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    reset(): void {
        for (let i = 0; i < 9; i++) {
            this.values[i] = 0
        }
    }

    copy(dest?: Mat3): Mat3 {
        if (!dest) { dest = new Mat3() }

        for (let i = 0; i < 9; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    all(): number[] {
        const data: number[] = []
        for (let i = 0; i < 9; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    row(index: number): number[] {
        return [
            this.values[index * 3 + 0],
            this.values[index * 3 + 1],
            this.values[index * 3 + 2],
        ]
    }

    col(index: number): number[] {
        return [
            this.values[index],
            this.values[index + 3],
            this.values[index + 6],
        ]
    }

    equals(matrix: Mat3, threshold = EPSILON): boolean {
        for (let i = 0; i < 9; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    determinant(): number {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        return a00 * det01 + a01 * det11 + a02 * det21
    }

    setIdentity(): Mat3 {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 0
        this.values[4] = 1
        this.values[5] = 0
        this.values[6] = 0
        this.values[7] = 0
        this.values[8] = 1

        return this
    }

    transpose(): Mat3 {
        const temp01 = this.values[1]
        const temp02 = this.values[2]
        const temp12 = this.values[5]

        this.values[1] = this.values[3]
        this.values[2] = this.values[6]
        this.values[3] = temp01
        this.values[5] = this.values[7]
        this.values[6] = temp02
        this.values[7] = temp12

        return this
    }

    inverse(): Mat3 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const det01 = a22 * a11 - a12 * a21
        const det11 = -a22 * a10 + a12 * a20
        const det21 = a21 * a10 - a11 * a20

        let det = a00 * det01 + a01 * det11 + a02 * det21

        if (!det) {
            throw new Error('Can\t inverse this matrix as its determinant is 0')
        }

        det = 1.0 / det

        this.values[0] = det01 * det
        this.values[1] = (-a22 * a01 + a02 * a21) * det
        this.values[2] = (a12 * a01 - a02 * a11) * det
        this.values[3] = det11 * det
        this.values[4] = (a22 * a00 - a02 * a20) * det
        this.values[5] = (-a12 * a00 + a02 * a10) * det
        this.values[6] = det21 * det
        this.values[7] = (-a21 * a00 + a01 * a20) * det
        this.values[8] = (a11 * a00 - a01 * a10) * det

        return this
    }

    multiply(matrix: Mat3): Mat3 {
        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[3]
        const a11 = this.values[4]
        const a12 = this.values[5]
        const a20 = this.values[6]
        const a21 = this.values[7]
        const a22 = this.values[8]

        const b00 = matrix.at(0)
        const b01 = matrix.at(1)
        const b02 = matrix.at(2)
        const b10 = matrix.at(3)
        const b11 = matrix.at(4)
        const b12 = matrix.at(5)
        const b20 = matrix.at(6)
        const b21 = matrix.at(7)
        const b22 = matrix.at(8)

        this.values[0] = b00 * a00 + b01 * a10 + b02 * a20
        this.values[1] = b00 * a01 + b01 * a11 + b02 * a21
        this.values[2] = b00 * a02 + b01 * a12 + b02 * a22

        this.values[3] = b10 * a00 + b11 * a10 + b12 * a20
        this.values[4] = b10 * a01 + b11 * a11 + b12 * a21
        this.values[5] = b10 * a02 + b11 * a12 + b12 * a22

        this.values[6] = b20 * a00 + b21 * a10 + b22 * a20
        this.values[7] = b20 * a01 + b21 * a11 + b22 * a21
        this.values[8] = b20 * a02 + b21 * a12 + b22 * a22

        return this
    }

    multiplyVec2(vector: Vec2, result: Vec2): Vec2 {
        const x = vector.x
        const y = vector.y

        if (result) {
            result.xy = [
                x * this.values[0] + y * this.values[3] + this.values[6],
                x * this.values[1] + y * this.values[4] + this.values[7],
            ]

            return result
        } else {
            return new Vec2([
                x * this.values[0] + y * this.values[3] + this.values[6],
                x * this.values[1] + y * this.values[4] + this.values[7],
            ])
        }
    }

    multiplyVec3(vector: Vec3, result: Vec3): Vec3 {
        const x = vector.x
        const y = vector.y
        const z = vector.z

        if (result) {
            result.xyz = [
                x * this.values[0] + y * this.values[3] + z * this.values[6],
                x * this.values[1] + y * this.values[4] + z * this.values[7],
                x * this.values[2] + y * this.values[5] + z * this.values[8],
            ]

            return result
        } else {
            return new Vec3([
                x * this.values[0] + y * this.values[3] + z * this.values[6],
                x * this.values[1] + y * this.values[4] + z * this.values[7],
                x * this.values[2] + y * this.values[5] + z * this.values[8],
            ])
        }
    }

    toMat4(result: Mat4): Mat4 {
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
                1,
            ])

            return result
        } else {
            return new Mat4([
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
                1,
            ])
        }
    }

    toQuat(): Quat {
        const m00 = this.values[0]
        const m01 = this.values[1]
        const m02 = this.values[2]
        const m10 = this.values[3]
        const m11 = this.values[4]
        const m12 = this.values[5]
        const m20 = this.values[6]
        const m21 = this.values[7]
        const m22 = this.values[8]

        const fourXSquaredMinus1 = m00 - m11 - m22
        const fourYSquaredMinus1 = m11 - m00 - m22
        const fourZSquaredMinus1 = m22 - m00 - m11
        const fourWSquaredMinus1 = m00 + m11 + m22

        let biggestIndex = 0

        let fourBiggestSquaredMinus1 = fourWSquaredMinus1

        if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourXSquaredMinus1
            biggestIndex = 1
        }

        if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourYSquaredMinus1
            biggestIndex = 2
        }

        if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
            fourBiggestSquaredMinus1 = fourZSquaredMinus1
            biggestIndex = 3
        }

        const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5
        const mult = 0.25 / biggestVal

        const result = new Quat()

        switch (biggestIndex) {
            case 0:

                result.w = biggestVal
                result.x = (m12 - m21) * mult
                result.y = (m20 - m02) * mult
                result.z = (m01 - m10) * mult

                break

            case 1:

                result.w = (m12 - m21) * mult
                result.x = biggestVal
                result.y = (m01 + m10) * mult
                result.z = (m20 + m02) * mult

                break

            case 2:

                result.w = (m20 - m02) * mult
                result.x = (m01 + m10) * mult
                result.y = biggestVal
                result.z = (m12 + m21) * mult

                break

            case 3:

                result.w = (m01 - m10) * mult
                result.x = (m20 + m02) * mult
                result.y = (m12 + m21) * mult
                result.z = biggestVal

                break
        }

        return result
    }

    rotate(angle: number, axis: Vec3): Mat3 {
        let x = axis.x
        let y = axis.y
        let z = axis.z

        let length = Math.sqrt(x * x + y * y + z * z)

        if (!length) {
            throw new Error('Can\'t rotate this matrix as its length is 0.')
        }

        if (length !== 1) {
            length = 1 / length
            x *= length
            y *= length
            z *= length
        }

        const s = Math.sin(angle)
        const c = Math.cos(angle)

        const t = 1.0 - c

        const a00 = this.values[0]
        const a01 = this.values[1]
        const a02 = this.values[2]
        const a10 = this.values[4]
        const a11 = this.values[5]
        const a12 = this.values[6]
        const a20 = this.values[8]
        const a21 = this.values[9]
        const a22 = this.values[10]

        const b00 = x * x * t + c
        const b01 = y * x * t + z * s
        const b02 = z * x * t - y * s
        const b10 = x * y * t - z * s
        const b11 = y * y * t + c
        const b12 = z * y * t + x * s
        const b20 = x * z * t + y * s
        const b21 = y * z * t - x * s
        const b22 = z * z * t + c

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02

        this.values[3] = a00 * b10 + a10 * b11 + a20 * b12
        this.values[4] = a01 * b10 + a11 * b11 + a21 * b12
        this.values[5] = a02 * b10 + a12 * b11 + a22 * b12

        this.values[6] = a00 * b20 + a10 * b21 + a20 * b22
        this.values[7] = a01 * b20 + a11 * b21 + a21 * b22
        this.values[8] = a02 * b20 + a12 * b21 + a22 * b22

        return this
    }

    static product(m1: Mat3, m2: Mat3, result: Mat3): Mat3 {
        const a00 = m1.at(0)
        const a01 = m1.at(1)
        const a02 = m1.at(2)
        const a10 = m1.at(3)
        const a11 = m1.at(4)
        const a12 = m1.at(5)
        const a20 = m1.at(6)
        const a21 = m1.at(7)
        const a22 = m1.at(8)

        const b00 = m2.at(0)
        const b01 = m2.at(1)
        const b02 = m2.at(2)
        const b10 = m2.at(3)
        const b11 = m2.at(4)
        const b12 = m2.at(5)
        const b20 = m2.at(6)
        const b21 = m2.at(7)
        const b22 = m2.at(8)

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
                b20 * a02 + b21 * a12 + b22 * a22,
            ])

            return result
        } else {
            return new Mat3([
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,

                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,

                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ])
        }
    }

}
