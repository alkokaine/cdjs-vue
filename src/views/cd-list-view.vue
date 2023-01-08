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
      <country-row slot-scope="{ row }" :country="row" class="country-row--wrap" v-on:click.native="selectRow(row)">
        <cd-props v-if="isDetailsOpen(row) && countryDetails.wikiDataId" :descriptor="countryDescriptor" :payload="countryDetails" class="country-details mx-auto text-start">
          <template slot-scope="{ property, value }">
            <template v-if="property.image"></template>
            <div v-if="property.image" class="country-flag--wrap">
              <img :sync="true" :class="property.class" :src="value"/>
            </div>
            <currency-row v-else-if="property.currencies" :currencies="value">
              <label>{{ property.text }}:</label>
            </currency-row>
            <div v-else class="country-detail">
              <label class="country-property--name">{{ property.text }}:</label>
              <span class="country-property--value ps-2">{{ value }}</span>
            </div>
          </template>
        </cd-props>
      </country-row>
      <div slot="footer">
        <el-pagination :current-page="currentPage" :page-size="limit" v-on:current-change="onPageChange($event)" :total="total"></el-pagination>
      </div>
    </cd-get-list>
  </div>
</template>

<script>

import CDGetList from '@/components/cd-get-list.vue'
import CDProps from '@/components/cd-props.vue'
import CurrencyRow from './currency-row.vue'
import CountryRow from './country-row.vue'
import keys from '@/../keys'
import { AxiosError } from 'axios'
import fetchData from '@/common/fetch-data'
import curcode from 'currency-codes'
export default {
  components: {
    'cd-get-list': CDGetList,
    'currency-row': CurrencyRow,
    'country-row': CountryRow,
    'cd-props': CDProps
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
      countryDescriptor: [
        {
          descriptor: [
            {
              datafield: 'name',
              text: 'name'
            },
            {
              datafield: 'code',
              text: 'code'
            },
            {
              datafield: 'capital',
              text: 'capital'
            },
            {
              datafield: 'callingCode',
              text: 'phone code'
            },
            {
              datafield: 'currencyCodes',
              text: 'currencies',
              currencies: true
            },
            {
              datafield: 'numRegions',
              text: 'regions amount'
            }            
          ],
          propClass: 'row row-cols-4'
        },
        {
          datafield: 'flagImageUri',
          image: true,
          propClass: 'country-flag',
          class: 'country-flag--image'
        },
      ]
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