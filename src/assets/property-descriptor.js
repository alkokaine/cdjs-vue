export default [
  {
    datafield: 'datafield',
    text: 'Свойство объекта',
    canedit: false
  },
  { 
    datafield: 'text',
    text: 'Что содержит (???)'
  },
  {
    datafield: 'placeholder',
    text: 'placeholder',
  },
  {
    datafield: 'input',
    text: 'Редактор свойства',
    input: 'select',
    labelkey: 'value',
    keyfield: 'id',
    valuekey: 'value',
    clearable: true,
    values: [
      {
        id: 1,
        value: 'select'
      },
      {
        id: 2,
        value: 'autocomplete'
      },
      {
        id: 3,
        value: 'amount'
      },
      {
        id: 4,
        value: 'money'
      },
      {
        id: 5,
        value: 'number'
      },
      {
        id: 6,
        value: 'textarea'
      },
      {
        id: 7,
        value: 'checkbox'
      },
      {
        id: 8,
        value: 'date'
      },
      {
        id: 9,
        value: 'datetime'
      },
      {
        id: 10,
        value: 'email'
      },
      {
        id: 11,
        value: 'radio'
      },
      {
        id: 12,
        value: 'range'
      },
      {
        id: 13,
        value: 'tel'
      },
      {
        id: 14,
        value: 'text'
      },
      {
        id: 15,
        value: 'url'
      },
      {
        id: 16,
        value: 'file'
      },
    ]
  },
  {
    datafield: 'propClass',
    text: 'CSS класс div'
  },
  {
    datafield: 'labelClass',
    text: 'CSS класс элемента <label>'
  },
  {
    datafield: 'inputClass',
    text: 'CSS класс редактора'
  },
  {
    datafield: 'clearable',
    text: 'clearable',
    input: 'checkbox'
  },
  {
    datafield: 'labelkey',
    text: 'labelkey'
  },
  {
    datafield: 'valuekey',
    text: 'valuekey'
  },
  {
    datafield: 'keyfield',
    text: 'keyfield'
  },
  {
    datafield: 'collapseTags',
    text: 'collapse-tags',
    input: 'checkbox'
  },
  {
    datafield: 'multiple',
    text: 'multiple',
    input: 'checkbox'
  },
  {
    datafield: 'remote',
    text: 'remote',
    input: 'checkbox'
  },
  {
    datafield: 'triggerOnFocus',
    text: 'triggerOnFocus',
    input: 'checkbox'
  },
  {
    datafield: 'filterable',
    text: 'filterable',
    input: 'checkbox'
  }
]