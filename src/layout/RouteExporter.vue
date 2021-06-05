<template>
  <div class="root">
    <div class="row">
      <div class="col-md-6">
        <text-field label="Name" v-model="postmanName" />
      </div>
      <div class="col-md-3">
        <Button
          type="info"
          round
          @click.native.prevent="onPostmanExportPressed"
        >
          Import
        </Button>
      </div>
      <div class="col-md-3">
        <Button
          type="info"
          :disabled="!postmanCollection"
          round
          @click.native.prevent="onDownloadPressed"
        >
          Download
        </Button>
      </div>
    </div>
    <json-editor v-if="postmanCollection" :value="postmanCollection" />
  </div>
</template>

<script>
import {
  getRoutesPostmanConverter,
  States,
} from "../repository/RoutesRepository";

// Components
import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import JsonEditor from "../components/JsonEditor.vue";

export default {
  name: "RouteExporter",
  components: {
    TextField,
    Button,
    JsonEditor,
  },
  data: function () {
    return {
      postmanName: undefined,
      postmanCollection: undefined,
    };
  },
  methods: {
    // ---------------------------- Utility
    showError: function (message) {
      this.$notify({
        type: "danger",
        title: "Error",
        message: message,
        verticalAlign: "top",
        horizontalAlign: "right",
      });
    },
    // ----------------------------- Events
    onDownloadPressed: async function () {
      if (!this.postmanCollection) {
        return;
      }
      const data = JSON.stringify(this.postmanCollection);
      const blob = new Blob([data], { type: "json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${
        this.postmanCollection?.info?.name ?? "collection"
      }.json`;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onPostmanExportPressed: function () {
      getRoutesPostmanConverter(this.postmanName).observe((state, data) => {
        switch (state) {
          case States.SUCCESSFUL:
            this.postmanCollection = data;
            return;
          case States.FAILED:
            this.showError(data.message);
            return;
        }
      });
    },
  },
};
</script>

<style>
.root {
  padding: 16px;
  background-color: #1c1e21;
}
</style>