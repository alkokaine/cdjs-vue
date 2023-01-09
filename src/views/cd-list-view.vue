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
      <country-row slot-scope="{ row }" :country="row" class="country-row--wrap" :on-click="selectRow">
        <template v-if="isDetailsOpen(row) && countryDetails.code">
          <country-details :country="countryDetails"></country-details>
        </template>
      </country-row>
      <div slot="footer">
        <el-pagination :current-page="currentPage" :page-size="limit" v-on:current-change="onPageChange($event)" :total="total"></el-pagination>
      </div>
    </cd-get-list>
  </div>
</template>

<script>

import CDGetList from '@/components/cd-get-list.vue'
import CountryRow from './country-row.vue'
import CountryDetails from './country-details.vue'
import keys from '@/../keys'
import { AxiosError } from 'axios'
import fetchData from '@/common/fetch-data'
import curcode from 'currency-codes'
export default {
  components: {
    'cd-get-list': CDGetList,
    'country-row': CountryRow,
    'country-details': CountryDetails,
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
      selectedCountry: Object,
      countryDetails: Object,
      isDetailsLoading: false,
    }
  },
  watch: {
    'selectedCountry.wikiDataId': {
      handler (newvalue) {
        if (newvalue !== undefined)
        {
          const view = this
          fetchData({
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${newvalue}`,
            method: 'get',
            headers: keys.geo,
            before: (request) => {
              view.isDetailsLoading = true
              return request
            }
          }).then(response => {
            view.countryDetails = response.data.data
          }).catch(error => {
            console.error(error)
          }).then(() => {
            view.isDetailsLoading = false
          })
        }
      }
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
    },
    codes ({ countryDetails }) {
      const { currencyCodes } = countryDetails
      if (currencyCodes != undefined) {
        return currencyCodes.map(c => ({ code: c, currency: curcode.code(c)})).map(c => ({
          code: c.code,
          name: c.currency.currency
        }))
      } else {
        return []
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
    selectRow (event, country) {
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
    onError (reason, config) {
      this.isLoading = false
      this.error = reason
    }
  }
}
</script>

<style>
  .country-row {
    max-width: max-content;
  }
  .country-flag--image {
    max-width: 150px;
  }
  .country-details {
    max-width: 80%;

  }
</style>