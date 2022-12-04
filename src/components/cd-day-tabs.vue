<template>
  <cd-tabs class="cd-day-tabs container" :tabs="days" tab-key="daykey" 
    :orientation="orientation" :tab-list-class="{ 'align-items-end': inLeft, 'align-items-start': inRight }" 
    :on-tab-select="selectDay">
    <cd-day class="cd-day--wrap cd-day--tab" :class="[{ 'mw-100': isCol }]" slot-scope="{ tab }" :day="tab">
      <span slot="header">{{ tabCaption(tab) }}</span>
    </cd-day>
    <div slot="content" class="p-2 m-2 w-auto">
      <cd-list :collection="selectedDays" key-field="daykey" list-class="list-unstyled" row-class="month-day--details row w-auto">
        <cd-day slot-scope="{ row }" :day="row">
          <div class="cd-day--details fw-bold" slot="header">
            {{ tabCaption(row) }}
          </div>
          <slot :day="row"></slot>
        </cd-day>
      </cd-list>
    </div>
  </cd-tabs>
</template>

<script>
import CDTabs from '@/components/cd-tabs.vue'
import CDDay from '@/components/cd-day.vue'
import CDList from '@/components/cd-list.vue'
const formatter = Intl.DateTimeFormat('ru-RU')
export default {
  name: 'cd-day-tabs',
  components: {
    'cd-tabs': CDTabs,
    'cd-day': CDDay,
    'cd-list': CDList
  },
  props: {
    days: { type: Array, required: true, description: 'Коллекция дней' },
    orientation: { type: String, description: 'Положение и направление дней'},
    compareDate: { type: Function, required: true, description: 'Функция сравнения дат' },
    multiple: { type: Boolean, default: false, description: 'Можно ли выбрать несколько дней' },
    format: { type: String, default: 'dd-MM-YYYY', description: 'Формат заголовка вкладки' },
    selectDay: { 
      type: Function, 
      description: 'Функция, которая выполняется по клику на день'
    },
    selectedDays: {
      type: Array, 
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
    inLeft ({ orientation }) {
      return orientation === 'col-left'
    },
    inRight ({ orientation }) {
      return orientation === 'col-right'
    },
    tabCaption ({ format }) {
      return ({ date }) => formatter.format(date, format)
    }
  },
  
}
</script>

<style>
  .cd-day--tab {
    white-space: nowrap;
  }
</style>