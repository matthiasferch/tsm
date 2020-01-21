import Vec2 from './vec2'

export default interface IMatrix {

    at(index: number): number

    /**
     * Sets all values of the matrix from an array
     * @param values An array representation of the matrix.
     */
    init(values: number[]): void

    /** Sets all matrix values to 0 */
    reset(): void

    /**
     * Copy the matrix in another instance
     */
    copy(dest?: IMatrix): IMatrix

    /**
     * @return All values from the matrix as an array
     */
    all(): number[]

    /**
     * Gets all values from a row by its index
     * @param index The matrix row index
     * @return All values from the given row
     */
    row(index: number): number[]

    /**
     * Gets all values from a col by its index
     * @param index The matrix col index
     * @return All values from the given col
     */
    col(index: number): number[]

    /**
     * Checks the equality of this matrix with another
     * @param matrix The matrix against checking the equality
     * @param threshold The precision threshold
     */
    equals(matrix: IMatrix, threshold: number): boolean

    /**
     * Computes the determinant of the matrix
     * @return the computed determinant
     */
    determinant(): number

    /**
     * Reset the matrix as the identity matrix
     * @return The same matrix instance
     */
    setIdentity(): IMatrix

    /**
     * Computes the transposed matrix
     * @return The same matrix instance
     */
    transpose(): IMatrix

    /**
     * Computes the inversed matrix
     * @return The same matrix instance
     */
    inverse(): IMatrix

    /**
     * Multiply the matrix with another
     * @param matrix The matrix to multiply with
     * @return The resulting matrix
     */
    multiply(matrix: IMatrix): IMatrix

    /**
     * Rotate the matrix by a given angle
     * @param angle The angle in radian
     * @return The same matrix instance
     */
    rotate(angle: number): IMatrix

    multiplyVec2(vector: Vec2, result: Vec2): Vec2

    /**
     * Scale the matrix by a given vector
     * @param vector The vector used as scale
     * @return The same matrix instance
     */
    scale(vector: Vec2): IMatrix

    /**
     * Computes the product of two matrix
     * @param mat The matrix operand
     * @param result The resulting matrix
     */
    product(mat: IMatrix, result: IMatrix): IMatrix

}
