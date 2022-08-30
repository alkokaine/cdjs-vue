<template>
  <div class="cd-cell pt-2" :class="cellClassResolved">
    <template v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <slot name="label">
      <label class="cd-label pe-2 text-nowrap">{{ property.text }}</label>
    </slot>
    <div class="cd-field--input" :class="[{ 'w-100': !input.checkbox, 'cd-checkbox': input.checkbox }]">
      <template v-if="input.number"></template>
      <template v-else-if="input.select">
        <el-select :value="value"></el-select>
      </template>
      <template v-else-if="input.autocomplete">
        <el-autocomplete :value="value" :fetch-suggestions="fetch"></el-autocomplete>
      </template>
      <template v-else-if="input.textarea">
        <el-input type="textarea" :value="value"></el-input>
      </template>
      <template v-else-if="input.checkbox">
        <el-checkbox :value="value"></el-checkbox>
      </template>
      <template v-else-if="input.date"></template>
      <template v-else-if="input.datetime"></template>
      <template v-else-if="input.email"></template>
      <template v-else-if="input.radio"></template>
      <template v-else-if="input.range"></template>
      <template v-else-if="input.tel"></template>
      <template v-else-if="input.url"></template>
      <template v-else-if="input.file"></template>
      <template v-else>
        <el-input class="el-input" :value="value"/>
      </template>
    </div>
    <template v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'cd-cell',
    props: {
      cellClass: { type: [Array, Object, String, Function] },
      property: { type: Object, default: Object },
      value: { type: [Array, String, Number, Boolean] }
    },
    data (cell) {
      const input = cell.property.input
      return {
        input: {
          select: input === 'select',
          autocomplete: input === 'autocomplete',
          number: input === 'number',
          textarea: input === 'textarea',
          checkbox: input === 'checkbox',
          date: input === 'date',
          datetime: input === 'datetime',
          email: input === 'email',
          radio: input === 'radio',
          range: input === 'range',
          tel: input === 'tel',
          text: input === 'text',
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
  .cd-checkbox {
    max-width: min-content;
  }
</style>