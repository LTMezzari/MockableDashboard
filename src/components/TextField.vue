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
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}
.input-group {
  height: 44px;
  background-color: #555B62;
  color: white;
  border-radius: 10px;
  .form-control {
    background-color: #555B62;
    color: white;
  }
  .input-group-append {
    .input-group-text {
      background-color: #555B62;
      border-color: transparent;
      padding: 0px !important;
    }
  }
  input {
    height: auto;
    &:disabled {
      color: rgba(255, 255, 255, 0.3);
    }
  }
}
.control-label {
  color: white;
}
</style>