import descriptors from "@/assets/descriptors"
import CDGrid from '@/components/cd-grid'
import CDGridHead from '@/components/cd-grid-head'
import CDGridBody from '@/components/cd-grid-body'
import { mount } from "@vue/test-utils"
import Vue from "vue"

const propsDataFactory = (headerclass = undefined) => ({
  descriptor: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [],
  headClass: headerclass
})
const bodyClassFactory = (bodyClass = undefined)=> ({
  descriptor: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [],
  bodyClass: bodyClass
})
const headCellClassFactory = (headCellClass) => ({
  descriptor: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [],
  headCellClass
})
const bodyCellClassFactory = (bodyCell) => ({
  descriptor: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [descriptors.object, descriptors.object],
  bodyCellClass: bodyCell
})
const rowClassFactory = (rowClass) => ({
  descriptor: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [descriptors.object, descriptors.object],
  rowClass
})
const bodyCell = jest.fn(({ row, rowindex }, { prop, propindex}) => {
  return `${prop.datafield}`
})
const rowClass = jest.fn(({ row, rowindex }) => {
  return `row-class-${rowindex}`
})
describe('[cd-grid] [head-class] is default or props value', () => {
  it ('[head-class] is undefined', done => {
    const gridwrapper = mount(CDGrid, { propsData: propsDataFactory() })
    expect(gridwrapper.vm.headClass).toBe('cd-grid--head-base')
    expect(gridwrapper.findAll('.cd-grid--head-base').length).toBe(1)
    done()
  })
  it ('[head-class] is [.cd-head--test]', done => {
    const gridwrapper = mount(CDGrid, { propsData: propsDataFactory('cd-head--test') })
    expect(gridwrapper.vm.headClass).toBe('cd-head--test')
    expect(gridwrapper.findAll('.cd-head--test').length).toBe(1)
    done()
  })
})
describe ('[cd-grid] [head-class] is Array', () => {
  const array = ['cd-head--test-array-1', 'cd-head--test-array-2']
  const gridwrapper = mount(CDGrid, { propsData: propsDataFactory(array)})
  it ('[cd-grid].headClass instance equals [array]', (done) => {
    expect(gridwrapper.vm.headClass).toBe(array)
    done()
  })
  it ('[cd-grid] has ONE [cd-grid-head]', (done) => {
    expect(gridwrapper.findAllComponents(CDGridHead).length).toBe(1)
    done()
  })
  it ('all classes from [array] are applied to [cd-grid-head] element', (done) => {
    const headWrapper = gridwrapper.findComponent(CDGridHead)
    const classes = Array.from(headWrapper.element.classList)
    expect(array.map(c => classes.indexOf(c) >= 0).every(e => e === true)).toBeTruthy()
    done()
  })
  it ('element with class [.cd-head--test-array-1] equals element with class [.cd-head--test-array-2]', (done) => {
    expect(gridwrapper.find('.cd-head--test-array-1').element).toBe(gridwrapper.find('.cd-head--test-array-2').element)
    done()
  })
})

describe('[cd-grid] [body-class] is default or props value', () => {
  it ('[body-class] is undefined', done => {
    const gridwrapper = mount(CDGrid, { propsData: bodyClassFactory() })
    expect(gridwrapper.vm.bodyClass).toBe('cd-grid--body-base')
    expect(gridwrapper.findAll('.cd-grid--body-base').length).toBe(1)
    done()
  })
  it ('[body-class] is [.cd-body--test]', done => {
    const gridwrapper = mount(CDGrid, { propsData: bodyClassFactory('cd-body--test') })
    expect(gridwrapper.vm.bodyClass).toBe('cd-body--test')
    expect(gridwrapper.findAll('.cd-body--test').length).toBe(1)
    done()
  })
})
describe ('[cd-grid] [body-class] is Array', () => {
  const array = ['cd-body--test-array-1', 'cd-body--test-array-2']
  const gridwrapper = mount(CDGrid, { propsData: bodyClassFactory(array)})
  it ('[cd-grid].bodyClass instance equals [array]', (done) => {
    expect(gridwrapper.vm.bodyClass).toBe(array)
    done()
  })
  it ('[cd-grid] has ONE [cd-grid-body]', (done) => {
    expect(gridwrapper.findAllComponents(CDGridBody).length).toBe(1)
    done()
  })
  it ('all classes from [array] are applied to [cd-grid-body] element', (done) => {
    const headWrapper = gridwrapper.findComponent(CDGridBody)
    const classes = Array.from(headWrapper.element.classList)
    expect(array.map(c => classes.indexOf(c) >= 0).every(e => e === true)).toBeTruthy()
    done()
  })
  it ('element with class [.cd-body--test-array-1] equals element with class [.cd-body--test-array-2]', (done) => {
    expect(gridwrapper.find('.cd-body--test-array-1').element).toBe(gridwrapper.find('.cd-body--test-array-2').element)
    done()
  })
})

