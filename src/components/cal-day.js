import _ from "lodash";

export default {
  props: {
    date: {
      type: Object,
      required: true
    },
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isInMonth() {
      return this.date.year === this.year && this.date.month === this.month;
    },
    eventLines() {
      const lines = [];
      let curLine = 0;
      let i = 0;
      const eventLen = this.events.length;
      while (i < eventLen) {
        if (i === 0) {
          lines.push([this.events[i]]);
        } else {
          const isSameMoment = lines[curLine][0].calendarMoment.isSame(
            this.events[i].calendarMoment
          );
          if (isSameMoment) {
            lines[curLine].push(this.events[i]);
          } else {
            curLine++;
            lines[curLine] = [this.events[i]];
          }
        }
        i++;
      }
      return lines;
    }
  },
  methods: {
    createEvent() {
      this.$router.push({
        name: "event-create",
        params: {
          date: this.date.iso8601
        }
      });
    },
    editEvent(event) {
      this.$router.push({
        name: "event-edit",
        params: {
          entityId: `${event.id}`
        }
      });
    }
  }
};
