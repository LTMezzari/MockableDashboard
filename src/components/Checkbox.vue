<template>
  <label class="custom-check-box">
    <input
      type="checkbox"
      v-bind="$attrs"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
    <span></span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    value: {
      type: [Boolean],
      required: false,
      default: function () {
        return false;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>