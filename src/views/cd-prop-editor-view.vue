<template>
  <cd-prop-editor :payload="current">
    <cd-rec-list class="container" :collection="descriptor" key-field="datafield" recursive="descriptor">
      <cd-prop-editor slot="header" :payload="formSetting" :descriptor="formProps">
        <cd-list class="container" :collection="formProps" key-field="datafield" list-class="list-unstyled">
          <div slot-scope="{ row }">{{ row }}</div>
        </cd-list>
      </cd-prop-editor>
      <div slot-scope="{ li }" v-on:click.capture="setCurrent($event, li)">{{ li.datafield }}</div>
    </cd-rec-list>
  </cd-prop-editor>
</template>

<script>
import CDPropEditor from '@/components/cd-prop-editor.vue'
import descriptor from '@/assets/descriptors'
import CDList from '@/components/cd-list.vue'
import CDForm from '@/components/cd-form.vue'
import CDRecList from '@/components/cd-rec-list.vue'
import utils from '@/common/cd-vue-utils'
export default {
  components: {
    'cd-prop-editor': CDPropEditor,
    'cd-rec-list': CDRecList,
    'cd-list': CDList
  },
  data (view) {
    var props = utils.componentProperties(CDForm)
    return {
      descriptor: descriptor.objectDescriptor,
      current: {},
      formSetting: Object.assign({}, ...props.map( m => Object.defineProperty({}, m.name, { value: '' }))),
      formProps: props.map(m => ({ datafield: m.name, text: m.name }))
    }
  },
  methods: {
    setCurrent (event, li) {
      this.current = li
    }
  }
}
</script>

<style>

</style>