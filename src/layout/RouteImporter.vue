<template>
    <div>
        <div>
            <text-field label="Swagger" v-model="swaggerUrl" />
            <Button type="info" round @click.native.prevent="onImportSwagger">
                Import
            </Button>
        </div>
        <div>
            <label class="control-label">
                Postman
            </label>
            <input type="file" ref="postmanFile" />
            <Button type="info" round @click.native.prevent="onImportPostman">
                Import
            </Button>
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
        onImportSwagger: function () {
            postSwaggerImporter(this.swaggerUrl).observe((state, data) => {
                switch (state) {
                    case States.SUCCESSFUL:
                        this.showSuccess("Routes Added");
                        this.$emit('imported');
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
                            this.$emit('imported');
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

<style>

</style>
