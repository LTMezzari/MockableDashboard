<template>
  <div class="subcard">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-2">
          <TextField
            label="Method"
            :disabled="isEditing"
            placeholder="Method"
            v-model="method"
            type="text"
          />
          <!-- <select v-model="method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select> -->
        </div>
        <div class="col-md-7">
          <TextField
            label="Path"
            :disabled="isEditing"
            placeholder="Path"
            v-model="path"
            type="text"
          />
        </div>
        <div class="col-md-2">
          <TextField
            label="Status"
            placeholder="Status"
            v-model="status"
            type="number"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <TextField
            label="Time Out"
            placeholder="Time Out"
            v-model="timeOut"
            type="number"
          />
        </div>
        <div class="col-md-1">
          <TextField
            label="Authenticated"
            placeholder="Authenticated"
            v-model="needsAuthentication"
            type="checkbox"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <TextField
            label="Description"
            placeholder="Description"
            v-model="description"
            type="text"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <JsonEditor label="Response" v-model="response" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <JsonEditor label="Body" v-model="body" />
        </div>
      </div>
      <div class="text-center">
        <Button type="info" round @click.native.prevent="submit">
          {{ isEditing ? "Edit" : "Create" }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../utils/RequestUtils";

import TextField from "../components/TextField";
import Button from "../components/Button";
import JsonEditor from "../components/JsonEditor";

export default {
  name: "CreateRoute",
  components: {
    TextField,
    Button,
    JsonEditor,
  },
  props: {
    route: {
      type: Object,
      required: false,
    },
    onRouteCreated: {
      type: Function,
      required: false,
    },
  },
  updated: function () {
    if (this.currentRoute && !this.route) {
      this.currentRoute = undefined;
      this.clearFields();
      return;
    }

    if (
      this.route?.path === this.currentRoute?.path &&
      this.route?.method === this.currentRoute?.method
    ) {
      return;
    }
    this.path = this.route?.path;
    this.method = this.route?.method;
    this.description = this.route?.description;
    this.status = this.route?.status;
    this.timeOut = this.route?.timeOut;
    this.needsAuthentication = this.route?.needsAuthentication;
    this.response = this.route?.response;
    this.body = this.route?.body;
    this.currentRoute = this.route;
  },
  data: function () {
    return {
      path: "",
      method: "",
      description: "",
      status: "",
      timeOut: "",
      needsAuthentication: false,
      response: {},
      body: {},
      currentRoute: undefined,
    };
  },
  methods: {
    submit: function () {
      if (this.isEditing) {
        return this.edit();
      }
      this.create();
    },
    create: function () {
      api
        .post("route", {
          path: this.path,
          method: this.method,
          description: this.description,
          status: this.status === "" ? undefined : parseInt(this.status),
          timeOut: this.timeOut === "" ? undefined : parseInt(this.timeOut),
          needsAuthentication: this.needsAuthentication,
          response: this.response,
          body: this.body,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.clearFields();
          this.onRouteCreated();
        })
        .catch((err) => console.log(err));
    },
    edit: function () {
      api
        .put(`route/${this.route.id}`, {
          path: this.path,
          method: this.method,
          description: this.description,
          status: this.status === "" ? undefined : parseInt(this.status),
          timeOut: this.timeOut === "" ? undefined : parseInt(this.timeOut),
          needsAuthentication: this.needsAuthentication,
          response: this.response,
          body: this.body,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.clearFields();
          this.onRouteCreated();
        })
        .catch((err) => console.log(err));
    },
    clearFields: function () {
      this.path = "";
      this.method = "";
      this.response = "";
      this.description = "";
      this.status = "";
      this.timeOut = "";
      this.response = {};
      this.body = {};
      this.needsAuthentication = "";
    },
  },
  computed: {
    isEditing: function () {
      return !!this.route;
    },
  },
};
</script>

<style scoped>
.subcard {
  padding: 32px;
}
</style>