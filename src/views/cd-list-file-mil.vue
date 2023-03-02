<template>
  <cd-list-base class="container mb-5" :collection="pagesLoaded" key-field="href" list-class="list-unstyled">
    <cd-get-list class="px-4" slot-scope="{ row }" :get="row.href" :collection="row.links" key-field="href" list-class="list-unstyled row row-cols-6" 
      row-class="border border-1 m-2" :resolve-result="resolveLinks" :on-error="onError" :error="error">
      <div :id="row.innerText" slot="header">Страница {{ row.innerText }}</div>
      <notice-file class="m-1" slot-scope="{ row }" :on-download-progress="onDownloadProgress" :file="row" :format="bytes" :get-file="getFile">
        <div slot="progress" slot-scope="{ content, loaded }">
          <div v-if="!loaded">
            <progress v-if="!loaded" :value="content.progress"></progress>
            <span>{{ content.progress }}</span>
          </div>
          <span v-else>готов</span>
        </div>
      </notice-file>  
    </cd-get-list>
    <cd-list-base slot="footer" :collection="pages" class="position-relative" key-field="href" list-class="position-fixed bottom-0 mt-2 start-50 translate-middle-x list-unstyled  pagination shadow-sm rounded" row-class="page-item w-auto p-0">
      <template slot-scope="{ row }">
        <template v-if="isLoaded(row)">
          <a class="page-link" :href="rowHref(row)">{{ row.innerHTML }}</a>
        </template>
        <template v-else>
          <button class="page-link" v-on:click="getPage($event, { row, pagesLoaded })">
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
import axios from 'axios'
export default {
  name: 'file-list',
  components: {
    'cd-get-list': CDGetList,
    'cd-list-base': CDListBase,
    'notice-file': NoticeFile
  },
  props: {
    url: { type: String, default: '/mil/structure/forces/hydrographic/esim.htm' }
  },
  data ({ url }) {
    return {
      hrefs: [],
      error: AxiosError,
      pagesLoaded: [{ innerText: '1', innerHTML: '1', href: url, links: [] }]
    }
  },
  computed: {
    rowHref: () => ((row) => `#${row.innerText}`),
    currentPage: ({ pagesLoaded }) => pagesLoaded.length - 1,
    current: ({ currentPage, pagesLoaded }) => pagesLoaded[currentPage],
    isLoaded: ({ pagesLoaded }) => (({ innerHTML }) => (pagesLoaded.findIndex(l => l.innerHTML === innerHTML) >= 0)),
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
        current.links = list.hrefs
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
      onDownloadProgress (progress, content) {
        setTimeout(() => {
          content.progress = Math.round((progress.loaded * 100) / progress.total)
        }, 350 )
      },
      getFile (event, { file, content, onDownloadProgress }) {
        const { href } = file
        const _href = href.startsWith('https:') 
          ? href.replace('https://structure.mil.ru', '/mil') 
          : href.replace('http://structure.mil.ru', '/mil')
        axios.get(_href, { responseType: 'blob', onDownloadProgress: (progress) => onDownloadProgress(progress, content) })
        .then(response => { content.blob = { type : response.data.type, size: response.data.size } })
        .catch(err => { 
          content.progress = 0
          file.error = err
        })
      },
      onError (error, config) {
        this.error = error
      },
      getPage (event, { row, pagesLoaded }) {
        pagesLoaded.push(row)
      },
      bytes: (value) => getBytes(value, ' ')

    },

  }

</script>