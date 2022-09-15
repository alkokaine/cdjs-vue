const hasArray = (payload, property) => Object.prototype.hasOwnProperty.call(payload, property) && Array.isArray(payload[property])

export default function flatterer (arr, accum) {
    return (arr || []).reduce((acc, u) => { // выбираем между arr и пустым
      // массивом и выполняем над ним reduce
      // функцией (acc, u) => {},
      // где acc -- массив-аккумулятор, а u -- текущее свойств
      let res = []
      if (hasArray(u, 'descriptor')) {
        // соединим массив acc с результатом выполнения функции reducer над u.descriptor
        res = [u].concat(acc.concat(flatterer(u.descriptor, [])))
      } else {
        acc.push(u)
        res = acc
      }
      return res // вернём что получилось
    }, accum)
  }