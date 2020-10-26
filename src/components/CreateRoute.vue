<template>
  <div>
    <input placeholder="Path" v-model="path" type="text" />
    <input placeholder="Method" v-model="method" type="text" />
    <input placeholder="response" v-model="response" type="text" />
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
      this.response = JSON.stringify(this.route.response);
      this.currentRoute = this.route;
    }
  },
  data: function () {
    return {
      path: "",
      method: "",
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
          response: JSON.parse(this.response ?? "{}") ?? this.response,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.path = "";
          this.method = "";
          this.response = "";
          this.onRouteCreated();
        })
        .catch((err) => console.log(err));
    },
    edit: function () {
      api
        .put(`route/${this.route.id}`, {
          path: this.path,
          method: this.method,
          response: JSON.parse(this.response ?? "{}") ?? this.response,
        })
        .then((response) => {
          if (!response.data || !this.onRouteCreated) return;

          this.path = "";
          this.method = "";
          this.response = "";
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