<template>
  <cd-tabs class="cd-day-tabs container" :tabs="days" tab-key="daykey" :orientation="orientation">
    <cd-day class="cd-day--wrap cd-day--tab p-2 border border-1" :class="[{ 'mw-100': isCol }]" slot-scope="{ tab }" :day="tab" v-on:click.native="selectDay($event, tab)">
      <span slot="header">{{ tab.date }}</span>
    </cd-day>
    <div slot="content" class="p-2 m-2 w-auto">
      <slot :content="selectedDays"></slot>
    </div>
  </cd-tabs>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
import CDDay from '@/components/cd-day.vue'

const defaultSelectedDays = []

export default {
  name: 'cd-day-tabs',
  components: {
    'cd-tabs': CDTabs,
    'cd-day': CDDay
  },
  props: {
    days: { type: Array, required: true, description: 'Коллекция дней' },
    orientation: { type: String, description: 'Положение и направление дней'},
    compareDate: { type: Function, required: true, description: 'Функция сравнения дат' },
    multiple: { type: Boolean, default: false, description: 'Можно ли выбрать несколько дней' },
    selectDay: { 
      type: Function, 
      default: function (event, tab) {
        const daytabs = this
        const fi = defaultSelectedDays.findIndex(s => s === tab.daykey)
        if (fi >= 0) defaultSelectedDays.splice(fi, 1)
        else if (daytabs.multiple) {
          defaultSelectedDays.push(tab.daykey)
        } else {
          defaultSelectedDays.pop()
          defaultSelectedDays.push(tab.daykey)
        }
      },
      description: 'Функция, которая выполняется по клику на день'
    },
    selectedDays: {
      type: Array, 
      default: function () {
        return defaultSelectedDays
      },
      description: 'Массив выбранных дат'
    }
  },
  data (tabs) {
    return {
    }
  },
  computed: {
    isCol ({ orientation }) {
      return ['col-left', 'col-right'].indexOf(orientation) >= 0
    },
  }
}
</script>

<style>
  .cd-day--tab {
    white-space: nowrap;
  }
</style>