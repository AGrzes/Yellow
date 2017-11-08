const { Metadata } = require('../../src/metadata/main')
const expect = require('chai').use(require('chai-subset')).expect;

describe('Metadata', () => {
    it('Should export Metadata class', function () {
      expect(Metadata).to.exist
    })
})
