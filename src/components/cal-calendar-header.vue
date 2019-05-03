<template>
  <div class="w-100">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-2 col-md-1">
          <font-awesome-icon :icon="leftIcon" class="calendar-clickable" @click="previousMonth"/>
        </div>
        <div class="col-4 col-md-2">
          <input
            v-show="editing"
            type="number"
            v-model="calYear"
            @blur="changeDate"
            @keypress.enter="changeDate"
          >
          <span v-show="!editing" @click="editing = true" class="calendar-clickable">{{calYear}}</span>
        </div>
        <div class="col-4 col-md-2">
          <input
            v-show="editing"
            type="number"
            min="1"
            max="12"
            v-model="calMonth"
            @blur="changeDate"
            @keypress.enter="changeDate"
          >
          <span v-show="!editing" @click="editing = true" class="calendar-clickable">{{calMonth}}</span>
        </div>
        <div class="col-2 col-md-1">
          <font-awesome-icon :icon="rightIcon" class="calendar-clickable" @click="nextMonth"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./cal-calendar-header.js"></script>
<style>
</style>