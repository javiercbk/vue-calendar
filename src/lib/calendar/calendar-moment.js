import _ from "lodash";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const daysInMonth = function(year, month) {
  return new Date(year, month + 1, 0).getDate();
};

const _otherDateUnixTime = function(date) {
  let unixTime = null;
  if (date instanceof CalendarMoment) {
    unixTime = date._date.getTime();
  } else if (date instanceof Date) {
    unixTime = date.getTime();
  } else {
    throw new Error("invalid comparison");
  }
  return unixTime;
};

export default class CalendarMoment {
  constructor(date) {
    if (date instanceof CalendarMoment) {
      this._date = new Date(date._date.getTime());
    } else if (date instanceof Date) {
      this._date = date;
    } else if (date === undefined) {
      this._date = new Date();
    } else {
      throw new Error("Invalid date");
    }
  }

  static weekdays() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }

  static fromISO8601(str) {
    if (_.isNil(str) || typeof str !== "string") {
      throw new Error("not an ISO8601 date: expected string");
    }
    const isoParts = str.split("-");
    if (isoParts.length < 3) {
      throw new Error("not an ISO8601 date: invalid format");
    }
    const year = parseInt(isoParts[0], 10);
    const month = parseInt(isoParts[1], 10);
    const lastPart = isoParts[2].split("T");
    const day = parseInt(lastPart[0], 10);
    if (_.isNaN(year) || _.isNaN(month) || _.isNaN(day)) {
      throw new Error("not an ISO8601 date: dates parts are not numbers");
    }
    if (month < 1 || day <= 0) {
      throw new Error("not an ISO8601 date: negative month or day");
    }
    if (month > 12) {
      throw new Error("not an ISO8601 date: month overflow");
    }
    const totalDaysInMonth = daysInMonth(year, month - 1);
    if (totalDaysInMonth < day) {
      throw new Error("not an ISO8601 date: day overflow");
    }
    let hours = 0;
    let minutes = 0;
    if (lastPart.length > 1) {
      const timeParts = lastPart[1].split(":");
      if (timeParts.lenght <= 1) {
        throw new Error("not an ISO8601 date: invalid time");
      }
      hours = parseInt(timeParts[0], 10);
      if (_.isNaN(hours) || hours < 0 || hours > 23) {
        throw new Error("not an ISO8601 date: invalid hours");
      }
      minutes = parseInt(timeParts[1], 10);
      if (_.isNaN(minutes) || minutes < 0 || minutes > 59) {
        throw new Error("not an ISO8601 date: invalid minutes");
      }
    }
    return new CalendarMoment(new Date(year, month - 1, day, hours, minutes));
  }

  static calendarDays(year, month) {
    let m = new CalendarMoment(new Date(year, month, 1));
    let datesForMonth = m.getDaysUntilTarget(0, -1);
    datesForMonth = _.reverse(datesForMonth);
    while (m.month === month) {
      datesForMonth.push(m.format());
      m.add(1, "day");
    }
    m.add(-1, "day");
    datesForMonth = datesForMonth.concat(m.getDaysUntilTarget(0, 1));
    return datesForMonth;
  }

  static calendarRows(year, month) {
    const rows = [];
    const days = CalendarMoment.calendarDays(year, month);
    const lenDays = days.length;
    let i = 0;
    let curRow = 0;
    while (lenDays > i) {
      rows.push([]);
      for (let j = 0; j < 7 && lenDays > i; j++) {
        rows[curRow].push(days[i]);
        i++;
      }
      curRow++;
    }
    return rows;
  }

  static daysInMonth(year, month) {
    // The zero based date sets the last day of the month.
    return new Date(year, month, 0).getDate();
  }

  get day() {
    return this._date.getDay();
  }

  get date() {
    return this._date.getDate();
  }

  get month() {
    return this._date.getMonth();
  }

  get year() {
    return this._date.getFullYear();
  }

  get fullHour() {
    let hoursStr = `${this._date.getHours()}`;
    if (hoursStr.length === 1) {
      hoursStr = `0${hoursStr}`;
    }
    let minutesStr = `${this._date.getMinutes()}`;
    if (minutesStr.length === 1) {
      minutesStr = `0${minutesStr}`;
    }
    return `${hoursStr}:${minutesStr}`;
  }

  get jsDate() {
    return this._date;
  }

  get iso8601() {
    const year = this._date.getFullYear();
    const month = this._date.getMonth() + 1;
    const day = this._date.getDate();
    let yearStr = `${year}`;
    while (yearStr.length < 4) {
      yearStr = `0${yearStr}`;
    }
    let monthStr = month;
    if (month < 10) {
      monthStr = `0${month}`;
    }
    let dayStr = day;
    if (day < 10) {
      dayStr = `0${day}`;
    }
    let hoursStr = `${this._date.getHours()}`;
    if (hoursStr.length === 1) {
      hoursStr = `0${hoursStr}`;
    }
    let minutesStr = `${this._date.getMinutes()}`;
    if (minutesStr.length === 1) {
      minutesStr = `0${minutesStr}`;
    }
    return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}`;
  }

  isSame(date) {
    const unixTime = _otherDateUnixTime(date);
    const thisUnixTime = this._date.getTime();
    return thisUnixTime === unixTime;
  }

  isAfter(date) {
    const unixTime = _otherDateUnixTime(date);
    const thisUnixTime = this._date.getTime();
    return thisUnixTime > unixTime;
  }

  add(amount, duration) {
    switch (duration) {
      case "second":
        this._date = new Date(this._date.getTime() + SECOND * amount);
        break;
      case "minute":
        this._date = new Date(this._date.getTime() + MINUTE * amount);
        break;
      case "hour":
        this._date = new Date(this._date.getTime() + HOUR * amount);
        break;
      case "day":
        this._date = new Date(this._date.getTime() + DAY * amount);
        break;
      case "month":
        this._addMonths(amount);
        break;
      case "year":
        this._addYear(amount);
        break;
      default:
        // if duration is unknown throw an error
        throw new Error("Invalid duration");
    }
    return this;
  }

  getDaysUntilTarget(target, direction) {
    const toTargetDates = [];
    let cm = new CalendarMoment(this);
    if (cm.day !== target) {
      cm.add(direction, "day");
      while (cm.day !== target) {
        toTargetDates.push(cm.format());
        cm.add(direction, "day");
      }
      if (direction === -1) {
        toTargetDates.push(cm.format());
      }
    }
    return toTargetDates;
  }

  format() {
    const m = new CalendarMoment(this);
    return {
      m,
      get date() {
        return m.jsDate;
      },
      id: this.iso8601
    };
  }

  _addMonths(months) {
    const curMonth = this._date.getMonth();
    const curDate = this._date.getDate();
    let targetMonth = curMonth + months;
    let sign = 0;
    if (months > 0) {
      sign = -1;
    } else if (months < 0) {
      sign = 1;
    } else {
      return;
    }
    if (targetMonth > 12 || targetMonth < 0) {
      let years = 0;
      if (targetMonth > 0) {
        years = Math.floor(targetMonth / 12);
      } else if (targetMonth > 0) {
        years = Math.ceil(targetMonth / 12);
      }
      if (years !== 0) {
        this._addYears(years);
        targetMonth = targetMonth + years * 12 * sign;
        targetMonth = curMonth + targetMonth;
      }
    }
    this._date.setMonth(targetMonth);
    // fix the last day of the month if necesary
    const maxDay = CalendarMoment.daysInMonth(
      this._date.getFullYear(),
      this._date.getMonth()
    );
    if (maxDay < curDate) {
      // let javascript date handle leap years
      this._date.setDate(maxDay);
    }
  }

  _addYears(years) {
    const curYear = this._date.getFullYear();
    const targetYear = curYear + years;
    // let javascript date handle leap years
    this._date.setYear(targetYear);
  }
}
