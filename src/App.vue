<template>
  <div id="app" class="main-app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="payload">
      <cd-props :descriptor="descriptor" :payload="payload"></cd-props>
      <cd-form class="text-start w-auto" :descriptor="descriptor" :payload="payload"></cd-form>
    </div>
  </div>
</template>

<script>
import example from '@/assets/descriptors'
import CdProps from './components/cd-props.vue'
import CdForm from './components/cd-form.vue'
export default {
  name: 'App',
  components: {
    'cd-props': CdProps,
    'cd-form': CdForm
  },
  data () {
    return {
      descriptor: example.objectDescriptor,
      payload: example.object
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
