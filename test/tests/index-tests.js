/* eslint-env mocha */

var expect = require('chai').expect
var jscale = require('../../index')
var fs = require('fs')
var path = require('path')

var plainFileFixture = fs.readFileSync(
  path.resolve(__dirname, '../fixtures/plainfile.txt'), 'utf8'
)

var javascriptFileFixture = fs.readFileSync(
  path.resolve(__dirname, '../fixtures/jscale.js'), 'utf8'
)

describe('jscale', function () {
  describe('api', function () {
    it('gives a notice about uglify errors', function () {
      expect(jscale.bind(null, plainFileFixture, true))
        .to.throw(/UglifyJS choked/)
    })

    it('returns a list of sizes', function () {
      var sizes = jscale(plainFileFixture)
      expect(sizes).to.have.keys([ 'untransformed', 'gzipped' ])
    })

    it('returns a list of sizes, including uglified for javascript', function () {
      var sizes = jscale(javascriptFileFixture, true)
      expect(sizes).to.have.keys(
        [ 'untransformed', 'gzipped', 'uglified', 'uglifiedAndGzipped' ]
      )
    })

    it('weighs file sizes properly', function () {
      var sizes = jscale(javascriptFileFixture, true)
      expect(sizes.untransformed).to.equal(743)
      expect(sizes.gzipped).to.equal(382)
      expect(sizes.uglified).to.equal(463)
      expect(sizes.uglifiedAndGzipped).to.equal(315)

      sizes = jscale(plainFileFixture)
      expect(sizes.untransformed).to.equal(110000)
      expect(sizes.gzipped).to.equal(82199)
    })
  })
})
