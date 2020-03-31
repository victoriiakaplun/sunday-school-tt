const HttpStatus = require('http-status-codes');

async function addTimetable(ctx) {
  ctx.response.body = 'timetableController.add called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getAll(ctx) {
  ctx.response.body = 'timetableController.getAll called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getTimetable(ctx) {
  ctx.response.body = 'timetableController.get called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function updateTimetable(ctx) {
  ctx.response.body = 'timetableController.update called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function deleteTimetable(ctx) {
  ctx.response.body = 'timetableController.deleteTimetable called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

module.exports = {
  getAll,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  addTimetable,
};

