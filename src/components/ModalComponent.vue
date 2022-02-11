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
.modal-header {
  display: flex;
  font-size: 8pt;
  font-family: Courgette;
  align-items: center;
  background-color: #8e44ad;
  color: white;
  border-bottom-color: transparent;
  h1 {
    font-family: Courgette;
    margin: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    font-size: 20px;
  }
}
</style>