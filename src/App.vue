<template>
  <div id="app">
    <button v-on:click="getRoutes">Refresh</button>
    <ListRoutes :routes="routes" :onRouteDeleted="getRoutes" :didPressEdit="editRoute"/>
    <CreateRoute :route="selected" :onRouteCreated="getRoutes"/>
  </div>
</template>

<script>
import ListRoutes from "./components/ListRoutes";
import CreateRoute from "./components/CreateRoute";
import api from "./utils/RequestUtils";

export default {
  name: "App",
  components: {
    ListRoutes,
    CreateRoute,
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
      api
        .get("routes")
        .then((response) => {
          if (!response.data) return;

          this.routes = response.data.data;
        })
        .catch((err) => console.log(err));
    },
    editRoute: function (route) {
      this.selected = route
    },
  },
};
</script>

<style>
</style>
