<template>
  <div class="root">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-12">
          <text-field
            label="User Identifier"
            :disabled="true"
            v-model="identifier"
            type="text"
          >
            <div slot="append" class="input-group-append">
              <div class="input-group-text">
                <button class="btn-sm" v-on:click="onCopy">
                  <font-awesome-icon color="#83878c" icon="copy" />
                </button>
              </div>
            </div>
          </text-field>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <text-field
            label="Current Indentifier"
            placeholder="Identifier"
            v-model="collection"
            type="text"
          />
        </div>
      </div>
      <div class="row justify-content-end mt-3">
        <div class="col-md-auto">
          <Button type="info" round @click.native.prevent="onSave"> Save </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TextField from "../components/TextField";
import Button from "../components/Button";

export default {
  name: "UserConfiguration",
  components: {
    TextField,
    Button,
  },
  data: function () {
    return {
      identifier: localStorage.identifier,
      collection: localStorage.collection ?? "",
    };
  },
  methods: {
    onCopy: function () {
      const el = document.createElement("textarea");
      el.value = this.identifier;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$notify({
        type: "success",
        title: "Identifier Copied",
        verticalAlign: "bottom",
        horizontalAlign: "right",
      });
    },
    onSave: function () {
      if (!this.collection || this.collection === "") {
        delete localStorage.collection;
        this.$emit("refresh");
        return;
      }
      localStorage.collection = this.collection;
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.root {
  padding: 16px;
  background-color: #1c1e21;
}
.btn-sm {
  background: transparent;
  border-color: transparent;
  font-size: 20px;
}
</style>