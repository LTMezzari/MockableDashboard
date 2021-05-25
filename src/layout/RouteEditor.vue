<template>
    <div>
        <!-- Header -->
        <div class="horizontal-header">
            <div class="tab" v-for="(tab, index) in tabs" :key="index" v-on:click="selectTab(tab, index)">
                {{tab.name}}
            </div>
            <div v-on:click="putTab()">
                Add
            </div>
        </div>
        <!-- Content -->
        <div>
            <create-route v-if="hasOpenTab" :route="currentRoute" @finished="onRouteUpdated(currentTab, $event)" @deleted="onRouteDeleted(currentTab)"/>
        </div>
    </div>
</template>
<script>
import CreateRoute from './CreateRoute.vue';
const maxTabs = 5;
export default {
    name: 'RouteEditor',
    components: {
        CreateRoute,
    },
    data: function () {
        return {
            currentTab: -1,
            currentRoute: undefined,
            tabs: []
        }
    },
    methods: {
        // -------------------------- Handlers
        onTabLimitReached: function (route) {
            this.currentRoute = route;
            this.currentTab = 0;
            this.updateTab(0, route);
        },
        onRouteUpdated: function (index, route) {
            this.$emit('updated');
            this.updateTab(index, route);
            this.currentTab = index;
            this.currentRoute = route;
        },
        onRouteDeleted: function (index) {
            this.$emit('updated');
            this.removeTab(index);
            if (this.currentTab === index) {
                this.currentTab--;
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
        },
        createTab: function (id, route) {
            return {
                id,
                name: route ? `${route.method} ${route.path}` : 'New Tab',
                route: route,
            }
        }
    },
    computed: {
        hasOpenTab: function () {
            return this.currentTab >= 0;
        },
        isAboveTabLimit: function () {
            return this.tabs.length >= maxTabs;
        }
    }
}
</script>
<style scoped>
.horizontal-header {
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
}
.tab {
    flex-direction: row;
    flex: 1;
}
</style>