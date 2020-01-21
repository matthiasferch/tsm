import IMatrix from './IMatrix';

export default class Matrix {

    constructor(rows: number, columns: number, values?: number[]) {
        this.rows = rows;
        this.columns = columns;
        this.values = new Float32Array(rows * columns);

        if (values) {
            this.init(values);
        }
    }

    private values: Float32Array;
    public rows: number;
    public columns: number;

    at1d(index: number): number {
        return this.values[index];
    }

    /**
     * Get a matrix value, from its position
     * @param row Matrix line, from 0 to `rows`
     * @param col Matric column, from 0 to `columns`
     */
    at(row: number, col: number): number {
        // --row; --col; // Mutate math index to programing index
        return this.at1d((row * this.columns) + col);
    }

    init(newValues: number[]): void {
        for (let i = 0; i < Math.min(newValues.length, this.values.length); i++) {
            this.values[i] = newValues[i];
        }
    }

    reset(): void {
        for (let i = 0; i < this.values.length; i++) {
            this.values[i] = 0;
        }
    }

    row(index: number): Float32Array {
        if (index > this.rows) {
            throw new Error('TODO message error');
        }
        const indexFirstElemOfRow = index * this.columns;
        return this.values.slice(indexFirstElemOfRow, indexFirstElemOfRow + this.columns);
    }

    multiply(mat: Matrix): Matrix {
        if (this.columns !== mat.rows) throw Error('TODO ERROR');
        const resMatrix = new Matrix(this.rows, mat.columns);
        resMatrix.values = resMatrix.values.map((val, i) => {
            const nRow = Math.floor(i / this.rows);
            const nCol = i % mat.columns;
            return this.row(nRow)
                .reduce((sum, elm, k) => sum + (elm * mat.at(k, nCol)), 0);
        });
        return resMatrix;
    }
}
