import { expect } from 'chai'
import 'mocha'

import Vec2 from '../src/vec2'

import { EPSILON } from '../src/constants'

describe('Vec2', () => {

  it('resets', () => {
    const vector = new Vec2([1.0, 2.0])

    vector.reset()

    expect(vector.x).to.equal(0)
    expect(vector.y).to.equal(0)
  })

  it('copies', () => {
    const vector1 = new Vec2([1.0, 2.0])
    const vector2 = vector1.copy()

    expect(vector2.x).to.equal(vector1.x)
    expect(vector2.y).to.equal(vector1.y)
  })

  it('negates', () => {
    const vector = new Vec2([1.0, 2.0])

    vector.negate()

    expect(vector.x).to.equal(-1.0)
    expect(vector.y).to.equal(-2.0)
  })

  it('compares', () => {
    const vector1 = new Vec2([1.0, 2.0])
    const vector2 = new Vec2([1.0, 2.0])
    const vector3 = new Vec2([2.0, 3.0])

    expect(vector1.equals(vector2)).to.equal(true)
    expect(vector1.equals(vector3)).to.equal(false)
  })

  it('adds', () => {
    const vector1 = new Vec2([1.0, 2.0])
    const vector2 = new Vec2([2.0, 3.0])

    const result = vector1.add(vector2)

    expect(result.x).to.be.approximately(3.0, EPSILON)
    expect(result.y).to.be.approximately(5.0, EPSILON)
  })

  it('subtracts', () => {
    const vector1 = new Vec2([1.0, 2.0])
    const vector2 = new Vec2([2.0, 4.0])

    const result = vector1.subtract(vector2)

    expect(result.x).to.be.approximately(-1.0, EPSILON)
    expect(result.y).to.be.approximately(-2.0, EPSILON)
  })

  it('multiplies', () => {
    const vector1 = new Vec2([2.0, 3.0])
    const vector2 = new Vec2([5.0, 6.0])

    const result = vector1.multiply(vector2)

    expect(result.x).to.be.approximately(10.0, EPSILON)
    expect(result.y).to.be.approximately(18.0, EPSILON)
  })

  it('divides', () => {
    const vector1 = new Vec2([2.0, 3.0])
    const vector2 = new Vec2([5.0, 6.0])

    const result = vector1.divide(vector2)

    expect(result.x).to.be.approximately(0.4, EPSILON)
    expect(result.y).to.be.approximately(0.5, EPSILON)
  })

  it('scales', () => {
    const vector = new Vec2([1.0, 2.0])

    vector.scale(2.0)

    expect(vector.x).to.be.approximately(2.0, EPSILON)
    expect(vector.y).to.be.approximately(4.0, EPSILON)
  })

  it('normalizes', () => {
    const vector = new Vec2([1.0, 2.0])

    vector.normalize()

    expect(vector.x).to.be.approximately(0.44721, EPSILON)
    expect(vector.y).to.be.approximately(0.89443, EPSILON)
  })

})
