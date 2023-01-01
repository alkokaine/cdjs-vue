
import fetchData from '@/common/fetch-data'
import adapter from 'axios/lib/adapters/http'
import keys from '@/../keys'
import { toBeArrayOfSize } from 'jest-extended'
import { mount } from "@vue/test-utils"
import CDList from '@/components/cd-list'

const listFactory = (propsData) => (mount(CDList, {
  propsData,
  scopedSlots: {
    default: '<div slot-scope="{ row }">{{ row }}</div>'
  }
}))
expect.extend({ toBeArrayOfSize })
const m_before = jest.fn((beforeconfig) => {
    return beforeconfig
})

const m_after = jest.fn((afterconfig) => {
    console.log(afterconfig)
    return afterconfig
})

const m_error = jest.fn((error) => {
    console.error(error)
})

describe('remote', () => {

    const config = {
        adapter,
        url: 'https://isdayoff.ru/api/getdata',
        method: 'get',
        responseType: 'text',
        headers: {
            Accept: 'text/plain'
        },
        payload: {
            year: '2023',
            month: '05'
        },
        error: m_error,
        after: m_after,
        before: m_before
    }

    const geodb = {
        adapter,
        method: 'get',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
        error: m_error,
        after: m_after,
        before: m_before,
        headers: keys.geo
    }

    it ('fetching data', done => {
        const callback = (response) => {
            expect(m_before).toBeCalledTimes(1)
            expect(m_error).toBeCalledTimes(0)
            expect(m_after).toBeCalledTimes(1)
            done()
        }
        fetchData(config).then(callback)
    }, 20000)

    it ('testing [json] responseType', done => {
        const callback = (response) => {
            const data = response.data
            expect(data.data).toBeDefined()
            expect(data.data).toBeArrayOfSize(5)
            expect(data.links).toBeDefined()
            expect(data.links).toBeArrayOfSize(3)
            expect(data.metadata).toBeDefined()
            expect(data.metadata.currentOffset).toBeDefined()
            expect(data.metadata.totalCount).toBeDefined()
            done()
        }
        fetchData(geodb).then(callback)
    }, 10000)
    
    // it ('[cd-list] immediate loaded', done => {
    //   const list = listFactory({

    //   })
    // }, 10000)
})