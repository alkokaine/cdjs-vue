<template>
  <div class="cd-list-filter">
    <cd-list-base name="countries" :collection="collection" :payload="payload" key-field="code" :resolve-result="resolveResult" :remote-method="getData">
      <cd-form slot="header" :payload="payload" :descriptor="descriptor" :sync="true"></cd-form>
      <div class="country" slot-scope="{ row }">
        <span>{{ row }}</span><el-button type="text" @click="showCountryDetails(row)">Дополнительно</el-button>
        <cd-props v-if="isdetails(row)" :payload="country" :descriptor="countrydetails">
          <div slot-scope="{ property, value }">
            <label>{{ property.text }}: </label>
            <template v-if="isregions(property)">
              <el-button type="text" v-on:click="showRegions">{{ value }}</el-button>
            </template>
            <template v-else>
              <span>{{ value }}</span>
            </template>
          </div>
        </cd-props>
      </div>
      <div slot="footer">
        <el-pagination :current-page="countryPage" :total="total" :page-size="payload.limit" v-on:current-change="onPageChange($event, payload)" :layout="layout"></el-pagination>
        <el-dialog width="80%" :visible.sync="showDialog" :close-on-click-modal="false" @close="ondialogclose">
          <div slot="title" class="h3">
            <p>Всего регионов {{ country.numRegions }}</p>
          </div>
          <cd-form name="regions-filter" :payload="regionPayload" :descriptor="descriptor" :sync="true">
            <cd-list-base slot="footer" v-if="showDialog" name="regions" :collection="regions" key-field="wikiDataId" :payload="regionPayload" :resolve-result="resolveRegions" :remote-method="getRegions" list-class="row list-unstyled" :row-class="resolveRegionClass">
              <div slot-scope="{ row }">
                <div @click="getRegionDetails($event, row)">{{ row.name }}</div>
                <cd-props v-if="isregiondetails(row)" class="container-sm text-start border region-details" :payload="region" :descriptor="regiondetails">
                  <div slot-scope="{ property, value }">
                    <label class="cd-form--label">{{ property.datafield }}:</label> 
                    <template v-if="isCities(property)">
                      <el-button type="text" @click="showCities($event, row)">{{ value }}</el-button>
                    </template>
                    <template v-else>
                      <span>{{ value }}</span>
                    </template>
                  </div>
                  <cd-list-base v-if="showCityList" class="region-cities mx-3" slot="content" key-field="id" name="cities" :remote-method="getCities" :payload="cityPayload" :resolve-result="resolveCities" :collection="cities" list-class="list-unstyled row mx-auto" row-class="city-tile m-2 p-2 border border-1 border-white bg-white rounded-3">
                    <cd-form slot="header" :payload="cityPayload" :descriptor="descriptor" :sync="true">
                      <el-pagination slot="footer" :current-page="cityPage" :total="totalcities" :layout="layout" :page-size="cityPayload.limit" v-on:current-change="onPageChange($event, cityPayload)"></el-pagination>
                    </cd-form>
                    <cd-props slot-scope="{ row }" :payload="row" :descriptor="cityDescriptor">
                      <div slot-scope="{ property, value }" v-on:click="getCity($event, row)">
                        <label class="fw-bold cd-form--label">{{ property.datafield }}:</label>
                        <span class="city-property">{{ value }}</span>
                      </div>
                      <div v-if="city.id" slot="content">
                        <cd-props :payload="city" :descriptor="citydetails">
                          <span slot="content">{{ city }}</span>
                        </cd-props>
                      </div>
                    </cd-props>
                  </cd-list-base>  
                </cd-props>
              </div>
              <div slot="footer">
                <el-pagination :current-page="currentPage" :total="country.numRegions" :layout="layout" :page-size="regionPayload.limit" v-on:current-change="onPageChange($event, regionPayload)"></el-pagination>
              </div>
            </cd-list-base>
          </cd-form>
        </el-dialog>
      </div>
    </cd-list-base> 
  </div>
</template>

<script>
import keys from '../../keys'
import adapter from 'axios/lib/adapters/http'
import fetchData from '@/common/fetch-data'
import CDForm from '@/components/cd-form'
import CDListBase from '@/components/cd-list-base.vue'
import CDProps from '@/components/cd-props'
import AxiosError from 'axios/lib/core/AxiosError'
import CdListBase from '@/components/cd-list-base.vue'

