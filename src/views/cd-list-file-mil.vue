<template>
  <cd-get-list :get="url" :resolve-result="resolveLinks" :collection="files" :on-error="onError" key-field="file_id">
    <input v-model.lazy="url">
  </cd-get-list>
</template>

<script>
import CDGetList from '@/components/cd-get-list'
export default {
  name: 'file-list',
  components: {
    'cd-get-list': CDGetList
  },
  data (view) {
    return {
        url: '/mil/structure/forces/hydrographic/esim.htm',
        files: []
    }
  },
  methods: {
    resolveLinks (response) {
        var res = response.data.match(/<a(.*?pdf.*)<\/a>/g).map(a => ({
          href: a.match(/(?=")([^'].+?)'/g),
          text: a.match(/>([^<>].*?)</g)
        }))

        console.log(res)
    },
    onError (error, config) {
        console.error(error)
    }
  }
}
</script>

<style>

</style>