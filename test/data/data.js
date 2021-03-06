const { Data } = require('../../src/data/main')
const { Metadata } = require('../../src/metadata/main')
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
    it('Should find entities by type and supertypes', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a'
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type:'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a'
        }]
      }))
      expect(data.byTypes.a).to.containSubset([{
        name: 'a'
      }]);
      expect(data.byTypes.a).to.containSubset([{
        name: 'b'
      }]);
    })
    it('Should find entities by id', function () {
      const model = { a:{type:'a',name:'a'},b:{type:'b',name:'b'}}
      const data = new Data(model,new Metadata({
        type:'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          idTemplate:'{{type}}:{{name}}'
        }]
      }) )
      console.log(data.byId)
      expect(data.byId['a:a']).to.containSubset({name:'a'});
      expect(data.byId['b:b']).to.containSubset({name:'b'});
    })
    it('Should resolve top level references', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a',
          b: 'b:b'
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type: 'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          attributes: {
            b: {
              type: 'b'
            }
          },
          idTemplate: '{{type}}:{{name}}'
        }]
      }))
      expect(data.byId['a:a'].b).to.containSubset({
        name: 'b'
      });
    })
    it('Should skip simple attributes when trying to resolve references', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a',
          b: 'b:b'
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type: 'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          attributes: {
            b: {
              type: 'string'
            }
          },
          idTemplate: '{{type}}:{{name}}'
        }]
      }))
      expect(data.byId['a:a'].b).to.be.equals('b:b');
    })
    it('Should handle missing references', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a',
          b: 'b:c'
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type: 'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          attributes: {
            b: {
              type: 'b'
            }
          },
          idTemplate: '{{type}}:{{name}}'
        }]
      }))
      expect(data.byId['a:a'].b).to.be.equals('b:c');
    })
    it('Should resolve top level array references', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a',
          b: ['b:b']
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type: 'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          attributes: {
            b: {
              type: 'b',
              multiplicity:'*'
            }
          },
          idTemplate: '{{type}}:{{name}}'
        }]
      }))
      expect(data.byId['a:a'].b[0]).to.containSubset({
        name: 'b'
      });
    })
    it('Should handle missing array references', function () {
      const model = {
        a: {
          type: 'a',
          name: 'a',
          b: ['b:c']
        },
        b: {
          type: 'b',
          name: 'b'
        }
      }
      const data = new Data(model, new Metadata({
        type: 'DataModel',
        classes: [{
          name: 'b',
          is: 'a'
        }, {
          name: 'a',
          attributes: {
            b: {
              type: 'b',
              multiplicity:'*'
            }
          },
          idTemplate: '{{type}}:{{name}}'
        }]
      }))
      expect(data.byId['a:a'].b).to.be.deep.equals(['b:c']);
    })
})
