<template>
  <div class="match-info py-2 m-2 border">
    <div class="match-header">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <img :src="match.home_flag">
            </div>
            <div class="col">
              {{ homeTeam }}
            </div>
            <div class="col">
              {{ match.home_score }}
            </div>
          </div>
          <div class="row match-scorers">
            <div class="col">
              {{ match.home_scorers }}
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              {{ match.away_score }}
            </div>
            <div class="col">
              {{ awayTeam }}
            </div>
            <div class="col">
              <img :src="match.away_flag">
            </div>
          </div>
          <div class="row match-scorers">
            <div class="col">
              {{ match.away_scorers }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    match: { type: Object, required: true },
    lang: {
      type: String, 
      default: 'en', 
      validator (value) { 
        return ['en', 'fa'].indexOf(value) >= 0 
      }
    }
  },
  computed: {
    matchDate ({ lang, match }) {
      return lang === 'en' ? match.local_date : match.persian_date
    },
    homeTeam ({ lang, match }) {
      return lang === 'en' ? match.home_team_en : match.home_team_fa
    },
    awayTeam ({ lang, match }) {
      return lang === 'en' ? match.away_team_en : match.away_team_fa
    }
  }
}
</script>

<style>
  .match-info {
    min-width: max-content;
  }

  .match-scorers {
    max-width: min-content;
    word-spacing: normal;
  }
</style>