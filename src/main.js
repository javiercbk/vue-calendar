import Vue from "vue";
import Vuelidate from "vuelidate";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./app.vue";
import router from "./router";
import store from "./store";

library.add(faChevronLeft, faChevronRight);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  validations: {},
  render: h => h(App)
}).$mount("#app");
