import fetchData from '@/common/fetch-data'
import AxiosError from 'axios/lib/core/AxiosError'

export default {
  name: 'collection-mixin',
  props: {
    method: { 
      type: String,
      default: 'get',
      description: 'HTTP-метод (get, post, ...)' 
    },
    headers: { 
      type: Object,
      description: 'Объект заголовков запроса'
    },
    payload: {
      type: [Array, Object, Number, String, Date, Function], 
      description: 'Параметры загрузки данных' 
    },
    get: {
      type: String,
      description: 'URL получения данных'
    },
    remoteMethod: {
      type: Function,
      params: '({ method, url, payload, headers, before, after }) => Promise',
      default: fetchData
    },
    resolveResult: { type: Function, params: '(response) => void' },
    error: { type: [Function, Object], description: 'Последняя полученная ошибка' },
    resolvePayload: { 
      type: Function, 
      description: 'Функция трансформации объекта payload в объект, пригодный для отправки с запросом',
      params: '(payload) => Object',
      default: (payload) => (payload) 
    },
    onError: {
      type: Function,
      params: '(response, config) => void', 
      default: (response, config) => {
        console.error(config)
        console.error(response)
      }
    },
    onBefore: {
      type: Function,
      params: '(request, config) => request',
      default: function (request, config) {
        return request
      }
    },
    onAfter: {
      type: Function,
      params: '(response, config) => response',
      default: function (response, config) {
        return response
      }
    }
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
        remoteMethod(newvalue)
          .then((response) => { 
            if (response instanceof AxiosError) {
              throw response
            } else if (resolveResult !== undefined && typeof resolveResult === 'function') {
              resolveResult(response) 
            }
          })
        .catch(reason => { 
          if (onError !== undefined && typeof onError === 'function')
            onError(newvalue, reason) 
          }
        )
      }
    }
  }
}