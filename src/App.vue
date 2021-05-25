<template>
  <div class="wrapper">
    <side-bar
      :routes="routes"
      v-on:refresh="getRoutes"
      v-on:edit="didPressEdit"
    />
    <div class="main-panel">
      <!-- HEADER -->
      <route-editor ref="editor" v-on:updated="getRoutes" />
      <!-- FOOTER -->
    </div>
  </div>
</template>

<script>
import RouteEditor from "./layout/RouteEditor.vue";
import SideBar from "./layout/SideBar.vue";
import {getRoutes, States} from "./repository/RoutesRepository";

export default {
  name: "App",
  components: {
    RouteEditor,
    SideBar,
  },
  data: function () {
    return {
      routes: [],
    };
  },
  mounted: function () {
    this.getRoutes();
  },
  methods: {
    getRoutes: function () {
      this.selected = undefined;
      getRoutes().observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.routes = data;
            break;
          case States.FAILED:
            alert(data.message);
            break;
          default:
            break;
        }
      });
    },
    didPressEdit: function (route) {
      this.$refs.editor.putTab(route);
    },
  },
};
</script>

<style>
</style>
