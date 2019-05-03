import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import CalendarMoment from "@/lib/calendar/calendar-moment";

export default {
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      calYear: 0,
      calMonth: 0
    };
  },
  watch: {
    year: {
      immediate: true,
      handler(newYear) {
        this.calYear = newYear;
      }
    },
    month: {
      immediate: true,
      handler(newMonth) {
        this.calMonth = newMonth + 1;
      }
    }
  },
  computed: {
    leftIcon() {
      return faChevronLeft;
    },
    rightIcon() {
      return faChevronRight;
    }
  },
  methods: {
    changeDate() {
      if (this.calMonth > 0 && this.calMonth < 13) {
        this.editing = false;
        this._emitDateChange(this.calYear, this.calMonth - 1);
      }
    },
    previousMonth() {
      const m = this._calendarMoment();
      m.add(-1, "month");
      this._emitDateChange(m.year, m.month);
    },
    nextMonth() {
      const m = this._calendarMoment();
      m.add(1, "month");
      this._emitDateChange(m.year, m.month);
    },
    _calendarMoment() {
      const d = new Date(this.calYear, this.calMonth - 1);
      return new CalendarMoment(d);
    },
    _emitDateChange(year, month) {
      this.$emit("date-changed", {
        year: year,
        month: month
      });
    }
  }
};
