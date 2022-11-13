import axios from 'axios'

const cbfactory = (func) => (args) => {
  if (func !== undefined && typeof func === 'function') return func(args)
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
    responseType: (config.responseType ?? 'json'),
    params: config.payload,
    headers: config.headers,
    timeout: (config.timeout ?? 0),
    transformResponse: _transform
  }
  const instance = axios.create()  
  const cberror = cbfactory(config.error)
  instance.interceptors.request.use(cbfactory(config.before), cberror)
  instance.interceptors.response.use(cbfactory(config.after), cberror)
  return instance(config.url, _config)
}