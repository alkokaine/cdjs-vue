import descriptors from "@/assets/descriptors"
import CDGrid from '@/components/cd-grid'
import CDGridHead from '@/components/cd-grid-head'
import CDGridBody from '@/components/cd-grid-body'
import { mount } from "@vue/test-utils"

const propsDataFactory = (headerclass = undefined) => ({
  columns: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [],
  headClass: headerclass
})
const bodyClassFactory = (bodyClass = undefined)=> ({
  columns: descriptors.objectDescriptor,
  keyField: 'ObjectID',
  collection: [],
  tbodyClass: bodyClass
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
    expect(gridwrapper.findAll(CDGridHead).length).toBe(1)
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
    expect(gridwrapper.vm.tbodyClass).toBe('cd-grid--body-base')
    expect(gridwrapper.findAll('.cd-grid--body-base').length).toBe(1)
    done()
  })
  it ('[body-class] is [.cd-body--test]', done => {
    const gridwrapper = mount(CDGrid, { propsData: bodyClassFactory('cd-body--test') })
    expect(gridwrapper.vm.tbodyClass).toBe('cd-body--test')
    expect(gridwrapper.findAll('.cd-body--test').length).toBe(1)
    done()
  })
})
describe ('[cd-grid] [body-class] is Array', () => {
  const array = ['cd-body--test-array-1', 'cd-body--test-array-2']
  const gridwrapper = mount(CDGrid, { propsData: bodyClassFactory(array)})
  it ('[cd-grid].bodyClass instance equals [array]', (done) => {
    expect(gridwrapper.vm.tbodyClass).toBe(array)
    done()
  })
  it ('[cd-grid] has ONE [cd-grid-body]', (done) => {
    expect(gridwrapper.findAll(CDGridBody).length).toBe(1)
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