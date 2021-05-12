<template>
  <div class="form-group">
    <label v-if="label" class="control-label">
      {{ label }}
    </label>
    <VJsoneditor
      ref="editor"
      :value="value"
      :options="options"
      :plus="false"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
import VJsoneditor from "v-jsoneditor/src/index";
export default {
  inheritAttrs: false,
  name: "JsonEditor",
  components: {
    VJsoneditor,
  },
  mounted: function () {
    this.options = {
      ...this.options,
      onChange: () => this.onChange(),
    };
  },
  updated: function () {
    const editor = this.$refs.editor.editor;
    if (this.selection) {
      const { start, end, text } = this.selection;
      console.log(this.selection);
      const row = start.row <= end.row ? start.row : end.row;
      const column = start.column <= end.column ? start.column - 2 : end.column - 1;
      console.log(`${row}, ${column}`);
      editor.aceEditor.moveCursorTo(row - 1, text.length === 0 ? start.column : column);
    }
  },
  data: function () {
    return {
      selection: undefined,
      options: {
        mode: "code",
        enableSort: false,
        enableTransform: false,
        mainMenuBar: false,
      },
    };
  },
  methods: {
    onChange: function () {
      const editor = this.$refs.editor.editor;
      this.selection = editor.getTextSelection();
      this.$emit("input", editor.get());
    },
  },
  props: {
    label: String,
    value: Object,
  },
};
</script>
<style>
</style>