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
          <expandable-view label="Body">
            <json-editor v-model="body" />
          </expandable-view>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <expandable-view label="Response">
            <json-editor v-model="response" />
          </expandable-view>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { testMethod, States } from "../repository/DynamicRepository";

import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import ExpandableView from "../components/ExpandableView.vue";
import JsonEditor from "../components/JsonEditor.vue";
import KeyValueEditor from "../components/KeyValueEditor.vue";

export default {
  name: "CreateRoute",
  components: {
    TextField,
    Button,
    JsonEditor,
    KeyValueEditor,
    ExpandableView,
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    const headers = [];
    if (this.route.authentication === true) {
      headers.push({
        key: 'Authorization',
        value: 'Bearer of the method'
      });
    }
    return {
      path: this.route.path,
      method: this.route.method,
      headers: headers,
      body: {},
      response: undefined,
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
        this.response = data;
        switch (state) {
          case States.SUCCESSFUL:
            this.showSuccess("Request successful, check your logs");
            this.$emit("refresh");
            break;
          case States.FAILED:
            this.showError(data.message);
            this.$emit("refresh");
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