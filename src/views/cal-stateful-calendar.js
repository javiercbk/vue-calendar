import { mapGetters } from "vuex";
import CalCalendar from "@/components/cal-calendar.vue";

const initialDate = new Date();

export default {
  name: "cal-stateful-calendar",
  props: {
    year: {
      type: [String, Number],
      default: initialDate.getFullYear()
    },
    month: {
      type: [String, Number],
      default: initialDate.getMonth() + 1
    }
  },
  render(h) {
    const vm = this;
    return h(CalCalendar, {
      props: {
        year: vm.yearInt,
        month: vm.monthInt - 1
      },
      on: {
        "date-changed": ({ year, month }) => {
          this.$router.push({
            name: "calendar-date",
            params: {
              year,
              month: month + 1
            }
          });
        }
      }
    });
  },
  computed: {
    ...mapGetters("events", ["events"]),
    yearInt() {
      return parseInt(this.year, 10);
    },
    monthInt() {
      return parseInt(this.month, 10);
    }
  }
};
