<template>
  <div class="cd-month-view">
    <cd-month :compact="compact" :select-weekdays="showcheckbox" :date="date">
      <h3 slot="month-header">CD-MONTH
        <el-date-picker v-model="mdate"></el-date-picker>
      </h3>
      <cd-list slot-scope="{ day }" :collection="resolveMatches(day)" key-field="_id" class="py-2" list-class="list-unstyled" row-class="match-short py-2">
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
      // date: createDate(2022, 11, 1=),
      mdate: new Date(Date.now()),
      matches: Array
    }
  },
  computed: {
    date ({ mdate }) {
      return createDate(mdate.getFullYear(), mdate.getMonth()+1, mdate.getDate())
    },
    resolveMatches ({ matches }) {
      return ({ date }) => {
        if (matches.filter === undefined) {
          return []
        }
        else {
          return matches.filter(m =>
            m.moment.date() === date.date() &&
            m.moment.month() === date.month() &&
            m.moment.year() === date.year())
        }
      }
    }
  },
  watch: {
    date: {
      immediate: true,
      handler (newvalue) {
        const view = this
        fetchData({
          method: 'get',
          error (reason) {
            // list.error = reason
            console.error(reason)
          },
          timeout:5000,
          url: '/qatar2022/match',
          headers: keys.qatar2022
        }).then(response => {
          view.matches = response.data.data.map(m => ({
            moment: moment(new Date(m.local_date)),
            event: m
          }))
        }).catch(reason => {
          console.error(reason)
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