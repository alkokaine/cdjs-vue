import CDRecList from '@/components/cd-rec-list'
import utils from '@/common/cd-vue-utils'
describe('[cd-rec-list] recursive list', () => {
  it ('[cd-rec-list] has described properties', done => {
    expect(utils.isComponentDescribed(CDRecList)).toBe(true)
    done()
  })
})