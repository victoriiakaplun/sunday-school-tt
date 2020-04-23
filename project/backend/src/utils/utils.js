const moment = require('moment');

function getIdFromUrl(url) {
  return url.substring(url.lastIndexOf('/') + 1);
}

const slotsFunctionMap = {
  HOUR: initializeTimetableSlotsByHours,
  DAY: initializeTimetableSlotsByDays,
  WEEK: initializeTimetableSlotsByWeeks,
};

function initializeTimetableSlotsByHours(start_date, end_date) {
  const slots = [];
  const startMoment = moment(start_date);
  const endMoment = moment(end_date);
  const diffValue = endMoment.diff(startMoment, 'days');
  const border = (diffValue + 1) * 24;
  for (let i = 0; i < border; i++) {
    slots.push({
      start: new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate(), i),
      end: new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate(), i + 1),
    });
  }
  return slots;
}

function initializeTimetableSlotsByDays(start_date, end_date) {
  const slots = [];
  const startMoment = moment(start_date);
  const endMoment = moment(end_date);
  const diffValue = endMoment.diff(startMoment, 'days');
  const start = start_date.getDate();
  for (let i = start; i <= start + diffValue; i++) {
    slots.push({
      start: new Date(start_date.getFullYear(), start_date.getMonth(), i),
      end: new Date(start_date.getFullYear(), start_date.getMonth(), i + 1),
    });
  }
  return slots;
}

function initializeTimetableSlotsByWeeks(start_date, end_date) {
  const slots = [];
  const startMoment = moment(start_date);
  const endMoment = moment(end_date);
  const diffValue = endMoment.diff(startMoment, 'days');
  const start = start_date.getDate();
  for (let i = start; i < start + diffValue; i = i + 7) {
    slots.push({
      start: new Date(start_date.getFullYear(), start_date.getMonth(), i),
      end: new Date(start_date.getFullYear(), start_date.getMonth(), i + 7),
    });
  }
  return slots;
}

module.exports = {
  getIdFromUrl,
  initializeTimetableSlotsByDays,
  initializeTimetableSlotsByHours,
  initializeTimetableSlotsByWeeks,
  slotsFunctionMap,
};
