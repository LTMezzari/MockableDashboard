<template>
  <div>
    <notifications></notifications>
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
<style lang="scss">
.vm--overlay {
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.vm--modal {
  background-color: transparent !important;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
