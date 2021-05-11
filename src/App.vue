<template>
  <div class="wrapper">
    <SideBar :routes="routes" :onRefresh="getRoutes" :onClick="didPressEdit" :onClickNew="didPressNew"/>
    <div class="main-panel">
      <!-- <ListRoutes :routes="routes" :onRouteDeleted="getRoutes" :didPressEdit="editRoute"/> -->
      <CreateRoute :route="selected" :onRouteCreated="getRoutes"/>
    </div>
  </div>
</template>

<script>
// import ListRoutes from "./layout/ListRoutes";
import CreateRoute from "./layout/CreateRoute";
import SideBar from "./components/SideBar";
import api from "./utils/RequestUtils";

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
        selected: undefined
      }
  },
  mounted: function () {
    this.selected = undefined
    this.getRoutes();
  },
  methods: {
    getRoutes: function () {
      this.selected = undefined;
      api
        .get("routes")
        .then((response) => {
          if (!response.data) return;

          this.routes = response.data.data;
        })
        .catch((err) => console.log(err));
    },
    didPressEdit: function (route) {
      this.selected = route
    },
    didPressNew: function () {
      this.selected = undefined;
    }
  },
};
</script>

<style>
</style>
