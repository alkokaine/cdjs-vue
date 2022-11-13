
import fetchData from '@/common/fetch-data'
import adapter from 'axios/lib/adapters/http'
import { toBeArrayOfSize } from 'jest-extended'
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
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
        error: m_error,
        after: m_after,
        before: m_before,
        headers: {
            'X-RapidAPI-Key': '0d6efbd8a7msh8fcd0fa4c7e36a4p15464ejsn34c8169d4000',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
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
    })
    
})