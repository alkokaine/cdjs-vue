<template>
  <div class="cd-cell pt-2" :class="cellClassResolved">
    <label class="cd-label pe-2 text-nowrap" slot="label">{{ property.text }}</label>
    <div class="cd-field--input">
      <el-input class="el-input w-auto" :value="value"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cd-cell',
    props: {
      cellClass: { type: [Array, Object, String, Function] },
      property: { type: Object, default: Object },
      value: { type: [Array, String, Number, Boolean]}
    },
    data (cell) {
      return {}
    },
    computed: {
      cellClassResolved () {
        return 'cd-cell--resolved'
      }
    }
  }
</script>