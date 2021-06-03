<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a class="simple-text"> Mockable </a>
        <button class="btn-sm" v-on:click="$emit('refresh')">Refresh</button>
        <button class="btn-sm" v-on:click="$emit('import')">Import</button>
        <button class="btn-sm" v-on:click="$emit('export')">Export</button>
      </div>
      <ul class="nav">
        <side-bar-route
          v-for="(item, index) in routes"
          :key="index"
          :route="item"
          @click="$emit('edit', item)"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import SideBarRoute from "../components/SideBarRoute.vue";
export default {
  name: "SideBar",
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  components: {
    SideBarRoute,
  },
};
</script>
<style scoped>
.nav {
  display: block;
}
.logo {
  border-color: white !important;
}
.sidebar-wrapper {
  background-color: #1C1E21;
  box-shadow: none !important;
}
.simple-text {
  color: white !important;
}
</style>