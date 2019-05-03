<template>
  <div class="w-100 h-100 d-flex flex-column justify-content-center">
    <cal-calendar-header :year="year" :month="month" @date-changed="onDateChange"/>
    <div class="d-flex flex-row">
      <div class="w-100 font-weight-bold text-center" v-for="day in calendarDaysName" :key="day">
        <div class="border">{{day}}</div>
      </div>
    </div>
    <div class="cal-grow d-flex flex-row" v-for="(row, r) in calendarRows" :key="r">
      <div class="w-100 h-100 border" v-for="(d, c) in row" :key="d.id">
        <cal-day :date="d.m" :year="year" :month="month" :events="eventsRows[r][c]"/>
      </div>
    </div>
  </div>
</template>

<script src="./cal-calendar.js"></script>
<style src="./cal-calendar.scss" scoped lang="scss"></style>