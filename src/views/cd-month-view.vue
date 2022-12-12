<template>
  <div class="cd-month-view">
    <cd-month v-if="matches.length" :select-weekdays="settings.selectWeekdays" :date="date" :schedule="matches" :compact="settings.compact" :compareDate="compareDate" :mode="settings.mode" :orientation="settings.orientation" :multiple="settings.multiple">
      <cd-prop-editor slot="month-header" :payload="settings" :descriptor="descriptor">
        <h3 slot="header">CD-MONTH</h3>
      </cd-prop-editor>
      <cd-list slot-scope="{ day }" :show-items="!settings.compact" :collection="dayContent(day)" key-field="_id" 
        class="py-2 match-list" list-class="list-unstyled my-0" :row-class="['match-short py-2 mx-2', { 'w-auto': !isSchedule }]">
        <div slot-scope="{ row }" :class="['row', { 'justify-content-center' : isSchedule }]">
          <template v-if="isSchedule">
            <div class="col home-team mw-50">
              <div class="w-auto team-flag border border-1">
                <img :src="row.event.home_flag" />
              </div>
            </div>
            <div class="col away-team mw-50">
              <div class="w-auto team-flag border border-1">
                <img :src="row.event.away_flag"/>
              </div>
            </div>
          </template>
          <template v-else>
            <match-info :lang="settings.lang" :match="row.event"></match-info>
          </template>
        </div>
        <template slot="footer" slot-scope="{ isempty }">
          <div v-if="!settings.compact" class="empty-day">
            <div v-if="isempty">нет событий</div>
            <el-button type="text" size="mini" v-on:click.capture.stop="createEvent($event, day)">Добавить</el-button>
          </div>
        </template>
      </cd-list>
      <el-dialog slot="month-footer" :visible="isDialog">
        <cd-form v-if="isDialog" :descriptor="eventDescriptor" :payload="newEvent" :on-submit="onSubmit" :on-reset="onReset" :show-controls="true">
          <div slot="header" slot-scope="{ payload }">{{ payload }}</div>
        </cd-form>
      </el-dialog>
    </cd-month>
  </div>
</template>

<script>
import CDList from '@/components/cd-list.vue'
import CDMonth from '@/components/cd-month.vue'
import CDForm from '@/components/cd-form.vue'
import MatchInfo from './match-info.vue'
import CDPropEditor from '@/components/cd-prop-editor'
import { createDate } from '@/common/month-days'
import keys from '@/../keys'
import fetchData from '@/common/fetch-data'
import info from '@/assets/match-info'
import moment from 'moment'
import Vue from 'vue'
export default {
  components: {
    'cd-month': CDMonth,
    'cd-list': CDList,
    'cd-prop-editor': CDPropEditor,
    'match-info': MatchInfo,
    'cd-form': CDForm
  },
  data (view) {
    return {
      matches: [],
      settings: {
        compact: false,
        selectWeekdays: true,
        mdate: new Date(Date.now()),
        mode: 'schedule',
        orientation: 'col-left',
        lang: 'en'
      },
      descriptor: [
        {
          datafield: 'compact',
          text: 'Компактный режим',
          input: 'checkbox'
        },
        {
          datafield: 'selectWeekdays',
          text: 'Чекбоксы у дней недели',
          input: 'checkbox'
        },
        {
          datafield: 'multiple',
          text: 'Можно ли выбрать несколько дней',
          input: 'checkbox'
        },
        {
          datafield: 'mdate',
          text: 'Дата календаря',
          input: 'date'
        },
        {
          datafield: 'mode',
          text: 'Режим',
          input: 'select',
          valuekey: 'mode',
          labelkey: 'label',
          values: [
            {
              mode: 'schedule',
              label: 'таблица'
            },
            {
              mode: 'list',
              label: 'список'
            }
          ]
        },
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
          ],
          hidden: row => row.mode === 'schedule'
        },
        {
          datafield: 'lang',
          text: 'язык',
          input: 'select',
          labelkey: 'text',
          valuekey: 'lang',
          values: [
            { text: 'английский', lang: 'en' },
            { text: 'фарси', lang: 'fa' }
          ]
        }
      ],
      newEvent: Object,
      eventDescriptor: info.matchInfoDescriptor
    }
  },
  methods: {
    onReset () {
      this.newEvent = Object
    },
    onSubmit (payload) {
      const view = this
      view.matches.push({ event: payload, date: payload.local_date })
      view.newEvent = Object
    },
    compareDate ({ date }, day) {
      return date.getDate() === day.getDate() && 
        date.getMonth() === day.getMonth() && 
        date.getFullYear() === day.getFullYear()
    },
    createEvent($event, day) {
      this.newEvent = {
        _id: 1,
        away_score: 0,
        home_score: 0,
        local_date: day,
      }
    }
  },
  computed: {
    dayContent ({ matches, compareDate }) {
      return (day) => (matches.filter(f => compareDate(f, day)))
    },
    isDialog ({ newEvent }) {
      return newEvent._id > 0
    },
    date ({ settings }) {
      return createDate(settings.mdate.getFullYear(), settings.mdate.getMonth()+1, settings.mdate.getDate())
    },
    isSchedule ({ settings }) {
      return settings.mode === 'schedule'
    },
    // dayContent ({ matches, compareDate }) {
    //   return (day) => {
    //     return (matches.filter(m => compareDate(m, day)))
    //   }
    // }
  },
  watch: {
    date: {
      immediate: true,
      handler (newvalue) {
        const view = this
        fetchData({
          method: 'get',
          timeout:5000,
          url: '/qatar2022/match',
          headers: keys.qatar2022
        }).then(response => {
          view.matches = response.data.data.map(m => ({
            date: new Date(m.local_date),
            event: m
          }))
        }).catch(reason => {
          view.matches = info.schedule.map(m => ({
            date: new Date(m.local_date),
            event: m
          }))
        })
      }
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~element-ui/lib/theme-chalk/index.css';

  .mw-50 {
    max-width: 75px;
  }
  img {
    max-width: 95%;
    max-height: auto;
  }
  .match-list {
  }
  .match-short {
  }
</style>