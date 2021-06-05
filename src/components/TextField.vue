<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
    </slot>
    <input
      :value="value"
      @input="onChangeValue"
      v-bind="$attrs"
      class="form-control">
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
        type: [String, Number, Boolean],
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
<style>
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}
.form-control {
  background-color: #555B62;
  color: white;
}
.control-label {
  color: white;
}
</style>