<template>
  <div
    class="calendar-clickable container-fluid h-100"
    :class="{'text-muted bg-light': !isInMonth}"
    @click="createEvent"
  >
    <div>{{date.date}}</div>
    <div
      class="calendar-clickable row bg-info border"
      v-for="e in events"
      :key="e.id"
      @click.stop="editEvent(e)"
    >
      <div class="col col-md-7 text-truncate">{{e.title}}</div>
      <div class="col col-md-5 text-truncate">{{e.calendarMoment.fullHour}}</div>
    </div>
  </div>
</template>

<script src="./cal-day.js"></script>