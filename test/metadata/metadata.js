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
  it('Should populate ancestors from base class', function () {
    const dataModel = new Metadata({
      type: 'DataModel',
      classes: [{
        name: 'a'
      },{
        name:'b',
        is:'a'
      }]
    })
    const testType = dataModel.type('b')
    expect(testType.ancestors).to.containSubset([{name:'a'}])
  })
  it('Should populate ancestors transitively', function () {
    const dataModel = new Metadata({
      type: 'DataModel',
      classes: [{
        name: 'a'
      },{
        name:'b',
        is:'a'
      },{
        name:'c',
        is:'b'
      }]
    })
    const testType = dataModel.type('c')
    expect(testType.ancestors).to.containSubset([{name:'a'}])
    expect(testType.ancestors).to.containSubset([{name:'b'}])
  })  
  it('Should populate descendants from base class', function () {
    const dataModel = new Metadata({
      type: 'DataModel',
      classes: [{
        name: 'a'
      },{
        name:'b',
        is:'a'
      }]
    })
    const testType = dataModel.type('a')
    expect(testType.descendants).to.containSubset([{name:'b'}])
  })
  it('Should populate descendants transitively', function () {
    const dataModel = new Metadata({
      type: 'DataModel',
      classes: [{
        name: 'a'
      },{
        name:'b',
        is:'a'
      },{
        name:'c',
        is:'b'
      }]
    })
    const testType = dataModel.type('a')
    expect(testType.descendants).to.containSubset([{name:'c'}])
    expect(testType.descendants).to.containSubset([{name:'b'}])
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
  it('Should handle id attribute default', function () {
    const testType = new Type({})
    expect(testType).to.have.property('idAttribute', 'id')
  })
  it('Should handle id template', function () {
    const testType = new Type({
      idTemplate: "AAA"
    })
    expect(testType).to.have.property('idTemplate', 'AAA')
  })
  it('Should handle id template default', function () {
    const testType = new Type({
      idAttribute: "AAA"
    })
    expect(testType).to.have.property('idTemplate', '{{AAA}}')
  }) 
  it('Should calculate entity id', function () {
    const testType = new Type({
      idAttribute: "AAA"
    })
    expect(testType.id({AAA:'BBB'})).to.be.equals('BBB')
  }) 
  it('Should handle base type', function () {
    const testType = new Type({
      is: "AAA"
    })
    expect(testType).to.have.property('baseClass', 'AAA')
  })
  it('Should handle ancestors', function () {
    const testType = new Type({
      name: "AAA"
    })
    expect(testType.ancestors).to.exist
    expect(testType.ancestors).not.to.containSubset([{name:'AAA'}])
  })
  it('Should handle descendants', function () {
    const testType = new Type({
      name: "AAA"
    })
    expect(testType.descendants).to.exist
    expect(testType.descendants).not.to.containSubset([{name:'AAA'}])
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
