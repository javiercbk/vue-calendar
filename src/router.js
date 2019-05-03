import Vue from "vue";
import Router from "vue-router";
import CalStatefulEventForm from "@/views/cal-stateful-event-form.vue";
import CalStatefulCalendar from "@/views/cal-stateful-calendar.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "calendar",
      component: CalStatefulCalendar
    },
    {
      path: "/calendar/:year/:month",
      name: "calendar-date",
      component: CalStatefulCalendar,
      props: true
    },
    {
      path: "/events/:entityId",
      name: "event-edit",
      component: CalStatefulEventForm,
      props: true
    },
    {
      path: "/events/:date/new",
      name: "event-create",
      component: CalStatefulEventForm,
      props: true
    }
  ]
});
