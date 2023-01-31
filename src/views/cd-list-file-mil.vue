<template>
  <cd-get-list class="container" :get="url" :resolve-result="resolveLinks" :collection="links" :on-error="onError" key-field="href" list-class="list-unstyled row row-cols-6" :error="error" row-class="border border-1 m-3 p-3">
    <input slot="header" v-model.lazy="url">
    <notice-file class="my-auto" slot-scope="{ row }" :file="row"></notice-file>
    <cd-list-base slot="footer" :collection="pages" key-field="href" list-class="list-unstyled row">
      <button class="btn btn-link btn-sm" slot-scope="{ row }" v-on:click="getPage($event, { row })">
        {{ row.innerHTML }}
      </button>
    </cd-list-base>
    <div slot="error">
      {{ error }}
    </div>
  </cd-get-list>
</template>

<script>
import CDGetList from '@/components/cd-get-list'
import CDListBase from '@/components/cd-list-base.vue'
import NoticeFile from './notice-file.vue'
import { AxiosError } from 'axios'
const domParser = new DOMParser()
export default {
  name: 'file-list',
  components: {
    'cd-get-list': CDGetList,
    'cd-list-base': CDListBase,
    'notice-file': NoticeFile
  },
  data (view) {
    return {
      url: '/mil/structure/forces/hydrographic/esim.htm',
      links: [],
      pages: [],
      error: AxiosError
    }
  },
  methods: {
    resolveLinks (response) {
        const doc = domParser.parseFromString(response.data, "text/html");
        const nodes = doc.documentElement.querySelectorAll('a')
        const hrefs = Array.from(nodes.values())
        this.links.push(...((hrefs.filter(a => a.href.endsWith('pdf'))
          .map(a => ({ href: a.href, innerHTML: a.innerHTML, innerText: a.innerText })))))
        const _pages = hrefs.filter(a => (a.classList.contains('pagenava') || a.classList.contains('pagenav') || a.classList.contains('dotted')) && a.href.indexOf('esim') >= 0)
          .reduce((r, i) => {
            r[i.href] = r[i.href] || [];
            r[i.href].push(i)
            return r
          } , Object.create(null))
        this.pages = (((Object.keys(_pages)
          .map(p => _pages[p].pop()))
          .map(p => ({
            innerHTML: p.innerHTML,
            href: p.href,
            params: Object.fromEntries((new URL(p.href)).searchParams.entries())
          })))
          .filter(p => p.params.f !== undefined))
    },
    onError (error, config) {
        this.error = error
    },
    getPage (event, { row }) {
      this.url = row.href.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil')
    }
  }
}
</script>

<style>

</style>