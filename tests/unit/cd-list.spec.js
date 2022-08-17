import CDList from '@/components/cd-list'
import { mount, shallowMount } from '@vue/test-utils'
import Vue from 'vue'

const collection = [{ datafield: 'xyz', class: 'xyz-class' }, { datafield: 'yzx' }, { datafield: 'zxy' }]

describe('[cd-list] Basics', () => {
  it('is mounted', () => {
    const wrapper = shallowMount(CDList)
    expect(wrapper.findAll('.cd-list').length).toBe(1)
  })
  it ('has <ul> element', () => {
    const wrapper = shallowMount(CDList)
    expect(wrapper.findAll('ul').length).toBe(1)
    expect(wrapper.findAll('.cd-list--internal').length).toBe(1)
  })
  it ('has header slot', () => {
    const wrapper = shallowMount(CDList, 
      {
        slots: {
          header: '<div>i am header</div>'
        }
      }
    )
    expect(wrapper.findAll('.cd-list--header').length).toBe(1)
    expect(wrapper.find('.cd-list--header').text()).toBe('i am header')
  })
  it ('has footer slot', () => {
    const wrapper = shallowMount(CDList, 
      {
        slots: {
          footer: '<div>i am footer</div>'
        }
      }
    )
    expect(wrapper.findAll('.cd-list--footer').length).toBe(1)
    expect(wrapper.find('.cd-list--footer').text()).toBe('i am footer')
  })
  it('has [keyField] property defined', done => {
    const wrapper = mount(CDList, { 
      propsData: { 
        keyField: 'datafield'
      }
    })
    Vue.nextTick().then(() => {
      expect(wrapper.vm.keyField).toBeDefined()
      done()
    })
  })
  it('has not empty collection', (done) => {
    const wrapper = mount(CDList, {
      propsData: {
        collection,
        keyField: 'datafield'
      } 
    })
    Vue.nextTick().then(() => {
      expect(wrapper.vm.collection.length).toBeGreaterThan(0)
      expect(wrapper.vm.data.length).toBe(wrapper.vm.collection.length)
      expect(wrapper.findAll('li').length).toBe(wrapper.vm.data.length)
      done()
    })
  }, 10000)
  it ('isRowVisible is defined', (done) => {
    const wrapper = mount(CDList, {
      propsData: {
        collection,
        keyField: 'datafield',
        isRowVisible: (row, index) => index % 2 === 0
      }
    })
    Vue.nextTick().then(() => {
      expect(wrapper.vm.collection.length).toBe(collection.length)
      expect(wrapper.vm.data.length).not.toBe(collection.length)
      expect(wrapper.vm.data.length).toBe(collection.filter((r, i) => i % 2 === 0).length)
      expect(wrapper.findAll('li').length).toBe(wrapper.vm.data.length)
      done()
    }, 10000)
    
  })
})
