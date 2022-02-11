<template>
  <div class="subcard">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-5">
          <text-field
            label="Name"
            :placeholder="routeNamePlaceholder"
            v-model="name"
            type="text"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <text-field
            label="Method"
            :disabled="isEditing"
            placeholder="Method"
            v-model="method"
            type="text"
          />
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
        <div class="col-md-2 text-center save">
          <Button
            type="info"
            :disabled="isSavingDisabled"
            round
            @click.native.prevent="onSubmit"
          >
            Save
          </Button>
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
                <label class="control-label"> Authenticated </label>
                <checkbox
                  placeholder="Authenticated"
                  v-model="authentication"
                />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <json-editor label="Validator" v-model="validation" />
            </div>
          </div>
        </expandable-view>
      </div>
      <div class="text-center">
        <Button
          class="buttons"
          v-if="isEditing"
          type="info"
          round
          @click.native.prevent="onTest"
        >
          Test
        </Button>
        <Button
          class="buttons"
          v-if="isEditing"
          type="warning"
          round
          @click.native.prevent="onLogs"
        >
          Logs
        </Button>
        <Button
          class="buttons"
          v-if="isEditing"
          type="danger"
          round
          @click.native.prevent="onDelete"
        >
          Delete
        </Button>
      </div>
    </form>
    <modal-component
      name="logsModal"
      title="Logs"
      :scrollable="true"
      :reset="true"
      height="auto"
      width="50%"
    >
      <RouteLogs :route="route" :logs="logs" />
    </modal-component>
    <modal-component
      name="testModal"
      :title="getModalTitle()"
      :adaptative="true"
      :scrollable="true"
      :reset="true"
      height="auto"
      width="90%"
    >
      <RouteTest :route="route" @refresh="get" />
    </modal-component>
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

import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import JsonEditor from "../components/JsonEditor.vue";
import ExpandableView from "../components/ExpandableView.vue";
import Checkbox from "../components/Checkbox.vue";

import RouteLogs from "./RouteLogs.vue";
import RouteTest from "./RouteTest.vue";
import ModalComponent from '../components/ModalComponent.vue';

export default {
  name: "CreateRoute",
  components: {
    TextField,
    Button,
    JsonEditor,
    ExpandableView,
    RouteLogs,
    RouteTest,
    Checkbox,
    ModalComponent,
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
      name: "",
      description: "",
      status: 200,
      timeOut: "",
      authentication: false,
      response: {},
      body: {},
      validation: {},
      logs: [],
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
    getModalTitle: function () {
      if (this.route) {
        return this.route.name ?? this.route.path;
      }
      return undefined;
    },
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
        name: this.handleString(this.name),
        description: this.handleString(this.description),
        status: this.handleInt(this.status),
        timeOut: this.handleInt(this.timeOut),
        authentication: this.handleBoolean(this.authentication),
        response: this.handleObject(this.response),
        body: this.handleObject(this.body),
        validation: this.handleObject(this.validation),
      };
    },
    handleString: function (value) {
      return value && value !== "" ? value : undefined;
    },
    handleInt: function (value) {
      return value ? parseInt(value, 10) : undefined;
    },
    handleObject: function (value) {
      if (!value || Object.entries(value).length === 0) {
        return;
      }
      return !value ? undefined : value;
    },
    handleBoolean: function (value) {
      return value == true;
    },
    clearFields: function () {
      this.path = "";
      this.method = "";
      this.response = "";
      this.name = "";
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
      this.name = value.name;
      this.description = value.description;
      this.status = value.status;
      this.timeOut = value.timeOut;
      this.authentication = value.authentication;
      this.response = value.response;
      this.body = value.body;
      this.validation = value.validation;
      this.logs = value.logs;
    },
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
    // --------------------- Service Methods
    get: function () {
      getRoute(this.route.id).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.fillFields(data);
            break;
          case States.FAILED:
            this.showError(data.message);
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
            this.showSuccess("Route Created");
            break;
          case States.FAILED:
            this.showError(data.message);
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
            this.showSuccess("Route Updated");
            break;
          case States.FAILED:
            this.showError(data.message);
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
            this.showSuccess("Route Deleted");
            break;
          case States.FAILED:
            this.showError(data.message);
            break;
          default:
            break;
        }
      });
    },
    onLogs: function () {
      this.$modal.show("logsModal");
    },
    onTest: function () {
      this.$modal.show("testModal");
    },
  },
  computed: {
    isEditing: function () {
      return !!this.route;
    },
    isSavingDisabled: function () {
      return !this.path || !this.method;
    },
    routeNamePlaceholder: function () {
      if (!this.path || this.path === "") {
        return "Name";
      }
      return this.path;
    },
  },
};
</script>

<style scoped>
.subcard {
  padding: 32px;
}
.save {
  align-self: center;
}
.modal {
  min-height: 50%;
}
.buttons {
  margin: 16px;
}
</style>