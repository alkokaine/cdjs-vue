<template>
  <div class="cd-list-filter">
    <cd-list :collection="collection" :payload="payload" key-field="code" :resolve-result="resolveResult" :remote-method="getData">
      <cd-form slot="header" :payload="payload" :descriptor="descriptor" :sync="true"></cd-form>
      <div class="country" slot-scope="{ row }">
        <span>{{ row }}</span><el-button type="text" size="mini" @click="showDetails(row)">Дополнительно</el-button>
        <cd-props v-if="isdetails(row)" :payload="details" :descriptor="countrydetails">
          <div class="country-detail" slot-scope="{ property, value }">
            <div class="country-flag" v-if="isimage(property)">
              <img v-if="isimage(property)" :src="value"/>
            </div>
            <div v-else>
              <span class="fw-bold">{{ property.text }}: </span> <span>{{ value }}</span>
            </div>
          </div>
        </cd-props>
      </div>
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
import CDProps from '@/components/cd-props'
import AxiosError from 'axios/lib/core/AxiosError'

export default {
  name: 'cd-list-filter',
  components: {
    'cd-list': CDList,
    'cd-form': CDForm,
    'cd-props': CDProps
  },
  data (view) {
    return {
        collection: Array,
        payload: {
          limit: 10,
          namePrefix: ''
        },
        error: AxiosError,
        detailserror: AxiosError,
        details: Object,
        total: Number,
        descriptor: [
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
        ],
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
        ]
    }
  },
  computed: {
    isdetails ({ details }) {
      return ({ code }) => code === details.code
    },
    isimage () {
      return ({ datafield }) => datafield === 'flagImageUri'
    }
  },
  methods: {
    showDetails ({ code }) {
      const list = this
      fetchData({
        adapter,
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${String(code).toUpperCase()}`,
        method: 'get',
        before (config) {
          list.detailserror = AxiosError
          return config
        },
        error (reason) {
          list.detailserror = reason
        },
        headers: {
          'X-RapidAPI-Key': '0d6efbd8a7msh8fcd0fa4c7e36a4p15464ejsn34c8169d4000',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }).then(response => {
        list.details = response.data.data
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