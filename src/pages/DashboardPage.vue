<template>
  <div>
    <div class="wrapper">
      <side-bar
        :routes="routes"
        v-on:refresh="getRoutes"
        v-on:edit="didPressEdit"
        v-on:import="didPressImport"
        v-on:export="didPressExport"
      />
      <div class="main-panel">
        <route-editor ref="editor" v-on:updated="getRoutes" />
      </div>
    </div>
  </div>
</template>

<script>
import {getRoutes, States} from "../repository/RoutesRepository";
import RouteEditor from "../layout/RouteEditor.vue";
import SideBar from "../layout/SideBar.vue";

// Modals
import RouteImporter from "../layout/RouteImporter.vue";
import RouteExporter from "../layout/RouteExporter.vue";

export default {
  name: "DashboardPage",
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
    didPressImport: function () {
      this.$modal.show(
        RouteImporter,
      );
    },
    didPressExport: function () {
      this.$modal.show(RouteExporter);
    }
  },
};
</script>

<style>
</style>