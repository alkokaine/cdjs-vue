<template>
  <cd-properties :descriptor="descriptor" :payload="payload" :prop-config="propConfig">
    <template v-if="$slots.header">
      <div slot="header">
        <slot name="header"></slot>
      </div>
    </template>
    <span class="cd-properety--value" slot-scope="{ value, property }">
      <template v-if="property.format">
        {{ property.format(value) }}
      </template>
      <template v-else>
        {{ value }}
      </template>
    </span>
    <div v-if="$slots.content" slot="content">
      <slot name="content"></slot>
    </div>
  </cd-properties>
</template>

<script>
import CDProperties from './cd-properties.vue'
export default {
  components: {
    'cd-properties': CDProperties
  },
  props: {
    descriptor: { type: Array, required: true, description: 'Свойства объекта' },
    payload: { type: Object, required: true, description: 'Объект, свойства которого переданы в descriptor' },
    owner: { type: Object, description: 'Родительский дескриптор' },
    propConfig: { type: Function, description: 'Функция, возвращающая объект конфигурации свойства' }
  }
}
</script>

<style>

</style>