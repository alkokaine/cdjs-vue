/* eslint-disable */ 
import Vue from 'vue'
const generalPropClass = (payload) => {
  if (payload.BIC === '014705901') return 'cd-custom-property-class'
}

export default {
  objectDescriptor: [
    {
      descriptor: [
        {
          text: 'Общее',
          name: 'general',
          descriptor: [
            {
              datafield: 'Name',
              text: 'Полное название'
            },
            {
              descriptor: [
                {
                  datafield: 'ShortName',
                  text: 'Сокращенное название'
                },
                {
                  datafield: 'UltraShortName',
                  text: 'Краткое название'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'Is24Group',
                  input: 'checkbox',
                  text: 'Круглосуточно',
                  propClass (payload) {
                    return `checkbox-${payload.ObjectID}`
                  }
                },
                {
                  datafield: 'IsBudget',
                  text: 'Бюджет',
                  input:'checkbox'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'IsFew',
                  text: 'Малочисленная',
                  input: 'checkbox'
                },
                {
                  datafield: 'IsDepartment',
                  text: 'Департамент'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'WorkDaysCount',
                  text: 'Количество рабочих дней'
                },
                {
                  datafield: 'Code',
                  text: 'Код'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'EndDate',
                  text: 'Дата окончания'
                },
                {
                  datafield: 'OrderNumber',
                  text: 'Порядок сортировки'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'ObjectStatusID',
                  text: 'Cтатуса объекта',
                  input: 'select',
                  url: '/api/Global/Statuses',
                  method: 'get',
                  valuekey: 'ObjectStatusID',
                  labelkey: 'Name',
                  resolveresult(response) {
                      return response.data.Data
                  },
                },
                {
                  datafield: 'ObjectTypeID',
                  text: 'Тип объекта',
                  input: 'select',
                  url: '/api/Global/ObjectTypes/0',
                  method: 'get',
                  valuekey: 'ObjectTypeID',
                  labelkey: 'Name',
                  resolveresult(response) {
                      return response.data.Data
                  },
                },
              ],
              propClass: 'row row-cols-2'
            },
          ],
          isDisabled (payload) {
            return payload.ObjectID === 121
          },
          propClass: generalPropClass
        },
        {
          text: 'Адрес и контактные данные',
          descriptor: [
              {
                  descriptor: [
                      {
                          datafield: 'PostIndex',
                          text: 'Почтовый индекс'
                      },
                      {
                          datafield: 'City',
                          text: 'Город'
                      },
                  ],
                  propClass: 'row row-cols-2'
              },
              {
                  descriptor: [
                      {
                          datafield: 'Region',
                          text: 'Район'
                      },
                      {
                          datafield: 'Street',
                          text: 'Улица'
                      },
                  ],
                  propClass: 'row row-cols-2'
              },
              {
                  descriptor: [
                      {
                          datafield: 'HouseNumber',
                          text: 'Дом'
                      },
                      {
                          datafield: 'HouseBlock',
                          text: 'Корпус'
                      },
                  ],
                  propClass: 'row row-cols-2'
              },
              {
                  descriptor: [
                      {
                          datafield: 'PhoneNumber',
                          text: 'Телефон'
                      },
                      {
                          datafield: 'EMail',
                          text: 'E-mail'
                      },
                  ],
                  propClass: 'row row-cols-2'
              },
              {
                  descriptor: [
                      {
                          datafield: 'FaxNumber',
                          text: 'Факс'
                      },
  
                      {
                          datafield: 'WWW',
                          text: 'Сайт'
                      },
                  ],
                  propClass: 'row row-cols-2'
              },
              {
                  datafield: 'CityID',
                  text: 'Номер города'
              },
          ],
          name: 'address-contacts'
        },
      ],
      propClass: 'row row-cols-2'
    },
    {
      descriptor: [
        {
          text: 'Реквизиты',
          descriptor: [
            {
              descriptor: [
                {
                  datafield: 'INN',
                  text: 'ИНН',
                  input: 'autocomplete'
                },
                {
                  datafield: 'OKPO',
                  text: 'ОКПО'
                }
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                    datafield: 'KPP',
                    text: 'КПП'
                },
                {
                    datafield: 'OKVED',
                    text: 'ОКВЭД'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'BankName',
                  text: 'Банк'
                },
                {
                  datafield: 'CorrAccount',
                  text: 'Корр/счет'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'BIC',
                  text: 'БИК',
                  input: 'autocomplete'
                },
                {
                  datafield: 'CorrBank',
                  text: 'Корр.банк'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              datafield: 'CurrentAccount',
              text: 'Р/Счет'
            },
            {
              descriptor: [
                {
                  datafield: 'PersonalAccount',
                  text: 'Лицевой счет'
                },
                {
                  datafield: 'PersonalAccount2',
                  text: 'Лицевой счет2'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              datafield: 'MunAccount',
              text: 'Казначейский счет'
            },
            {
              datafield: 'UFK',
              text: 'УФК'
            },
          ],
          name: 'requisities'
        },
        {
          text: 'Руководитель',
          name: 'manager',
          descriptor: [
            {
              datafield: 'HeadPosition',
              text: 'Должность'
            },
            {
              descriptor: [
                {
                  datafield: 'HeadFIO',
                  text: 'ФИО'
                },
                {
                  datafield: 'IsIO',
                  text: 'Исполняющий обязаности',
                  input: 'checkbox'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'HeadPhoneNumber',
                  text: 'Телефон'
                },
                {
                  datafield: 'HeadEMail',
                  text: 'E-mail'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'HeadReason',
                  text: 'На основании'
                },
                {
                  datafield: 'HeadSignature',
                  text: 'Подпись для документов'
                },
              ],
              propClass: 'row row-cols-2'
            },
            {
              descriptor: [
                {
                  datafield: 'PostAddress',
                  text: 'Почтовый адрес'
                },
                {
                  datafield: 'LawAddress',
                  text: 'Юридический адрес',
                  input: 'autocomplete'
                },
              ],
              propClass: 'row row-cols-2'
            }
          ]
        }
      ],
      propClass: 'row row-cols-2'
    }
  ],
  object: {
    "BankName":"ОТДЕЛЕНИЕ МУРМАНСК БАНКА РОССИИ/ УФК по Мурманской области г. Мурманск",
    "BIC":"014705901",
    "City":"г Мурманск",
    "Code":null,
    "CorrAccount":null,
    "CorrBank":null,
    "CurrentAccount":"40102810745370000041",
    "EMail":"123dou@mail.ru",
    "EndDate":null,
    "FaxNumber":"8(8152) 52-29-90",
    "HeadEMail":"123dou@mail.ru",
    "HeadFIO":"Патлаенко Ольга Владимировна",
    "HeadPhoneNumber":null,
    "HeadPosition":"Заведующая",
    "HeadReason":"Устава",
    "HeadSignature":"в лице заведующей Патлаенко Ольги Владимировны",
    "HouseBlock":null,
    "HouseNumber":"49",
    "INN":"5190408210",
    "Is24Group":false,
    "IsBudget":true,
    "IsDepartment":2,
    "IsFew":false,
    "IsIO":false,
    "KPP":"519001001",
    "LawAddress":null,
    "MunAccount":"03234643477010004900",
    "Name":"МУНИЦИПАЛЬНОЕ АВТОНОМНОЕ ДОШКОЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ Г. МУРМАНСКА № 123",
    "ObjectStatusID":null,
    "OKPO":"51696061",
    "OKVED":"85.11",
    "ObjectTypeID":4,
    "OrderNumber":123,
    "PersonalAccount":"30496Ш82620",
    "PersonalAccount2":null,
    "PhoneNumber":"(8152)53-78-38",
    "PostAddress":null,
    "PostIndex":"183014",
    "Region":"Первомайский",
    "ShortName":"МАДОУ Г. МУРМАНСКА № 123",
    "Street":"ул Баумана",
    "UFK":"Управление финансов администрации города  Мурманска(МАДОУ г. Мурманска № 123)",
    "WorkDaysCount":5,
    "WWW":"www.sadik123.ru",
    "MainObjectID":121,
    "ParentObjectID":121,
    "CityID":1,
    "Parent":{
      "ObjectID":121,
      "UltraShortName":"МАДОУ №123"
    },
    "Main":{
      "ObjectID":121,
      "UltraShortName":"МАДОУ №123"
    },"ObjectType":{
      "ObjectTypeID":4,
      "Name":"МАДОУ",
      "ObjectGroupID":3
    },
    "ObjectID":121,
    "UltraShortName":"МАДОУ №123"
  },
  inputObject: {
    select: 1,
    autocomplete: '2',
    number: 3,
    textarea: 4,
    checkbox: false,
    date: new Date(Date.now()),
    datetime: 7,
    email: 'foo@bar.net',
    radio: 'no',
    tel: '+791113121488',
    url: 'bar.net',
    text: 'aaa',
    file: null
  },
  inputs: [
    {
      input: 'select',
      datafield: 'select',
      text: 'select',
      placeholder: 'select....',
      valuekey: 'key',
      labelkey: 'label',
      values: [
        {
          key: 1,
          label: 'first'
        },
        {
          key: 2,
          label: 'second'
        }
      ]
    },
    {
      input: 'autocomplete',
      datafield: 'autocomplete',
      text: 'autocomplete'
    },
    {
      input: 'number',
      datafield: 'number',
      text: 'number'
    },
    {
      input: 'textarea',
      datafield: 'textarea',
      text: 'textarea'
    },
    {
      input: 'checkbox',
      datafield: 'checkbox',
      text: 'checkbox'
    },
    {
      input: 'date',
      datafield: 'date',
      text: 'date'
    },
    {
      input: 'datetime',
      datafield: 'datetime',
      text: 'datetime'
    },
    {
      input: 'email',
      datafield: 'email',
      text: 'email'
    },
    {
      input: 'radio',
      datafield: 'radio',
      text: 'radio'
    },
    {
      input: 'range',
      datafield: 'range',
      text: 'range'
    },
    {
      input: 'tel',
      datafield: 'tel',
      text: 'tel'
    },
    {
      input: 'text',
      datafield: 'text',
      text: 'text'
    },
    {
      input: 'url',
      datafield: 'url',
      text: 'url'
    },
    {
      input: 'file',
      datafield: 'file',
      text: 'file'
    }
  ]
}