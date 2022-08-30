<template>
  <div class="cd-form">
    <slot name="header"></slot>
    <el-form :model="formobject" size="mini" ref="innerform" class="cd-form--content" :class="formclass" :rules="rules" @submit.native.prevent>
      <cd-fieldset class="cd-fieldset--root container" :descriptor="descriptor" :payload="formobject">
        <el-form-item class="cd-form-item--wrap mb-0" slot-scope="{ property }">
          <cd-cell :property="property" :value="formobject[property.datafield]"></cd-cell>
        </el-form-item>
      </cd-fieldset>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import decorator from '@/common/property-decorator'
import CDFieldset from './cd-fieldset.vue'
import CDCell from './cd-cell.vue'
import { Form, FormItem } from 'element-ui'
export default {
  name: 'cd-form',
  components: {
    'cd-fieldset': CDFieldset,
    'cd-cell': CDCell,
    'el-form': Form,
    'el-form-item': FormItem
  },
  props: {
    descriptor: { type: Array, required: true },
    payload: { type: Object, required: true },
    sync: { type: Boolean, default: false },
    formclass: { type: [Array, Object, String] },
    rules: { type: Array }
  },
  data (form) {
    return {
      formobject: form.sync ? form.payload : structuredClone(form.payload)
    }
  },
  computed: {
    hasDescriptor () {
      return (property, index) => decorator.hasDescriptor(property)
    },
    isPropertyVisible () {
      const payload = this.formobject
      return (property, index) => decorator.isPropertyVisible(property, payload, index)
    }
  }
}
</script>

<style>
  .cd-label {
    font-weight: bold;
    margin: unset;
  }
</style>