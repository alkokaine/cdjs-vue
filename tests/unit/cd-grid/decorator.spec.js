import descriptors from "@/assets/descriptors"
import CDGrid from '@/components/cd-grid'
import CDGridHead from '@/components/cd-grid-head'
import { mount } from "@vue/test-utils"


describe('[cd-grid] head class', () => {
  const propsDataFactory = (headerclass = undefined) => ({
    columns: descriptors.objectDescriptor,
    keyField: 'ObjectID',
    collection: [],
    headClass: headerclass
  })
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
  it ('[head-class] is Array', done => {
    const array = ['cd-head--test-array-1', 'cd-head--test-array-2']
    const gridwrapper = mount(CDGrid, { propsData: propsDataFactory(array)})
    expect(gridwrapper.vm.headClass).toBe(array)
    const headWrappers = gridwrapper.findAllComponents(CDGridHead).wrappers
    expect(headWrappers.length).toBe(1)
    const wrapper = headWrappers[0]
    expect(wrapper).toBeDefined()
    expect(wrapper.vm.headClass).toBe(array)
    expect(array.map(c => wrapper.element.className.indexOf(c) >= 0).every(e => e === true)).toBeTruthy()
    const array1 = wrapper.find('.cd-head--test-array-1')
    const array2 = wrapper.find('.cd-head--test-array-2')
    expect(array1.element).toBe(array2.element)
    done()
  })
})