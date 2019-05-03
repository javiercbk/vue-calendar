<template>
  <div class="container h-100">
    <cal-event-form
      v-bind="eventFormProps"
      @event-saved="onEventSave"
      @event-deleted="onEventDelete"
    />
  </div>
</template>

<script src="./cal-stateful-event-form.js"></script>