<template>
    <div class="root">
        <div class="row">
            <div class="col-md-12">
                <text-field label="Swagger" placeholder="Type the postman url..." v-model="swaggerUrl" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label class="control-label">
                    Postman
                </label>
            </div>
            <div class="col-md-12">
                <input type="file" ref="postmanFile" />
            </div>
        </div>
        <div class="row justify-content-end mt-3">
            <div class="col-md-auto">
                <Button type="info" round @click.native.prevent="onImport">
                    Import
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import {postSwaggerImporter, postPostmanImporter, States} from "../repository/RoutesRepository";
import TextField from '../components/TextField.vue';
import Button from '../components/Button.vue';

export default {
    name: 'RouteImporterModal',
    components: {
        TextField,
        Button,
    },
    data: function () {
        return {
            swaggerUrl: undefined,
        };
    },
    methods: {
        // --------------------------------- Utility
        showError: function (message) {
            this.$notify({
                type: 'danger',
                title: 'Error',
                message: message,
                verticalAlign: 'top',
                horizontalAlign: 'right',
            });
        },
        showSuccess: function (message) {
            this.$notify({
                type: 'success',
                title: 'Success',
                message: message,
                verticalAlign: 'bottom',
                horizontalAlgn: 'right',
            });
        },
        parseFile: function () {
            return new Promise ((resolve) => {
                const file = this.$refs.postmanFile.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const stringResult = e.target.result;
                    resolve(JSON.parse(stringResult));
                }
                reader.readAsText(file);
            });
        },
        // ------------------------------ Events
        onImport : function () {
            if (this.swaggerUrl) {
                this.onImportSwagger();
                return;
            }
            const files = this.$refs.postmanFile.files[0]
            if (files) {
                this.onImportPostman();
                return;
            }
        },
        onImportSwagger: function () {
            postSwaggerImporter(this.swaggerUrl).observe((state, data) => {
                switch (state) {
                    case States.SUCCESSFUL:
                        this.showSuccess("Routes Added");
                        this.$emit('refresh');
                        return;
                    case States.FAILED:
                        this.showError(data.message);
                        return;
                }
            })
        },
        onImportPostman: async function () {
            try {
                const postmanBody = await this.parseFile();
                postPostmanImporter(postmanBody).observe((state, data) => {
                    switch (state) {
                        case States.SUCCESSFUL:
                            this.showSuccess("Routes Added");
                            this.$emit('refresh');
                            return;
                        case States.FAILED:
                            this.showError(data.message);
                            return;
                    }
                });
            } catch (exception) {
                this.showError(exception.message);
            }
        },
    }
}
</script>

<style scoped>
.root {
  padding: 16px;
  background-color: #1c1e21;
}
.center {
    align-self: center;
}
.control-label {
    color: white;
}
</style>
