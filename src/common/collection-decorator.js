export default {
  name: 'collection-decorator',
  props: {
    rowClass: { type: [String, Array, Object], description: 'CSS-класс элемента коллекции' },
    listClass: { type: [String, Array, Object], description: 'CSS-класс коллекции' }
  }
}