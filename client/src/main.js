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

/**
 * Use Vuetify CSS framework
 * also the FlagIcon package from Vuetify
 */
Vue.use(Vuetify);
Vue.use(FlagIcon)

/**
 * Make Panel global accesible
 */
Vue.component("panel", Panel);

/**
 * Sync vue-routers current $route as part of vuex store's state
 */
sync(store, router);

/**
 * Create Vue Object with all plugins
 */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: { App },
  template: "<App/>"
});
