<template>
    <div>
        {{`${route.method} -> ${route.name || route.path}`}}
        <div v-for="(log, index) of logs" :key="index">
            <expandable-view :label="log.message">
                <div class="parent">
                    <expandable-view v-if="log.data.headers" label="Headers">
                        {{log.data.headers}}
                    </expandable-view>
                    <expandable-view v-if="log.data.body" label="Params">
                        {{log.data.params}}
                    </expandable-view>
                    <expandable-view v-if="log.data.body" label="Query">
                        {{log.data.query}}
                    </expandable-view>
                    <expandable-view v-if="log.data.body" label="Body">
                        {{log.data.body}}
                    </expandable-view>
                    <expandable-view v-if="log.data.response" label="Response">
                        {{log.data.response}}
                    </expandable-view>
                    {{log.time}}
                </div>
            </expandable-view>
        </div>
    </div>
</template>
<script>
import ExpandableView from '../components/ExpandableView.vue';

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
<style>
.parent {
    padding: 16px;
}
</style>