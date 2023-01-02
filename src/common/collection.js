import fetchData from '@/common/fetch-data'
import AxiosError from 'axios/lib/core/AxiosError'

export default {
  name: 'collection-mixin',
  props: {
    total: { type: Number },
    pageSize: { type: Number },
    onPageChange: { type: Function },
    method: { type: String, default: 'get' },
    headers: { type: Object },
    payload: { type: [Array, Object, Number, String, Date, Function], description: 'Параметры загрузки данных в список' },
    get: { type: String },
    remoteMethod: { type: Function },
    resolveResult: { type: Function },
    error: { type: [Function, Object], description: 'Последняя полученная ошибка' },
    resolvePayload: { type: Function, default: (payload) => (payload) },
    onError: {
      type: Function, 
      params: '(response, config) => void', 
      default: (response, config) => {
        console.error(config)
        console.error(response)
      }
    },
    onBefore: { type: Function, default: function (request, config) {
      return request
    }},
    onAfter: { type: Function, default: function (response, config) {
      return response
    }}
  },
  data (collection) {
    return {
    }
  },
  computed: {
    config ({ onBefore, onAfter, payload, resolvePayload, headers, method, get }) {
      return {
        method: method,
        url: get,
        payload: resolvePayload(payload),
        headers: headers,
        before: onBefore,
        after: onAfter
      }
    },
    hasError ({ error }) {
      return error !== undefined && error.code !== undefined
    }
  },
  watch: {
    config: {
      immediate: true,
      handler (newvalue) {
        const { remoteMethod, resolveResult, onError } = this
        const get = remoteMethod === undefined ? fetchData : remoteMethod
        if (get !== undefined && typeof get === 'function') {
          get(newvalue)
          .then((response) => { 
            if (response instanceof AxiosError) {
              throw response
            } else {
              if (resolveResult !== undefined && typeof resolveResult === 'function') {
                resolveResult(response) 
              }
            }
          })
          .catch(reason => { 
            if (onError !== undefined && typeof onError === 'function')
              onError(newvalue, reason) })
        } 
      }
    }
  }
}