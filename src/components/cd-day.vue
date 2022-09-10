<template>
  <div class="cd-day" :class="{ 'is-prev': day.isprev }" >
    <div class="cd-day--header" :class="{ 'is-eve': day.code === 2, 'holiday': day.code === 1 }">
      <slot name="header"></slot>
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
  .cd-day:hover {
    background-color: #f1ebeb;
  }
  .is-selected {
    background-color: #f1ebeb;
  }
</style>
