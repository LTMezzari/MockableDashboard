<template>
    <a @click="$emit('click', $event.target)" class="nav-link">
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
    }
  }
};
</script>
<style>
</style>