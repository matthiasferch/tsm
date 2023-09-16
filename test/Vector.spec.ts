import Vector from '../src/Vector';

describe('Vectors.ts', () => {
  it.each([
    [[1, 2], [1, 2], true],
    [[-1, -2], [-1, -2], true],
    [[-99, 100], [-99, 100], true],
    [[1, 2], [-1, -2], false],
    [[1, 2], [-1, 2], false],
    [[1, 2], [1, -2], false],
    [[1, 2], [3, 4], false],
    [[-99, 100], [99, 100], false],
    [[99, -100], [99, 100], false],
    [[1, 2], [1], false],
    [[1], [1, 2], false],
    [[1, 2], [1, 2, 3], false],
    [[1], [1, 2, 3], false],
  ])('should check vectors equality', (inputA, inputB, expectedEquality) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    expect(vectorA.equals(vectorB)).eq(expectedEquality);
  });

  it.each([
    [[1, 2, 3], [-1, -2, -3]],
    [[-1, -2, -3], [1, 2, 3]],
    [[-1, 2, -3], [1, -2, 3]],
    [[1, -2, 3], [-1, 2, -3]],
    [[1], [-1]],
    [[10, -12, -14, 15, 23], [-10, 12, 14, -15, -23]],
  ])('should negate vector', (inputA, expectedResult) => {
    const vector = new Vector(inputA);
    const expectedVector = new Vector(expectedResult);
    expect(vector.negate().equals(expectedVector)).toBeTruthy();
  });

  it.each([
    [[2, 3], 4 + 9],
    [[-2, -3], 4 + 9],
    [[-2, 3], 4 + 9],
    [[2, -3], 4 + 9],
    [[-9, 2, 4], 81 + 4 + 16],
  ])('should get the squared length of vector', (inputVector, expectedResult) => {
    const vector = new Vector(inputVector);
    expect(vector.squaredLength()).eq(expectedResult);
  });

  it.each([
    [[2, 3], Math.sqrt(4 + 9)],
    [[-2, -3], Math.sqrt(4 + 9)],
    [[-2, 3], Math.sqrt(4 + 9)],
    [[2, -3], Math.sqrt(4 + 9)],
    [[-9, 2, 4], Math.sqrt(81 + 4 + 16)],
  ])('should get the length of vector', (inputVector, expectedResult) => {
    const vector = new Vector(inputVector);
    expect(vector.length()).eq(expectedResult);
  });

  it.each([
    [[2, 3], 3, 1],
    [[-2, -3, -4, 0, 1], 0, 3],
    [[-1, 0, 1, -2, 2], 2, 4],
    [[-9, 2, 4], -8, -1],
  ])('should get the position of value in the vector', (inputVector, value, expectedResult) => {
    const vector = new Vector(inputVector);
    expect(vector.indexOf(value)).eq(expectedResult);
  });

  it.each([
    [[1, 0, 1], [0, 1, 0], Math.PI / 2],
    [[1, 0], [1, 1], Math.PI / 4],
    [[1, 2], [1, 6, 3, 5], null],
  ])(
    "should get the angle between vectors",
    (inputA, inputB, expectedResult) => {
      const vectorA = new Vector(inputA);
      const vectorB = new Vector(inputB);

      if (!expectedResult) {
        expect(() => vectorA.angleFrom(vectorB)).toThrowError();
      } else {
        const angle = vectorA.angleFrom(vectorB);
        const toThousands = (num: number) => Math.round(num * 1000) / 1000;
        expect(toThousands(angle)).eq(toThousands(expectedResult));
      }
    }
  );
  
  it.each([
  [[1, 2, 3], [4, 5, 6], 5.196152422706632],
  [[2, 3], [4, 5], 2.8284271247461903],
  [[2, 2, 2], [3, 3, 3], 1.732051],
  [[1, 2], [3, 4, 5], null],
  ])(
    "should get the distance between vectors",
    (inputA, inputB, expectedResult) => {
      const vectorA = new Vector(inputA);
      const vectorB = new Vector(inputB);

      if (!expectedResult) {
        expect(() => vectorA.distanceFrom(vectorB)).toThrowError();
      } else {
        const distance = vectorA.distanceFrom(vectorB);
        const toThousands = (num: number) => Math.round(num * 1000) / 1000;
        expect(toThousands(distance)).eq(toThousands(expectedResult));
      }
    }
  );

  it.each([
    [[], null],
    [[1, 1], 1],
    [[-3, -1, 2], 2],
    [[1, 2, 4, 8, 16, 32, 64, 128], 128],
    [[-1, -2, -4, -8, -16, -32, -64, -128], -1],
  ])('should get the maximum value of a vector', (inputA, expectedResult) => {
    const vectorA = new Vector(inputA);
    if (!expectedResult) {
      expect(() => vectorA.max()).toThrowError();
    } else {
      expect(vectorA.max() === (expectedResult)).toBeTruthy();
    }
  });

  it.each([
    [[], null],
    [[1, 1], 1],
    [[-3, -1, 2], -3],
    [[1, 2, 4, 8, 16, 32, 64, 128], 1],
    [[-1, -2, -4, -8, -16, -32, -64, -128], -128],
  ])('should get the minimum value of a vector', (inputA, expectedResult) => {
    const vectorA = new Vector(inputA);
    if (!expectedResult) {
      expect(() => vectorA.min()).toThrowError();
    } else {
      expect(vectorA.min() === (expectedResult)).toBeTruthy();
    }
  });

  it.each([
    [[], null],
    [[1.5, 1.1], [2, 1]],
    [[-3.123123, 100.99, 2.499], [-3, 101, 2]],
    [[-1.49, -1.5, -1.51], [-1, -1, -2]],
  ])('should round the values of a vector', (inputA, expectedResult) => {
    const vectorA = new Vector(inputA);
    if (!expectedResult) {
      expect(() => vectorA.round()).toThrowError();
    } else {
      const vectorRes = new Vector(expectedResult);
      expect(vectorA.round().equals(vectorRes)).toBeTruthy();
    }
  });

  it.each([
    [[1, 1], [2, 2], [3, 3]],
    [[-3, -3], [2, 2], [-1, -1]],
    [[-3, -3], [2, -4], [-1, -7]],
    [[-3, -3], [-10, 0], [-13, -3]],
    [[10, 0], [-10, 0], [0, 0]],
    [[10, 49], [-40, -10], [-30, 39]],
  ])('should add two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.add(vectorB).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[1, 1], [2, 2], [-1, -1]],
    [[-3, -3], [2, 2], [-5, -5]],
    [[-3, -3], [2, -4], [-5, 1]],
    [[-3, -3], [-10, 0], [7, -3]],
    [[10, 0], [-10, 0], [20, 0]],
    [[10, 49], [-40, -10], [50, 59]],
  ])('should subtract two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.subtract(vectorB).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[1, 1], [2, 2], [2, 2]],
    [[-3, -3], [2, 2], [-6, -6]],
    [[-3, -3], [2, -4], [-6, 12]],
    [[-3, -3], [-10, 0], [30, 0]],
    [[10, 0], [-10, 0], [-100, 0]],
    [[10, 49], [-40, -10], [-400, -490]],
  ])('should multiply two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.multiply(vectorB).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[2, 9], [2, 3], [1, 3]],
    [[-2, -9], [2, 3], [-1, -3]],
    [[2, 9], [-2, -3], [-1, -3]],
    [[2, 9], [0, 3], [2, 3]],
  ])('should divide two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.divide(vectorB).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[1, 2], 3, [3, 6]],
    [[1, -2], 3, [3, -6]],
  ])('should scale two vectors', (inputA, scale, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.scale(scale).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[4, 3], [4 / 5, 3 / 5]],
  ])('should normalize two vectors', (inputA, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.normalize().equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[1, 2, 3], [1, 5, 7], 32],
    [[-1, -2, 3], [4, 0, -8], -28],
  ])('should dot product two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    expect(vectorA.dot(vectorB)).eq(expectedResult);
  });

  it.each([
    [[1, 2, 3], [1, 5, 7], [-1, -4, 3]],
    [[-1, -2, 3], [4, 0, -8], [16, 4, 8]],
  ])('should cross product two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.cross(vectorB).equals(vectorRes)).toBeTruthy();
  });

  it.each([
    [[], '[]'],
    [[8], '[8]'],
    [[1, 2, 3], '[1, 2, 3]'],
    [[1, 2, 3, 1, 5, 7], '[1, 2, 3, 1, 5, 7]'],
  ])('should log vectors', (inputA, expectedResult) => {
    const vectorA = new Vector(inputA);
    expect(vectorA.toString()).eq(expectedResult);
  });
});
