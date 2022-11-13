<template>
  <div class="cd-form mt-4">
    <slot name="header"></slot>
    <el-form :model="formobject" ref="innerform" class="cd-form--content" :class="formclass" :rules="rules" @submit.native.prevent>
      <cd-fieldset class="cd-fieldset--root container" :descriptor="descriptor" :payload="formobject" :is-disabled="resolveDisabled" :fieldConfig="fieldConfig">
        <el-form-item class="text-start cd-form-item--wrap mb-0 pt-2" slot-scope="{ property, config }" :prop="property.datafield" :rules="resolveRules(property)">
          <slot :model="formobject" :property="property">
            <span slot="label" class="fw-bold cd-form--label">{{ property.text }}</span>
            <cd-cell :fetch="fetch(property)" :property="property" v-model="formobject[property.datafield]" :option-disabled="isOptionDisabled" :input="config"
              :payload="resolvePayload(property)"></cd-cell>
          </slot>
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
import fetchData from '@/common/fetch-data'
export default {
  name: 'cd-form',
  components: {
    'cd-fieldset': CDFieldset,
    'cd-cell': CDCell
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
    fetch ({ formobject }) {
      return (property) => ((query, callback) => {
        if (property.values !== undefined && Array.isArray(property.values)) {
          callback(property.values)
        } else if (property.url) {
          fetchData({
            adapter: property.adapter,
            method: property.method,
            url: property.url,
            headers: property.headers,
            payload: property.resolvePayload !== undefined && typeof property.resolvePayload === 'function'
              ? (property.filterable ? property.resolvePayload(query, formobject) : property.resolvePayload(formobject))
              : query,
            timeout: property.timeout,
          }).then((response) => {
            property.resolveResult(response, callback)
          })
        }
      })
    },
    hasDescriptor () {
      return (property, index) => decorator.hasDescriptor(property)
    },
    isOptionDisabled ({ formobject }) {
      return (option, isdisabled) => {
        if (isdisabled === undefined) return false
        if (typeof isdisabled === 'boolean') return isdisabled
        if (typeof isdisabled === 'function') return isdisabled(option, formobject)
      }
    },
    resolveDisabled ({ formobject }) {
      return ({ isDisabled }) => {
        if (isDisabled === undefined) return false
        if (typeof isDisabled === 'boolean') return isDisabled
        if (typeof isDisabled === 'function') return isDisabled(formobject)
      }
    },
    resolveRules ({ formobject }) {
      return ({ rules }) => {
        if (rules === undefined) return []
        if (Array.isArray(rules)) return rules
        if (typeof rules === 'function') return rules(formobject)
      }
    },
    resolvePayload ({ formobject }) {
      return ({ resolvePayload }) => {
        if (typeof resolvePayload === 'function') return resolvePayload(formobject)
        return resolvePayload
      }
    },
    fieldConfig (vm) {
      return ({ input }) => ({
        select: input === 'select',
        autocomplete: input === 'autocomplete',
        number: ['number', 'money', 'amount'].includes(input),
        textarea: input === 'textarea',
        checkbox: input === 'checkbox',
        date: input === 'date',
        datetime: input === 'datetime',
        email: input === 'email',
        radio: input === 'radio',
        range: input === 'range',
        tel: input === 'tel',
        text: input === 'text' || input === undefined,
        url: input === 'url',
        file: input === 'file'
      })
    }
  },
  methods: {
  }
}
</script>

<style>
  .el-form-item__content {
    font-size: inherit!important;
    line-height: unset!important;
  }
  .el-form-item__label {
    text-align: left;
    line-height: unset!important;
  }
  .cd-form-item--wrap {
    display: block;
    width: auto;
  }
</style>