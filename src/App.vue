<template>
  <div>
    <!-- <notifications></notifications> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted: function () {
    if (localStorage.identifier) return;
    const randomNumber = Math.random() * (Math.random() + 2000);
    const identifier = new Buffer(navigator.userAgent + randomNumber).toString("base64");
    localStorage.identifier = identifier;
  }
};
</script>
<style>
</style>
