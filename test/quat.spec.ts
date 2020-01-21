import { expect } from 'chai'
import 'mocha'

import Quat from '../src/quat'

import { EPSILON } from '../src/constants'

describe('Quat', () => {

  it('resets', () => {
    const q = new Quat([1.0, 2.0, 3.0, 4.0])

    q.reset()

    expect(q.x).to.equal(0)
    expect(q.y).to.equal(0)
    expect(q.z).to.equal(0)
  })

  it('copies', () => {
    const q1 = new Quat([1.0, 2.0, 3.0, 4.0])
    const q2 = q1.copy()

    expect(q2.x).to.equal(q1.x)
    expect(q2.y).to.equal(q1.y)
    expect(q2.z).to.equal(q1.z)
    expect(q2.w).to.equal(q1.w)
  })

  it('compares', () => {
    const q1 = new Quat([1.0, 2.0, 3.0, 4.0])
    const q2 = new Quat([1.0, 2.0, 3.0, 4.0])
    const q3 = new Quat([2.0, 3.0, 4.0, 5.0])

    expect(q1.equals(q2)).to.equal(true)
    expect(q1.equals(q3)).to.equal(false)
  })

  it('adds', () => {
    const q1 = new Quat([1.0, 2.0, 3.0, 4.0])
    const q2 = new Quat([2.0, 3.0, 4.0, 5.0])

    const result = q1.add(q2)

    expect(result.x).to.be.approximately(3.0, EPSILON)
    expect(result.y).to.be.approximately(5.0, EPSILON)
    expect(result.z).to.be.approximately(7.0, EPSILON)
    expect(result.w).to.be.approximately(9.0, EPSILON)
  })

  it('multiplies', () => {
    const q1 = new Quat([1.0, 3.0, 4.0, 5.0])
    const q2 = new Quat([5.0, 6.0, 7.0, 8.0])

    const result = q1.multiply(q2)

    expect(result.x).to.be.approximately(30.0, EPSILON)
    expect(result.y).to.be.approximately(67.0, EPSILON)
    expect(result.z).to.be.approximately(58.0, EPSILON)
    expect(result.w).to.be.approximately(-11.0, EPSILON)
  })

  it('normalizes', () => {
    const quaternion = new Quat([1.0, 2.0, 3.0, 4.0])

    quaternion.normalize()

    expect(quaternion.x).to.be.approximately(0.18257, EPSILON)
    expect(quaternion.y).to.be.approximately(0.36515, EPSILON)
    expect(quaternion.z).to.be.approximately(0.54772, EPSILON)
    expect(quaternion.w).to.be.approximately(0.73029, EPSILON)
  })

})
