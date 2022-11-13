<template>
  <div class="cd-cell" :class="[cellClassResolved]">
    <template v-if="input.number">
      <input :placeholder="property.placeholder" type="number" class="el-input__inner" :min="property.min" :max="property.max" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else-if="input.select">
      <el-select class="cd-select" :placeholder="property.placeholder" :value="cellvalue" :disabled="disabled">
        <cd-list class="cd-select--options" :collection="collection" :key-field="property.valuekey" :list-class="['list-unstyled', property.listClass]" row-class="cd-option">
          <el-option slot-scope="{ row }" :value="row[property.keyfield]" :label="row[property.labelkey]" :disabled="optionDisabled(row, property.isdisabled)">
            <template v-if="property.slotdescriptor">
              <cd-props :descriptor="property.slotdescriptor" :payload="row">
                <div slot-scope="prop">{{ prop }}</div>
              </cd-props>
            </template>
            <template v-else>
              {{ row[property.labelkey] }}
            </template>
          </el-option>
        </cd-list>
      </el-select>
    </template>
    <template v-else-if="input.autocomplete">
      <el-autocomplete class="cd-autocomplete" :placeholder="property.placeholder" :value="cellvalue" :fetch-suggestions="fetch" :disabled="disabled">
        <div class="cd-autocomplete-item--wrap" slot-scope="{ item }">
          <cd-props v-if="property.slotdescriptor" class="cd-autocomplete--item" :descriptor="property.slotdescriptor" :payload="item">
            <div slot-scope="{ value }">{{ value }}</div>
          </cd-props>
          <span v-else>{{ item[property.labelkey] }}</span>
        </div>
      </el-autocomplete>
    </template>
    <template v-else-if="input.textarea">
      <el-input class="cd-input" type="textarea" :placeholder="property.placeholder" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else-if="input.checkbox">
      <el-checkbox class="cd-checkbox"  :value="cellvalue" :disabled="disabled"></el-checkbox>
    </template>
    <template v-else-if="input.date">
      <el-date-picker class="cd-date" :placeholder="property.placeholder" :value="cellvalue" :disabled="disabled"></el-date-picker>
    </template>
    <template v-else-if="input.datetime">
      <el-date-picker class="cd-date-time" :placeholder="property.placeholder" type="datetime" :value="cellvalue" :disabled="disabled"></el-date-picker>
    </template>
    <template v-else-if="input.email">
      <input class="el-input__inner" type="email" :placeholder="property.placeholder" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else-if="input.radio"></template>
    <template v-else-if="input.range">
      <el-slider class="cd-slider" :value="cellvalue" :vertical="property.vertical" :height="property.height" :min="property.min" :max="property.max" :step="property.step" :range="property.range"></el-slider>
    </template>
    <template v-else-if="input.tel">
      <input class="el-input__inner" :placeholder="property.placeholder" type="tel" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else-if="input.url">
      <input class="el-input__inner" :placeholder="property.placeholder" type="url" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else-if="input.file">
      <input class="el-input__inner" type="file" :value="cellvalue" :disabled="disabled"/>
    </template>
    <template v-else>
      <el-input type="text" :placeholder="property.placeholder" :value="value" :disabled="disabled"/>
    </template>
  </div>
</template>
<script>
  import CDList from './cd-list.vue'
  import CDProps from './cd-props.vue'
  export default {
    name: 'cd-cell',
    props: {
      input: { type: Object },
      cellClass: { type: [Array, Object, String, Function] },
      property: { type: Object, default: Object },
      disabled: { type: Boolean },
      value: { type: [Array, String, Number, Boolean, Date] },
      optionDisabled: {
        type: Function,
        default: function (option, isdisabled) {
          if (isdisabled === undefined) return false
          if (typeof isdisabled === 'boolean') return isdisabled
          if (typeof isdisabled === 'function') return isdisabled(option)
        }
      },
      fetch: { type: Function }
    },
    components: {
      'cd-list': CDList,
      'cd-props': CDProps
    },
    data (cell) {
      return {
        collection: Array,
        cellvalue: Array.isArray(cell.value) ? Array.from(cell.value) : cell.value
      }
    },

    computed: {
      cellClassResolved () {
        return 'cd-cell--resolved'
      }
    },
    methods: {
    }
  }
</script>
<style>
  .el-select-dropdown__item {
    height: unset!important;
    /* line-height: unset!important; */
  }
  .cd-autocomplete--option {
    white-space: normal;
    /* line-height: 1rem; */
  }
  .el-select-dropdown__empty {
    font-size: inherit!important;
  }
  .cd-select {
    width: -webkit-fill-available;
  }
  .cd-autocomplete {
    width: -webkit-fill-available;
  }
  .cd-date {
    width: -webkit-fill-available!important;
  }
  .cd-date-time {
    width: -webkit-fill-available!important;
  }
  .cd-slider {
    width: -webkit-fill-available;
    display: inline-block;
  }
  .cd-checkbox {
    font-size: inherit!important;
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
</style>