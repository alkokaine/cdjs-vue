<template>
  <div class="cd-day" :class="{ 'is-prev': day.isprev }" >
    <div class="cd-day--header" :class="{ 'is-eve': day.code === 2, 'holiday': day.code === 1 }">
      <slot name="header"></slot>
    </div>
    <slot :day="day"></slot>
  </div>
</template>

<script>
export default {
  name: 'cd-day',
  props: {
    day: { type: Date, required: true }
  },
  data (block) {
    return {
    }
  }
}
</script>

<style>
  .cd-day--header {
    font-size: 0.8rem;
  }
  .compact {
    width: 2em;
  }
  .mw-100 {
    min-width: 100%;
  }
  .cd-day {
    cursor: pointer;
  }
  .is-prev {
    opacity: 42%;
    pointer-events: none;
    cursor: default;
    user-select: none;
  }
  .cd-days--container {
    max-width: min-content;
  }
  .is-eve {
    opacity: 70%;
  }
  .is-selected {
    background-color: #f1ebeb;
  }
</style>
