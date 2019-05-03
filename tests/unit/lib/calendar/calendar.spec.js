import _ from "lodash";
import CalendarMoment from "@/lib/calendar/calendar-moment";

const expectedIds = [
  { id: "2019-04-29" },
  { id: "2019-04-30" },
  { id: "2019-05-01" },
  { id: "2019-05-02" },
  { id: "2019-05-03" },
  { id: "2019-05-04" },
  { id: "2019-05-05" },

  { id: "2019-05-06" },
  { id: "2019-05-07" },
  { id: "2019-05-08" },
  { id: "2019-05-09" },
  { id: "2019-05-10" },
  { id: "2019-05-11" },
  { id: "2019-05-12" },

  { id: "2019-05-13" },
  { id: "2019-05-14" },
  { id: "2019-05-15" },
  { id: "2019-05-16" },
  { id: "2019-05-17" },
  { id: "2019-05-18" },
  { id: "2019-05-19" },

  { id: "2019-05-20" },
  { id: "2019-05-21" },
  { id: "2019-05-22" },
  { id: "2019-05-23" },
  { id: "2019-05-24" },
  { id: "2019-05-25" },
  { id: "2019-05-26" },

  { id: "2019-05-27" },
  { id: "2019-05-28" },
  { id: "2019-05-29" },
  { id: "2019-05-30" },
  { id: "2019-05-31" },
  { id: "2019-06-01" },
  { id: "2019-06-02" }
];

const expectedRows = [
  [
    { id: "2019-04-29" },
    { id: "2019-04-30" },
    { id: "2019-05-01" },
    { id: "2019-05-02" },
    { id: "2019-05-03" },
    { id: "2019-05-04" },
    { id: "2019-05-05" }
  ],
  [
    { id: "2019-05-06" },
    { id: "2019-05-07" },
    { id: "2019-05-08" },
    { id: "2019-05-09" },
    { id: "2019-05-10" },
    { id: "2019-05-11" },
    { id: "2019-05-12" }
  ],
  [
    { id: "2019-05-13" },
    { id: "2019-05-14" },
    { id: "2019-05-15" },
    { id: "2019-05-16" },
    { id: "2019-05-17" },
    { id: "2019-05-18" },
    { id: "2019-05-19" }
  ],
  [
    { id: "2019-05-20" },
    { id: "2019-05-21" },
    { id: "2019-05-22" },
    { id: "2019-05-23" },
    { id: "2019-05-24" },
    { id: "2019-05-25" },
    { id: "2019-05-26" }
  ],
  [
    { id: "2019-05-27" },
    { id: "2019-05-28" },
    { id: "2019-05-29" },
    { id: "2019-05-30" },
    { id: "2019-05-31" },
    { id: "2019-06-01" },
    { id: "2019-06-02" }
  ]
];

describe("CalendarMoment", () => {
  it("should fill previous days and post days", () => {
    const dates = CalendarMoment.calendarDays(2019, 4);
    expect(dates.length).toEqual(expectedIds.length);
    _.forEach(dates, (d, i) => {
      expect(d.id).toBe(expectedIds[i].id);
    });
  });

  it("should build calendar rows", () => {
    const dates = CalendarMoment.calendarRows(2019, 4);
    expect(dates.length).toEqual(expectedRows.length);
    _.forEach(dates, (r, i) => {
      expect(r.length).toEqual(expectedRows[i].length);
      _.forEach(r, (d, j) => {
        expect(d.id).toEqual(expectedRows[i][j].id);
      });
    });
  });

  it("should add properly", () => {
    let m = new CalendarMoment(new Date(2019, 11, 31));
    m.add(1, "day");
    expect(m.date).toEqual(1);
    expect(m.month).toEqual(0);
    expect(m.year).toEqual(2020);
    m = new CalendarMoment(new Date(2019, 0, 1));
    m.add(-1, "day");
    expect(m.date).toEqual(31);
    expect(m.month).toEqual(11);
    expect(m.year).toEqual(2018);
    m = new CalendarMoment(new Date(2019, 5, 1));
    m.add(1, "month");
    expect(m.date).toEqual(1);
    expect(m.month).toEqual(6);
    expect(m.year).toEqual(2019);
    m = new CalendarMoment(new Date(2019, 5, 1));
    m.add(-1, "month");
    expect(m.date).toEqual(1);
    expect(m.month).toEqual(4);
    expect(m.year).toEqual(2019);
    m = new CalendarMoment(new Date(2019, 11, 1));
    m.add(1, "month");
    expect(m.date).toEqual(1);
    expect(m.month).toEqual(0);
    expect(m.year).toEqual(2020);
    m = new CalendarMoment(new Date(2019, 0, 1));
    m.add(-1, "month");
    expect(m.date).toEqual(1);
    expect(m.month).toEqual(11);
    expect(m.year).toEqual(2018);
  });
});
