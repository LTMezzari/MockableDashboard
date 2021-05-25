<template>
  <div
    class="sidebar"
    data-background-color="black"
    data-active-color="success"
  >
    <div class="sidebar-wrapper" id="style-3">
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
<style>
</style>