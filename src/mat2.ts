import Vec2 from './vec2'

import { EPSILON } from './constants'
import IMatrix from './Matrix'

export default class Mat2 implements IMatrix {

    constructor(values?: number[]) {
        if (values !== undefined) {
            this.init(values)
        }
    }

    private values = new Float32Array(4)

    static readonly identity = new Mat2().setIdentity()

    at(index: number): number {
        return this.values[index]
    }

    init(values: number[]): Mat2 {
        for (let i = 0; i < 4; i++) {
            this.values[i] = values[i]
        }

        return this
    }

    reset(): void {
        for (let i = 0; i < 4; i++) {
            this.values[i] = 0
        }
    }

    copy(dest?: Mat2): Mat2 {
        if (!dest) { dest = new Mat2() }

        for (let i = 0; i < 4; i++) {
            dest.values[i] = this.values[i]
        }

        return dest
    }

    all(): number[] {
        const data: number[] = []
        for (let i = 0; i < 4; i++) {
            data[i] = this.values[i]
        }

        return data
    }

    row(index: number): number[] {
        return [
            this.values[index * 2 + 0],
            this.values[index * 2 + 1],
        ]
    }

    col(index: number): number[] {
        return [
            this.values[index],
            this.values[index + 2],
        ]
    }

    equals(matrix: Mat2, threshold = EPSILON): boolean {
        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
                return false
            }
        }

        return true
    }

    determinant(): number {
        return this.values[0] * this.values[3] - this.values[2] * this.values[1]
    }

    setIdentity(): Mat2 {
        this.values[0] = 1
        this.values[1] = 0
        this.values[2] = 0
        this.values[3] = 1

        return this
    }

    transpose(): Mat2 {
        const temp = this.values[1]

        this.values[1] = this.values[2]
        this.values[2] = temp

        return this
    }

    inverse(): Mat2 {
        let det = this.determinant()

        if (!det) {
            throw new Error('Can\t inverse this matrix as its determinant is 0')
         }

        det = 1.0 / det

        const a11 = this.values[0]

        this.values[0] = det * (this.values[3])
        this.values[1] = det * (-this.values[1])
        this.values[2] = det * (-this.values[2])
        this.values[3] = det * a11

        return this
    }

    multiply(matrix: Mat2): Mat2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2)
        this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3)
        this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2)
        this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3)

        return this
    }

    rotate(angle: number): Mat2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        const sin = Math.sin(angle)
        const cos = Math.cos(angle)

        this.values[0] = a11 * cos + a12 * sin
        this.values[1] = a11 * -sin + a12 * cos
        this.values[2] = a21 * cos + a22 * sin
        this.values[3] = a21 * -sin + a22 * cos

        return this
    }

    multiplyVec2(vector: Vec2, result: Vec2): Vec2 {
        const x = vector.x
        const y = vector.y

        if (result) {
            result.xy = [
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ]

            return result
        } else {
            return new Vec2([
                x * this.values[0] + y * this.values[1],
                x * this.values[2] + y * this.values[3],
            ])
        }
    }

    scale(vector: Vec2): Mat2 {
        const a11 = this.values[0]
        const a12 = this.values[1]
        const a21 = this.values[2]
        const a22 = this.values[3]

        const x = vector.x
        const y = vector.y

        this.values[0] = a11 * x
        this.values[1] = a12 * y
        this.values[2] = a21 * x
        this.values[3] = a22 * y

        return this
    }

    static product(m1: Mat2, m2: Mat2, result: Mat2): Mat2 {
        const a11 = m1.at(0)
        const a12 = m1.at(1)
        const a21 = m1.at(2)
        const a22 = m1.at(3)

        if (result) {
            result.init([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ])

            return result
        } else {
            return new Mat2([
                a11 * m2.at(0) + a12 * m2.at(2),
                a11 * m2.at(1) + a12 * m2.at(3),
                a21 * m2.at(0) + a22 * m2.at(2),
                a21 * m2.at(1) + a22 * m2.at(3),
            ])
        }
    }

}
