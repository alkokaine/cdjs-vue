<template>
  <div class="cd-list-view">
    <cd-list get="https://wft-geo-db.p.rapidapi.com/v1/geo/countries" :payload="payload" :on-error="onError"
      :resolve-result="resolveCollection" key-field="'wikiDataId'" :collection="collection" :headers="headers"
      :resolve-payload="resolvePayload">
      <div slot="header">
        <input type="range" :min="1" :max="10" v-model.lazy="limit"/>
        <input type="text" v-model.lazy="namePrefix"/>
      </div>
      <span slot-scope="{ row }">{{ row }}</span>
      <div slot="footer">
        <a v-if="error.code" href="#">{{ error.code }} {{ error.message }}</a>
        <el-pagination :current-page="currentPage" v-on:current-change="onPageChange($event)" :total="total"></el-pagination>
      </div>
    </cd-list>
  </div>
</template>

<script>
import CDList from '@/components/cd-list.vue'
import keys from '@/../keys'
import { AxiosError } from 'axios'
export default {
  components: {
    'cd-list': CDList
  },
  data (view) {
    return {
      currentPage: 1,
      collection: [],
      limit: 10,
      namePrefix: '',
      headers: keys.geo,
      error: AxiosError,
      total: 0,
    }
  },
  computed: {
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
    onError (params, error) {
      console.error(params)
      console.error(error)
      this.error = error
    }
  }
}
</script>

<style>

</style>