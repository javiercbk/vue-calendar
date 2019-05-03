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
