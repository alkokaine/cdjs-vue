<template>
  <cd-get-list :collection="regions" key-field="wikiDataId" list-class="list-unstyled row" :get="get" :headers="headers" :payload="payload"
        :resolve-result="resolveRegions" :on-error="onError" :on-before="onBefore">
    <span slot-scope="{ row }">
      {{ row.name }}
    </span>
    <template v-if="hasError" slot="error" slot-scope="{ config, fetch }">
      <button v-on:click="fetch(config)">Получить</button> 
    </template>
    <template v-if="more" slot="footer">
      <button v-on:click="newPayload($event, page)">Получить</button> 
    </template>
  </cd-get-list>
</template>

<script>
import CDGetList from '@/components/cd-get-list.vue'
import keys from '@/../keys'
import { AxiosError } from 'axios'
const regions = []
export default {
  props: {
    regions: { type: Array, default: () => (regions) },
    resolveRegions: { type: Function, params: 'response => void'},
    country: { type: String, required: true },
    total: { type: Number, required: true }
  },
  components: {
    'cd-get-list': CDGetList
  },
  data (row) {
    return {
      headers: keys.geo,
      page: 1,
      limit: 10,
      error: AxiosError,
      config: null
    }
  },
  computed: {
    hasError ({ error }) {
      return error.code !== undefined
    },
    get ({ country }) {
      return `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/regions`
    },
    isNotReady ({ regions, country }) {
      return country === undefined || !Array.isArray(regions)
    },
    payload ({ page, limit }) {
      return {
        offset: (page - 1) * limit,
        limit
      }
    },
    more ({ regions, total }) {
      if (regions === undefined) return true
      else if (regions.length < total) return true
      else return false
    }
  },
  methods: {
    newPayload (event, page) {
      this.page = page + 1
    },
    onError (reason, config) {
      this.error = reason
      this.config = config
    },
    onBefore (request) {
      this.config = null
      this.error = AxiosError
      return request
    }
  }
  
}
</script>

<style>

</style>