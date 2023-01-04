<template>
  <div class="cd-list-view">
    <cd-get-list class="cd-list-example" key-field="wikiDataId" :collection="collection"
      get="https://wft-geo-db.p.rapidapi.com/v1/geo/countries" :headers="headers" :is-loading="isLoading"
      list-class="country-list list-unstyled" row-class="country-row mx-auto p-2" :payload="payload" :error="error"
      :on-error="onError" :on-before="onBefore" :on-after="onAfter"
      :resolve-result="resolveCollection" :resolve-payload="resolvePayload">
      <div slot="header">
        <input id="limit" type="range" :min="1" :max="10" v-on:change="onChange($event)"/>
        <input id="prefix" type="text" v-model.lazy="namePrefix"/>
      </div>
      <div slot-scope="{ row }" class="country-row--wrap">
        <div class="country-header" v-on:click="selectRow(row)">{{ row }}</div>
        <div v-if="isDetailsOpen(row)" class="country-details">A</div>
      </div>
      <!-- <template v-if="error.code" slot="error" slot-scope="{ error }">
          <a href="#">{{ error.code }} {{ error.message }}</a>
      </template> -->
      <div slot="footer">
        <el-pagination :current-page="currentPage" :page-size="limit" v-on:current-change="onPageChange($event)" :total="total"></el-pagination>
      </div>
    </cd-get-list>
  </div>
</template>

<script>
import CDGetList from '@/components/cd-get-list.vue'
import keys from '@/../keys'
import { AxiosError } from 'axios'
export default {
  components: {
    'cd-get-list': CDGetList
  },
  data (view) {
    return {
      isLoading: false,
      currentPage: 1,
      collection: [],
      limit: 10,
      namePrefix: '',
      headers: keys.geo,
      error: AxiosError,
      total: 0,
      selectedCountry: Object
    }
  },
  computed: {
    isDetailsOpen ({ selectedCountry }) {
      return ({ wikiDataId }) => wikiDataId === selectedCountry.wikiDataId
    },
    resolvePayload ({ currentPage, limit }) {
      return (newpayload) => ({
        namePrefix: newpayload.namePrefix,
        limit: limit,
        offset: (currentPage - 1) * newpayload.limit
      })
    },
    payload ({ namePrefix, limit }) {
      return {
        namePrefix, limit
      }
    }
  },
  methods: {
    onBefore (request, config) {
      this.isLoading = true
      this.error = AxiosError
      return request
    },
    onAfter (response, config) {
      this.isLoading = false
      return response
    },
    selectRow ( country ) {
      if (this.selectedCountry.wikiDataId === country.wikiDataId) {
        this.selectedCountry = Object
      } else {
        this.selectedCountry = country
      }
    },
    resolveCollection (result) {
      try {
        this.collection = result.data.data
        this.total = result.data.metadata.totalCount
      } catch (err) {
        console.error(err)
        throw err
      }
      
    },
    onPageChange(page) {
      this.currentPage = page
    },
    // onInput(event) {
    //   this.currentPage = 1
    // },
    onChange (event, limit) {
      this.limit = event.target.valueAsNumber
    },
    onError (params, error) {
      this.isLoading = false
      this.error = error
    }
  }
}
</script>

<style>
  .country-row {
    max-width: max-content;
  }
</style>