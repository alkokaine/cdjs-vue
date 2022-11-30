import CDPropEditor from '@/components/cd-prop-editor'
import utils from '@/common/cd-vue-utils'
describe('[cd-prop-editor] recursive list', () => {
  it ('[cd-prop-editor] has described properties', done => {
    expect(utils.isComponentDescribed(CDPropEditor)).toBe(true)
    done()
  })
})