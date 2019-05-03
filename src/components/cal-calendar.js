import _ from "lodash";
import { mapGetters } from "vuex";
import CalendarMoment from "@/lib/calendar/calendar-moment";
import CalCalendarHeader from "@/components/cal-calendar-header.vue";
import CalDay from "@/components/cal-day.vue";

const DAYS = CalendarMoment.weekdays();

export default {
  components: {
    CalCalendarHeader,
    CalDay
  },
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters("events", ["mappedEvents"]),
    calendarDaysName() {
      return DAYS;
    },
    calendarRows() {
      return CalendarMoment.calendarRows(this.year, this.month);
    },
    eventsRows() {
      const eventRows = [];
      _.forEach(this.calendarRows, (cr, r) => {
        eventRows.push([]);
        _.forEach(cr, crc => {
          const id = `${crc.m.year}-${crc.m.month}-${crc.m.date}`;
          let events = this.mappedEvents[id];
          if (_.isNil(events)) {
            events = [];
          }
          eventRows[r].push(events);
        });
      });
      return eventRows;
    }
  },
  methods: {
    onDateChange(newDate) {
      this.$emit("date-changed", newDate);
    }
  }
};
