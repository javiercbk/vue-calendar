<template>
  <div
    class="calendar-clickable container-fluid h-100"
    :class="{'text-muted bg-light': !isInMonth}"
    @click="createEvent"
  >
    <div>{{date.date}}</div>
    <div class="row" v-for="(l, i) in eventLines" :key="i">
      <div class="col d-flex flex-row">
        <div
          class="w-100 calendar-clickable border"
          v-for="e in l"
          :key="e.id"
          @click.stop="editEvent(e)"
          :style="{backgroundColor: e.color}"
        >
          <div class="text-truncate">{{e.title}}</div>
          <div class="text-truncate">{{e.calendarMoment.fullHour}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./cal-day.js"></script>