import 'mocha';
import Matrix from '../src/Matrix';
import { expect } from 'chai';

describe('Multiplies', () => {

  it('equals matrix 2x2', () => {
    const matrixA = new Matrix(2, 2, [
      [1, 2],
      [2, 3],
    ]);
    const matrixB = new Matrix(2, 2, [
      [1, 2],
      [2, 3],
    ]);
    expect(matrixA.equals(matrixB)).to.eq(true);
  });

  it('non equals matrix 2x2', () => {
    const matrixA = new Matrix(2, 2, [
      [1, 2],
      [2, 3],
    ]);
    const matrixB = new Matrix(2, 2, [
      [10, 1],
      [1, 0],
    ]);
    expect(matrixA.equals(matrixB)).to.eq(false);
  });

  it('multiply 3x3', () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);

    const matrixB = new Matrix(3, 3, [
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ]);

    const matrixRes = matrix.multiply(matrixB);

    expect(matrixRes.rows).to.equal(3);
    expect(matrixRes.columns).to.equal(3);
    expect(matrixRes.at(0, 0)).to.equal(60);
    expect(matrixRes.at(0, 1)).to.equal(60);
    expect(matrixRes.at(0, 2)).to.equal(60);
    expect(matrixRes.at(1, 0)).to.equal(60);
    expect(matrixRes.at(1, 1)).to.equal(60);
    expect(matrixRes.at(1, 2)).to.equal(60);
    expect(matrixRes.at(2, 0)).to.equal(60);
    expect(matrixRes.at(2, 1)).to.equal(60);
    expect(matrixRes.at(2, 2)).to.equal(60);
  });

  it('multiply 2x3 - 3x2', () => {
    const matrix = new Matrix(2, 3, [
      [10, 11, 12],
      [13, 14, 15],
    ]);

    const matrixB = new Matrix(3, 2, [
      [1, 2],
      [3, 4],
      [5, 6],
    ]);

    const matrixRes = matrix.multiply(matrixB);

    expect(matrixRes.rows).to.equal(2);
    expect(matrixRes.columns).to.equal(2);

    expect(matrixRes.at(0, 0)).to.equal(103);
    expect(matrixRes.at(0, 1)).to.equal(136);
    expect(matrixRes.at(1, 0)).to.equal(130);
    expect(matrixRes.at(1, 1)).to.equal(172);
  });

  it('multiply 2x3 - 3x5', () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const matrixB = new Matrix(3, 5, [
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [1, 3, 2, 4, 3],
    ]);

    const matrixRes = matrix.multiply(matrixB);

    expect(matrixRes.rows).to.equal(2);
    expect(matrixRes.columns).to.equal(5);

    expect(matrixRes.at(0, 0)).to.equal(14);
    expect(matrixRes.at(0, 1)).to.equal(19);
    expect(matrixRes.at(0, 2)).to.equal(15);
    expect(matrixRes.at(0, 3)).to.equal(20);
    expect(matrixRes.at(0, 4)).to.equal(16);
    expect(matrixRes.at(1, 0)).to.equal(35);
    expect(matrixRes.at(1, 1)).to.equal(46);
    expect(matrixRes.at(1, 2)).to.equal(39);
    expect(matrixRes.at(1, 3)).to.equal(50);
    expect(matrixRes.at(1, 4)).to.equal(43);
  });

  it('multiply error dimensions', () => {
    const matrixA = new Matrix(1, 2);
    const matrixB = new Matrix(3, 4);

    expect(() => matrixA.multiply(matrixB)).to.throw(Error);
  });

  it('determinant error dimensions', () => {
    expect(() => new Matrix(2, 4).determinant()).to.throw(Error);
  });

  it('determinant of matrix 3x3', () => {
    const matrixA = new Matrix(3, 3, [
      [2, 5, 6],
      [3, 6, 1],
      [7, 4, 9],
    ]);

    expect(matrixA.determinant()).to.eq(-180);
  });

  it('determinant of matrix 2x2', () => {
    const matrixA = new Matrix(2, 2, [
      [2, 5],
      [3, 6],
    ]);

    expect(matrixA.determinant()).to.eq(-3);
  });

  it('identity 2x2', () => {
    expect(() => new Matrix(2, 1).setAsIdentity()).to.throw(Error);
  });

  it('identity 2x2', () => {
    const identity2x2 = new Matrix(2, 2, [
      [1, 0],
      [0, 1],
    ]);
    expect(Matrix.identity(2).equals(identity2x2)).to.eq(true);
  });

  it('identity 3x3', () => {
    const identity3x3 = new Matrix(3, 3, [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    expect(Matrix.identity(3).equals(identity3x3)).to.eq(true);
  });

  it('transpose 2x3', () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const transposed = new Matrix(3, 2, [
      [1, 4],
      [2, 5],
      [3, 6],
    ]);

    expect(matrix.transpose().equals(transposed)).to.eq(true);
  });

  it('transpose 3x3', () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const transposed = new Matrix(3, 3, [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);

    expect(matrix.transpose().equals(transposed)).to.eq(true);
  });

  it('inverse 3x3', () => {
    const matrix = new Matrix(3, 3, [
        [1, 2, 3],
        [4, 5, -2],
        [-6, -4, 9],
    ]);

    const inverse = matrix.inverse();
    const product = matrix.multiply(inverse);
    const isAlmostIdentity = product.values.reduce((eql: boolean, row, i) => {
        return eql && row.reduce((eql2: boolean, val, j) => {
          // Remove scientific notation of numbers and precise to 10 after comma.
          // The product result should be as close as the identity matrix values as possible.
          const precise10Val: string = val.toFixed(10);
          let containsVal = '0'; // All values should be equal to 0
          if (i === j) containsVal = '1'; // or 1 for diagonal (identity matrix)
          return eql2 && precise10Val.includes(containsVal);
      }, eql);
    }, true);

    expect(isAlmostIdentity).to.eq(true);
  });

  it('add a row', () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const matrixPlusOneRow = new Matrix(4, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [0, 0, 0],
    ]);

    expect(matrix.addARow().equals(matrixPlusOneRow)).to.eq(true);
  });

  it('add a column', () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const matrixPlusOneCol = new Matrix(3, 4, [
      [1, 2, 3, 0],
      [4, 5, 6, 0],
      [7, 8, 9, 0],
    ]);

    expect(matrix.addAColumn().equals(matrixPlusOneCol)).to.eq(true);
  });

});