export default {
  name: 'cd-list-filter',
  components: {
    'cd-list-base': CDListBase,
    'cd-form': CDForm,
    'cd-props': CDProps
  },
  props: {
    descriptor: { 
      type: Array, 
      default: function () {
        return [
          {
            datafield: 'limit',
            text: 'Кол-во возвращаемых записей',
            input: 'range',
            max: 10
          },
          {
            datafield: 'namePrefix',
            text: 'Найти страну',
            placeholder: 'Начните печатать, чтобы найти страну'
          }
        ]
      }
    }
  },
  data (view) {
    return {
      collection: Array,
      currentPage: 1,
      countryPage: 1,
      showDialog: false,
      layout: 'prev, pager, next, total',
      regions: [],
      cities: [],
      cityPage: 1,
      totalcities: 0,
      cityDescriptor: [
        {
          datafield: 'city'
        },
        {
          datafield: 'name',
        },
        {
          datafield: 'latitude',
        },
        {
          datafield: 'longitude'
        },
        {
          datafield: 'population'
        },
        {
          datafield: 'wikiDataId'
        },
        {
          datafield: 'id'
        }
      ],
      payload: {
        limit: 1,
        namePrefix: '',
        offset: 0
      },
      regionPayload: {
        limit: 1,
        offset: 0,
        namePrefix: ''
      },
      cityPayload: {
        limit: 1,
        offset: 0,
        namePrefix: ''
      },
      showCityList: false,
      country: Object,
      region: Object,
      city: Object,
      error: AxiosError,
      totalregions: null,
      total: 0,
      countrydetails: [
        {
          descriptor: [
            {
              datafield: 'flagImageUri'
            },
            {
              descriptor: [
                {
                  datafield: 'name',
                  text: 'Название'
                },
                {
                  datafield: 'capital',
                  text: 'Столица'
                }
              ]
            },
            {
              datafield: 'callingCode',
              text: 'Телефонный код'
            },
            {
              datafield: 'numRegions',
              text: 'Количество регионов'
            },
            {
              datafield: 'wikiDataId',
              text: 'Код вики'
            }
          ]
        }
      ],
      regiondetails: [
            {
              descriptor: [
                {
                  datafield: 'capital',
                  text: 'capital',
                },
                {
                  datafield: 'isoCode',
                  text: 'isoCode',
                },
                {
                  datafield: 'countryCode',
                  text: 'countryCode',
                },
              ],
              propClass: 'row row-cols-3'
            },
            {
              descriptor: [
                {
                  datafield: 'numCities',
                  text: 'numCities',
                },
                {
                  datafield: 'wikiDataId',
                  text: 'wikiDataId',
                },
                {
                  datafield: 'fipsCode',
                  text: 'fipsCode',
                },
              ],
              propClass: 'row row-cols-3'
            }
          ]
    }
  },
  computed: {
    resolveRegionClass ({ region }) {
      return ({ isoCode }) => (region.isoCode === isoCode ? 'pointer d-inline-block bg-white text-dark' : 'pointer w-33 mx-auto')
    },
    isregiondetails ({ region }) {
      return ({ isoCode }) => isoCode === region.isoCode
    },
    isdetails ({ country }) {
      return ({ code }) => code === country.code
    },
    isCities () {
      return ({ datafield }) => datafield === 'numCities'
    },
    isimage () {
      return ({ datafield }) => datafield === 'flagImageUri'
    },
    isregions () {
      return ({ datafield }) => datafield === 'numRegions'
    },
    getRegions ({ country }) { 
      return ((payload, resolve) => {
        fetchData({
          adapter,
          url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country.code}/regions`,
          method: 'get',
          payload,
          headers: keys.geokeys
        }).then(response => {
          resolve(response.data)
        })
      })
    },
    getCities ({ region }) {
      return (payload, resolve) => {
        setTimeout(() => fetchData({
          adapter,
          url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${region.countryCode}/regions/${region.isoCode}/cities`,
          method: 'get',
          payload,
          headers: keys.geokeys
        }).then(response => {
          resolve(response.data)
        }), 3000)
      }
    }
  },
  methods: {
    showRegions (event) {
      this.showDialog = true
    },
    ondialogclose () {
      this.showDialog = false
      this.regions = Array
      this.regionPayload.limit = 1
      this.cities = Array,
      this.totalcities = 0
      this.cityPayload.limit = 1
    },
    getRegionDetails(event, row) {
      const list = this
      fetchData({
        adapter,
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${row.countryCode}/regions/${row.isoCode}`,
        method: 'get',
        headers: keys.geokeys
      }).then(response => {
        list.region = response.data.data
      })
    },
    getCity (event, row ) {
      const list = this
    },
    showCities () {
      this.showCityList = true
    },
    showCountryDetails ({ code }) {
      const list = this
      fetchData({
        adapter,
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}`,
        method: 'get',
        before (config) {
          list.detailserror = AxiosError
          return config
        },
        error (reason) {
          list.detailserror = reason
        },
        headers: keys.geokeys
      }).then(response => {
        list.country = response.data.data
      })
    },
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
        headers: keys.geokeys
      }).then(response => { 
        resolve(response.data)
      })
    },
    resolveResult ({ data, metadata }) {
      this.collection = data
      this.total = metadata.totalCount
    },
    resolveRegions ({ data, metadata }) {
      this.regions = data
      this.totalregions = metadata.totalCount
    },
    resolveCities ({ data, metadata }) {
      this.cities = data
      this.totalcities = metadata.totalCount
    },
    onPageChange (event, payload) {
      payload.offset = payload.limit * (event - 1)
    }
  }
}
</script>

<style>
  img {
    max-height: 100%;
    max-width: 100%;
  }
  .country-flag {
    width: 150px;
  }
  .w-33 {
    width: 30%;
  }
  .pointer {
    cursor: pointer;
  }
  .region-details {
    cursor: default;
  }
  .city-tile {
    max-width: 23%;
  }
  .region-cities {
    width: 100%;
  }
  .city-property {
    word-spacing: normal;
  }
</style>