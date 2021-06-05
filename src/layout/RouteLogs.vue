<template>
  <div class="root">
    <div class="inline" v-if="route">
      <span class="method" :style="{ color: getColor(route) }">{{
        route.method
      }}</span>
      <p class="tab-name">
        {{ route.name || route.path }}
      </p>
    </div>
    <div v-for="(log, index) of logs" :key="index">
      <expandable-view>
        <div class="inline expandable-label" slot="label">
          <span :style="{ color: getColor(route) }">{{ log.message }}</span>
          <p class="property">
            {{ getTime(log) }}
          </p>
        </div>
        <div class="parent">
          <expandable-view v-if="log.data.headers" label="Headers">
            <p
              class="property"
              v-for="(header, index) of mapObject(log.data.headers)"
              :key="index"
            >
              {{ header }}
            </p>
          </expandable-view>
          <expandable-view v-if="log.data.params" label="Params">
            <p
              class="property"
              v-for="(param, index) of mapObject(log.data.params)"
              :key="index"
            >
              {{ param }}
            </p>
          </expandable-view>
          <expandable-view v-if="log.data.query" label="Query">
            <p
              class="property"
              v-for="(query, index) of mapObject(log.data.query)"
              :key="index"
            >
              {{ query }}
            </p>
          </expandable-view>
          <expandable-view v-if="log.data.body" label="Body">
            {{ log.data.body }}
          </expandable-view>
          <expandable-view v-if="log.data.response" label="Response">
            {{ log.data.response }}
          </expandable-view>
        </div>
      </expandable-view>
    </div>
  </div>
</template>
<script>
import { getMethodColor } from "../utils/RouteUtils";

import ExpandableView from "../components/ExpandableView.vue";

export default {
  name: "RouteLogsModal",
  components: {
    ExpandableView,
  },
  props: {
    route: {
      type: Object,
      required: false,
    },
    logs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    getColor: function (route) {
      return getMethodColor(route);
    },
    getTime: function (log) {
      const time = new Date(log.time);
      return `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} (${time.getHours()}:${time.getMinutes()}:${time.getSeconds()})`;
    },
    mapObject: function (object) {
      let result = [];
      for (const [key, value] of Object.entries(object)) {
        result.push(`${key}: ${value}`);
      }
      return result;
    },
  },
};
</script>
<style>
.expandable-label {
  align-items: center;
}
.root {
  padding: 16px;
  background-color: #1c1e21;
}
.parent {
  padding: 16px;
}
.inline {
  display: flex;
}
.method {
  flex: 0.1;
  text-align: center;
}
.tab-name {
  color: #a3320b;
  flex: 0.9;
  margin: 0;
}
.property {
  color: white;
  margin: 0px;
}
</style>