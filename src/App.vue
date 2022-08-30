<template>
  <div id="app" class="main-app">
    <img alt="Vue logo" src="./assets/logo.png">
    <cd-grid :collection="collection" key-field="ObjectID" :descriptor="columns"/>
  </div>
</template>

<script>
import descriptor from '@/assets/descriptors'
import CDGrid from '@/components/cd-grid.vue'
export default {
  name: 'App',
  components: {
    'cd-grid': CDGrid
  },
  data (app) {
    return {
      collection: [descriptor.object, descriptor.object, descriptor.object],
      columns: descriptor.objectDescriptor
    }
  }
}
</script>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
