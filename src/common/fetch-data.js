import axios from 'axios'

const cbfactory = (func, config) => (args) => {
  if (func !== undefined && typeof func === 'function') return func(args, config)
  return args
}

function noTransform (response, headers) {
  return response
}


export default function (config) {
  const _transform = config.responseType === 'text' ? noTransform : undefined
  const _config = {
    method: config.method,
    adapter: config.adapter,
    responseType: (config.responseType === undefined ? 'json' : config.responseType),
    params: config.payload,
    headers: config.headers,
    timeout: (isNaN(config.timeout) ? 0 : (+config.timeout)),
    transformResponse: _transform
  }
  const instance = axios.create()  
  const cberror = cbfactory(config.error)
  instance.interceptors.request.use(cbfactory(config.before, _config), cberror)
  instance.interceptors.response.use(cbfactory(config.after, _config), cberror)
  return instance(config.url, _config)
}