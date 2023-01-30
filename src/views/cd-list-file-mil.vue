<template>
  <cd-get-list :get="url" :resolve-result="resolveLinks" :collection="links" :on-error="onError" key-field="href">
    <input slot="header" v-model.lazy="url">
    <div slot-scope="{ row }">
      {{ row.innerHTML }}
      {{ row.href }}
    </div>
    <cd-list-base slot="footer" :collection="pages" key-field="href">
      <div slot-scope="{ row }">
        {{ row.href }}
      </div>
    </cd-list-base>
  </cd-get-list>
</template>

<script>
import CDGetList from '@/components/cd-get-list'
import CDListBase from '@/components/cd-list-base.vue'
const domParser = new DOMParser()
export default {
  name: 'file-list',
  components: {
    'cd-get-list': CDGetList,
    'cd-list-base': CDListBase
  },
  data (view) {
    return {
      url: '/mil/structure/forces/hydrographic/esim.htm',
      links: [],
      pages: []
    }
  },
  methods: {
    resolveLinks (response) {
        const doc = domParser.parseFromString(response.data, "text/html");
        const hrefs = Array.from(doc.documentElement.querySelectorAll('a').values())
        this.links = hrefs.filter(a => a.href.endsWith('pdf'))
        this.pages = hrefs.filter(a => a.href.indexOf('esim') >= 0)
    },
    onError (error, config) {
        console.error(error)
    }
  }
}
</script>

<style>

</style>