<template>
  <form @submit.prevent="saveEvent" novalidate>
    <div class="form-group">
      <label for="event-title">Title</label>
      <input
        type="text"
        class="form-control"
        id="event-title-help"
        maxlength="30"
        v-model="$v.event.title.$model"
        aria-describedby="event-title-help"
      >
      <small id="event-title-help" class="form-text text-muted">Mandatory event title (max 30 chars)</small>
    </div>
    <div class="form-group">
      <label for="event-description">Description</label>
      <input
        type="text"
        class="form-control"
        id="event-description"
        v-model="event.description"
        aria-describedby="event-description-help"
      >
      <small id="event-description-help" class="form-text text-muted">Optional event description</small>
    </div>
    <div class="form-group">
      <label for="event-color">Color</label>
      <input
        type="color"
        class="form-control"
        id="event-color"
        v-model="event.color"
        aria-describedby="event-color-help"
      >
      <small id="event-color-help" class="form-text text-muted">Event color</small>
    </div>
    <div class="form-group">
      <label for="event-date">Date</label>
      <input
        type="datetime-local"
        class="form-control"
        id="event-date"
        v-model="$v.event.date.$model"
        aria-describedby="event-date-help"
      >
      <small id="event-date-help" class="form-text text-muted">Mandatory event date</small>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Submit</button>
    <button type="button" class="ml-1 btn btn-secondary" @click.prevent="goBack">Back</button>
    <button
      v-if="event.id"
      type="button"
      class="ml-1 btn btn-danger"
      @click.prevent="deleteEvent"
    >Delete</button>
  </form>
</template>

<script src="./cal-event-form.js"></script>