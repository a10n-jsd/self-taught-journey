import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });

  return matchingDeliveryOption;
}

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
    return dayOfWeek;
  }
}

export function calculateDeliveryDate(deliveryOption) {
  /*
  const today = dayjs();
  
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  */

  let remainingDays = deliveryOption.deliveryDays; // 7 days
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

export function checkDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}