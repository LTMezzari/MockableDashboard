<template>
  <a class="nav-link route" @click="$emit('click', $event.target)">
    <span class="method" :style="{ color: getColor(route) }">{{
      route.method
    }}</span>
    <p class="name">{{ route.name || route.path }}</p>
  </a>
</template>
<script>
import { getMethodColor } from "../utils/RouteUtils";

export default {
  name: "SideBarRoute",
  inheritAttrs: false,
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getColor: function (route) {
      return getMethodColor(route);
    },
  },
};
</script>
<style scoped>
.route {
  display: flex;
}
.method {
  align-self: center;
  margin-right: 10px;
  font-weight: bold;
  font-size: 15px;
  border: 2px;
  border-color: white;
}
.name {
  color: white;
}
</style>