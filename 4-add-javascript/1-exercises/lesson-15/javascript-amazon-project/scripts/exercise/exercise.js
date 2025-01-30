import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();

export function get5Days() {
  const next5Days = today.add(5, 'days');
  const dateString = next5Days.format('MMMM D');

  console.log(dateString);
}

export function get1Month() {
  const next1Month = today.add(1, 'month');
  const dateString = next1Month.format('MMMM D');
  
  console.log(dateString);
}

export function get1MonthBefore() {
  const oneMonthBefore = today.subtract(1, 'months');
  const dateString = oneMonthBefore.format('MMMM D');

  console.log(dateString);
}

export function getDayOfWeek() {
  const dateString = today.format('dddd');

  console.log(dateString);
}

export function checkWeekend(date) {
  const dayOfWeek = date.format('dddd');
  const dateFormat = date.format('MMMM, D');

  if ( dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
    return `${dateFormat} is ${dayOfWeek}`;
  } else {
    return `${dateFormat} is not weekend`;
  }
}
