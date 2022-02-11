<template>
  <div>
    <!-- Header -->
    <div class="horizontal-header">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        v-on:click="selectTab(tab, index)"
        :style="{backgroundColor: isTabSelected(index) ? '#1C1E21' : '#00000000'}"
      >
        <span
          v-if="tab.method"
          class="method"
          :style="{ color: getColor(tab) }"
          >{{ tab.method }}</span
        >
        <p class="tab-name">
          {{ tab.name }}
        </p>
        <button
          type="button"
          aria-hidden="true"
          class="close"
          v-on:click.stop="onTabClosed(index)"
        >
          <font-awesome-icon color="white" icon="times" />
        </button>
      </div>
      <div class="tab-add" v-on:click="putTab()">
        <button type="button" aria-hidden="true" class="close">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <!-- Content -->
    <div>
      <create-route
        v-if="hasOpenTab"
        :route="currentRoute"
        @finished="onRouteUpdated(currentTab, $event)"
        @deleted="onRouteDeleted(currentTab)"
      />
    </div>
  </div>
</template>

<script>
import { getMethodColor } from "../utils/RouteUtils";
import CreateRoute from "./CreateRoute.vue";
const maxTabs = 0;
export default {
  name: "RouteEditor",
  components: {
    CreateRoute,
  },
  data: function () {
    return {
      currentTab: -1,
      currentRoute: undefined,
      tabs: [],
    };
  },
  methods: {
    // -------------------------- Handlers
    onRoutesUpdated: function (routes) {
      for (let i = this.tabs.length - 1; i >= 0; i--) {
        const tab = this.tabs[i];
        if (!tab.route) {
          continue;
        }

        const route = routes.find((r) => r.path === tab.route.path && r.method === tab.route.method);
        if (!route) {
          this.removeTab(i);
          if (i === this.currentTab) {
            this.currentTab = -1;
            this.currentRoute = undefined;
          }
          continue;
        }
        this.tabs[i].route = route;
        if (i === this.currentTab) {
          this.currentRoute = route;
        }
      }
      this.updateCurrentTab();
    },
    onTabClosed: function (index) {
      if (this.currentTab === index) {
        this.currentTab = -1;
        this.currentRoute = undefined;
      }
      this.removeTab(index);
    },
    onTabLimitReached: function (route) {
      this.currentRoute = route;
      this.currentTab = 0;
      this.updateTab(0, route);
    },
    onRouteUpdated: function (index, route) {
      this.$emit("updated");
      this.updateTab(index, route);
      this.currentTab = index;
      this.currentRoute = route;
    },
    onRouteDeleted: function (index) {
      this.$emit("updated");
      this.removeTab(index);
      if (this.currentTab === index) {
        this.currentTab--;
        const tab = this.tabs[this.currentTab];
        this.currentRoute = tab?.route;
      }
    },
    hasRouteTabOpen: function (route) {
      if (!route) {
        return false;
      }

      const tab = this.tabs.find((item) => item.route?.id === route?.id);
      const index = this.tabs.indexOf(tab);
      if (index >= 0) {
        this.selectTab(tab, index);
        return true;
      }
      return false;
    },
    // ------------------------- Crud
    putTab: function (route) {
      if (this.isAboveTabLimit) {
        this.onTabLimitReached(route);
        return;
      }

      if (this.hasRouteTabOpen(route)) {
        return;
      }
      this.newTab(route);
    },
    newTab: function (route) {
      const index = this.tabs.length + 1;
      this.currentRoute = route;
      this.currentTab = index - 1;

      this.tabs.push(this.createTab(index, route));
    },
    removeTab: function (index) {
      if (index < 0 || index > this.tabs.length) {
        return;
      }
      this.tabs.splice(index, 1);
      this.$forceUpdate();
    },
    // ---------------------------- Utility
    getColor: function (route) {
      return getMethodColor(route);
    },
    updateTab: function (index, route) {
      if (index < 0 || index > this.tabs.length) {
        return;
      }
      const current = this.tabs[index];
      this.tabs[index] = this.createTab(current.id, route);
      this.$forceUpdate();
    },
    selectTab: function (tab, index) {
      if (index < 0 || index > this.tabs.length) {
        return;
      }
      this.currentTab = index;
      this.currentRoute = tab.route;
      this.$forceUpdate();
    },
    createTab: function (id, route) {
      return {
        id,
        name: route ? route.name ?? route.path : "New Tab",
        method: route?.method,
        route: route,
      };
    },
    isTabSelected: function (index) {
      return this.currentTab === index;
    },
    updateCurrentTab: function () {
      if (this.currentRoute) {
        const tab = this.tabs.find((t) => t.route === this.currentRoute);
        const index = this.tabs.indexOf(tab);
        this.currentTab = index;
      }
    },
  },
  computed: {
    hasOpenTab: function () {
      return this.currentTab >= 0;
    },
    isAboveTabLimit: function () {
      if (maxTabs <= 0) {
        return false;
      }
      return this.tabs.length >= maxTabs;
    },
  },
};
</script>

<style scoped>
.horizontal-header {
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  display: -webkit-inline-box;
}
.tab {
  min-width: 150px;
  max-width: 200px;
  display: flex;
  min-height: 34px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.tab-add {
  max-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 34px;
  padding: 0 8px 0 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom-right-radius: 5px;
}
.tab-name {
  color: #a3320b;
  text-align: center;
  flex: 0.9;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}
.close {
  color: white;
  margin-left: 4px;
  margin-right: 4px;
}
.method {
  margin-left: 4px;
  margin-right: 4px;
}
</style>