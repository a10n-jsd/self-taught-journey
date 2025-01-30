import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// Main idea of JavaScript:
// 1. Save the data (Model)
// 2. Generate html (View)
// 3. Make it interactive (Controller)
// Note: MVC is design pattern in software development

renderOrderSummary();
renderPaymentSummary();

// Exercises for lesson 15
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { 
  get1Month,
  get5Days,
  get1MonthBefore, 
  getDayOfWeek,
  checkWeekend as isSatSun
} from "./exercise/exercise.js";

// 15a
get5Days();

// 15b
get1Month();

// 15c
get1MonthBefore();

// 15d
getDayOfWeek();

// 15e 
let date = dayjs();
console.log(isSatSun(date));

// tes with few different dates
date = dayjs().add(1, 'days');
console.log(isSatSun(date));

date = dayjs().add(2, 'days');
console.log(isSatSun(date));

date = dayjs().add(3, 'days');
console.log(isSatSun(date));

date = dayjs().add(4, 'days');
console.log(isSatSun(date));

date = dayjs().add(5, 'days');
console.log(isSatSun(date));

date = dayjs().add(6, 'days');
console.log(isSatSun(date));