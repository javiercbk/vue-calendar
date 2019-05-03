import { mapActions } from "vuex";
import NotificationManager from "@/components/notification-manager.vue";

export default {
  components: {
    NotificationManager
  },
  methods: {
    ...mapActions("domEvents", ["fireGlobalEvent"]),
    onGlobalEvent(event, where) {
      this.fireGlobalEvent({
        event,
        where
      });
    }
  }
};
