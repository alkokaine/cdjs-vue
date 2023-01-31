<template>
  <cd-props class="p-2" :descriptor="descriptor" :payload="file">
    <div class="file-info" slot="header">
      <div v-if="progress" class="download-progress">
        {{ progress }}
      </div>
      <div v-if="!hasBlob" class="get-file-prompt">
        <button class="btn btn-sm btn-link" v-on:click="getfile($event, file)">Получить</button>
      </div>
    </div>
    <div class="w-auto text-wrap" slot-scope="{ value }">{{ value }}</div>
    <cd-props v-if="hasBlob" slot="content" :payload="blob" :descriptor="blobDescriptor">
      <span class="blob-property" slot-scope="{ value }">{{ value }}</span>
    </cd-props>
  </cd-props>
</template>
<script>
  import CDProps from '@/components/cd-props.vue'
  import axios, { AxiosError } from 'axios'
  export default {
    name: 'notice-file',
    props: {
      file: { type: Object, required: true }
    },
    components: {
      'cd-props': CDProps
    },
    data (nfile) {
      return {
        progress: 0,
        blob: Object,
        error: AxiosError,
        blobDescriptor: [
          {
            datafield: 'type'
          },
          {
            datafield: 'size'
          }
        ],
        descriptor: [
          {
            datafield: 'innerHTML',            
          }
        ]
      }
    },
    computed: {
      hasBlob ({ blob }) {
        return blob.type !== undefined
      }
    },
    methods: {
      onDownloadProgress (progress) {
        setTimeout(() => {
          this.progress = Math.round((progress.loaded * 100) / progress.total)
        }, 350)
      },
      getfile (event, { href }) {
        const file = this
        const _href = href.startsWith('https:') 
          ? href.replace('https://structure.mil.ru', '/mil') 
          : href.replace('http://structure.mil.ru', '/mil')
        axios.get(_href, { responseType: 'blob', onDownloadProgress: file.onDownloadProgress }).then(response => {
          file.blob = { type : response.data.type, size: response.data.size }
        }).catch(err => {
          file.progress = 0,
          file.error = err
        })
      }
    }
  }
</script>