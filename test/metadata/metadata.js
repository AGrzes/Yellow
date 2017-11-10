const {
  Metadata,
  Type,
  Attribute
} = require('../../src/metadata/main')
const expect = require('chai').use(require('chai-subset')).expect;

describe('Metadata', () => {
  it('Should export Metadata class', function () {
    expect(Metadata).to.exist
  })

  it('Should accept DataModel descriptor', function () {
    expect(() => new Metadata({})).to.throw('Expected type: DataModel')
    expect(() => new Metadata({
      type: 'DataModel'
    })).not.to.throw('Expected type: DataModel')
  })

  it('Should find type by name', function () {
    const dataModel = new Metadata({
      type: 'DataModel',
      classes: [{
        name: 'test'
      }]
    })
    const testType = dataModel.type('test')
    expect(testType).to.be.instanceof(Type)
    expect(testType).to.have.property('name', 'test')
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
  it('Should find attribute by name', function () {
    const testType = new Type({
      attributes: {
        a: {},
        b: {}
      }
    })
    expect(testType.attribute.a).to.have.property('name', 'a')
  })
  it('Should handle id attribute', function () {
    const testType = new Type({
      idAttribute: "AAA"
    })
    expect(testType).to.have.property('idAttribute', 'AAA')
  })
})
describe('Attribute', () => {
  it('Should export Attribute class', function () {
    expect(Attribute).to.exist
  })
  it('Should handle attribute name', function () {
    const testAttribute = new Attribute('a', {})
    expect(testAttribute).to.have.property('name', 'a')
  })
  it('Should handle attribute multiplicity', function () {
    const testAttribute = new Attribute('a', {
      multiplicity: "*"
    })
    expect(testAttribute).to.have.property('multiplicity', '*')
  })
  it('Should handle default multiplicity', function () {
    const testAttribute = new Attribute('a', {})
    expect(testAttribute).to.have.property('multiplicity', '1')
  })
  it('Should handle attribute type', function () {
    const testAttribute = new Attribute('a', {
      type: "AAA"
    })
    expect(testAttribute).to.have.property('type', 'AAA')
  })
  it('Should handle default type', function () {
    const testAttribute = new Attribute('a', {})
    expect(testAttribute).to.have.property('type', 'string')
  })
})
