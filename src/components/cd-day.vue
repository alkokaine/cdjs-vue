<template>
  <div class="cd-day px-3 my-1">
    <div class="cd-day--header" :class="{ 'is-prev': day.isprev, 'is-eve': day.code === 2, 'holiday': day.code === 1 }">
      <slot name="header">
        <span class="cd-day--block">{{ number }}</span>
      </slot>
    </div>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'cd-day',
  props: {
    day: { type: Object, required: true }
  },
  data (day) {
    return {
      number: day.day.date.date()
    }
  }
}
</script>

<style>
  .cd-day--header {
    font-size: 0.8rem;
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
  .cd-day {
    cursor: pointer;
  }
  .cd-day:hover {
    background-color: #f1ebeb;
  }
</style>
