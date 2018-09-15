import { expect } from 'chai'
import 'mocha'

import vec2 from './../src/vec2'

import { epsilon } from '../src/constants'

describe('vec2', () => {

  it('resets', () => {
    const vector = new vec2([1.0, 2.0])

    vector.reset()

    expect(vector.x).to.equal(0)
    expect(vector.y).to.equal(0)
  })

  it('copies', () => {
    const vector1 = new vec2([1.0, 2.0])
    const vector2 = vector1.copy()

    expect(vector2.x).to.equal(vector1.x)
    expect(vector2.y).to.equal(vector1.y)
  })

  it('negates', () => {
    const vector = new vec2([1.0, 2.0])

    vector.negate()

    expect(vector.x).to.equal(-1.0)
    expect(vector.y).to.equal(-2.0)
  })

  it('compares', () => {
    const vector1 = new vec2([1.0, 2.0])
    const vector2 = new vec2([1.0, 2.0])
    const vector3 = new vec2([2.0, 3.0])

    expect(vector1.equals(vector2)).to.equal(true)
    expect(vector1.equals(vector3)).to.equal(false)
  })

  it('adds', () => {
    const vector1 = new vec2([1.0, 2.0])
    const vector2 = new vec2([2.0, 3.0])

    const result = vector1.add(vector2)

    expect(result.x).to.be.approximately(3.0, epsilon)
    expect(result.y).to.be.approximately(5.0, epsilon)
  })

  it('subtracts', () => {
    const vector1 = new vec2([1.0, 2.0])
    const vector2 = new vec2([2.0, 4.0])

    const result = vector1.subtract(vector2)

    expect(result.x).to.be.approximately(-1.0, epsilon)
    expect(result.y).to.be.approximately(-2.0, epsilon)
  })

  it('multiplies', () => {
    const vector1 = new vec2([2.0, 3.0])
    const vector2 = new vec2([5.0, 6.0])

    const result = vector1.multiply(vector2)

    expect(result.x).to.be.approximately(10.0, epsilon)
    expect(result.y).to.be.approximately(18.0, epsilon)
  })

  it('divides', () => {
    const vector1 = new vec2([2.0, 3.0])
    const vector2 = new vec2([5.0, 6.0])

    const result = vector1.divide(vector2)

    expect(result.x).to.be.approximately(0.4, epsilon)
    expect(result.y).to.be.approximately(0.5, epsilon)
  })

  it('scales', () => {
    const vector = new vec2([1.0, 2.0])

    vector.scale(2.0)

    expect(vector.x).to.be.approximately(2.0, epsilon)
    expect(vector.y).to.be.approximately(4.0, epsilon)
  })

  it('normalizes', () => {
    const vector = new vec2([1.0, 2.0])

    vector.normalize()

    expect(vector.x).to.be.approximately(0.44721, epsilon)
    expect(vector.y).to.be.approximately(0.89443, epsilon)
  })

})
