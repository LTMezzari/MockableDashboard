<template>
  <div class="form-group">
    <label v-if="label" class="control-label">
      {{label}}
    </label>
    <input
      :value="value"
      @input="$emit('input',$event.target.value)"
      v-bind="$attrs"
      class="form-control">
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: "TextField",
    props: {
      label: String,
      value: [String, Number, Boolean]
    },
  }
</script>
<style>
</style>