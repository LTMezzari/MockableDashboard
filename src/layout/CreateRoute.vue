<template>
  <div class="subcard">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-2">
          <text-field
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
          <text-field
            label="Path"
            :disabled="isEditing"
            placeholder="Path"
            v-model="path"
            type="text"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <text-field
            label="Description"
            placeholder="Description"
            v-model="description"
            type="text"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <expandable-view label="Response" :isExpanded="!isEditing">
            <slot>
              <json-editor v-model="response" />
            </slot>
          </expandable-view>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <expandable-view label="Body">
            <slot>
              <json-editor v-model="body" />
            </slot>
          </expandable-view>
        </div>
      </div>
      <div class="row">
        <expandable-view class="col-md-12" label="Configuration">
          <div class="row">
            <div class="col-md-2">
              <text-field
                label="Status"
                placeholder="Status"
                v-model="status"
                type="number"
              />
            </div>
            <div class="col-md-2">
              <text-field
                label="Time Out"
                placeholder="Time Out"
                v-model="timeOut"
                type="number"
              />
            </div>
            <div class="col-md-1">
              <text-field
                label="Authenticated"
                placeholder="Authenticated"
                v-model="authentication"
                type="checkbox"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <slot>
                <json-editor label="Validator" v-model="validation" />
              </slot>
            </div>
          </div>
        </expandable-view>
      </div>
      <div class="text-center">
        <Button type="info" round @click.native.prevent="onSubmit">
          {{ isEditing ? "Edit" : "Create" }}
        </Button>
        <Button
          v-if="isEditing"
          type="warning"
          round
          @click.native.prevent="onLogs"
        >
          Logs
        </Button>
        <Button
          v-if="isEditing"
          type="danger"
          round
          @click.native.prevent="onDelete"
        >
          Delete
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getRoute,
  postRoute,
  putRoute,
  deleteRoute,
  States,
} from "../repository/RoutesRepository";

import TextField from "../components/TextField";
import Button from "../components/Button";
import JsonEditor from "../components/JsonEditor";
import ExpandableView from "../components/ExpandableView";

export default {
  name: "CreateRoute",
  components: {
    TextField,
    Button,
    JsonEditor,
    ExpandableView,
  },
  props: {
    route: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {
      path: "",
      method: "",
      description: "",
      status: 200,
      timeOut: "",
      authentication: false,
      response: {},
      body: {},
      validation: {}
    };
  },
  mounted: function () {
    if (!this.route) {
      return;
    }
    this.fillFields(this.route);
    this.get();
  },
  watch: {
    route: function (value) {
      if (!value) {
        this.clearFields();
        return;
      }
      this.fillFields(value);
      this.get();
    },
  },
  methods: {
    // --------------------- Utility Methods
    onSubmit: function () {
      if (this.isEditing) {
        return this.edit();
      }
      this.create();
    },
    onRouteFinished: function (route) {
      this.$emit("finished", route);
    },
    onRouteDeleted: function () {
      this.$emit("deleted");
    },
    extractBody: function () {
      return {
        path: this.path,
        method: this.method,
        description: this.description,
        status: !this.status ? undefined : parseInt(this.status),
        timeOut: !this.timeOut ? undefined : parseInt(this.timeOut),
        authentication: this.authentication,
        response: this.response,
        body: this.body,
        validation: this.validation
      };
    },
    clearFields: function () {
      this.path = "";
      this.method = "";
      this.response = "";
      this.description = "";
      this.status = 200;
      this.timeOut = "";
      this.response = {};
      this.body = {};
      this.authentication = false;
      this.validation = {};
    },
    fillFields: function (value) {
      this.path = value.path;
      this.method = value.method;
      this.description = value.description;
      this.status = value.status;
      this.timeOut = value.timeOut;
      this.authentication = value.authentication;
      this.response = value.response;
      this.body = value.body;
      this.validation = value.validation;
    },
    // --------------------- Service Methods
    get: function () {
      getRoute(this.route.id).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            break;
          case States.FAILED:
            alert(data.message);
            break;
          default:
            break;
        }
      });
    },
    create: function () {
      postRoute(this.extractBody()).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.onRouteFinished(data);
            break;
          case States.FAILED:
            alert(data.message);
            break;
          default:
            break;
        }
      });
    },
    edit: function () {
      putRoute(this.route.id, this.extractBody()).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.onRouteFinished(data);
            break;
          case States.FAILED:
            alert(data.message);
            break;
          default:
            break;
        }
      });
    },
    onDelete: function () {
      deleteRoute(this.route.id).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.clearFields();
            this.onRouteDeleted();
            break;
          case States.FAILED:
            alert(data.message);
            break;
          default:
            break;
        }
      });
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