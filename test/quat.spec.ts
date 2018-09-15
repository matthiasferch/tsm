import { expect } from 'chai'
import 'mocha'

import quat from './../src/quat'

import { epsilon } from '../src/constants'

describe('quat', () => {

  it('resets', () => {
    const q = new quat([1.0, 2.0, 3.0, 4.0])

    q.reset()

    expect(q.x).to.equal(0)
    expect(q.y).to.equal(0)
    expect(q.z).to.equal(0)
  })

  it('copies', () => {
    const q1 = new quat([1.0, 2.0, 3.0, 4.0])
    const q2 = q1.copy()

    expect(q2.x).to.equal(q1.x)
    expect(q2.y).to.equal(q1.y)
    expect(q2.z).to.equal(q1.z)
    expect(q2.w).to.equal(q1.w)
  })

  it('compares', () => {
    const q1 = new quat([1.0, 2.0, 3.0, 4.0])
    const q2 = new quat([1.0, 2.0, 3.0, 4.0])
    const q3 = new quat([2.0, 3.0, 4.0, 5.0])

    expect(q1.equals(q2)).to.equal(true)
    expect(q1.equals(q3)).to.equal(false)
  })

  it('adds', () => {
    const q1 = new quat([1.0, 2.0, 3.0, 4.0])
    const q2 = new quat([2.0, 3.0, 4.0, 5.0])

    const result = q1.add(q2)

    expect(result.x).to.be.approximately(3.0, epsilon)
    expect(result.y).to.be.approximately(5.0, epsilon)
    expect(result.z).to.be.approximately(7.0, epsilon)
    expect(result.w).to.be.approximately(9.0, epsilon)
  })

  it('multiplies', () => {
    const q1 = new quat([1.0, 3.0, 4.0, 5.0])
    const q2 = new quat([5.0, 6.0, 7.0, 8.0])

    const result = q1.multiply(q2)

    expect(result.x).to.be.approximately(30.0, epsilon)
    expect(result.y).to.be.approximately(67.0, epsilon)
    expect(result.z).to.be.approximately(58.0, epsilon)
    expect(result.w).to.be.approximately(-11.0, epsilon)
  })

  it('normalizes', () => {
    const quaternion = new quat([1.0, 2.0, 3.0, 4.0])

    quaternion.normalize()

    expect(quaternion.x).to.be.approximately(0.18257, epsilon)
    expect(quaternion.y).to.be.approximately(0.36515, epsilon)
    expect(quaternion.z).to.be.approximately(0.54772, epsilon)
    expect(quaternion.w).to.be.approximately(0.73029, epsilon)
  })

})
