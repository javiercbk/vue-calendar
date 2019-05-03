import Vue from "vue";
import Vuex from "vuex";
import events from "@/stores/events";
import notifications from "@/stores/notifications";
import domEvents from "@/stores/dom-events";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    domEvents,
    events,
    notifications
  }
});
