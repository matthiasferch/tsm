import Mat2 from './mat2'
import Mat3 from './mat3'
import Vec3 from './vec3'

import { EPSILON } from './constants'

export default class Vec2 {

    get x(): number {
        return this.values[0]
    }

    get y(): number {
        return this.values[1]
    }

    get xy(): [number, number] {
        return [
            this.values[0],
            this.values[1],
        ]
    }

    set x(value: number) {
        this.values[0] = value
    }

    set y(value: number) {
        this.values[1] = value
    }

    set xy(values: [number, number]) {
        this.values[0] = values[0]
        this.values[1] = values[1]
    }

    constructor(values?: [number, number]) {
        if (values !== undefined) {
            this.xy = values
        }
    }

    private values = new Float32Array(2)

    static readonly zero = new Vec2([0, 0])
    static readonly one = new Vec2([1, 1])

    at(index: number): number {
        return this.values[index]
    }

    reset(): void {
        this.x = 0
        this.y = 0
    }

    copy(dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        dest.x = this.x
        dest.y = this.y

        return dest
    }

    negate(dest?: Vec2): Vec2 {
        if (!dest) { dest = this }

        dest.x = -this.x
        dest.y = -this.y

        return dest
    }

    equals(vector: Vec2, threshold = EPSILON): boolean {
        if (Math.abs(this.x - vector.x) > threshold) {
            return false
        }

        if (Math.abs(this.y - vector.y) > threshold) {
            return false
        }

        return true
    }

    length(): number {
        return Math.sqrt(this.squaredLength())
    }

    squaredLength(): number {
        const x = this.x
        const y = this.y

        return (x * x + y * y)
    }

    add(vector: Vec2): Vec2 {
        this.x += vector.x
        this.y += vector.y

        return this
    }

    subtract(vector: Vec2): Vec2 {
        this.x -= vector.x
        this.y -= vector.y

        return this
    }

    multiply(vector: Vec2): Vec2 {
        this.x *= vector.x
        this.y *= vector.y

        return this
    }

    divide(vector: Vec2): Vec2 {
        this.x /= vector.x
        this.y /= vector.y

        return this
    }

    scale(value: number, dest?: Vec2): Vec2 {
        if (!dest) { dest = this }

        dest.x *= value
        dest.y *= value

        return dest
    }

    normalize(dest?: Vec2): Vec2 {
        if (!dest) { dest = this }

        let length = this.length()

        if (length === 1) {
            return this
        }

        if (length === 0) {
            dest.x = 0
            dest.y = 0

            return dest
        }

        length = 1.0 / length

        dest.x *= length
        dest.y *= length

        return dest
    }

    multiplyMat2(matrix: Mat2, dest?: Vec2): Vec2 {
        if (!dest) { dest = this }

        return matrix.multiplyVec2(this, dest)
    }

    multiplyMat3(matrix: Mat3, dest?: Vec2): Vec2 {
        if (!dest) { dest = this }

        return matrix.multiplyVec2(this, dest)
    }

    static cross(vector: Vec2, vector2: Vec2, dest?: Vec3): Vec3 {
        if (!dest) { dest = new Vec3() }

        const x = vector.x
        const y = vector.y

        const x2 = vector2.x
        const y2 = vector2.y

        const z = x * y2 - y * x2

        dest.x = 0
        dest.y = 0
        dest.z = z

        return dest
    }

    static dot(vector: Vec2, vector2: Vec2): number {
        return (vector.x * vector2.x + vector.y * vector2.y)
    }

    static distance(vector: Vec2, vector2: Vec2): number {
        return Math.sqrt(this.squaredDistance(vector, vector2))
    }

    static squaredDistance(vector: Vec2, vector2: Vec2): number {
        const x = vector2.x - vector.x
        const y = vector2.y - vector.y

        return (x * x + y * y)
    }

    static direction(vector: Vec2, vector2: Vec2, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        const x = vector.x - vector2.x
        const y = vector.y - vector2.y

        let length = Math.sqrt(x * x + y * y)

        if (length === 0) {
            dest.x = 0
            dest.y = 0

            return dest
        }

        length = 1 / length

        dest.x = x * length
        dest.y = y * length

        return dest
    }

    static mix(vector: Vec2, vector2: Vec2, time: number, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        const x = vector.x
        const y = vector.y

        const x2 = vector2.x
        const y2 = vector2.y

        dest.x = x + time * (x2 - x)
        dest.y = y + time * (y2 - y)

        return dest
    }

    static sum(vector: Vec2, vector2: Vec2, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        dest.x = vector.x + vector2.x
        dest.y = vector.y + vector2.y

        return dest
    }

    static difference(vector: Vec2, vector2: Vec2, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        dest.x = vector.x - vector2.x
        dest.y = vector.y - vector2.y

        return dest
    }

    static product(vector: Vec2, vector2: Vec2, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        dest.x = vector.x * vector2.x
        dest.y = vector.y * vector2.y

        return dest
    }

    static quotient(vector: Vec2, vector2: Vec2, dest?: Vec2): Vec2 {
        if (!dest) { dest = new Vec2() }

        dest.x = vector.x / vector2.x
        dest.y = vector.y / vector2.y

        return dest
    }

}
