const HttpStatus = require('http-status-codes');
const { Timetable, Attribute } = require('../db/models');
const { getIdFromUrl } = require('../utils/utils');

async function addTimetable(ctx) {
  ctx.response.body = 'timetableController.add called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getAll(ctx) {
  const timetables = await Timetable.findAll();
  console.log(timetables);
  if (!timetables) {
    ctx.response.body = 'bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  ctx.response.body = timetables.dataValues;
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getTimetable(ctx) {
  const id = getIdFromUrl(ctx.request.url);
  const timetable = await Timetable.findOne({ where: { id }, include: Attribute });
  if (timetable) {
    ctx.response.body = timetable;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'bad request';
  ctx.response.status = HttpStatus.BAD_REQUEST;
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
