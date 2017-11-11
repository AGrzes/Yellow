const { Data } = require('../../src/data/main')
const expect = require('chai').use(require('chai-subset')).expect;

describe('Data', () => {
    it('Should export Data class', function () {
      expect(Data).to.exist
    })
    it('Should hold model', function () {
      const model = {}

      expect(new Data(model)).to.have.property('model',model);
    })

    it('Should find entities by type', function () {
      const model = { a:{type:'a',name:'a'},b:{type:'b',name:'b'}}
      const data = new Data(model)
      expect(data.byType.a).to.containSubset([{name:'a'}]);
      expect(data.byType.a).not.to.containSubset([{name:'b'}]);
    })    
})
