export default [
  {
    datafield: 'code',
  },
  {
    datafield: 'message'
  },
  {
    datafield: 'response',
    descriptor: [
      {
        datafield: 'data',
        descriptor: [
          {
            datafield: 'message'
          }
        ]
      }
    ]
  }
]