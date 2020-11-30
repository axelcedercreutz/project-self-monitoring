import { getFormattedDate, getYesterdayFormattedDate, getWeekAgoDateFormattedDate } from '../../utils/helpers.js';
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