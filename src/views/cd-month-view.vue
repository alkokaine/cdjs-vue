<template>
  <div class="cd-month-view">
    <cd-month :select-weekdays="settings.selectWeekdays" :date="date" :schedule="matches" :compact="settings.compact" :compareDate="compareDate" :mode="settings.mode" :orientation="settings.orientation" :multiple="settings.multiple">
      <cd-prop-editor slot="month-header" :payload="settings" :descriptor="descriptor">
        <h3 slot="header">CD-MONTH</h3>
      </cd-prop-editor>
      <cd-list slot-scope="{ events }" :show-items="!settings.compact" :collection="events" key-field="_id" class="py-2 mw-mc match-list" list-class="list-unstyled my-0" row-class="match-short py-2 mx-2">
        <div v-if="settings.compact && events.length" slot="header">{{ events.length }} матча</div>
        <div slot-scope="{ row }" class="row justify-content-center">
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
        </div>
        <template slot="footer" slot-scope="{ isempty }">
          <div v-if="isempty && !settings.compact" class="empty-day">
            <span>нет событий</span>
          </div>
        </template>
      </cd-list>
    </cd-month>
  </div>
</template>

<script>
import CDList from '@/components/cd-list.vue'
import CDMonth from '@/components/cd-month.vue'
import CDPropEditor from '@/components/cd-prop-editor'
import { createDate } from '@/common/month-days'
import keys from '@/../keys'
import fetchData from '@/common/fetch-data'
import info from '@/assets/match-info'
import moment from 'moment'
export default {
  components: {
    'cd-month': CDMonth,
    'cd-list': CDList,
    'cd-prop-editor': CDPropEditor
  },
  data (view) {
    return {
      matches: [],
      settings: {
        compact: false,
        selectWeekdays: true,
        mdate: new Date(Date.now()),
        mode: 'schedule',
        orientation: 'col-left'
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
        }
      ]
    }
  },
  methods: {
    compareDate ({ moment }, { date }) {
      return moment.date() === date.date() && 
        moment.month() === date.month() && 
        moment.year() === date.year()
    }
  },
  computed: {
    date ({ settings }) {
      return createDate(settings.mdate.getFullYear(), settings.mdate.getMonth()+1, settings.mdate.getDate())
    }
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
            moment: moment(new Date(m.local_date)),
            event: m
          }))
        }).catch(reason => {
          view.matches = info.schedule.map(m => ({
            moment: moment(new Date(m.local_date)),
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
    max-width: min-content;
  }
  .match-short {
    width: max-content;
  }
</style>