describe('[cd-grid][head-cell] class is not default', () => {
  const headCell = jest.fn((property, index) => (property.datafield))
  const wrapper = mount(CDGrid, { propsData: headCellClassFactory(headCell) })
  const headerCells = wrapper.findAll('.cd-header--cell')
  const propels = wrapper.vm.columns.map(c => wrapper.findAll(`.${c.datafield}`))
  it ('[cd-grid].[head-cell-class] is function', (done) => { 
    expect(wrapper.vm.headCellClass).toBe(headCell)
    expect(typeof wrapper.vm.headCellClass).toBe('function')
    done()
  })
  it (`[cd-grid].[head-cell-class] calls ${wrapper.vm.columns.length} times`, done => {
    expect(headCell.mock.calls.length).toBe(wrapper.vm.columns.length)
    done()
  })
  it (`[cd-grid] has ${wrapper.vm.columns.length} [.cd-header--cell] elements`, done => {
    expect(headerCells.length).toBe(wrapper.vm.columns.length)
    done()
  })
  it ('[cd-grid] has no default header-cell-class', done => {
    expect(wrapper.findAll('.cd-grid-head--cell-base').length).toBe(0)
    done()
  })
  it ('each [cd-grid] property descriptor has one own [head-cell]', done => {
    expect(propels.every(e => e.wrappers.length === 1)).toBeTruthy()
    done()
  })
})
describe('[cd-grid][body-cell] class', () => {
  const wrapper = mount(CDGrid, { propsData: bodyCellClassFactory(bodyCell) })
  const map = wrapper.vm.columns.map(m => (wrapper.findAll(`.${m.datafield}`)))
  it ('[cd-grid].[body-cell] is function', done => {
    expect(typeof wrapper.vm.bodyCellClass).toBe('function')
    done()
  })
  it (`[cd-grid] has ${wrapper.vm.columns.length * wrapper.vm.collection.length} data cells`, (done) => {
    expect(wrapper.findAll('.cd-grid--cell').length).toBe(wrapper.vm.columns.length * wrapper.vm.collection.length)
    done()
  })
  it (`[cd-grid] calls bodyCellClass function ${wrapper.vm.columns.length * wrapper.vm.collection.length} times`, done => {
    expect(bodyCell.mock.calls.length).toBe(wrapper.vm.columns.length * wrapper.vm.collection.length)
    done()
  })
  it (`[cd-grid] each body-cell-class repeats ${wrapper.vm.collection.length} times`, done => {
    expect(map.every(e => e.length === wrapper.vm.collection.length)).toBe(true)
    done()
  })
})
describe('[cd-grid][row-class] class', () => {
  const wrapper = mount(CDGrid, { propsData: rowClassFactory(rowClass)})
  it ('[cd-grid].[row-class] is function', (done) => {
    expect(typeof wrapper.vm.rowClass).toBe('function')
    done()
  })
  it (`[cd-grid].[row-class] calls ${wrapper.vm.collection.length} times`, (done) => {
    expect(rowClass.mock.calls.length).toBe(wrapper.vm.collection.length)
    done()
  })
})
