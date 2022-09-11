import { mount } from "@vue/test-utils"
import CDList from '@/components/cd-list'
import Vue from "vue"
const listFactory = (propsData) => (mount(CDList, {
  propsData,
  scopedSlots: {
    default: '<div slot-scope="{ row }">{{ row }}</div>'
  }
}))
const collection = [
  {
    key: 1
  },
  {
    key: 2
  },
  {
    key: 3
  },
  {
    key: 4
  }
]
const keyField = 'key'


describe ('[rowClass] is string', () => {
  it ('[cd-list] renders <ul> element with [.cd-list--test-class]', done => {
    const listclass = listFactory({ collection, keyField, listClass: 'cd-list--test-class'})
    expect(listclass.findAll('.cd-list--test-class').length).toBe(1)
    done()
  })
  it ('[rowClass] is string: [cd-list] has 4 element with class [.cd-list--item-test-class]', done => {
    const rowClass = 'cd-list--item-test-class'
    const wrapper = listFactory({ collection, keyField, rowClass })
    expect(wrapper.findAll('.cd-list--item-test-class').length).toBe(4)
    done()
  })
})