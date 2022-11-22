
import utils from '@/common/cd-vue-utils'
import CDPropsGrid from '@/components/cd-props-grid'
describe('[CD-PROPS-GRID] Basics', () => {
  it ('[cd-props-grid] has described properties', done => {
    expect(utils.isComponentDescribed(CDPropsGrid)).toBe(true)
    done()
  })
})