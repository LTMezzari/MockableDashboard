<template>
  <div class="wrapper">
    <SideBar
      :routes="routes"
      v-on:refresh="getRoutes"
      v-on:edit="didPressEdit"
      v-on:create="didPressNew"
    />
    <div class="main-panel">
      <!-- <ListRoutes :routes="routes" :onRouteDeleted="getRoutes" :didPressEdit="editRoute"/> -->
      <CreateRoute :route="selected" v-on:finished="getRoutes" />
    </div>
  </div>
</template>

<script>
// import ListRoutes from "./layout/ListRoutes";
import CreateRoute from "./layout/CreateRoute";
import SideBar from "./components/SideBar";
import {getRoutes, States} from "./repository/RoutesRepository";

export default {
  name: "App",
  components: {
    // ListRoutes,
    CreateRoute,
    SideBar,
  },
  data: function () {
    return {
      routes: [],
      selected: undefined,
    };
  },
  mounted: function () {
    this.selected = undefined;
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
      this.selected = route;
    },
    didPressNew: function () {
      this.selected = undefined;
    },
  },
};
</script>

<style>
</style>
