<template>
  <cd-list-base :is-loading="isLoading" :collection="collection" :key-field="keyField" :on-before="onBeforeGet" :on-after="onAfterGet">
    <template v-if="$slots.header" slot="header">
      <slot name="header"></slot>
    </template>
    <template slot-scope="{ row, index }">
      <slot :row="row" :index="index"></slot>
    </template>
    <template v-if="$slots.footer" slot="footer">
      <slot name="footer"></slot>
    </template>
  </cd-list-base>
</template>

<script>

import CDListBase from '@/components/cd-list-base.vue'
import collectionBase from '@/common/collection-base'
import collectionDecorator from '@/common/collection-decorator'
import collection from '@/common/collection'
export default {
  mixins: [collectionBase, collectionDecorator, collection],
  components: {
    'cd-list-base': CDListBase
  },
  props: {
  },
  methods: {
    onBeforeGet (request, config) {
      this.inProgress = true
      return request
    },
    onAfterGet (response, config) {
      this.inProgress = false
      return response
    }
  },
  data (list) {
    return {
      inProgress: list.isLoading
    }
  }
}
</script>

<style>

</style>