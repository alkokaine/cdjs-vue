<template>
  <cd-props class="p-2 text-start" :descriptor="descriptor" :payload="file">
    <div class="file-info px-2" slot="header">
      <div v-if="progress" class="download-progress">
        {{ progress }}
      </div>
      <div v-if="!hasBlob" class="get-file-prompt">
        <button class="btn btn-sm btn-link" v-on:click="getfile($event, { file, content })">Получить</button>
      </div>
    </div>
    <div class="w-auto text-wrap" slot-scope="{ value }">{{ value }}</div>
    <cd-props v-if="hasBlob" slot="content" :payload="blob" :descriptor="blobDescriptor">
      <span class="blob-property" slot-scope="{ value, property }">
        <template v-if="property.format">
          {{ property.format(value) }}
        </template>
        <template v-else>
          {{ value }}
        </template>
      </span>
    </cd-props>
  </cd-props>
</template>
<script>
  import CDProps from '@/components/cd-props.vue'
  import axios, { AxiosError } from 'axios'
  export default {
    name: 'notice-file',
    props: {
      file: { type: Object, required: true },
      format: { type: Function }
    },
    components: {
      'cd-props': CDProps
    },
    data (nfile) {
      return {
        progress: 0,
        content: {
          progress: 0,
          blob: Object,
          error: AxiosError
        },
        blobDescriptor: [
          {
            datafield: 'type'
          },
          {
            datafield: 'size',
            format: nfile.format
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
      hasBlob ({ content }) {
        return content.blob.type !== undefined
      }
    },
    methods: {
      onDownloadProgress (progress, content) {
        setTimeout(() => {
          content.progress = Math.round((progress.loaded * 100) / progress.total)
        }, 750)
      },
      getfile (event, { file, content}) {
        const { href } = file
        const _href = href.startsWith('https:') 
          ? href.replace('https://structure.mil.ru', '/mil') 
          : href.replace('http://structure.mil.ru', '/mil')
        axios.get(_href, { responseType: 'blob', onDownloadProgress: (progress) => file.onDownloadProgress(progress, content) }).then(response => {
          content.blob = { type : response.data.type, size: response.data.size }
        }).catch(err => {
          content.progress = 0,
          file.error = err
        })
      }
    }
  }
</script>