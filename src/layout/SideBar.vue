<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a id="header" class="simple-text"> Mockable </a>
        <div id="buttons">
          <button class="btn-sm" v-on:click="$emit('refresh')" title="Refresh">
            <font-awesome-icon color="#9b59b6" icon="sync" />
          </button>
          <button class="btn-sm" v-on:click="$emit('import')" title="Import">
            <font-awesome-icon color="#9b59b6" icon="download" />
          </button>
          <button class="btn-sm" v-on:click="$emit('export')" title="Export">
            <font-awesome-icon color="#9b59b6" icon="upload" />
          </button>
          <button
            class="btn-sm"
            v-on:click="$emit('settings')"
            title="Settings"
          >
            <font-awesome-icon color="#9b59b6" icon="cog" />
          </button>
        </div>
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
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
.nav {
  display: block;
}
.logo {
  border-color: white !important;
}
.sidebar-wrapper {
  background-color: #1c1e21;
  box-shadow: none !important;
}
.simple-text {
  color: white !important;
}
.btn-sm {
  background: transparent;
  border-color: transparent;
  font-size: 20px;
}
#buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#header {
  font-family: Courgette;
  font-size: 20pt;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20pt;
  color: #8e44ad !important;
}
</style>