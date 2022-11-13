<template>
  <div class="cd-list-view">
    <cd-list :remote-method="getdata" :payload="payload" :resolve-result="resolveCollection" key-field="'wikiDataId'" :collection="collection" :row-class="rowClass">
      <div slot="header">
        <input type="range" :max="10" v-model="payload.limit"/>
        <input type="text" v-model="payload.namePrefix"/>
      </div>
      <span slot-scope="{ row }">{{ row }}</span>
      <div slot="footer">
        {{ total }}
      </div>
    </cd-list>
  </div>
</template>

<script>
import CDList from '@/components/cd-list.vue'
import fetchData from '@/common/fetch-data'
import adapter from 'axios/lib/adapters/http'
export default {
  components: {
    'cd-list': CDList
  },
  data (view) {
    return {
      collection: [],
      total: 0,
      payload: {
        limit: 10
      },
      
    }
  },
  methods: {
    resolveCollection (result) {
      this.collection = result
    },
    getdata(payload, resolve) {
      const list = this
      fetchData({
        adapter,
        payload,
        method: 'get',
        error (reason) {
          list.$message(`${reason.code} ${reason.message}`)
        },
        timeout:5000,
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
        headers: {
            'X-RapidAPI-Key': '0d6efbd8a7msh8fcd0fa4c7e36a4p15464ejsn34c8169d4000',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
      }).then(response => { 
        list.total = response.data.metadata.totalCount
        list.resolveCollection(response.data.data)
      })
    }
  },
  computed: {
    rowClass (vm) {
      return (row, index) => (`cd-list-view--index-${index}-row-${row.wikiDataId}-payload-${vm.payload.offset}`)
    },
    isRowVisible (vm) {
      return (row, index) => index % 3 === 0
    }
  }
}
</script>

<style>

</style>