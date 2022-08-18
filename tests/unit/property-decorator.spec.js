import decorator from '@/common/property-decorator'

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
  isvisible: false
}

const editdisabled = {
  text: 'object_id',
  datafield: 'object_id',
  canedit: false
}

const selectableInvisible = {
  text: 'object_id',
  datafield: 'object_id',
  isvisible (payload) {
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
  isvisible: 'да'
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
  test('property visibility', () => {
    expect(decorator.isVisible(property, payload)).toBeTruthy()
    expect(decorator.isVisible(invisible, payload)).toBeFalsy()
    expect(decorator.isVisible(selectableInvisible, payload)).toBeTruthy()
    expect(decorator.isVisible(selectableInvisible, payload2)).toBeFalsy()
  })
  test ('property editable', (done) => {
    expect(decorator.isEditable(selectableInvisible, payload)).toBeTruthy()
    expect(decorator.isEditable(selectableInvisible, payload2)).toBeFalsy()
    expect(decorator.isEditable(editdisabled, payload)).toBeFalsy()
    
    try {
      const ugly_result = decorator.isEditable(ugly, payload)
      expect(ugly_result).toBeUndefined()
      done()
    } catch (err) {
      expect(err.message).toBeDefined()
      expect(err.message).toBe(typeof 'x')
      done()
    }
  })
})