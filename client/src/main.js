import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import Vuetify from "vuetify";
import { sync } from "vuex-router-sync";
import "vuetify/dist/vuetify.min.css";
import store from "./store/store";
import Panel from "./components/Panels/Panel";
import i18n from './plugins/i18n'
import FlagIcon from 'vue-flag-icon'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(FlagIcon)

Vue.component("panel", Panel);

sync(store, router);

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: { App },
  template: "<App/>"
});
