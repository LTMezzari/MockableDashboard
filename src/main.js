import Vue from 'vue'
import App from './App.vue'

// Libraries
import Notify from "vue-notifyjs";
import VModal from 'vue-js-modal'

// CSS ans SCSS
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "vue-notifyjs/themes/default.css";
import 'vue-js-modal/dist/styles.css'

// Custom
import router from './router';

Vue.use(Notify);
Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
