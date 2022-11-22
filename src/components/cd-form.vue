<template>
  <div class="cd-form mt-4">
    <slot name="header" :payload="formobject"></slot>
    <el-form :model="formobject" ref="innerform" class="cd-form--content" :class="formClass" :rules="rules" @submit.native.prevent>
      <cd-fieldset class="cd-fieldset--root container" :descriptor="descriptor" :payload="formobject" :is-disabled="resolveDisabled" :fieldConfig="fieldConfig">
        <el-form-item class="text-start cd-form-item--wrap mb-0" slot-scope="{ property, config }" :prop="property.datafield" :rules="resolveRules(property)">
          <slot :model="formobject" :property="property">
            <span slot="label" class="fw-bold cd-form--label" :class="labelClass(property)">{{ property.text }}</span>
            <cd-cell :fetch="fetch(property)" :property="property" 
              v-model="formobject[property.datafield]" 
              :option-disabled="isOptionDisabled" 
              :input="config" :class="[inputClass(property)]"
              :payload="resolvePayload(property)"
              :on-select="onSelect(property)"
              :on-change="onChange(property)"
              :on-input="onInput(property)">
            </cd-cell>
          </slot>
        </el-form-item>
      </cd-fieldset>
    </el-form>
    <slot name="footer" :payload="formobject"></slot>
    <div v-if="showControls" class="cd-form--buttons">
      <slot name="controls">
        <button class="el-button" type="submit" @click="validate(formobject, onSubmit)">Сохранить</button>
        <button class="el-button" type="reset" @click="onReset">Отменить</button>
      </slot>
    </div>
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
    descriptor: { type: Array, required: true, description: 'Свойства объекта: перечень дескрипторов' },
    payload: { type: Object, required: true, description: 'Объект, свойства которого показаны на элементе <fieldset>' },
    sync: { type: Boolean, default: false, description: 'Синхронизировать ли значения полей формы со значениями свойств объекта payload' },
    formClass: { type: [Array, Object, String], description: 'CSS класс для элемента <form>' },
    showControls: { type: Boolean, default: false, description: 'Показывать или нет кнопки отмены/отправки' },
    onSubmit: { type: Function, description: 'Функция выполнится при сабмите формы' },
    onReset: { type: Function, description: 'Функция выполнится при отмене изменений формы' },
    rules: { type: Array, description: 'Правила для валидации' }
  },
  data (form) {
    return {
      formobject: form.sync ? form.payload : structuredClone(form.payload)
    }
  },
  watch: {
    payload: {
      handler (newvalue) {
        this.formobject = this.sync ? newvalue : structuredClone(newvalue)
      }
    }
  },
  computed: {
    inputClass ({ formobject }) {
      return ({ inputClass }) => {
        if (inputClass !== undefined && typeof inputClass === 'function') inputClass(formobject)
        return inputClass
      }
    },
    onSelect ({ formobject }) {
      return ({ onSelect }) => {
        if (onSelect !== undefined && typeof onSelect === 'function') onSelect(formobject)
      }
    },
    onChange ({ formobject }) {
      return ({ onChange }) => {
        if (onChange !== undefined && typeof onChange === 'function') onChange(formobject)
      }
    },
    onInput ({ formobject }) {
      return ({ onInput }) => {
        if (onInput !== undefined && typeof onInput === 'function' ) onInput(formobject)
      }
    },
    fetch ({ formobject }) {
      return (property) => (query, callback) => {
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
      }
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
    labelClass ({ formobject }) {
      return ({ labelClass }) => {
        if (typeof labelClass === 'function') return labelClass(formobject)
        return labelClass
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
    validate (payload, onSubmit) {
      onSubmit(payload)
    }
  }
}
</script>

<style>
  .el-form-item__content {
    line-height: unset!important;
  }
  .el-form-item__label {
    line-height: unset!important;
  }
  .cd-form-item--wrap {
  }
</style>