import Matrix from '../src/Matrix';

describe('Matrix class', () => {
  // Most important tests because other tests rely on the reliability of the equals() method.
  describe('equals', () => {
    it('should correctly check equality of two 2x2 matrices', () => {
      const matrixA = new Matrix(2, 2, [
        [1, 2],
        [2, 3],
      ]);
      const matrixB = new Matrix(2, 2, [
        [1, 2],
        [2, 3],
      ]);
      expect(matrixA.equals(matrixB)).toBeTruthy();
    });
  
    it('should correctly check non equality of two 2x2 matrices', () => {
      const matrixA = new Matrix(2, 2, [
        [1, 2],
        [2, 3],
      ]);
      const matrixB = new Matrix(2, 2, [
        [10, 1],
        [1, 0],
      ]);
      expect(matrixA.equals(matrixB)).toBeFalsy();
    });
  });

  describe('multiply', () => {
    it.each([
      [
        [[1, 2, 3],
         [1, 2, 3],
         [1, 2, 3]],
        [[10, 10, 10],
         [10, 10, 10],
         [10, 10, 10]],
        [[60, 60, 60],
         [60, 60, 60],
         [60, 60, 60]]
      ],
      [
        [[10, 11, 12],
         [13, 14, 15]],
        [[1, 2],
         [3, 4],
         [5, 6]],
        [[103, 136],
         [130, 172]]
      ],
      [
        [[1, 2, 3],
         [4, 5, 6]],
        [[1, 2, 3, 4, 5],
         [5, 4, 3, 2, 1],
         [1, 3, 2, 4, 3]],
        [[14, 19, 15, 20, 16],
         [35, 46, 39, 50, 43]],
      ],
    ])('should multiply two matrices', (inputA, inputB, expectedMatrix) => {
      const columnsA = inputA.length;
      const rowsA = inputA[0].length;
      const columnsB = inputB.length;
      const rowsB = inputB[0].length;

      const matrixA = new Matrix(columnsA, rowsA, inputA);
      const matrixB = new Matrix(columnsB, rowsB, inputB);
  
      const matrixRes = matrixA.multiply(matrixB);

      expect(matrixRes.rows).to.equal(columnsA);
      expect(matrixRes.columns).to.equal(rowsB);
      expect(matrixRes.equals(new Matrix(expectedMatrix.length, expectedMatrix[0].length, expectedMatrix))).toBeTruthy();
    });
  
    it('multiply error dimensions', () => {
      const matrixA = new Matrix(1, 2);
      const matrixB = new Matrix(3, 4);
  
      expect(() => matrixA.multiply(matrixB)).toThrowError('Dimension error');
    });
  });
  
  describe('determinant', () => {
    it.each([
      [
        [[2, 5, 6],
         [3, 6, 1],
         [7, 4, 9]],
         -180
      ],
      [
        [[2, 5],
         [3, 6]],
         -3
      ],
      [
        [[15]],
         15
      ],
    ])('should compute the determinant on squared matrix', (inputMatrix, expectedResult) => {
      const matrixA = new Matrix(inputMatrix.length, inputMatrix[0]?.length || 1, inputMatrix);
  
      expect(matrixA.determinant()).eq(expectedResult);
    });

    it('should error on non-squared matrix', () => {
      expect(() => new Matrix(2, 4).determinant()).toThrowError('squared');
    });
  });
  
  describe('identity', () => {
    // Bad test since we use a similar algorithm than the function ifself to check if it works... What can *prove* us this double loop is correct?
    it.each([1, 2, 3, 4, 5, 15])('should generate identity matrix', (dimension) => {
      const identityMatrix = Matrix.identity(dimension);
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          expect(identityMatrix.at(i, j)).toEqual(i === j ? 1 : 0);
        }
      }
    });
  
    it('should throw error on non-squared matrix', () => {
      expect(() => new Matrix(2, 1).setAsIdentity()).toThrowError('Dimension error');
    });
  });

  describe('transpose', () => {
    it.each([
      [
        [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]],
        [[1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]]
      ],
      [
        [[-10, -20, -30],
        [99, 100, 101],
        [5, 6, 7]],
        [[-10, 99, 5],
        [-20, 100, 6],
        [-30, 101, 7]]
      ],
    ])('should transpose matrix', (inputMatrix, expectedResult) => {
      const matrix = new Matrix(inputMatrix.length, inputMatrix[0].length, inputMatrix);
      const transposed = new Matrix(expectedResult.length, expectedResult[0].length, expectedResult);
    
      expect(matrix.transpose().equals(transposed)).toBeTruthy();
    });
  });
  
  describe('inverse', () => {
    it.each([
      [
        [[1, 2, 3],
        [4, 5, -2],
        [-6, -4, 9]],
      ],
      [
        [[-100, -101, -50],
        [-12, -5, -2],
        [-140, -65, -88]],
      ],
      [
        [[-100, 101, -50],
        [12, -5, -2],
        [-140, 65, -88]],
      ],
      [
        [[100, 101, -50],
        [12, -5, -2],
        [140, 65, 88]],
      ],
      [
        [[3, 2, 4, 5],
        [6, 1, 3, 2],
        [7, 3, 7, 5],
        [6, 2, 2, 4]],
      ],
      [
        [[3, -2, 4, 5],
        [6, 1, -3, 2],
        [-7, 3, -7, -5],
        [6, -2, 2, -4]],
      ],
      [
        [[3, -2, 4, 5, 7],
        [6, 1, -3, 2, 4],
        [-7, 3, -7, -5, 5],
        [6, -2, 2, -4, 1],
        [1, 5, 2, -7, -9]],
      ],
    ])('should inverse matrix', (inputMatrix) => {
      const matrix = new Matrix(inputMatrix.length, inputMatrix[0].length, inputMatrix);
    
      const inverse = matrix.inverse();
      const matrixMultipliedWithInverse = matrix.multiply(inverse);

      expect(roundMatrixValues(matrixMultipliedWithInverse).equals(Matrix.identity(inputMatrix.length))).toBeTruthy();

      // Javascript multiplication is not perfect and introduce not expected decimals.
      function roundMatrixValues(matrix: Matrix, decimals = 10): Matrix {
        return new Matrix(matrix.rows, matrix.columns, matrix.values.map(row => row.map(col => parseFloat(col.toFixed(decimals)))));
      }
    });
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
  
    expect(matrix.addARow().equals(matrixPlusOneRow)).toBeTruthy();
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
  
    expect(matrix.addAColumn().equals(matrixPlusOneCol)).toBeTruthy();
  });
});
