export default {
  name: 'collection-base',
  props: {
    isLoading: { type: Boolean, default: false, description: 'Признак загрузки' },
    keyField: { type: String, required: true, description: 'Ключевое свойство элемента коллекции' },
    rowClass: { type: [Array, Object, String], description: 'Класс элемента коллекции' },
    collection: { type: Array, required: true, description: 'Данные коллекции' },
    isRowVisible: { type: Function, params: '(row, index) => Boolean', description: 'Определяем по объекту и индексу видимость элемента списка' }
  },
  computed: {
    isEmpty ({ collection }) {
      return !Array.isArray(collection) || (Array.isArray(collection) && collection.length === 0)
    },
    filtered ({ collection, isRowVisible }) {
      if (!Array.isArray(collection)) {
        console.warn('[CDJS]: [collection] property is not array')
        return []
      }
      if (isRowVisible === undefined || typeof isRowVisible !== 'function') {
        console.warn('[CDJS]: [isRowVisible] property is not function')
        return collection
      }
      if (collection.length === 0) return []
      return (collection.filter(isRowVisible))
    }
  }
}