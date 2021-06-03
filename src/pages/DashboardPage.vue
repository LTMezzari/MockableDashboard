<template>
  <div>
    <div class="wrapper">
      <side-bar
        class="side-bar"
        :routes="routes"
        v-on:refresh="getRoutes"
        v-on:edit="didPressEdit"
        v-on:import="didPressImport"
        v-on:export="didPressExport"
      />
      <div class="content">
        <Header class="header" @settings="didPressSettings"/>
        <div class="main-panel">
          <route-editor ref="editor" v-on:updated="getRoutes" />
        </div>
        <Footer class="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getRoutes, States} from "../repository/RoutesRepository";

// Components
import RouteEditor from "../layout/RouteEditor.vue";
import SideBar from "../layout/SideBar.vue";
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";

// Modals
import RouteImporter from "../layout/RouteImporter.vue";
import RouteExporter from "../layout/RouteExporter.vue";
import UserConfiguration from "../layout/UserConfiguration.vue";

export default {
  name: "DashboardPage",
  components: {
    RouteEditor,
    SideBar,
    Header,
    Footer,
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
    },
    didPressSettings: function () {
      this.$modal.show(UserConfiguration);
    }
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.side-bar {
  flex: .2;
  box-shadow: 0;
}
.content {
  flex: .8;
}
.header {
  flex: .1;
}
.main-panel {
  background-color: #232528;
  box-shadow: inset 1px 0px 0px 0px #dddddd;
}
.footer {
  flex: .1;
}
</style>