<template>
  <div class="root">
    <form @submit.prevent>
      <div class="row">
        <div class="col-md-10">
          <text-field
            label="User Identifier"
            :disabled="true"
            v-model="identifier"
            type="text"
          />
        </div>
        <div class="col-md-1">
            <button class="btn-sm" v-on:click="onCopy">Copy</button>
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
      <div class="text-center">
        <Button type="info" round @click.native.prevent="onSave">
          Save
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import TextField from '../components/TextField';
import Button from '../components/Button';

export default {
    name: 'UserConfiguration',
    components: {
        TextField,
        Button,
    },
    data: function () {
        return {
            identifier: localStorage.identifier,
            collection: localStorage.collection ?? '',
        };
    },
    methods: {
        onCopy: function () {
            const el = document.createElement('textarea');
            el.value = this.identifier;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.$notify({
                type: 'success',
                title: 'Identifier Copied',
                verticalAlign: 'bottom',
                horizontalAlign: 'right',
            })
        },
        onSave: function () {
            if (!this.collection || this.collection === '') {
                delete localStorage.collection;
                this.$emit('refresh');
                return;
            }
            localStorage.collection = this.collection;
            this.$emit('refresh');
        }
    }
};
</script>

<style scoped>
.root {
  padding: 16px;
  background-color: #1c1e21;
}
</style>