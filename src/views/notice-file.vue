<template>
  <cd-props class="p-2 text-start" :descriptor="descriptor" :payload="file">
    <div class="file-info px-2" slot="header">
      <div class="download-progress">
        <slot name="progress" :content="content" :loaded="hasBlob"></slot>
      </div>
      <div v-if="!hasBlob" class="get-file-prompt">
        <button class="btn btn-sm btn-link" v-on:click="getFile($event, { file, content, onDownloadProgress })">Получить</button>
      </div>
    </div>
    <div class="w-auto text-wrap" slot-scope="{ value }">{{ value }}</div>
    <cd-props v-if="hasBlob" slot="content" :payload="content.blob" :descriptor="blobDescriptor"></cd-props>
  </cd-props>
</template>
<script>
  import CDProps from '@/components/cd-props.vue'
  import { AxiosError } from 'axios'
  export default {
    name: 'notice-file',
    props: {
      file: { type: Object, required: true },
      format: { type: Function },
      onDownloadProgress: { type: Function, params: '(progress, content) => void' },
      getFile: { 
        type: Function, 
        params: '($event, { file, content, onDownloadProgress }) => void', 
        description: 'file -- объект, содержащий href файла, content -- объект, содержащий % загрузки файла, его blob (type, size... )' }
    },
    components: {
      'cd-props': CDProps
    },
    data (nfile) {
      return {
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
      },
      progress ({ content }) {
        return content.progress
      }
    },
  }
</script>