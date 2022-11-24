<template>
  <div class="cd-month-view">
    <cd-month :select-weekdays="showcheckbox" :date="date" :schedule="matches" :compareDate="compareDate">
      <h3 slot="month-header">CD-MONTH
        <el-date-picker v-model="mdate"></el-date-picker>
      </h3>
      <cd-list slot-scope="{ events }" :collection="events" key-field="_id" class="py-2" list-class="list-unstyled" row-class="match-short py-2 mx-2">
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
import { createDate } from '@/common/month-days'
import keys from '@/../keys'
import fetchData from '@/common/fetch-data'
import { schedule } from '@/assets/match-info'
import moment from 'moment'
export default {
  components: {
    'cd-month': CDMonth,
    'cd-list': CDList
  },
  data (view) {
    return {
      compact: false,
      showcheckbox: true,
      mdate: new Date(Date.now()),
      matches: []
    }
  },
  methods: {
    compareDate ({ moment }, { row }) {
      return moment.date() === row.date.date() && 
        moment.month() === row.date.month() && 
        moment.year() === row.date.year()
    }
  },
  computed: {
    date ({ mdate }) {
      return createDate(mdate.getFullYear(), mdate.getMonth()+1, mdate.getDate())
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
          view.matches = schedule.map(m => ({
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