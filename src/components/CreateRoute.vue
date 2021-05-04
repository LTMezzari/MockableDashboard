<template>
  <div>
    <input placeholder="Path" v-model="path" type="text" />
    <select v-model="method">
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
    </select>
    <input placeholder="Description" v-model="description" type="text" />
    <input placeholder="Response" v-model="response" type="text" />
    <input placeholder="Status" v-model="status" type="text" />
    <input placeholder="Time Out" v-model="timeOut" type="text" />
    <input placeholder="Authenticated" v-model="needsAuthentication" type="checkbox" />
    <button v-show="!isEditing" v-on:click="create">Create</button>
    <button v-show="isEditing" v-on:click="edit">Edit</button>
  </div>
</template>

<script>
import api from "../utils/RequestUtils";

export default {
  name: "CreateRoute",
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
    if (this.currentRoute !== this.route) {
      this.path = this.route.path;
      this.method = this.route.method;
      this.description = this.route.description;
      this.status = this.route.status;
      this.timeOut = this.route.timeOut;
      this.needsAuthentication = this.route.needsAuthentication;
      this.response = JSON.stringify(this.route.response);
      this.currentRoute = this.route;
    }
  },
  data: function () {
    return {
      path: "",
      method: "",
      description: "",
      status: "",
      timeOut: "",
      needsAuthentication: false,
      response: "",
      currentRoute: undefined,
    };
  },
  methods: {
    create: function () {
      api
        .post("route", {
          path: this.path,
          method: this.method,
          description: this.description,
          status: this.status === '' ? undefined : parseInt(this.status),
          timeOut: this.timeOut === '' ? undefined : parseInt(this.timeOut),
          needsAuthentication: this.needsAuthentication,
          response: JSON.parse(this.response ?? "{}") ?? this.response,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.path = "";
          this.method = "";
          this.response = "";
          this.description = "";
          this.status = "";
          this.timeOut = "";
          this.needsAuthentication = "";
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
          status: this.status === '' ? undefined : parseInt(this.status),
          timeOut: this.timeOut === '' ? undefined : parseInt(this.timeOut),
          needsAuthentication: this.needsAuthentication,
          response: JSON.parse(this.response ?? "{}") ?? this.response,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.path = "";
          this.method = "";
          this.response = "";
          this.description = "";
          this.status = "";
          this.timeOut = "";
          this.needsAuthentication = "";
          this.onRouteCreated();
        })
        .catch((err) => console.log(err));
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
</style>