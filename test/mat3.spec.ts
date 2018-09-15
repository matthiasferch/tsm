import { expect } from 'chai'
import 'mocha'

import mat3 from '../src/mat3'

describe('mat3', () => {

  it('transposes', () => {
    const matrix = new mat3([
        1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0,
        10.0, 11.0, 12.0,
    ])

    matrix.transpose()

    expect(matrix.at(0)).to.equal(1.0)
    expect(matrix.at(1)).to.equal(4.0)
    expect(matrix.at(2)).to.equal(7.0)

    expect(matrix.at(3)).to.equal(2.0)
    expect(matrix.at(4)).to.equal(5.0)
    expect(matrix.at(5)).to.equal(8.0)

    expect(matrix.at(6)).to.equal(3.0)
    expect(matrix.at(7)).to.equal(6.0)
    expect(matrix.at(8)).to.equal(9.0)

  })

})
