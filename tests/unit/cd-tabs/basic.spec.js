import CDTabs from '@/components/cd-tabs'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import utils from '@/common/cd-vue-utils'
const tabs = [{ datafield: 'xyz', class: 'xyz-class' }, { datafield: 'yzx' }, { datafield: 'zxy' }]
const basicsMount = {
  tabs,
  tabKey: 'datafield',
  tabCaption: 'datafield',
  isTabDisabled: (tab, index) => {
    return tab.datafield === 'xyz'
  }
}


describe('[cd-tabs] basics', () => {
  it('is mounted', () => {
    const wrapper = mount(CDTabs, { propsData: basicsMount })
    expect(wrapper.findAll('.cd-tabs').length).toBe(1)
  })
  it ('has content-slot', () => {
    const wrapper = mount(CDTabs, { propsData: basicsMount })
    expect(wrapper.findAll('.cd-tabs--content').length).toBe(1)
  })
  it ('has one [.cd-tabs--wrapper]', done => {
    const wrapper = mount(CDTabs, { propsData: basicsMount })
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('.cd-tabs--wrap').length).toBe(1)
      done()
    })
  })
  it (`has ${tabs.length} tabs`, done => {
    const wrapper = mount(CDTabs, { 
      propsData: basicsMount, 
      scopedSlots: { 
        default: '<p class="cd-tab--test" slot-scope="row">{{ row }}</p>',
        content: '<p class="cd-tab--content">A</p>'
      } 
    })
    Vue.nextTick().then(() => {
      const lis = wrapper.findAll('li')
      expect(lis.length).toBe(tabs.length)
      expect(lis.wrappers.map(m => {
        const attr = m.element.attributes.getNamedItem('role')
        return attr !== null && attr.value === 'tab'
      }).length).toBe(tabs.length)
      expect(wrapper.findAll('.cd-tab--wrap').length).toBe(tabs.length)
      expect(wrapper.findAll('.cd-tab').length).toBe(tabs.length)
      expect(wrapper.findAll('.cd-tab--test').length).toBe(tabs.length)
      expect(wrapper.find('.cd-tab--content').text()).toBe('A')
      expect(wrapper.findAll('.is-disabled').length).toBe(tabs.filter((tab, index) => basicsMount.isTabDisabled(tab, index)).length)
      done()
    })
  }, 10000)
})
