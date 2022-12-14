<template>
  <cd-prop-editor
    class="container"
    :payload="settings"
    :descriptor="descriptor"
  >
    <cd-tabs
      :tabs="tabs"
      tab-key="key"
      tab-caption="tab"
      :orientation="settings.orientation"
      :on-tab-select="setcurrent"
    >
      <!-- <div class="cd-tab--example" slot-scope="{ tab }">{{ tab }}</div> -->
      <div slot="content">
        {{ current }}
      </div>
    </cd-tabs>    
  </cd-prop-editor>
</template>

<script>

import { CDTabs, CDPropEditor } from '@/../dist/cdjs/cdjs.common'

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
@import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';
  .cd-tab--example {
    width: max-content;
  }
</style>