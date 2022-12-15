<template>
  <cd-menu path="route" item-key="id" :menu="menu" text="text" property="childs" icon="icon"></cd-menu>
</template>

<script>
import CDMenu from '@/components/cd-menu.vue'
export default {
  components: {
    'cd-menu': CDMenu
  },
  data (app) {
    return {
      menu: [{"route":"/Calls","id":21,"application_id":[5],"icon":"bi bi-telephone-inbound","text":"Регистрация звонков","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":null},{"route":"/Dev","id":20,"application_id":[4,5],"icon":"fa-solid fa-screwdriver-wrench","text":"Разработчикам","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":null},{"route":null,"id":107,"application_id":[1,2,3,5,4],"icon":"fa-solid fa-toolbox","text":"Администрирование","is_drop":false,"childs":[{"route":"/Configure/Objects","id":19,"application_id":[4,5],"icon":"bi bi-building","text":"Объекты","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":107},{"route":"/Users","id":108,"application_id":[1,2,5,4,3],"icon":"fa-solid fa-users-gear","text":"Пользователи","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":107},{"route":"/Configure/ObjectGroup","id":131,"application_id":[4,5],"icon":"fa-solid fa-school-lock","text":"Доступ к типам учреждений","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":107},{"route":"/Configure/Menu","id":18,"application_id":[4,5,3,2,1],"icon":"bi bi-menu-app","text":"Меню","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":107}],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":null},{"route":null,"id":100,"application_id":[5,1,2,3],"icon":"bi bi-folder2-open","text":"Справочники","is_drop":false,"childs":[{"route":"/Contragents","id":104,"application_id":[5,1,2,3],"icon":"bi bi-truck","text":"Поставщики","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":100},{"route":"/Persons","id":101,"application_id":[5,1,2,3],"icon":"bi bi-people","text":"Персонал","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":100}],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":null},{"route":"","id":105,"application_id":[1,2,3,5],"icon":"fa-solid fa-file-shield","text":"Документы","is_drop":false,"childs":[{"route":"/Contracts","id":106,"application_id":[5,3,2,1],"icon":"fa-solid fa-layer-group","text":"Договоры","is_drop":false,"childs":[],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":105}],"AllowRoles":[],"ForbidRoles":[],"parent_item_id":null}]
    }
  }
}
</script>

<style>
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-icons/font/bootstrap-icons.css';

</style>