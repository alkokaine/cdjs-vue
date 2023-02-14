<template>
  <cd-list-base class="container" :get="url" :collection="loaded" key-field="href" list-class="list-unstyled">
    <input slot="header" v-model.lazy="url">
    <cd-get-list slot-scope="{ row }" :get="row.href" :collection="row.links" key-field="href" list-class="list-unstyled row row-cols-6" row-class="border border-1 m-3 p-3" :resolve-result="resolveLinks" :on-error="onError" :error="error">
      <div :id="row.innerText" slot="header">{{ row.href }}</div>
      <notice-file class="my-auto" slot-scope="{ row }" :file="row"></notice-file>  
    </cd-get-list>
    <cd-list-base slot="footer" :collection="pages" key-field="href" list-class="list-unstyled row">
      <template slot-scope="{ row }">
        <template v-if="isLoaded(row)">
          <a :href="rowHref(row)">{{ row.innerHTML }}</a>
        </template>
        <template v-else>
          <button class="btn btn-link btn-sm" v-on:click="getPage($event, { row })">
            {{ row.innerHTML }}
          </button>
        </template>
      </template>
    </cd-list-base>
    <div slot="error">
      {{ error }}
    </div>
  </cd-list-base>
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
      error: AxiosError,
      loaded: [{ innerText: '1', innerHTML: '1', href: '/mil/structure/forces/hydrographic/esim.htm', links: [] }]
    }
  },
  computed: {
    rowHref () {
      return (row) => {
        return `#${row.innerText}`
      }
    },
    isLoaded ({ loaded }) {
      return ({ innerHTML }) => loaded.findIndex(l => l.innerHTML === innerHTML) >= 0
    },
    currentPage ({ loaded }) {
      return loaded.length - 1
    },
    resolveLinks ({ currentPage, loaded }) {
      const list = this
      return (response) => {
        const doc = domParser.parseFromString(response.data, 'text/html')
        const hrefs = Array.from(doc.documentElement.querySelectorAll('a').values())
        loaded[currentPage].links = hrefs
          .filter(a => a.href.endsWith('pdf'))
          .map(a => ({ href: a.href, innerHTML: a.innerHTML.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil'), innerText: a.innerText }))
        const _pages = hrefs.filter(a => (a.classList.contains('pagenava') || a.classList.contains('pagenav') || a.classList.contains('dotted')) && a.href.indexOf('esim') >= 0)
          .reduce((r, i) => {
            r[i.href] = r[i.href] || [];
            r[i.href].push(i)
            return r
          } , Object.create(null))
        list.pages = list.loaded.concat(Object.keys(_pages)
          .map(p => _pages[p].pop())
          .map(p => ({
            innerHTML: p.innerHTML.trim(),
            innerText: p.innerText.trim(),
            href: p.href.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil'),
            params: Object.fromEntries((new URL(p.href)).searchParams.entries()),
            links: []
          })).filter(p => p.params.f !== undefined))
        // this.pages = (((Object.keys(_pages)
        //   .map(p => _pages[p].pop()))
        //   .map(p => ({
        //     innerHTML: p.innerHTML.trim(),
        //     href: p.href.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil'),
        //     params: Object.fromEntries((new URL(p.href)).searchParams.entries()),
        //     links: []
        //   })))
        //   .filter(p => p.params.f !== undefined))
      }
    }
  },
  watch: {
  },
  methods: {
    // resolveLinks (response) {
    //   const list = this
    //     const doc = domParser.parseFromString(response.data, "text/html");
    //     const nodes = doc.documentElement.querySelectorAll('a')
    //     const hrefs = Array.from(nodes.values())
    //     this.links.push(...((hrefs.filter(a => a.href.endsWith('pdf'))
    //       .map(a => ({ href: a.href, innerHTML: a.innerHTML, innerText: a.innerText })))))
    //     const _pages = hrefs.filter(a => (a.classList.contains('pagenava') || a.classList.contains('pagenav') || a.classList.contains('dotted')) && a.href.indexOf('esim') >= 0)
    //       .reduce((r, i) => {
    //         r[i.href] = r[i.href] || [];
    //         r[i.href].push(i)
    //         return r
    //       } , Object.create(null))
    //     this.pages = (((Object.keys(_pages)
    //       .map(p => _pages[p].pop()))
    //       .map(p => ({
    //         innerHTML: p.innerHTML.trim(),
    //         href: p.href,
    //         params: Object.fromEntries((new URL(p.href)).searchParams.entries())
    //       })))
    //       .filter(p => p.params.f !== undefined))
    // },
    onError (error, config) {
        this.error = error
    },
    getPage (event, { row }) {
      this.loaded.push(row)
      // this.url = row.href.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil')
    }
  }
}
</script>

<style>

</style>