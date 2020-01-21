import { expect } from 'chai'
import 'mocha'

import Mat4 from '../src/mat4'

import { EPSILON } from '../src/constants'

describe('Mat4', () => {

  it('transposes', () => {
    const matrix = new Mat4([
        1.0, 2.0, 3.0, 4.0,
        5.0, 6.0, 7.0, 8.0,
        9.0, 10.0, 11.0, 12.0,
        13.0, 14.0, 15.0, 16.0,
    ])

    matrix.transpose()

    expect(matrix.at(0)).to.equal(1.0)
    expect(matrix.at(1)).to.equal(5.0)
    expect(matrix.at(2)).to.equal(9.0)
    expect(matrix.at(3)).to.equal(13.0)

    expect(matrix.at(4)).to.equal(2.0)
    expect(matrix.at(5)).to.equal(6.0)
    expect(matrix.at(6)).to.equal(10.0)
    expect(matrix.at(7)).to.equal(14.0)

    expect(matrix.at(8)).to.equal(3.0)
    expect(matrix.at(9)).to.equal(7.0)
    expect(matrix.at(10)).to.equal(11.0)
    expect(matrix.at(11)).to.equal(15.0)

    expect(matrix.at(12)).to.equal(4.0)
    expect(matrix.at(13)).to.equal(8.0)
    expect(matrix.at(14)).to.equal(12.0)
    expect(matrix.at(15)).to.equal(16.0)

  })

  it('computes perspective projection', () => {
    const matrix = Mat4.perspective(45, 1, 1, 100)

    expect(matrix.at(0)).to.be.approximately(2.414213, EPSILON)
    expect(matrix.at(1)).to.equal(0.0)
    expect(matrix.at(2)).to.equal(0.0)
    expect(matrix.at(3)).to.equal(0.0)

    expect(matrix.at(4)).to.equal(0.0)
    expect(matrix.at(5)).to.be.approximately(2.414213, EPSILON)
    expect(matrix.at(6)).to.equal(0.0)
    expect(matrix.at(7)).to.equal(0.0)

    expect(matrix.at(8)).to.equal(0.0)
    expect(matrix.at(9)).to.equal(0.0)
    expect(matrix.at(10)).to.be.approximately(-1.02020, EPSILON)
    expect(matrix.at(11)).to.equal(-1.0)

    expect(matrix.at(12)).to.equal(0.0)
    expect(matrix.at(13)).to.equal(0.0)
    expect(matrix.at(14)).to.be.approximately(-2.02020, EPSILON)
    expect(matrix.at(15)).to.equal(0.0)

  })

  it('computes orthographic projection', () => {
    const matrix = Mat4.orthographic(0, 800, 0, 600, 1, 100)

    expect(matrix.at(0)).to.be.approximately(0.002499, EPSILON)
    expect(matrix.at(1)).to.equal(0.0)
    expect(matrix.at(2)).to.equal(0.0)
    expect(matrix.at(3)).to.equal(0.0)

    expect(matrix.at(4)).to.equal(0.0)
    expect(matrix.at(5)).to.be.approximately(0.003333, EPSILON)
    expect(matrix.at(6)).to.equal(0.0)
    expect(matrix.at(7)).to.equal(0.0)

    expect(matrix.at(8)).to.equal(0.0)
    expect(matrix.at(9)).to.equal(0.0)
    expect(matrix.at(10)).to.be.approximately(-0.020202, EPSILON)
    expect(matrix.at(11)).to.equal(0.0)

    expect(matrix.at(12)).to.equal(-1.0)
    expect(matrix.at(13)).to.equal(-1.0)
    expect(matrix.at(14)).to.be.approximately(-1.020202, EPSILON)
    expect(matrix.at(15)).to.equal(1.0)

  })

})
