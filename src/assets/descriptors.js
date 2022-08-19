/* eslint-disable */ 
import Vue from 'vue'
 
export default {
  objectDescriptor: [
    {
      descriptor: [
        {
          text: 'Общее',
          descriptor: [
            {
              datafield: 'date1',
              input: 'date',
              text: 'date1',
              rules: [
                {
                  required: true,
                  message: 'Укажите дату'
                }
              ]
            },
            {
              datafield: 'Name',
              text: 'Полное название',
              required: (payload) => payload.BuildingID > 0
            },
            {
              input: 'select',
              datafield: 'building_id',
              slotdescriptor: [
                {
                  datafield: 'Name',
                  class: 'building-name pb-1'
                },
                {
                  datafield: 'BuildingTypeName',
                  class: 'building-type-name pb-1'
                },
                {
                  datafield: 'Address',
                  class: 'building-address'
                }
              ],
              // class: options.class,
              text: 'Объект недвижимости',
              onselect (payload, option, parent) {
                Vue.set(payload, 'BuildingID', option.BuildingID)
              },
              resolveresult (response) {
                return response.data.Data
              },
              // headers: keys.crossd,
              url: '/local/api/building/object/196',
              // reset: options.reset,
              method: 'get',
              valuekey: 'BuildingID',
              labelkey: 'Name',
              clearable: false,
              isdisabled (option, payload, parent) {
                return option.BuildingTypeID === 1
              }
            },
            {
              descriptor: [
                {
                  datafield: 'ShortName',
                  text: 'Сокращенное название'
                }, {
                  datafield: 'UltraShortName',
                  text: 'Краткое название'
                },
                {
                  datafield: 'test',
                  text: 'test'
                }
              ],
            },
            {
              descriptor: [
                {
                  datafield: 'Is24Group',
                  text: 'Is24Group'
                },
                {
                  datafield: 'IsBudget',
                  text: 'IsBudget'
                  // Invalid prop: type check failed for prop "value".
                },
                {
                  datafield: 'IsDepartment',
                  text: 'IsDepartment'
                }
              ],
            },
  
            {
              descriptor: [
                {
                  datafield: 'IsFew',
                  text: 'Малочисленная'
                },
                {
                  datafield: 'WorkDaysCount',
                  text: 'WorkDaysCount'
                },
                {
                  datafield: 'ObjectID',
                  text: 'ObjectID'
                },
                {
                  datafield: 'slider',
                  text: 'slider',
                  input: 'slider'
                }
              ],
            },
  
            {
              descriptor: [
                {
                  datafield: 'ObjectStatusID',
                  text: 'ObjectStatusID'
                },
                {
                  datafield: 'ObjectTypeID',
                  text: 'ObjectTypeID'
                },
                {
                  datafield: 'MainObjectID',
                  text: 'MainObjectID'
                }
              ],
            },
  
            {
              descriptor: [
                {
                  datafield: 'Code',
                  text: 'Code'
                },
                {
                  datafield: 'EndDate',
                  text: 'EndDate'
                },
                {
                  datafield: 'OrderNumber',
                  text: 'OrderNumber'
                }
              ],
            },
            {
              datafield: 'ParentObjectID',
              text: 'ParentObjectID'
            }
          ]
        },
        {
          text: 'Адрес и контактные данные',
          descriptor: [
            {
              descriptor: [
                {
                  datafield: 'address',
                  text: 'address',
                  input: 'autocomplete',
                  method: 'post',
                  labelkey: 'unrestricted_value',
                  valuekey: 'unrestricted_value',
                  // headers: keys.dadataheaders,
                  onselect (payload, event, parent) {
                    console.log(this, payload, event)
                  },
                  resolvepayload (payload, query, parent) {
                    return {
                      query: query,
                      count: 20,
                      locations_boost: [{
                        kladr_id: '51'
                      }]
                    }
                  },
                  focustrigger: false,
                  clearable: true,
                  url: '/suggestions/address',
                  resolveresult: (response) => (response.data.suggestions)
                },
                {
                  datafield: 'PostIndex',
                  text: 'Почтовый индекс'
                },
                {
                  datafield: 'City',
                  text: 'Город'
                }
              ],
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
                }
              ],
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
                }
              ],
            },
            {
              descriptor: [
                {
                  datafield: 'PhoneNumber',
                  text: 'Телефон',
                  hidden (payload) {
                    return payload.date1 === undefined || payload.date1 === null
                  },
                  canedit (payload) {
                    return true
                  },
                  rules: function (payload) {
                    const hasdate = payload.date1 instanceof Date && !isNaN(payload.date1)
                    return [
                      {
                        required: !hasdate,
                        message: 'Укажите номер телефона'
                      }
                    ]
                  }
                },
                {
                  datafield: 'EMail',
                  text: 'E-mail'
                }
              ]
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
                }
              ]
            },
            {
              datafield: 'CityID',
              text: 'CityID'
            }
          ]
        }
      ]
    },
    {
      descriptor: [
        {
          text: 'Реквизиты',
          descriptor: [
            {
              descriptor: [{
                datafield: 'INN',
                text: 'ИНН'
              },
              {
                datafield: 'OKPO',
                text: 'ОКПО'
              }
              ]
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
                }
              ]
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
                }
              ]
            },
            {
              descriptor: [
                {
                  datafield: 'BIC',
                  text: 'БИК'
                },
                {
                  datafield: 'CorrBank',
                  text: 'Корр.банк'
                }
              ]
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
                }
              ]
            },
            {
              datafield: 'MunAccount',
              text: 'MunAccount'
            },
            {
              datafield: 'UFK',
              text: 'UFK'
            }
          ]
        },
        {
          text: 'Руководитель',
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
                  text: 'Исполняющий обязаности'
                }
              ]
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
                }
              ]
            },
            {
              descriptor: [
                {
                  datafield: 'HeadReason',
                  text: 'HeadReason'
                },
                {
                  datafield: 'HeadSignature',
                  text: 'Подпись для документов'
                }
              ]
            },
            {
              descriptor: [
                {
                  datafield: 'PostAddress',
                  text: 'PostAddress'
                },
                {
                  datafield: 'LawAddress',
                  text: 'LawAddress'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  object: {"BankName":"ОТДЕЛЕНИЕ МУРМАНСК БАНКА РОССИИ/ УФК по Мурманской области г. Мурманск","BIC":"014705901","City":"г Мурманск","Code":null,"CorrAccount":null,"CorrBank":null,"CurrentAccount":"40102810745370000041","EMail":"123dou@mail.ru","EndDate":null,"FaxNumber":"8(8152) 52-29-90","HeadEMail":"123dou@mail.ru","HeadFIO":"Патлаенко Ольга Владимировна","HeadPhoneNumber":null,"HeadPosition":"Заведующая","HeadReason":"Устава","HeadSignature":"в лице заведующей Патлаенко Ольги Владимировны","HouseBlock":null,"HouseNumber":"49","INN":"5190408210","Is24Group":false,"IsBudget":true,"IsDepartment":2,"IsFew":false,"IsIO":false,"KPP":"519001001","LawAddress":null,"MunAccount":"03234643477010004900","Name":"МУНИЦИПАЛЬНОЕ АВТОНОМНОЕ ДОШКОЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ Г. МУРМАНСКА № 123","ObjectStatusID":null,"OKPO":"51696061","OKVED":"85.11","ObjectTypeID":4,"OrderNumber":123,"PersonalAccount":"30496Ш82620","PersonalAccount2":null,"PhoneNumber":"(8152)53-78-38","PostAddress":null,"PostIndex":"183014","Region":"Первомайский","ShortName":"МАДОУ Г. МУРМАНСКА № 123","Street":"ул Баумана","UFK":"Управление финансов администрации города  Мурманска(МАДОУ г. Мурманска № 123)","WorkDaysCount":5,"WWW":"www.sadik123.ru","MainObjectID":121,"ParentObjectID":121,"CityID":1,"Parent":{"ObjectID":121,"UltraShortName":"МАДОУ №123"},"Main":{"ObjectID":121,"UltraShortName":"МАДОУ №123"},"ObjectType":{"ObjectTypeID":4,"Name":"МАДОУ","ObjectGroupID":3},"ObjectID":121,"UltraShortName":"МАДОУ №123"}
}