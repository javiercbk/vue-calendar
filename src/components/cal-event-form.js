import _ from "lodash";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import CalendarMoment from "@/lib/calendar/calendar-moment";

export default {
  props: {
    date: {
      type: String
    },
    evt: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      event: {
        id: null,
        title: "",
        description: "",
        color: "#FF7F27",
        date: ""
      }
    };
  },
  validations: {
    event: {
      title: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(30)
      },
      date: {
        required,
        mustBeDate: value => {
          let isValidDate = true;
          try {
            CalendarMoment.fromISO8601(value);
          } catch (e) {
            isValidDate = false;
          }
          return isValidDate;
        }
      }
    }
  },
  watch: {
    date: {
      immediate: true,
      handler(newDate) {
        if (newDate) {
          const cm = CalendarMoment.fromISO8601(newDate);
          const emptyEvent = {
            title: "",
            description: "",
            color: "#FF7F27",
            date: cm.iso8601,
            calendarMoment: cm
          };
          this.event = emptyEvent;
        }
      }
    },
    evt: {
      immediate: true,
      handler(newEvt) {
        if (newEvt) {
          const e = _.pick(newEvt, ["id", "title", "description", "color"]);
          e.date = newEvt.calendarMoment.iso8601;
          this.event = e;
        }
      }
    }
  },
  methods: {
    saveEvent() {
      if (!this.$v.$invalid) {
        const dateClone = _.cloneDeep(this.event);
        dateClone.calendarMoment = CalendarMoment.fromISO8601(dateClone.date);
        this.$emit("event-saved", dateClone);
      }
    },
    deleteEvent() {
      const dateClone = _.cloneDeep(this.event);
      dateClone.calendarMoment = CalendarMoment.fromISO8601(dateClone.date);
      this.$emit("event-deleted", dateClone);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
