<template>
  <div class="cd-list-view">
    <cd-list :remote-method="getdata" :payload="payload"
      :resolve-result="resolveCollection" key-field="key"
      :collection="collection" row-class="cd-list--test-item">
      <div slot="header">
        <h3>CD-LIST</h3>
        <input type="range" v-model.number="payload"/>
      </div>
      <span slot-scope="{ row }">{{ row }}</span>
    </cd-list>
  </div>
</template>

<script>
import CDList from '@/components/cd-list.vue'
export default {
  components: {
    'cd-list': CDList
  },
  data (view) {
    return {
      collection: [],
      payload: 10
    }
  },
  methods: {
    resolveCollection (result) {
      this.collection = result
    },
    getdata(payload, resolve) {
      resolve(Array.from(Array(payload).keys()).map(m => ({ key: m })))
    }
  },
  computed: {
    rowClass (vm) {
      return (row, index) => (`cd-list-view--index-${index}-row-${row.key}-payload-${vm.payload}`)
    }
  }
}
</script>

<style>

</style>