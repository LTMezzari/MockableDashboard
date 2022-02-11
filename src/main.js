import Vue from 'vue';
import App from './App.vue';

// Libraries
import Notify from "vue-notifyjs";
import VModal from 'vue-js-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faCopy, faDownload, faPlus, faSync, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// CSS ans SCSS
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "vue-notifyjs/themes/default.css";
import 'vue-js-modal/dist/styles.css';

// Custom
import router from './router';
import ModalComponent from "./components/ModalComponent";

library.add(faSync, faUpload, faDownload, faCog, faCopy, faTimes, faPlus, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('modal-component', ModalComponent);

Vue.use(Notify);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
