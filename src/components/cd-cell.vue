<template>
  <div class="cd-cell" :class="cellClassResolved">
    <div class="cd-field--input" :class="[{ 'w-100': !input.checkbox, 'cd-checkbox': input.checkbox }]">
      <template v-if="input.number">
        <input type="number" :min="property.min" :max="property.max" :value="value"/>
      </template>
      <template v-else-if="input.select">
        <el-select :placeholder="property.placeholder" :value="value">
          <cd-list class="cd-select--options" :collection="collection" :key-field="property.valuekey" :list-class="['list-unstyled', property.listClass]" rowClass="cd-option">
            <el-option slot-scope="{ row }" :value="row[property.keyfield]" :label="row[property.labelkey]" :disabled="optionDisabled(row, property.isdisabled)">
              <template v-if="property.slotdescriptor">
                <cd-props :descriptor="property.slotdescriptor" :payload="row"></cd-props>
              </template>
              <template v-else>
                {{ row[property.labelkey] }}
              </template>
            </el-option>
          </cd-list>
        </el-select>
      </template>
      <template v-else-if="input.autocomplete">
        <el-autocomplete :value="value" :fetch-suggestions="fetch"></el-autocomplete>
      </template>
      <template v-else-if="input.textarea">
        <el-input type="textarea" :value="value"/>
      </template>
      <template v-else-if="input.checkbox">
        <el-checkbox :value="value"></el-checkbox>
      </template>
      <template v-else-if="input.date">
        <el-date-picker :value="value"></el-date-picker>
      </template>
      <template v-else-if="input.datetime">
        <el-date-picker type="datetime" :value="value"></el-date-picker>
      </template>
      <template v-else-if="input.email">
        <input type="email" :value="value"/>
      </template>
      <template v-else-if="input.radio"></template>
      <template v-else-if="input.range">
        <input type="range" :value="value"/>
      </template>
      <template v-else-if="input.tel">
        <input type="tel" :value="value"/>
      </template>
      <template v-else-if="input.url">
        <input type="url" :value="value"/>
      </template>
      <template v-else-if="input.file">
        <input type="file" :value="value"/>
      </template>
      <template v-else>
        <el-input type="text" :value="value"/>
      </template>
    </div>
  </div>
</template>
<script>
  import CDList from './cd-list.vue'
  export default {
    name: 'cd-cell',
    props: {
      cellClass: { type: [Array, Object, String, Function] },
      property: { type: Object, default: Object },
      value: { type: [Array, String, Number, Boolean, Date] },
      optionDisabled: {
        type: Function,
        default: function (option, isdisabled) {
          if (isdisabled === undefined) return false
          if (typeof isdisabled === 'boolean') return isdisabled
          if (typeof isdisabled === 'function') {
            isdisabled(option)
          }
        }
      },
    },
    components: {
      'cd-list': CDList
    },
    data (cell) {
      const input = cell.property.input
      return {
        collection: Array,
        input: {
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
        }
      }
    },

    computed: {
      cellClassResolved () {
        return 'cd-cell--resolved'
      }
    },
    methods: {
      fetch (query, callback) {
        callback([])
      }
    }
  }
</script>
<style>
  .el-select-dropdown__item {
    height: unset!important;
    line-height: unset!important;
  }
  .cd-autocomplete--option {
    white-space: normal;
    line-height: 1rem;
  }
</style>
<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .cd-slider {
    width: 100%;
  }
</style>