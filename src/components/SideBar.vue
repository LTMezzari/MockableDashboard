<template>
  <div
    class="sidebar"
    data-background-color="black"
    data-active-color="success"
  >
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a class="simple-text"> Mockable </a>
        <button class="btn-sm" v-on:click="didPressRefresh">Refresh</button>
        <button class="btn-sm" v-on:click="didPressNew">New</button>
        <button class="btn-sm" v-on:click="didPressSwagger">Swagger</button>
        <button class="btn-sm" v-on:click="didPressPostman">Postman</button>
      </div>
      <ul class="nav">
        <SideBarRoute
          v-for="(item, index) in routes"
          :key="index"
          :route="item"
          :onPress="didPressRoute"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import SideBarRoute from "./SideBarRoute";
export default {
  name: "SideBar",
  props: {
    routes: {
      type: Array,
      required: true,
    },
    onRefresh: {
      type: Function,
      required: false,
    },
    onClick: {
      type: Function,
      required: false,
    },
    onClickNew: {
      type: Function,
      required: false,
    },
  },
  components: {
    SideBarRoute,
  },
  methods: {
    didPressRoute: function (route) {
      if (!this.onClick) return;
      this.onClick(route);
    },
    didPressRefresh: function () {
      if (!this.onRefresh) return;
      this.onRefresh();
    },
    didPressNew: function () {
      if (!this.onClickNew) return;
      this.onClickNew();
    },
    didPressSwagger: function () {},
    didPressPostman: function () {},
  },
};
</script>
<style>
</style>