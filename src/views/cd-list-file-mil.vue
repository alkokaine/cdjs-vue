<template>
  <cd-list-base class="container mb-5" :collection="pagesLoaded" key-field="href" list-class="list-unstyled">
    <cd-get-list class="px-4" slot-scope="{ row }" :get="row.href" :collection="row.links" key-field="href" list-class="list-unstyled row row-cols-6" 
      row-class="border border-1 m-2" :resolve-result="resolveLinks" :on-error="onError" :error="error">
      <div :id="row.innerText" slot="header">Страница {{ row.innerText }}</div>
      <notice-file class="m-1" slot-scope="{ row }" :file="row" :format="bytes"></notice-file>  
    </cd-get-list>
    <cd-list-base slot="footer" :collection="pages" class="position-fixed bottom-0 border border-1 mt-2 bg-light" key-field="href" list-class="list-unstyled row" row-class="w-auto">
      <template slot-scope="{ row }">
        <template v-if="isLoaded(row)">
          <a class="btn btn-link btn-sm" :href="rowHref(row)">{{ row.innerHTML }}</a>
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
const replaceMil = (text) => (text.replace('http://', 'https://').replace('https://structure.mil.ru', '/mil'))
const getBytes = function prettySize(bytes, separator = '', postFix = '') {
    if (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.min(parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10), sizes.length - 1);
        return `${(bytes / (1024 ** i)).toFixed(i ? 1 : 0)}${separator}${sizes[i]}${postFix}`;
    }
    return 'n/a';
}
const domParser = new DOMParser()
export default {
  name: 'file-list',
  components: {
    'cd-get-list': CDGetList,
    'cd-list-base': CDListBase,
    'notice-file': NoticeFile
  },
  data () {
    return {
      url: '/mil/structure/forces/hydrographic/esim.htm',
      hrefs: [],
      error: AxiosError,
      pagesLoaded: [{ innerText: '1', innerHTML: '1', href: '/mil/structure/forces/hydrographic/esim.htm', links: [] }]
    }
  },
  computed: {
    rowHref: () => ((row) => `#${row.innerText}`),
    isLoaded: ({ pagesLoaded }) => (({ innerHTML }) => (pagesLoaded.findIndex(l => l.innerHTML === innerHTML) >= 0)),
    currentPage: ({ pagesLoaded }) => pagesLoaded.length - 1,
    current: ({ currentPage, pagesLoaded }) => pagesLoaded[currentPage],
    reduced: ({ hrefs }) => ((hrefs
        .filter(a => (a.classList.contains('pagenava') || 
                            a.classList.contains('pagenav') || 
                            a.classList.contains('dotted')) && 
                            a.href.indexOf('esim') >= 0))
        .reduce((r, i) => {
          r[i.href] = r[i.href] || [];
          r[i.href].push(i)
          return r
        }, Object.create(null))),
    pagesResolved: ({ reduced, pagesLoaded }) => (Array.from(Object.keys(reduced)
        .map(key => reduced[key].pop())
        .map(a => ({
          innerHTML: a.innerHTML.trim(),
          innerText: a.innerText.trim(),
          href: replaceMil(a.href),
          params: Object.fromEntries((new URL(a.href)).searchParams.entries()),
          links: []
        }))
        .filter(link => pagesLoaded.findIndex(l => l.innerText === link.innerText) < 0))
        .filter(p => p.params.f !== undefined)),
    pages: ({ pagesResolved, pagesLoaded }) => (pagesLoaded.concat(pagesResolved)),
    resolveLinks ({ current }) {
      const list = this
      return (response) => {
        list.hrefs = Array.from(domParser.parseFromString(response.data, 'text/html').documentElement.querySelectorAll('a').values())
        current.links = this.hrefs
          .filter(a => a.href.endsWith('pdf'))
          .map(a => ({ 
            href: a.href, 
            innerHTML: replaceMil(a.innerHTML), 
            innerText: a.innerText 
          }))
      }
    }
  },
  methods: {
    onError (error, config) {
        this.error = error
    },
    getPage (event, { row }) {
      this.pagesLoaded.push(row)
    },
    bytes: (value) => getBytes(value, ' ')
  }
}
</script>