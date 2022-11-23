<template>
  <div class="cd-month-view">
    <h3>CD-MONTH</h3>
    <cd-month :compact="compact" :select-weekdays="showcheckbox" :date="date">
      <cd-list slot-scope="{ day }" :collection="resolveMatches(day)" key-field="_id" class="py-2" list-class="list-unstyled" row-class="match-short">
        <div slot-scope="{ row }" class="row justify-content-center">
          <div class="col home-team mw-50">
            <div class="w-auto">
              <img :src="row.event.home_flag" />
            </div>
          </div>
          <div class="col away-team mw-50">
            <div class="w-auto">
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
      date: createDate(2022, 11, 1),
      matches: Array
    }
  },
  computed: {
    resolveMatches ({ matches }) {
      return ({ date }) => {
        if (matches.filter === undefined) {
          return []
        }
        else {
          const res_ = matches.filter(m =>
            m.moment.date() === date.date() &&
            m.moment.month() === date.month() &&
            m.moment.year() === date.year()
          )
          setTimeout(() => console.log(res_), 300)
          return res_
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