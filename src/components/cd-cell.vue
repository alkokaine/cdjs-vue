<template>
  <div
    class="cd-cell"
    :class="[{ 'cd-slide--wrap': input.range, 'el-textarea': input.textarea, 'el-input': !(input.select || input.autocomplete || input.checkbox) }, cellClassResolved]"
  >
    <template v-if="input.number">
      <input
        :placeholder="property.placeholder"
        type="number" 
        class="el-input__inner cd-input__inner" 
        :min="property.min"
        :max="property.max" 
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property }, onChange)"
      >
    </template>
    <template v-else-if="input.select">
      <el-select
        class="cd-select"
        :placeholder="property.placeholder"
        :remote="property.remote"
        :filterable="property.filterable"
        :value="value"
        :disabled="disabled"
        :clearable="property.clearable"
        :multiple="property.multiple"
        :collapse-tags="property.collapseTags"
        :value-key="property.valuekey"
        :label-key="property.labelkey"
        :remote-method="query => fetch(query, resolveOptions)" 
        @remove-tag="onTagRemove({ $event, value, property }, onRemove)"
        @clear="onCellClear({ $event, property }, onClear)"
      >
        <cd-list
          class="cd-select--options"
          row-class="cd-option" 
          :list-class="['list-unstyled', property.listClass]"
          :collection="collection"
          :payload="payload"
          :key-field="property.valuekey"
        >
          <el-option
            slot-scope="{ row }"
            :value="row[property.valuekey]"
            :label="row[property.labelkey]"
            :disabled="optionDisabled(row, property.isdisabled)"
            @click.native="onOptionSelect({ $event, item: row, property }, onSelect)"
          >
            <template v-if="property.slotdescriptor">
              <cd-props
                :descriptor="property.slotdescriptor"
                :payload="row"
              >
                <div slot-scope="prop">
                  {{ prop }}
                </div>
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
      <el-autocomplete
        class="cd-autocomplete"
        :placeholder="property.placeholder"
        :value="value"
        :fetch-suggestions="fetch"
        :disabled="disabled"
        :clearable="property.clearable"
        :value-key="property.valuekey"
        :trigger-on-focus="property.triggerOnFocus"
        @clear="onCellClear({ $event, property }, onClear)"
        @input="onCellChange({ $event, property }, onChange)"
      >
        <div
          slot-scope="{ item }"
          class="cd-autocomplete-item--wrap"
          @click.capture="onOptionSelect({ $event, item, property }, onSelect)"
        >
          <cd-props
            v-if="property.slotdescriptor"
            class="cd-autocomplete--item"
            :descriptor="property.slotdescriptor"
            :payload="item"
          >
            <div slot-scope="{ value }">
              {{ value }}
            </div>
          </cd-props>
          <span v-else>{{ item[property.labelkey] }}</span>
        </div>
      </el-autocomplete>
    </template>
    <template v-else-if="input.textarea">
      <textarea
        class="el-textarea__inner"
        :value="value" 
        :disabled="disabled" 
        @change="onCellChange({ $event, property }, onChange)"
      />
    </template>
    <template v-else-if="input.checkbox">
      <el-checkbox
        class="cd-checkbox"
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property }, onChange)"
      />
    </template>
    <template v-else-if="input.date">
      <el-date-picker
        class="cd-date"
        :placeholder="property.placeholder"
        :format="property.format"
        :value-format="property.valueformat"
        :value="value"
        :disabled="disabled"
        :clearable="property.clearable"
        @clear="onCellClear({ $event, property }, onClear)"
        @input="onCellChange({ $event, property }, onChange)"
      />
    </template>
    <template v-else-if="input.datetime">
      <el-date-picker
        class="cd-date-time"
        :placeholder="property.placeholder"
        type="datetime"
        :value="value"
        :disabled="disabled"
        :clearable="property.clearable"
        @clear="onCellClear({ $event, property }, onClear)"
        @input="onCellChange({ $event, property }, onChange)"
      />
    </template>
    <template v-else-if="input.email">
      <input
        type="email"
        class="el-input__inner cd-input__inner" 
        :placeholder="property.placeholder"
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property }, onChange)"
      >
    </template>
    <template v-else-if="input.radio" />
    <template v-else-if="input.range">
      <input
        type="range"
        class="cd-slider align-middle" 
        :min="property.min"
        :max="property.max"
        :value="value"
        :step="property.step"
        @change="onCellChange({ $event, property}, onChange)"
      > 
    </template>
    <template v-else-if="input.tel">
      <input
        class="el-input__inner cd-input__inner"
        :placeholder="property.placeholder"
        type="tel"
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property}, onChange)"
      >
    </template>
    <template v-else-if="input.url">
      <input
        class="el-input__inner cd-input__inner"
        :placeholder="property.placeholder"
        type="url"
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property}, onChange)"
      >
    </template>
    <template v-else-if="input.file">
      <input
        class="el-input__inner cd-input__inner"
        type="file"
        :value="value" 
        :disabled="disabled"
      >
    </template>
    <template v-else>
      <input
        type="text"
        class="el-input__inner cd-input__inner"
        :placeholder="property.placeholder" 
        :value="value"
        :disabled="disabled"
        @change="onCellChange({ $event, property }, onChange)"
      >
    </template>
  </div>
