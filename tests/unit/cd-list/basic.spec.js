import { mount } from "@vue/test-utils"
import CDList from '@/components/cd-list'
import Vue from "vue"

const listFactory = (propsData, slots) => (mount(CDList, {
  propsData,
  slots
}))


const empty = []
const sample = [
  {
    key: 1
  },
  {
    key: 2
  },
  {
    key: 3
  }
]
const sample2 = [
  {
    key: 2
  },
  {
    key: 4
  },
  {
    key: 6
  },
  {
    key: 8
  }
]
describe('[CD-LIST] Basics', () => {
  
  const consoleErrorSpy = jest.spyOn(console, 'error')
  const emptyList = listFactory({})
  it ('screams about required properties', (done) => {
    expect(consoleErrorSpy).toBeCalledWith(expect.stringContaining('collection'))
    expect(consoleErrorSpy).toBeCalledWith(expect.stringContaining('keyField'))
    emptyList.setProps({
      collection: []
    })
    Vue.nextTick().then(() => {
      expect(consoleErrorSpy.mock.calls.length).toBe(3)
      const keyfields = consoleErrorSpy.mock.calls.filter(e => e.some(s => s.includes('keyField')))
      expect(keyfields.length).toBe(2)
      emptyList.setProps({ keyField: 'key ', listClass: 'cd-list--test-class'})
      Vue.nextTick().then(() => {
        done()
      })
    })
  }, 10000)
  it ('renders an <ul> element, ', done => {
    expect(emptyList.findAll('ul').length).toBe(1)
    expect(emptyList.findAll('.cd-list').length).toBe(1)
    expect(emptyList.findAll('.cd-list--internal').length).toBe(1)
    done()
  })
  it ('[cd-list] has header slot', (done) => {
    const slot_wrapper = listFactory(
      {
        keyField: 'key',
        collection: empty
      },
      {
        header: '<div>i am header</div>'
      }
    )
    expect(slot_wrapper.findAll('.cd-list--header').length).toBe(1)
    expect(slot_wrapper.find('.cd-list--header').text()).toBe('i am header')
    done()
  })
  it ('[cd-list] has footer slot', (done) => {
    const slot_wrapper = listFactory({
        collection: empty,
        keyField: 'key'
      },
      {
        footer: '<div>i am footer</div>'
      }
    )
    expect(slot_wrapper.findAll('.cd-list--footer').length).toBe(1)
    expect(slot_wrapper.find('.cd-list--footer').text()).toBe('i am footer')
    done()
  })
  
})