<template>
  <div class="root">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-2">
          <text-field
            label="Method"
            :disabled="true"
            placeholder="Method"
            v-model="method"
            type="text"
          />
        </div>
        <div class="col-md-7">
          <text-field
            label="Path"
            placeholder="Path"
            v-model="path"
            type="text"
          />
        </div>
        <div class="col-md-2 text-center save">
          <Button type="info" round @click.native.prevent="onTest">
            Test
          </Button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <key-value-editor label="Headers" v-model="headers" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <json-editor label="Body" v-model="body" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { testMethod, States } from "../repository/DynamicRepository";

import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import JsonEditor from "../components/JsonEditor.vue";
import KeyValueEditor from "../components/KeyValueEditor.vue";

export default {
  name: "CreateRoute",
  components: {
    TextField,
    Button,
    JsonEditor,
    KeyValueEditor,
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      path: this.route.path,
      method: this.route.method,
      headers: [],
      body: {},
    };
  },
  methods: {
    showError: function (message) {
      this.$notify({
        type: "danger",
        title: "Error",
        message: message,
        verticalAlign: "top",
        horizontalAlign: "right",
      });
    },
    showSuccess: function (message) {
      this.$notify({
        type: "success",
        title: "Success",
        message: message,
        verticalAlign: "bottom",
        horizontalAlgn: "right",
      });
    },
    buildHeaders: function () {
      const result = {};
      for (const { key, value } of this.headers) {
        result[key] = value;
      }
      return result;
    },
    onTest: function () {
      testMethod(
        this.method,
        this.path,
        this.body,
        this.buildHeaders()
      ).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.showSuccess("Request successful, check your logs");
            this.$emit("refresh");
            break;
          case States.FAILED:
            this.showError(data.message);
            break;
          default:
            break;
        }
      });
    },
  },
};
</script>

<style scoped>
.root {
  padding: 32px;
  background-color: #1c1e21;
}
.save {
  align-self: center;
}
</style>