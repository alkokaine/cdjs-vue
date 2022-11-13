<template>
  <div class="cd-list-filter">
    <cd-list :collection="collection" :payload="payload" key-field="code" :resolve-result="resolveResult" :remote-method="getData">
      <cd-form slot="header" :payload="payload" :descriptor="descriptor" :sync="true">
        <div slot="header">{{ payload }}</div>
      </cd-form>
      <div class="country" slot-scope="{ row }">{{ row }}</div>
      <div slot="footer" v-if="error.code">
        {{ error }}
      </div>
    </cd-list>
  </div>
</template>

<script>
import adapter from 'axios/lib/adapters/http'
import fetchData from '@/common/fetch-data'
import CDForm from '@/components/cd-form'
import CDList from '@/components/cd-list'
import AxiosError from 'axios/lib/core/AxiosError'
export default {
  name: 'cd-list-filter',
  components: {
    'cd-list': CDList,
    'cd-form': CDForm
  },
  data (view) {
    return {
        collection: Array,
        payload: {
          limit: 10
        },
        error: AxiosError,
        total: Number,
        descriptor: [
          {
            datafield: 'limit',
            text: 'Кол-во записей',
            input: 'range',
            max: 10
          }
        ]
    }
  },
  methods: {
    getData (payload, resolve) {
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
        headers: {
            'X-RapidAPI-Key': '0d6efbd8a7msh8fcd0fa4c7e36a4p15464ejsn34c8169d4000',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
      }).then(response => { 
        list.total = response.data.metadata.totalCount
        resolve(response.data.data)
      })
    },
    resolveResult (response) {
      this.collection = response
    }
  }
}
</script>

<style>

</style>