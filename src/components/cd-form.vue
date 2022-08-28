<template>
  <div class="cd-form">
    <slot name="header"></slot>
    <el-form :model="formobject" size="mini" ref="innerform" class="cd-form--content" :class="formclass" :rules="rules" @submit.native.prevent>
      <cd-fieldset :descriptor="descriptor" :payload="formobject">
        <el-form-item class="cd-form-item--wrap mb-0" slot-scope="{ property }">
          <p class="cd-label" slot="label">{{ property.text }}</p>
          <div class="cd-field--input">
            {{ formobject[property.datafield] }}
          </div>
        </el-form-item>
      </cd-fieldset>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import decorator from '@/common/property-decorator'
import CDFieldset from './cd-fieldset.vue'

export default {
  name: 'cd-form',
  components: {
    'cd-fieldset': CDFieldset
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
  .cd-form-item {
  }
  .cd-label {
    font-weight: bold;
    margin: unset;
  }
</style>