<template>
  <div class="expandable" @click="onExpanded">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{ label }}
      </label>
    </slot>
    <div v-if="isInternallyExpanded">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExpandableView",
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
.expandable {
  min-height: 50px;
  margin-top: 32px;
  background-color: cadetblue;
}
</style>