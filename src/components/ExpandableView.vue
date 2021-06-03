<template>
  <div v-bind="$attrs">
    <slot name="header">
      <div class="expandable" @click="onExpanded" >
        <slot name="label">
          <label v-if="label" class="control-label expandable-label">
            {{ label }}
          </label>
        </slot>
      </div>
    </slot>
    <div v-if="isInternallyExpanded">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: "ExpandableView",
  inheritAttrs: false,
  props: {
    isExpanded: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
  },
  data: function () {
    return {
      isInternallyExpanded: this.isExpanded,
    };
  },
  methods: {
    onExpanded: function () {
      this.isInternallyExpanded = !this.isInternallyExpanded;
      this.$emit("change", this.isInternallyExpanded);
    },
  },
  watch: {
    isExpanded: function (newValue) {
      if (this.isInternallyExpanded !== newValue) {
        this.isInternallyExpanded = newValue;
      }
    },
  },
};
</script>
<style scoped>
.expandable-label {
  color: white;
  margin: 16px;
}
.expandable {
  min-height: 50px;
  margin-top: 32px;
  background-color: #555B62;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-items: center;
}
</style>