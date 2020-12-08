import { getFormattedDate, getYesterdayFormattedDate, getWeekAgoDateFormattedDate, getFormattedWeek, getFormattedMonth, getDateOfWeek, getWeekNumber } from '../../utils/helpers.js';
import { assertEquals } from '../../deps.js';


Deno.test("Function getFormattedDate returns today formatted as YYYY-MM-DD if no date is given", () => {
    const date = new Date();
    const formattedDate = date.toISOString().substring(0,10);
    assertEquals(getFormattedDate(), formattedDate);
});

Deno.test("Function getFormattedDate(date) returns date formatted as YYYY-MM-DD", () => {
    const date = new Date('2020-01-01');
    const formattedDate = date.toISOString().substring(0,10);
    assertEquals(getFormattedDate(date), formattedDate);
});

Deno.test("Function getYesterdayFormattedDate returns yesterday formatted as YYYY-MM-DD if no date is given", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1)
    const formattedDate = date.toISOString().substring(0,10);
    assertEquals(getYesterdayFormattedDate(), formattedDate);
});

Deno.test("Function getYesterdayFormattedDate(date) returns date -1 day formatted as YYYY-MM-DD", () => {
    const date = new Date('2020-01-01');
    const yesterday = new Date('2019-12-31')
    const formattedDate = yesterday.toISOString().substring(0,10);
    assertEquals(getYesterdayFormattedDate(date), formattedDate);
});

Deno.test("Function getWeekAgoDateFormattedDate returns the day a week ago formatted as YYYY-MM-DD if no date is given", () => {
    const date = new Date();
    date.setDate(date.getDate() - 7)
    const formattedDate = date.toISOString().substring(0,10);
    assertEquals(getWeekAgoDateFormattedDate(), formattedDate);
});

Deno.test("Function getWeekAgoDateFormattedDate(date) returns date -7 days formatted as YYYY-MM-DD", () => {
    const date = new Date('2020-01-01');
    const weekAgo = new Date('2019-12-25')
    const formattedDate = weekAgo.toISOString().substring(0,10);
    assertEquals(getWeekAgoDateFormattedDate(date), formattedDate);
});

Deno.test("Function getFormattedWeek(w) returns w if w > 9", () => {
    const w = 10;
    assertEquals(getFormattedWeek(w), w);
})

Deno.test("Function getFormattedWeek(w) returns '0w' if w <= 9", () => {
    const w = 2;
    const returnValue = "02";
    assertEquals(getFormattedWeek(w), returnValue);
})

Deno.test("Function getFormattedWeek(m) returns '02' if '02' given", () => {
    const returnValue = "02";
    assertEquals(getFormattedWeek(returnValue), returnValue);
})

Deno.test("Function getFormattedMonth(m) returns m if m > 9", () => {
    const m = 10;
    assertEquals(getFormattedMonth(m), m);
})
Deno.test("Function getFormattedMonth(m) returns '0m' if m <= 9", () => {
    const m = 2;
    const returnValue = "02";
    assertEquals(getFormattedMonth(m), returnValue);
})

Deno.test("Function getFormattedMonth(m) returns '02' if '02' given", () => {
    const returnValue = "02";
    assertEquals(getFormattedMonth(returnValue), returnValue);
})

Deno.test("Function getDateOfWeek(w,y) return '2020-11-29T22:00:00.000Z' if given 2020 and 49", ()=> {
    const y = '2020';
    const w = '49';
    const returnValue = new Date(2020, 10, 30);
    assertEquals(getDateOfWeek(w, y), returnValue);
})

Deno.test("Function getWeekNumber(d) return [2020, 49] if given 2020-11-30", ()=> {
    const returnValue = new Date(2020, 10, 30);
    assertEquals(getWeekNumber(returnValue), [2020,49]);
})