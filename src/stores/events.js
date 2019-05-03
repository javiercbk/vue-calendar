/* eslint-disable no-param-reassign */
import _ from "lodash";
import CalendarMoment from "@/lib/calendar/calendar-moment";

const NEXT_ID = "nextID";
const EVENTS = "events";

const encodeEvent = function(event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    color: event.color,
    date: event.calendarMoment.iso8601
  };
};

const decodeCalendarMoment = function(decoded) {
  decoded.calendarMoment = CalendarMoment.fromISO8601(decoded.date);
};

const storeNextId = function(nextId) {
  localStorage.setItem(NEXT_ID, nextId);
};

const retrieveNextId = function() {
  const nextId = parseInt(localStorage.getItem(NEXT_ID), 10);
  if (_.isNaN(nextId)) {
    return 1;
  }
  return nextId;
};

const storeEvents = function(events) {
  localStorage.setItem(EVENTS, JSON.stringify(_.map(events, encodeEvent)));
};

const retrieveEvents = function() {
  let events = [];
  try {
    events = JSON.parse(localStorage.getItem(EVENTS));
  } catch (e) {
    console.log("error parsing events from localStorage: ", e);
  }
  if (_.isNil(events)) {
    events = [];
  }
  _.forEach(events, decodeCalendarMoment);
  return events;
};

const findEventProperPosition = function(events, event) {
  return _.findIndex(events, e =>
    e.calendarMoment.isAfter(event.calendarMoment)
  );
};

const _state = {
  nextId: retrieveNextId(),
  events: retrieveEvents()
};

const getters = {
  events: storeState => storeState.events,
  mappedEvents: storeState => {
    const map = {};
    _.forEach(storeState.events, e => {
      const id = `${e.calendarMoment.year}-${e.calendarMoment.month}-${
        e.calendarMoment.date
      }`;
      if (_.isNil(map[id])) {
        map[id] = [];
      }
      map[id].push(e);
    });
    return map;
  }
};

const mutations = {
  setEvents: (storeState, payload) => {
    storeState.events = payload;
  },
  setNextId: (storeState, payload) => {
    storeState.nextId = payload;
    storeNextId(storeState.nextId);
  },
  createEvent: (storeState, newEvent) => {
    const idx = findEventProperPosition(storeState.events, newEvent);
    if (idx === -1) {
      storeState.events.push(newEvent);
    } else {
      // always insert events in order
      storeState.events.splice(idx, 0, newEvent);
    }
    storeEvents(storeState.events);
  },
  deleteEvent: (storeState, payload) => {
    const idx = _.findIndex(storeState.events, e => e.id === payload.id);
    if (idx !== -1) {
      storeState.events.splice(idx, 1);
      storeEvents(storeState.events);
    }
  },
  updateEvent: (storeState, newEvent) => {
    const idx = _.findIndex(storeState.events, e => e.id === newEvent.id);
    if (idx !== -1) {
      storeState.events.splice(idx, 1);
      const newIdx = findEventProperPosition(storeState.events, newEvent);
      if (newIdx === -1) {
        storeState.events.push(newEvent);
      } else {
        // on update update the element position to keep events in order
        storeState.events.splice(newIdx, 0, newEvent);
      }
      storeEvents(storeState.events);
    }
  }
};

const actions = {
  createEvent: ({ commit, state }, payload) => {
    payload.id = state.nextId;
    commit("setNextId", state.nextId + 1);
    commit("createEvent", payload);
    return payload;
  },
  deleteEvent: ({ commit, state }, payload) => {
    const idx = _.findIndex(state.events, e => e.id === payload.id);
    if (idx !== -1) {
      return commit("deleteEvent", payload);
    } else {
      return new Error("event does not exist");
    }
  },
  updateEvent: ({ commit, state }, payload) => {
    const idx = _.findIndex(state.events, e => e.id === payload.id);
    if (idx !== -1) {
      return commit("updateEvent", payload);
    } else {
      return new Error("event does not exist");
    }
  }
};

export default {
  state: _state,
  getters,
  mutations,
  actions,
  namespaced: true
};
