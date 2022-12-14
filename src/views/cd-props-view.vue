<template>
  <div>
    <cd-props
      class="container text-start"
      :payload="object"
      :descriptor="properties"
    >
      <template slot-scope="{ property, value }">
        <div class="cd-test--value">
          {{ property.text }}: {{ value }}
        </div>
      </template>
    </cd-props>
    <cd-props :payload="object" />
  </div>
</template>
''
<script>
import CDProps from '@/components/cd-props.vue'
import assets from '@/assets/descriptors'
export default {
  name: 'CdPropsView',
  components: {
    'cd-props': CDProps
  },
  data (props) {
    return {
      object: assets.object,
      properties: assets.objectDescriptor
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-icons';
</style>