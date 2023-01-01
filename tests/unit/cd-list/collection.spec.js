import { mount } from "@vue/test-utils"
import CDList from '@/components/cd-list'
import Vue from "vue"
const listFactory = (propsData, mounted) => (mount(CDList, {
  propsData,
  scopedSlots: {
    default: '<div slot-scope="{ row }">{{ row }}</div>'
  },
  mounted () {
    if (mounted !== undefined) mounted()
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

const payload = 10
  
const keyField = 'key'

describe('[cd-list] remote collection #2', () => {
  const collection = []
  const remoteMethodFactory = () => {
    return jest.fn(({ payload }) => (new Promise((resolve, reject) => { 
      resolve(Array.from(Array(payload).keys()))
    })))
  }
  var length = 0
  const remoteMethod = remoteMethodFactory()
  const resolveResult = jest.fn(result => {
    collection.splice(0, collection.length)
    collection.push(...result.map(d => ({
      key: d + 1
    })))
    length = collection.filter(isRowVisibleImpl).length
  })
  const isRowVisible = jest.fn(isRowVisibleImpl)
  const wrapper = listFactory({
    collection, payload, remoteMethod, resolveResult, keyField, isRowVisible
  })
  it (`[cd-list] has ${length} <li> elements`, done => {
    Vue.nextTick().then(())
    expect(wrapper.findAll('li').wrappers.length).toBe(length)
    done()
  }, 10000)
})

describe ('[CD-LIST] Remote Collection', () => {
  const collection = []
  
  const remoteMethodFactory = () => {
    return jest.fn(({ payload }) => (new Promise((resolve, reject) => { 
      resolve(Array.from(Array(payload).keys()))
    })))
  }


  

  it ('remote config properties [remoteMethod], [resolveResult] and [payload] are not defined. set them', done => {
    const wrapper = listFactory({
      collection,
      keyField
    })
    expect(wrapper.vm.remoteMethod).toBeUndefined()
    expect(wrapper.vm.resolveResult).toBeUndefined()
    expect(wrapper.vm.payload).toBeUndefined()
    done()
  })

  it ('has defined [remoteMethod], [resolveResult] and [payload]', done => {
    const resolveResult = jest.fn(result => {
      collection.splice(0, collection.length)
      collection.push(...result.map(d => ({
        key: d + 1
      })))
    })
    const remoteMethod = remoteMethodFactory()
    const wrapper = listFactory({
      remoteMethod,
      collection,
      keyField,
      payload,
      resolveResult
    })
    expect(wrapper.vm.remoteMethod).toBe(remoteMethod)
    expect(wrapper.vm.resolveResult).toBe(resolveResult)
    expect(wrapper.vm.payload).toBe(payload)
    done()
  })
  it ('renders resolved collection', done => {
    var collection2 = []
    const resolveResult2 = jest.fn(result => {
      collection2.splice(0, collection2.length)
      collection2.push(...result.map(d => ({
        key: d + 1
      })))
    })
    const remoteMethod = remoteMethodFactory()
    const wrapper = listFactory({
      remoteMethod,
      collection: collection2,
      keyField,
      payload,
      resolveResult: resolveResult2
    })
    Vue.nextTick().then(() => {
      expect(remoteMethod).toBeCalled()
      expect(resolveResult2).toBeCalled()
      expect(wrapper.vm.collection.length).toBe(10)
      expect(wrapper.findAll('li').length).toBe(10)
      done()
    })
  
  }, 20000)
  
  it ('[isRowVisible] with resolved [collection]', done => {
    const resolveResult = jest.fn(result => {
      collection.splice(0, collection.length)
      collection.push(...result.map(d => ({
        key: d + 1
      })))
    })
    const remoteMethod = remoteMethodFactory()
    const isRowVisible = jest.fn(isRowVisibleImpl)
    const wrapper = listFactory({
      remoteMethod,
      collection,
      keyField,
      payload,
      resolveResult,
      isRowVisible
    })
    expect(wrapper.vm.isRowVisible).toBe(isRowVisible)
    expect(isRowVisible).toBeCalledTimes(wrapper.vm.collection.length)
    expect(wrapper.findAll('li').length).not.toBe(wrapper.vm.collection.length)
    done()
  })

  it ('change [payload], rerender with new collection', done => {
    const collection2 = []
    const resolveResult = jest.fn(result => {
      collection2.splice(0, collection2.length)
      collection2.push(...result.map(d => ({
        key: d + 1
      })))
    })
    const newpayload = 35
    const remoteMethod = remoteMethodFactory()
    const isRowVisible = jest.fn(isRowVisibleImpl)
    const wrapper = listFactory({
      remoteMethod,
      collection2,
      keyField,
      payload,
      resolveResult,
      isRowVisible
    })
    Vue.nextTick().then(() => {
      const filtered = wrapper.vm.filtered.length
      expect(wrapper.findAll('li').length).toBe(filtered)
      expect(wrapper.vm.collection.length).not.toBe(wrapper.vm.filtered.length)
      wrapper.setProps({ payload: newpayload })
      Vue.nextTick().then(() => {
        expect(isRowVisible).toBeCalledTimes(payload + newpayload)
        expect(filtered).not.toBe(wrapper.vm.filtered.length)
        expect(wrapper.findAll('li').length).toBe(wrapper.vm.filtered.length)
        done()
      })
    })
  })
})

describe ('[CD-LIST] Collection Manipulation', () => {
  const collection = []
  var payload = 0
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
  
  
  it (`check if retrieved [collection] has [${payload}] items`, (done) => {
    const wrapper = listFactory({ collection, payload, remoteMethod, resolveResult, keyField })
    wrapper.setProps({ payload }).then(() => {
      expect(collection.length).toBe(payload)
      expect(wrapper.findAll('li').length).toBe(payload)
      done()
    })
  })
  it ('add new element, [collection] has 13 items', (done) => {
    const wrapper = listFactory({ collection, payload, remoteMethod, resolveResult, keyField })
    collection.push({ key: 122 })
    Vue.nextTick().then(() => {
      expect(wrapper.findAll('li').length).toBe(payload)
      expect(remoteMethod).toBeCalledTimes(1)
      expect(resolveResult).toBeCalledTimes(1)
      done()
    })
  })
  it ('removes element with key = 99 from [collection]', done => {
    const wrapper = listFactory({ collection, payload, remoteMethod, resolveResult, keyField })
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
    const wrapper = listFactory({ collection, payload, remoteMethod, resolveResult, keyField })
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