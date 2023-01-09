<template>
  <cd-list-base :is-loading="isLoading" 
    :collection="collection" :key-field="keyField"
    :list-class="['position-relative w-auto', listClass]" 
    :row-class="[ { 'text-muted': hasError }, rowClass]">
    <template v-if="$slots.header" slot="header">
      <slot name="header"></slot>
    </template>
    <template slot-scope="{ row, index }">
      <slot :row="row" :index="index"></slot>
    </template>
    <li v-if="error.code" slot="pre" class="error-content position-absolute mx-auto">
      <slot name="error" :error="error" :config="config" :fetch="loadData">
        <!-- <div class="error-info position-relative mx-auto p-3">
          <a href="#">
            <cd-props :payload="error" :descriptor="errorDescriptor" v-on:click.native="loadData(config)">
              <span slot-scope="{ value }">{{ value }}</span>
            </cd-props>
          </a>
        </div> -->
      </slot>
    </li>
    <template slot="footer">
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
  name: 'cd-get-list',
  mixins: [collectionBase, collectionDecorator, collection],
  components: {
    'cd-list-base': CDListBase,
  },
  props: {
  },
  methods: {
  },
  data (list) {
    return {
    }
  }
}
</script>

<style>
  .error-content {
    position: absolute;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    transform: translateY(-20%)
  }
  .error-info {
    top: 50%;
    background-color: white!important;;
    color: black;
    max-width: min-content;
    box-shadow: 0 0 30px 10px black;
  }
  .error-content > * {
    color: inherit;
    background-color: inherit;
  }
</style>