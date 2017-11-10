const { Metadata, Type } = require('../../src/metadata/main')
const expect = require('chai').use(require('chai-subset')).expect;

describe('Metadata', () => {
  it('Should export Metadata class', function () {
    expect(Metadata).to.exist
  })

  it('Should accept DataModel descriptor', function () {
    expect(() => new Metadata({})).to.throw('Expected type: DataModel')
    expect(() => new Metadata({type:'DataModel'})).not.to.throw('Expected type: DataModel')
  })

  it('Should find type by name', function () {
    const dataModel = new Metadata({
      type:'DataModel',
      classes: [
        { name: 'test'}
      ]
    })
    const testType = dataModel.type('test') 
    expect(testType).to.be.instanceof(Type)
    expect(testType).to.have.property('name','test')
  })

})

describe('Type', () => {
  it('Should export Type class', function () {
    expect(Type).to.exist
  })

  it('Should list attributes', function () {
    const testType = new Type({
      attributes: {
        a: {},
        b: {}
      }
    })
    expect(testType.attributes).to.containSubset([{
      name: "a"
    }, {
      name: "b"
    }])
  })
  it('Should find attribute by type', function () {
    const testType = new Type({
      attributes: {
        a: {},
        b: {}
      }
    })
    expect(testType.attribute.a).to.have.property('name','a')
  })
  it('Should handle attribute multiplicity', function () {
    const testType = new Type({
      attributes: {
        a: {multiplicity:"*"}
      }
    })
    expect(testType.attribute.a).to.have.property('multiplicity','*')
  })
})
