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
        @settings="didPressSettings"
      />
      <div class="content">
        <div class="main-panel">
          <route-editor ref="editor" v-on:updated="getRoutes" />
        </div>
        <Footer class="footer" />
      </div>
    </div>
    <modal-component
      name="importersModal"
      title="Import"
      :adaptative="true"
      :scrollable="true"
      :reset="true"
      height="auto"
      width="50%"
    >
      <RouteImporter @refresh="getRoutes" />
    </modal-component>
    <modal-component
      name="exportersModal"
      title="Export"
      :adaptative="true"
      :scrollable="true"
      :reset="true"
      height="auto"
      width="50%"
    >
      <RouteExporter @refresh="getRoutes" />
    </modal-component>
    <modal-component
      name="configurationsModal"
      title="Settings"
      :adaptative="true"
      :scrollable="true"
      :reset="true"
      height="auto"
      width="50%"
    >
      <UserConfiguration @refresh="getRoutes" />
    </modal-component>
  </div>
</template>

<script>
import { getRoutes, States } from "../repository/RoutesRepository";

// Components
import RouteEditor from "../layout/RouteEditor.vue";
import SideBar from "../layout/SideBar.vue";
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
    Footer,
    RouteImporter,
    RouteExporter,
    UserConfiguration,
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
            this.$refs.editor.onRoutesUpdated(this.routes);
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
      this.$modal.show("importersModal");
    },
    didPressExport: function () {
      this.$modal.show("exportersModal");
    },
    didPressSettings: function () {
      this.$modal.show("configurationsModal");
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  .side-bar {
    flex: 0.2;
    box-shadow: 0;
  }
  .content {
    flex: 0.9;
  }
  .header {
    flex: 0.1;
  }
  .main-panel {
    background-color: #232528;
    box-shadow: inset 1px 0px 0px 0px #dddddd;
  }
  .footer {
    flex: 0.1;
  }
}
</style>