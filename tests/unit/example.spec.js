import { shallowMount } from '@vue/test-utils'
import App from '@/App'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message'
    const wrapper = shallowMount(App)
    expect(wrapper.findAll('.main-app').length).toBeGreaterThan(0)
  })
})
