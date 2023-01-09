<template>
  <cd-props v-loading="isLoading" :payload="country" :descriptor="descriptor">
    <div slot-scope="{ property, value }">
      <template v-if="property.image"></template>
      <div v-if="property.image" class="country-flag--wrap">
        <img :sync="true" :class="property.class" :src="value"/>
      </div>
      <currency-row v-else-if="property.currencies" :currencies="value">
        <label class="country-property--name">{{ property.text }}:</label>
      </currency-row>
      <template v-else-if="property.regions && !isLoading" >
        <regions-row :regions="value" :country="country.code" :total="country.numRegions" :resolve-regions="resolveRegions">
          <label class="country-property-name">{{ property.text }}:</label>
        </regions-row>
      </template>
      <div v-else class="country-detail">
        <label class="country-property--name">{{ property.text }}:</label>
        <span class="country-property--value ps-2">{{ value }}</span>
      </div>
    </div>
  </cd-props>
</template>

<script>
import Vue from 'vue'
import CDProps from '@/components/cd-props.vue'
import CurrencyRow from './currency-row.vue'
import RegionsRow from './regions-row.vue'
export default {
  name: 'country-details',
  components: {
    'cd-props': CDProps,
    'currency-row': CurrencyRow,
    'regions-row': RegionsRow
  },
  props: {
    country: { type: Object, required: true }
  },
  data (details) {
    return {
      descriptor: [
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
            },
            {
              datafield: 'regions',
              text: 'regions',
              regions: true
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
  computed: {
    isLoading ({ country }) {
      return country === undefined 
    },
    resolveRegions ({ country }) {
      return (response) => {
        if (country.regions !== undefined && Array.isArray(country.regions)) {
          country.regions.push(response.data.data)
        } else {
          Vue.set(country, 'regions', response.data.data)
        }
      }
    }
  },
}
</script>

<style>

</style>