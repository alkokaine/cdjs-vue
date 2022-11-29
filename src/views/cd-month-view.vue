<template>
  <div class="cd-month-view">
    <cd-month :select-weekdays="settings.selectWeekdays" :date="date" :schedule="matches" :compareDate="compareDate">
      <cd-form slot="month-header" :payload="settings" :descriptor="descriptor" :sync="true">
        <h3 slot="header">CD-MONTH</h3>
      </cd-form>
      <cd-list slot-scope="{ events }" :collection="events" key-field="_id" class="py-2" list-class="list-unstyled my-0" row-class="match-short py-2 mx-2">
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
          <div v-if="isempty" class="empty-day">
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
import CDForm from '@/components/cd-form.vue'
import { createDate } from '@/common/month-days'
import keys from '@/../keys'
import fetchData from '@/common/fetch-data'
import info from '@/assets/match-info'
import moment from 'moment'
export default {
  components: {
    'cd-month': CDMonth,
    'cd-list': CDList,
    'cd-form': CDForm
  },
  data (view) {
    return {
      matches: [],
      settings: {
        compact: false,
        selectWeekdays: true,
        mdate: new Date(Date.now())
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
          datafield: 'mdate',
          text: 'Дата календаря',
          input: 'date'
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
</style>