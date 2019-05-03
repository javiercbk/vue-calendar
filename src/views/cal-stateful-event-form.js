import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
import CalEventForm from "@/components/cal-event-form.vue";

export default {
  components: {
    CalEventForm
  },
  props: {
    entityId: {
      type: String
    },
    date: {
      type: String
    }
  },
  computed: {
    ...mapGetters("events", ["events"]),
    eventFormProps() {
      const props = {};
      if (this.entityId) {
        props.evt = this.editingEvent;
      } else if (this.date) {
        props.date = this.date;
      }
      return props;
    },
    editingEvent() {
      if (this.entityId) {
        const id = parseInt(this.entityId, 10);
        if (!_.isNaN(id)) {
          return _.find(this.events, e => e.id === id);
        }
      }
      return null;
    }
  },
  methods: {
    ...mapActions("events", ["createEvent", "updateEvent", "deleteEvent"]),
    ...mapActions("notifications", ["pushNotification"]),
    onEventDelete(event) {
      this.deleteEvent({ id: event.id });
      this.pushNotification({
        title: "Success",
        message: "Event was deleted",
        variant: "success"
      });
      this.$router.replace({
        name: "calendar-date",
        params: {
          year: event.calendarMoment.year,
          month: event.calendarMoment.month + 1
        }
      });
    },
    onEventSave(event) {
      if (event.id) {
        this.updateEvent(event).then(() => {
          this.pushNotification({
            title: "Success",
            message: "Event was updated",
            variant: "success"
          });
        });
      } else {
        this.createEvent(event).then(newEvent => {
          this.pushNotification({
            title: "Success",
            message: "Event was created",
            variant: "success"
          });
          const newId = newEvent.id;
          this.$router.replace({
            name: "event-edit",
            params: {
              entityId: `${newId}`
            }
          });
        });
      }
    }
  }
};
