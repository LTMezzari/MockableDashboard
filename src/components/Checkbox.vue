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
.custom-check-box {
  --checkbox-color: grey;
  --checkmark-color: white;
  position: relative;
  span {
    width: 16px;
    height: 16px;
    border: 1px solid var(--checkbox-color);
    display: inline-block;
    border-radius: 50%;
    transition: all linear 0.3s;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 6px;
      border-bottom: 2px solid var(--checkmark-color);
      border-right: 2px solid var(--checkmark-color);
      height: 9px;
      width: 4px;
      transform: rotate(45deg);
      visibility: hidden;
    }
  }
  input {
    display: none;
    &:checked ~ span {
      background: var(--checkbox-color);
      &:after {
        visibility: visible;
      }
    }
  }
}
</style>