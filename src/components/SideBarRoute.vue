<template>
    <a @click="onPress(route)" class="nav-link">
        <p>{{route.method}}</p>
        <p>{{route.path}}</p>
    </a>
</template>
<script>
export default {
  name: "SideBarRoute",
  inheritAttrs: false,
  props: {
    route: {
      type: Object,
      required: true
    },
    onPress: {
      type: Function,
      required: false,
    }
  },
  methods: {
    didPress: (route) => {
      if (!this.onPress) return;
      this.onPress(route);
    }
  }
};
</script>
<style>
</style>