</template>
<script>
  import CDList from './cd-list.vue'
  import CDProps from './cd-props.vue'
  export default {
    name: 'CdCell',
    components: {
      'cd-list': CDList,
      'cd-props': CDProps
    },
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
      fetch: { type: Function },
      onSelect: { type: Function },
      onClear: { type: Function },
      onRemove: { type: Function },
      onChange: { type: Function },
      onInput: { type: Function }
    },
    data (cell) {
      return {
        collection: (cell.property.values || [])
      }
    },

    computed: {
      cellClassResolved () {
        return 'cd-cell--resolved'
      }
    },
    methods: {
      onCellClear ({ property }, callback) {
        if (property.multiple) {
          this.$emit('input', [])
        } else {
          this.$emit('input', null)
        }
        if (callback !== undefined && typeof callback === 'function') callback(property)
      },
      onCellChange ({ property, $event }, callback ) {
        if (['range', 'number'].indexOf(property.input) != -1 && $event instanceof Event) {
          try {
            const _number = Number($event.target.valueAsNumber)
            this.$emit('input', _number)
          }
          catch (err) {
            console.error(err)
          }
        }
        else if (['checkbox'].indexOf(property.input) != -1) {
          this.$emit('input', $event)
        }
        else if (['date', 'datetime'].indexOf(property.input) != -1) {
          this.$emit('input', $event)
        }
        else if ([undefined, 'textarea', 'text', 'email', 'tel', 'url'].indexOf(property.input) != -1 && $event instanceof Event) {
          this.$emit('input', $event.target.value)
        }
      },
      onCellInput ({ property, $event }, callback) {
      },
      onOptionSelect ({ $event, item, property }, callback) {
        if (property.input === 'autocomplete') {
          if (property.formatSelected !== undefined && typeof property.formatSelected === 'function')
            this.$emit('input', property.formatSelected(item))
          else 
            this.$emit('input', item[property.labelkey])
        } else {
          if (property.multiple) {
            try {
              const value = this.value
              const fi = value.findIndex(i => i === item[property.valuekey])
              if (fi < 0) this.$emit('input', value.concat([item[property.valuekey]]))
              else this.$emit('input', value.filter(v => v !== item[property.valuekey]))
            } catch (err) {
              this.$emit('input', [item[property.valuekey]])
            }
          } else {
            this.$emit('input', item[property.valuekey]) 
          }
          
        }
        if (callback !== undefined && typeof callback === 'function') callback(property, item)
      },
      onTagRemove ({ $event, value, property }, callback) {
        this.$emit('input', value.filter(v => v !== $event))
      },
      resolveOptions (data) {
        this.collection = data
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
    width: 100%;
  }
  .cd-autocomplete {
  }
  .cd-date {
  }
  .cd-date-time {
  }
  .cd-slider {
  }
  .cd-checkbox {
    font-size: inherit!important;
  }
  .el-input__inner {
    width: unset;
  }
  .cd-input__inner {
    width: 100%;
  }
  .cd-autocomplete {
    width: 100%;
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
  input[type="range"] {
    width: 100%;
  }
  input[type=”range”]::-webkit-slider-thumb{}

  input[type=”range”]::-moz-range-thumb{}

  input[type=”range”]::-ms-thumb{}
  input[type=”range”]::-webkit-slider-runnable-track{}

  input[type=”range”]::-moz-range-track{}

  input[type=”range”]::-ms-track{}



</style>