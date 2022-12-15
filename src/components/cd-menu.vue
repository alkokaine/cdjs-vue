<template>
  <!-- основой для меню является cd-list -->
  <cd-list :list-class="listClass" class="cd-menu--list"
    :key-field="itemKey" :inner="inner" :show-items="showItems"
    :collection="menu" :row-class="resolverowclass">
    <!-- слот заголовка списка обзовём слотом заголовка меню -->
    <div slot="header" class="cd-menu--header">
      <slot name="menu-header"></slot>
    </div>
    <!-- для каждого элемента списка нарисуем такое -->
    <cd-menu-item slot-scope="{ row, index }" :inner="inner" :path="row[path]" :icon="row[icon]" :text="row[text]"
      :is-collapsed="isCollapsed" :is-active="index === selected"
      :class="[{ 'is-active': index === selected, 'inner': inner }]">
      <!-- <i slot="icon" :class="row[icon]"/> -->
      <!-- <span slot="text">{{ row[text] }}</span> -->
      <cd-menu v-if="row[property] && index == selected" class="cd-menu--inner"
        :name="row[itemKey]" :inner="true" :is-collapsed="isCollapsed" :menu="row[property]"
        :item-key="itemKey" :icon="icon" :property="property" :text="text" :path="path"/>
    </cd-menu-item>
    <div slot="footer">
      <slot name="menu-footer"></slot>
    </div>
  </cd-list>
</template>

<script>
import CDList from './cd-list.vue'
import CDMenuItem from './cd-menu-item.vue'
export default {
  name: 'cd-menu',
  components: {
    'cd-list': CDList,
    'cd-menu-item': CDMenuItem
  },
  props: {
    showItems: { type: Boolean, default: true },
    /**
     * признак свёрнутости
     */
    isCollapsed: { type: Boolean, default: false, description: 'Признак свёрнутости' },
    /**
     *  признак дочернего меню
     */
    inner: { type: Boolean, default: false, description: 'Признак дочернего меню' },
    /**
     * свойство, в котором находится дочернее меню элемента
     */
    property: { type: String, default: 'menu', description: 'Свойство, в котором находится дочернее меню' },
    /**
     * свойство, в котором находится пиктограмма менюшки
     */
    icon: { type: String, default: 'icon', description: 'Свойство, в котором находится пиктограмма элемента меню' },
    /**
     * имя свойства, в котором находится условный первичный ключ
     */
    itemKey: { type: String, default: 'id', description: 'Идентификатор менюшки' },
    /**
     * имя свойства, в котором находится текст пункта меню
     */
    text: { type: String, default: 'text', description: 'Текст менюшки' },
    /**
     * коллекция элементов меню
     */
    menu: { type: Array, required: true, default: () => ([]), description: 'Меню' },
    /**
     * признак того, что элемент меню, содержащий дочернее меню, переданное в свойство menu
     * в том или ином виде выбран
    */
    isActive: { type: Boolean, default: false },
    /**
     * расположение элементов меню
    */
    vertical: { type: Boolean, default: true },
    path: { type: String, default: 'url' }
  },
  data (docmenu) {
    return {
      selected: -1,
      listClass: ['list-unstyled cd-menu--items', { 'is-collapsed': docmenu.isCollapsed, inner: docmenu.inner }]
    }
  },
  watch: {
    /**
     * при изменении свойства iscollapsed сбрасываем выбранный элемент меню
     */
    isCollapsed: {
      handler (nvalue) {
        this.selected = -1
      }
    }
  },
  computed: {
    /**
     * возврашает true для элемента, ключ которого равен значению menu.selected
     */
    isselected ({ selected }) {
      return (index) => index === selected
    },
    resolverowclass ({ selected }) {
      const menu = this
      return (row, index) => {
        if (index === selected) return 'cd-menu--item is-active'
        else return 'cd-menu--item'
      }
    },
    onmenuclicked ({ selected }) {
      const menu = this
      return (scope) => (event) => {
        if (menu.selected === scope.index) {
          menu.selected = -1
        } else {
          menu.selected = scope.index
        }
        if (scope.row[menu.path] && (event.sender === 'text' || !menu.iscollapsed)) menu.$router.push(scope.row[menu.path])
      }
    }
  }
}
</script>

<style>
  .cd-menu--list {
    color: white;
    padding-inline-start: 0;
    background-color: var(--menu-background);
  }
  .cd-menu--inner {
    background-color: #006195;
  }
  .cd-menu--item.is-active {
    background-color: #07305c;
  }
</style>
