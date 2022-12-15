<template>
  <div class="cd-menu-item">
    <div class="cd-menu-a border-top" :class="[{ 'is-collapsed': isCollapsed, 'is-hover': ishover }]">
      <a :href="url">
        <span class="cd-menu--icon pb-2 pt-2 w-auto" :class="{ 'm-auto': isCollapsed && !inner, 'ps-1': !isCollapsed }">
          <slot name="icon">
            <i :class="icon"></i>
          </slot>
        </span>
        <span v-if="inner || !isCollapsed || (ishover || isActive)" class="cd-menu--text pb-2 pt-2" :class="{ 'show-up': !inner && isCollapsed && (ishover || isactive), 'w-100': inner || !isCollapsed }">
          <span class="ps-2 w-100" :class="[{ 'is-collapsed': isCollapsed }, $vnode.data.class]">
            <slot name="text">
              <span>{{ text }}</span>
            </slot>
          </span>
        </span>
      </a>
    </div>
    <div v-if="$slots.default" class="sub-items" :class="{ 'show-up': isCollapsed && (ishover || isactive), 'inner': inner, 'border-start border-1': !inner && isCollapsed }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cd-menu-item',
  props: {
    isActive: { type: Boolean, default: false },
    isCollapsed: { type: Boolean },
    inner: { type: Boolean, default: false },
    path: { type: String, default: () => ('#') },
    text: { type: String },
    icon: { type: String }
  },
  data (mi) {
    return {
      ishover: false
    }
  },
  computed: {
    url ({ path }) {
      return path !== null && path !== '' ? path : '#'
    }
  },
  methods: {
    changehover (event) {
      this.ishover = !this.ishover
    }
  }
}
</script>

<style>
  .cd-menu-a {
    text-decoration: none!important;
    color: white!important;
    display: flex;
  }
  .cd-menu--item {
    cursor: pointer;
  }
  .cd-menu--item.is-active {
  }
  .cd-menu--icon {

  }
  .cd-menu--text.show-up {
    background-color: #101010;
  }

  .sub-items.show-up, .cd-menu--text.show-up {
    overflow: visible!important;
    position: absolute;
    left: 100%;
    width:200px;
    top: inherit;
  }
  .sub-items.show-up.inner {
    left: unset;
  }
  .inner.inner {
    position: relative;
  }
</style>
