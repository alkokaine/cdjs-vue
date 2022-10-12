import decorator from '@/common/property-decorator'
import propertyFlatter from '@/common/property-flatter'
const property = {
  datafield: 'object_id',
  text: 'object_id'
}
const property2 = {
  text: 'legend',
  descriptor: [
    property
  ]
}
const payload = {
  object_id: 0,
  building_id: 1
}
const payload2 = {
  object_id: 0,
  building_id: 11
}
const invisible = {
  text: 'object_id',
  datafield: 'object_id',
  hidden: true
}

const editdisabled = {
  text: 'object_id',
  datafield: 'object_id',
  canedit: false
}

const selectableInvisible = {
  text: 'object_id',
  datafield: 'object_id',
  hidden (payload) {
    return payload.building_id < 10
  },
  canedit (payload) {
    return payload.building_id < 10
  }
}
const ugly = {
  text: 'object_id',
  datafield: 'object_id',
  canedit: 'нет',
  hidden: 'нет'
}
describe('property descriptor', () => {
  test('property without datafield has legend and rowkey ', () => {
    expect(decorator.hasLegend(property2)).toBeTruthy()
    expect(decorator.propertyKey(property2, 0)).toBe('anon_0')
    expect(decorator.hasDescriptor(property2)).toBeTruthy()
  })
  test('raw property rowkey is object_id', () => {
    expect(decorator.propertyKey(property, 0)).toBe(`${property.datafield}_0`)
  })
  test('property visibility', done => {
    expect(decorator.isVisible(property, payload)).toBeTruthy()
    expect(decorator.isVisible(invisible, payload)).toBeFalsy()
    expect(decorator.isVisible(selectableInvisible, payload)).toBeFalsy()
    expect(decorator.isVisible(selectableInvisible, payload2)).toBeTruthy()
    try {
      const ugly_result = decorator.isVisible(ugly, payload)
    } catch (err) {
      expect(err.message).toBeDefined()
      expect(err.message).toBe(typeof 'x')
      done()
    }
  })
  test ('property editable', (done) => {
    expect(decorator.isEditable(selectableInvisible, payload)).toBeTruthy()
    expect(decorator.isEditable(selectableInvisible, payload2)).toBeFalsy()
    expect(decorator.isEditable(editdisabled, payload)).toBeFalsy()
    try {
      const ugly_result = decorator.isEditable(ugly, payload)
    } catch (err) {
      expect(err.message).toBeDefined()
      expect(err.message).toBe(typeof 'x')
      done()
    }
  })
  test ('resolve property class', done => {
    const property = {
      propClass (payload) {
        return payload.int === 3 ? 'cd-property-three' : 'cd-property-non-three'
      }
    }
    const payload = {
      int: 2
    }
    const payload2 = {
      int: 3
    }
    expect(decorator.resolvePropertyClass(property, payload)).toBe('cd-property-non-three')
    expect(decorator.resolvePropertyClass(payload, payload)).toBeUndefined()
    expect(decorator.resolvePropertyClass(property, payload2)).toBe('cd-property-three')
    done()
  })
})
describe('flatterer', () => {
  test('flat array is a flat array', () => {
    expect(propertyFlatter([], []).length).toBe(0)
    expect(propertyFlatter(undefined, []).length).toBe(0)
    expect(propertyFlatter([{ text: 'aaa', descriptor: [ {text: 'bbb'},{text: 'ccc'}, {text: 'ddd'}]}], []).length).toBe(4)
  })
})