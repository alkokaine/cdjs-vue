import { mount } from "@vue/test-utils"
import CDList from '@/components/cd-list'
import Vue from "vue"
const listFactory = (propsData) => (mount(CDList, {
  propsData,
  scopedSlots: {
    default: '<div slot-scope="{ row }">{{ row }}</div>'
  }
}))

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

const isRowVisibleImpl = (row, index) => (index + 1) % 2 === 0

describe ('[CD-LIST] Collection', () => {
  const sampleCollection = listFactory({ collection: sample, keyField: 'key' })
  
  it ('render a raw [collection], passed in props', done => {
    expect(sampleCollection.vm.collection).toBe(sample)
    expect(sampleCollection.vm.filtered.length).toBe(sample.length)
    expect(sampleCollection.findAll('li').length).toBe(sample.length)
    Vue.nextTick().then(() => {
      done()
    })
  }, 10000)
  it ('replaces source [collection] by new, rerenders it', done => {
    sampleCollection.setProps({ collection: sample2 }).then(() => {
      expect(sampleCollection.vm.collection).not.toBe(sample)
      expect(sampleCollection.vm.collection).toBe(sample2)
      expect(sampleCollection.vm.filtered.length).toBe(sample2.length)
      expect(sampleCollection.findAll('li').length).toBe(sample2.length)
      expect(sampleCollection.vm.collection.every(e => e.key % 2 === 0)).toBeTruthy()
      done()
    })
  })
  it ('set [isRowVisible] function', done => {
    const isRowVisible = jest.fn(isRowVisibleImpl)
    expect(sampleCollection.vm.isRowVisible).toBeUndefined()
    sampleCollection.setProps({ isRowVisible: isRowVisible }).then(() => {
      expect(sampleCollection.vm.isRowVisible).toBeDefined()
      expect(sampleCollection.findAll('li').length).not.toBe(sample2.length)
      expect(sampleCollection.findAll('li').length).toBe(2)
      expect(sampleCollection.vm.collection.length).toBe(sample2.length)
      done()
    })
  })
})

describe ('[CD-LIST] Remote Collection', () => {
  const collection = []
  const remoteMethod = jest.fn((payload, resolve) => {
    resolve(Array.from(Array(payload).keys()))
  })
  const resolveResult = jest.fn(result => {
    collection.splice(0, collection.length)
    collection.push(...result.map(d => ({
      key: d + 1
    })))
  })

  const payload = 12
  
  const keyField = 'key'

  const wrapper = listFactory({
    collection,
    keyField
  })
  it ('remote config properties [remoteMethod], [resolveResult] and [payload] are not defined. set them', done => {
    expect(wrapper.vm.remoteMethod).toBeUndefined()
    expect(wrapper.vm.resolveResult).toBeUndefined()
    expect(wrapper.vm.payload).toBeUndefined()
    done()
  })

  it ('has defined [remoteMethod], [resolveResult] and [payload]', done => {
    wrapper.setProps({
      remoteMethod,
      resolveResult,
      payload
    }).then(() => {
      expect(wrapper.vm.remoteMethod).toBe(remoteMethod)
      expect(wrapper.vm.resolveResult).toBe(resolveResult)
      expect(wrapper.vm.payload).toBe(payload)
      done()
    })
  })
  it ('renders resolved collection', done => {
    expect(remoteMethod).toBeCalled()
    expect(resolveResult).toBeCalled()
    expect(wrapper.vm.collection.length).toBe(12)
    expect(wrapper.findAll('li').length).toBe(12)
    done()
  })
  
  it ('[isRowVisible] with resolved [collection]', done => {
    const isRowVisible = jest.fn(isRowVisibleImpl)
    wrapper.setProps({ isRowVisible }).then(() => {
      expect(wrapper.vm.isRowVisible).toBe(isRowVisible)
      expect(isRowVisible).toBeCalledTimes(wrapper.vm.collection.length)
      expect(wrapper.findAll('li').length).not.toBe(wrapper.vm.collection.length)
      done()
    })
  })

  it ('change [payload], rerender with new collection', done => {
    const isRowVisible = jest.fn(isRowVisibleImpl)
    wrapper.setProps({ payload: 20, isRowVisible: isRowVisible }).then(() => {
      expect(wrapper.vm.payload).toBe(20)
      expect(wrapper.vm.isRowVisible).toBeDefined()
      expect(wrapper.vm.collection.length).toBe(wrapper.vm.payload)
      expect(wrapper.vm.isRowVisible).toBeDefined()
      expect(wrapper.vm.isRowVisible).toBeCalledTimes(20)
      expect(wrapper.findAll('li').length).toBe(collection.filter(isRowVisible).length)
      done()
    })
  })
})

describe ('[CD-LIST] Collection Manipulation', () => {
  const collection = []
  const payload = 12
  const remoteMethod = jest.fn((payload, resolve) => {
    resolve(Array.from(Array(payload).keys()))
  })
  const resolveResult = jest.fn(result => {
    collection.splice(0, collection.length)
    collection.push(...result.map(d => ({
      key: d + 1
    })))
  })
  const keyField = 'key'
  const wrapper = listFactory({ collection, payload, remoteMethod, resolveResult, keyField })
  it ('check if retrieved [collection] has 12 items', (done) => {
    expect(collection.length).toBe(12)
    expect(wrapper.findAll('li').length).toBe(12)
    done()
  })
  it ('add new element, [collection] has 13 items', (done) => {
    collection.push({ key: 122 })
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('li').length).toBe(13)
      expect(remoteMethod).toBeCalledTimes(1)
      expect(resolveResult).toBeCalledTimes(1)
      done()
    })
  })
  it ('removes element with key = 99 from [collection]', done => {
    expect(wrapper.findAll('li').filter(f => f.text().includes(2)).length).toBe(3)
    collection.splice(1, 1)
    Vue.nextTick().then(() => {
      const lis = wrapper.findAll('li').wrappers
      const texts = lis.map(w => w.text())
      expect(lis.length).toBe(12)
      expect(texts.filter(m => m.includes('2')).length).toBe(2)
      done()
    })
  })
  it ('replaces element by index', done => {
    expect(wrapper.findAll('li').length).toBe(collection.length)
    expect(wrapper.findAll('li').filter(li => li.text().includes(999)).length).toBe(0)
    collection.splice(3, 1, { key: 999 })
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('li').length).toBe(collection.length)
      expect(wrapper.findAll('li').filter(li => li.text().includes(999)).length).toBe(1)
      done()
    })
  })

})