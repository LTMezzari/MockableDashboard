<template>
  <modal :name="name" v-bind="$attrs">
    <slot name="header">
      <div v-if="title" class="modal-header">
        <h1>{{ title }}</h1>
        <button class="clear" @click="$modal.hide(name)">
          <font-awesome-icon color="white" icon="times" />
        </button>
      </div>
    </slot>
    <slot></slot>
  </modal>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "ModalComponent",
  props: {
    name: String,
    title: String,
  },
};
</script>
<style lang="scss">
</style>