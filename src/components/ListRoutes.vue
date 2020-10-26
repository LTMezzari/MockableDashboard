<template>
    <div>
        <ul>
            <li v-for="(route, index) in routes" v-bind:key="index">
                <p>{{`${route.method} -> ${route.path}`}}</p>
                <button v-on:click="editRoute(route)">Edit</button>
                <button v-on:click="deleteRoute(route)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '../utils/RequestUtils'

export default {
    name: 'ListRoutes',
    props: {
        routes: {
            type: Array,
            required: true
        },
        didPressEdit: {
            type: Function,
            required: false
        },
        onRouteDeleted: {
            type: Function,
            required: false
        }
    },
    data: function () {
        return {
            selected: null
        }
    },
    methods: {
        editRoute: function (route) {
            if (!this.didPressEdit)
                return
            this.didPressEdit(route)
        },
        deleteRoute: function (route) {
            api.delete(`route/${route.id}`).then(response => {
                if (!response.data || !this.onRouteDeleted)
                    return
                this.onRouteDeleted()
            }).catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>