import 'mocha';
import Matrix from '../src/Matrix';
import { expect } from 'chai';

describe('Multiplies', () => {

  // it('multiply 3x3', () => {
  //   const matrix = new Matrix(3, 3, [
  //     1, 2, 3,
  //     1, 2, 3,
  //     1, 2, 3,
  //   ]);

  //   const matrixB = new Matrix(3, 3, [
  //     10, 10, 10,
  //     10, 10, 10,
  //     10, 10, 10,
  //   ]);

  //   const matrixRes = matrix.multiply(matrixB);

  //   expect(matrixRes.rows).to.equal(3);
  //   expect(matrixRes.columns).to.equal(3);
  //   expect(matrixRes.at(0, 0)).to.equal(60);
  //   expect(matrixRes.at(0, 1)).to.equal(60);
  //   expect(matrixRes.at(0, 2)).to.equal(60);
  //   expect(matrixRes.at(1, 0)).to.equal(60);
  //   expect(matrixRes.at(1, 1)).to.equal(60);
  //   expect(matrixRes.at(1, 2)).to.equal(60);
  //   expect(matrixRes.at(2, 0)).to.equal(60);
  //   expect(matrixRes.at(2, 1)).to.equal(60);
  //   expect(matrixRes.at(2, 2)).to.equal(60);
  // });

  // it('multiply 2x3 - 3x2', () => {
  //   const matrix = new Matrix(2, 3, [
  //     10, 11, 12,
  //     13, 14, 15,
  //   ]);

  //   const matrixB = new Matrix(3, 2, [
  //     1, 2,
  //     3, 4,
  //     5, 6,
  //   ]);

  //   const matrixRes = matrix.multiply(matrixB);

  //   expect(matrixRes.rows).to.equal(2);
  //   expect(matrixRes.columns).to.equal(2);

  //   expect(matrixRes.at(0, 0)).to.equal(103);
  //   expect(matrixRes.at(0, 1)).to.equal(136);
  //   expect(matrixRes.at(1, 0)).to.equal(130);
  //   expect(matrixRes.at(1, 1)).to.equal(172);
  // });

  it('multiply 2x3 - 3x5', () => {
    const matrix = new Matrix(2, 3, [
      1, 2, 3,
      4, 5, 6,
    ]);

    const matrixB = new Matrix(3, 5, [
      1, 2, 3, 4, 5,
      5, 4, 3, 2, 1,
      1, 3, 2, 4, 3,
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

});
