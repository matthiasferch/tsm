import 'mocha';
import Vector from '../src/Vector';
import { expect } from 'chai';

describe('Vectors', () => {

  it('equals vectors x2', () => {
    const vectorA = new Vector([1, 2]);
    const vectorB = new Vector([1, 2]);
    expect(vectorA.equals(vectorB)).to.eq(true);
  });

  it('non equals vectors x2', () => {
    const vectorA = new Vector([1, 2]);
    const vectorB = new Vector([3, 2]);
    expect(vectorA.equals(vectorB)).to.eq(false);
  });

  it('non equals vectors x2 - bis', () => {
    const vectorA = new Vector([1, 2]);
    const vectorB = new Vector([3, 4]);
    expect(vectorA.equals(vectorB)).to.eq(false);
  });

  it('equals vectors x3', () => {
    const vectorA = new Vector([1, 2, 3]);
    const vectorB = new Vector([1, 2, 3]);
    expect(vectorA.equals(vectorB)).to.eq(true);
  });

  it('non equals vectors x3', () => {
    const vectorA = new Vector([1, 2, 3]);
    const vectorB = new Vector([4, 3, 3]);
    expect(vectorA.equals(vectorB)).to.eq(false);
  });

  it('Negate vector x3', () => {
    const vector = new Vector([1, 2, 3]);
    const negateVector = new Vector([-1, -2, -3]);
    expect(vector.negate().equals(negateVector)).to.eq(true);
  });

  it('Fail negate vector x3', () => {
    const vector = new Vector([1, 2, 3]);
    const negateVector = new Vector([-1, 2, -3]);
    expect(vector.negate().equals(negateVector)).to.eq(false);
  });

  it('Squared length of vector', () => {
    const vector = new Vector([2, 3]);
    const length2 = (2 * 2) + (3 * 3);
    expect(vector.squaredLength()).to.eq(length2);
  });

  it('Length of vector', () => {
    const vector = new Vector([2, 3]);
    const length = Math.sqrt((2 * 2) + (3 * 3));
    expect(vector.length()).to.eq(length);
  });

  it('Add two vectors', () => {
    const vectorA = new Vector([1, 1]);
    const vectorB = new Vector([2, 2]);
    const vectorRes = new Vector([3, 3]);
    expect(vectorA.add(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Substract two vectors', () => {
    const vectorA = new Vector([3, 2]);
    const vectorB = new Vector([1, 4]);
    const vectorRes = new Vector([2, -2]);
    expect(vectorA.substract(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Multiply two vectors', () => {
    const vectorA = new Vector([2, 2]);
    const vectorB = new Vector([2, 2]);
    const vectorRes = new Vector([4, 4]);
    expect(vectorA.multiply(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Multiply two vectors - bis', () => {
    const vectorA = new Vector([2, 3]);
    const vectorRes = new Vector([4, 9]);
    expect(vectorA.multiply(vectorA).equals(vectorRes)).to.eq(true);
  });

  it('Divide two vectors - bis', () => {
    const vectorA = new Vector([2, 9]);
    const vectorB = new Vector([2, 3]);
    const vectorRes = new Vector([1, 3]);
    expect(vectorA.divide(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Divide two vectors - division by zero', () => {
    const vectorA = new Vector([2, 9]);
    const vectorB = new Vector([2, 0]);
    const vectorRes = new Vector([1, 9]);
    expect(vectorA.divide(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Scale a vector', () => {
    const vectorA = new Vector([2, 3]);
    const vectorRes = new Vector([4, 6]);
    expect(vectorA.scale(2).equals(vectorRes)).to.eq(true);
  });

  it('Normalize a vector', () => {
    const vectorA = new Vector([4, 3]);
    const vectorRes = new Vector([4 / 5, 3 / 5]);
    expect(vectorA.normalize().equals(vectorRes)).to.eq(true);
  });

  it('Dot product of two vector', () => {
    const vectorA = new Vector([1, 2, 3]);
    const vectorB = new Vector([1, 5, 7]);
    const res = 32;
    expect(vectorA.dot(vectorB)).to.eq(res);
  });

  it('Dot product of two vector - bis', () => {
    const vectorA = new Vector([-1, -2, 3]);
    const vectorB = new Vector([4, 0, -8]);
    const res = -28;
    expect(vectorA.dot(vectorB)).to.eq(res);
  });

  it('Cross product of two vector', () => {
    const vectorA = new Vector([1, 2, 3]);
    const vectorB = new Vector([1, 5, 7]);
    const vectorRes = new Vector([-1, -4, 3]);
    expect(vectorA.cross(vectorB).equals(vectorRes)).to.eq(true);
  });

  it('Cross product of two vector - bis', () => {
    const vectorA = new Vector([-1, -2, 3]);
    const vectorB = new Vector([4, 0, -8]);
    const vectorRes = new Vector([16, 4, 8]);
    expect(vectorA.cross(vectorB).equals(vectorRes)).to.eq(true);
  });


  it('Cross product of two vector - bis', () => {
    const vectorA = new Vector([-1, -2, 3]);
    const vectorB = new Vector([4, 0, -8]);
    const vectorRes = new Vector([16, 4, 8]);
    expect(vectorA.cross(vectorB).equals(vectorRes)).to.eq(true);
  });
});
