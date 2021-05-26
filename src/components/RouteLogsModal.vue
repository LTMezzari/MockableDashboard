<template>
    <div>
        {{`${route.method} -> ${route.path}`}}
        <div v-for="(log, index) of logs" :key="index">
            <expandable-view :label="log.message">
                {{log.time}}
            </expandable-view>
        </div>
    </div>
</template>
<script>
import ExpandableView from './ExpandableView.vue';

export default {
    name: 'RouteLogsModal',
    components: {
        ExpandableView,
    },
    props: {
        route: {
            type: Object,
            required: true
        },
        logs: {
            type: Array,
            required: false,
            default: () => []
        }
    }
}
</script>
