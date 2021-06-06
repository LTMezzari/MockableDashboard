<template>
  <div>
    <slot name="label">
      <label v-if="label" class="control-label">
        {{ label }}
      </label>
    </slot>
    <div class="row form-group" v-for="(field, index) of fields" :key="index">
      <div class="form">
        <input
          class="col-md-12 form-input"
          placeholder="Key"
          :value="field.key"
          @input="onUpdate(index, 'key', $event.target.value)"
        />
      </div>
      <div class="form">
        <input
          class="col-md-12 form-input"
          placeholder="Value"
          :value="field.value"
          @input="onUpdate(index, 'value', $event.target.value)"
        />
      </div>
      <div class="control" v-if="isDeletable(index)">
        <button @click.prevent="onDelete(index)">
          <font-awesome-icon color="white" icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyValueEditor",
  props: {
    label: String,
    value: Array,
  },
  data: function () {
    let value = this.value;
    if (value?.length <= 0) {
      value = undefined;
    }

    const fields = value ?? [];
    return {
      fields: [
        ...fields,
        {
          key: "",
          value: "",
        },
      ],
    };
  },
  methods: {
    onUpdate: function (index, key, value) {
      const field = this.fields[index];
      if (!field) {
        return;
      }

      this.fields[index] = {
        ...field,
        [key]: value,
      };
      this.shouldAddField(index);
      this.$emit("input", this.getRealFields());
    },
    onDelete: function (index) {
      if (index < 0 || index > this.fields.length) {
        return;
      }
      this.fields.splice(index, 1);
    },
    shouldAddField: function (index) {
      if (this.fields.length - 1 === index) {
        this.fields.push({
          key: "",
          value: "",
        });
      }
    },
    getRealFields: function () {
      return this.fields.filter(
        (field) =>
          !!field.value && field.value !== "" && !!field.key && field.key !== ""
      );
    },
    isDeletable: function (index) {
      return this.fields.length - 1 !== index;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  flex: 1;
}
.form-group {
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
}
.form-input {
  padding: 7px 18px;
  margin-right: 0px !important;
  margin-left: 0px !important;
  background-color: #555b62;
  color: white;
  border-width: 0.5px;
}
.control {
  flex: 0.1;
  button {
    background: transparent;
    border-color: transparent;
    margin-left: 4px;
  }
}
</style>