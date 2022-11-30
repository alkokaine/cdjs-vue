<template>
  <cd-prop-editor class="container-sm" :payload="settings" :descriptor="descriptor">
    <cd-tabs class="container-sm" :tabs="tabs" tab-key="key" :orientation="settings.orientation">
      <span slot-scope="{ tab }" v-on:click.capture="setcurrent($event, tab)">{{ tab }}</span>
      <div slot="content">
        {{ current }}
      </div>
    </cd-tabs>    
  </cd-prop-editor>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
import CDPropEditor from '@/components/cd-prop-editor'
export default {
  components:{
    'cd-tabs': CDTabs,
    'cd-prop-editor': CDPropEditor
  },
  data (tabs) {
    return {
      tabs: [ { key: 1, tab: 1}, { key: 2, tab: 2}, { key: 3, tab: 3} ],
      current: Object,
      settings: {
        orientation: 'row-top'
      },
      descriptor: [
        {
          datafield: 'orientation',
          text: 'ориентация',
          input: 'select',
          labelkey: 'label',
          valuekey: 'value',
          values: [
            {
              label: 'row-top',
              value: 'row-top'
            },
            {
              label: 'row-bottom',
              value: 'row-bottom'
            },
            {
              label: 'col-left',
              value: 'col-left'
            },
            {
              label: 'col-right',
              value: 'col-right'
            }
          ]
        },
      ]
    }
  },
  methods: {
    setcurrent (event, tab) {
      this.current = structuredClone(tab)
    }
  }
}
</script>

<style>

</style>