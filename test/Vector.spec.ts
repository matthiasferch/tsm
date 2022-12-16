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
  ])('should substract two vectors', (inputA, inputB, expectedResult) => {
    const vectorA = new Vector(inputA);
    const vectorB = new Vector(inputB);
    const vectorRes = new Vector(expectedResult);
    expect(vectorA.substract(vectorB).equals(vectorRes)).toBeTruthy();
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
});
