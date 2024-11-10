<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
    </slot>
    <div class="input-group">
      <input
        :value="value"
        @input="onChangeValue"
        v-bind="$attrs"
        class="form-control" />
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: "TextField",
    props: {
      label: {
        type: String,
        required: false,
      },
      value: {
        type: [String, Number],
        required: false,
        default: function () {
          return undefined;
        }
      }
    },
    methods: {
      onChangeValue: function (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>
<style lang="scss">
</style>