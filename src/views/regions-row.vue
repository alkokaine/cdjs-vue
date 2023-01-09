<template>
  <div class="regions-row--wrap">
    <template v-if="isNotReady">
      <button>Получить</button>
    </template>
    <template v-else>
      <cd-get-list :collection="regions" key-field="wikiDataId" :get="get" :headers="headers" 
        :resolve-result="resolveRegions">
        <span slot="header">
          <slot></slot>
        </span>
        <span slot-scope="{ row }">
          {{ row }}
        </span>
        <button slot="footer">Получить</button>
      </cd-get-list>
    </template>
  </div>
</template>

<script>
import CDGetList from '@/components/cd-get-list.vue'
import keys from '@/../keys'
const regions = []
export default {
  props: {
    regions: { type: Array, default: () => (regions) },
    country: { type: String, required: true }
  },
  components: {
    'cd-get-list': CDGetList
  },
  data (row) {
    return {
      headers: keys.geo,
      list: row.regions,
    }
  },
  computed: {
    get ({ country }) {
      return `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/regions`
    },
    isNotReady ({ regions, country }) {
      return country === undefined || !Array.isArray(regions)
    }
  },
  methods: {
    resolveRegions (response) {
      console.log(response)
    }
  }
  
}
</script>

<style>

</style>