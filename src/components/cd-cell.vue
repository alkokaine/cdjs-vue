<template>
  <div class="cd-cell" :class="[cellClassResolved]">
    <template v-if="input.number">
      <input :placeholder="property.placeholder" type="number"
        class="el-input__inner" :min="property.min" :max="property.max"
        :value="value" :disabled="disabled"
        :clearable="property.clearable"/>
    </template>
    <template v-else-if="input.select">
      <el-select class="cd-select" :placeholder="property.placeholder"
        :value="value" :disabled="disabled" :clearable="property.clearable">
        <cd-list class="cd-select--options" :collection="collection" :payload="payload"
          :key-field="property.valuekey" :list-class="['list-unstyled', property.listClass]"
          row-class="cd-option">
          <el-option slot-scope="{ row }" :value="row[property.keyfield]"
            :label="row[property.labelkey]" :disabled="optionDisabled(row, property.isdisabled)"
            v-on:click.native="onOptionSelect({ $event, item: row, property }, property.onSelect)">
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
      <el-autocomplete class="cd-autocomplete" :placeholder="property.placeholder" :value="value"
        :fetch-suggestions="fetch" :disabled="disabled" :clearable="property.clearable" :value-key="property.valuekey"
        :trigger-on-focus="property.triggerOnFocus" @select="onSelect({ property, $event }, property.onSelect)" @change="onChange({ property, $event }, propery.onChange)">
        <div class="cd-autocomplete-item--wrap" slot-scope="{ item }" v-on:click.capture="onOptionSelect({ $event, item, property }, property.onSelect)">
          <cd-props v-if="property.slotdescriptor" class="cd-autocomplete--item"
            :descriptor="property.slotdescriptor" :payload="item">
            <div slot-scope="{ value }">{{ value }}</div>
          </cd-props>
          <span v-else>{{ item[property.labelkey] }}</span>
        </div>
      </el-autocomplete>
    </template>
    <template v-else-if="input.textarea">
      <el-input class="cd-input" type="textarea" :placeholder="property.placeholder"
        :value="value" :disabled="disabled"/>
    </template>
    <template v-else-if="input.checkbox">
      <el-checkbox class="cd-checkbox" :value="value" :disabled="disabled"></el-checkbox>
    </template>
    <template v-else-if="input.date">
      <el-date-picker class="cd-date" :placeholder="property.placeholder"
        :value="value" :disabled="disabled" :clearable="property.clearable"></el-date-picker>
    </template>
    <template v-else-if="input.datetime">
      <el-date-picker class="cd-date-time" :placeholder="property.placeholder"
        type="datetime" :value="value" :disabled="disabled" :clearable="property.clearable"></el-date-picker>
    </template>
    <template v-else-if="input.email">
      <el-input type="email" :placeholder="property.placeholder" :value="value" :disabled="disabled"/>
    </template>
    <template v-else-if="input.radio"></template>
    <template v-else-if="input.range">
      <el-slider class="cd-slider" :value="value" :vertical="property.vertical"
        :height="property.height" :min="property.min" :max="property.max" :step="property.step"
        :range="property.range"></el-slider>
    </template>
    <template v-else-if="input.tel">
      <input class="el-input__inner" :placeholder="property.placeholder" type="tel" :value="value" :disabled="disabled"/>
    </template>
    <template v-else-if="input.url">
      <input class="el-input__inner" :placeholder="property.placeholder" type="url" :value="value" :disabled="disabled"/>
    </template>
    <template v-else-if="input.file">
      <input class="el-input__inner" type="file" :value="value" :disabled="disabled"/>
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
      payload: { type: Object },
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
        collection: Array
      }
    },

    computed: {
      cellClassResolved () {
        return 'cd-cell--resolved'
      }
    },
    methods: {
      onSelect ({ property, $event }, callback) {
        this.$emit('input', )
      },
      onChange ({ property, $event }, callback ) {
        console.log($event)
      },
      onOptionSelect ({ $event, item, property }, callback) {
        this.$emit('input', item[property.valuekey])
      }
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