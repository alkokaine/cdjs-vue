<template>
  <div class="cd-list-view">
    <cd-list
      :remote-method="getdata"
      :payload="payload"
      :resolve-result="resolveCollection"
      key-field="'wikiDataId'"
      :collection="collection"
      :row-class="rowClass"
    >
      <div slot="header">
        <input
          v-model="payload.limit"
          type="range"
          :max="10"
        >
        <input
          v-model="payload.namePrefix"
          type="text"
        >
      </div>
      <span slot-scope="{ row }">{{ row }}</span>
      <div
        v-if="error.code"
        slot="footer"
      >
        <a
          href="#"
          @click="getdata(payload, resolveCollection)"
        >{{ error.code }} {{ error.message }}</a>
      </div>
    </cd-list>
  </div>
</template>

<script>
import cdjs from '@/../dist/cdjs/cdjs.common'

import fetchData from '@/common/fetch-data'
import adapter from 'axios/lib/adapters/http'
import { geo } from '@/../keys'
import { AxiosError } from 'axios'
export default {
  components: {
    'cd-list': cdjs.CDList
  },
  data (view) {
    return {
      collection: [],
      error: AxiosError,
      total: 0,
      payload: {
        limit: 10
      },
      
    }
  },
  computed: {
    rowClass (vm) {
      return (row, index) => (`cd-list-view--index-${index}-row-${row.wikiDataId}-payload-${vm.payload.offset}`)
    },
    isRowVisible (vm) {
      return (row, index) => index % 3 === 0
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
        before (config) {
          list.error = AxiosError
          return config
        },
        method: 'get',
        error (reason) {
          list.error = reason
        },
        timeout:5000,
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
        headers: geo
      }).then(response => { 
        list.total = response.data.metadata.totalCount
        list.resolveCollection(response.data.data)
      })
    }
  }
}
</script>

<style>

</style>