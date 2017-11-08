const { Data } = require('../../src/data/main')
const expect = require('chai').use(require('chai-subset')).expect;

describe('Data', () => {
    it('Should export Data class', function () {
      expect(Data).to.exist
    })
})
