const HttpStatus = require('http-status-codes');
const { Timetable } = require('../db/models');
const { getIdFromUrl } = require('../utils/utils');
const moment = require('moment');

async function addTimetable(ctx) {
  ctx.response.body = 'timetableController.add called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getAll(ctx) {
  const timetables = await Timetable.findAll({
    attributes: ['id', 'title', 'start_date', 'end_date', 'slot_size'],
    /* include: [{ model: Attribute, as: 'Attribute' }], */
  });
  console.log();
  if (!timetables) {
    ctx.response.body = 'bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const result = [];
  for (const t of timetables) {
    const attributesInfo = await t.getAttribute();
    const attributes = [];
    for (const a of attributesInfo) {
      attributes.push({
        id: a.dataValues.id,
        title: a.dataValues.title,
        type: a.dataValues.type,
        required: a.dataValues.required,
      });
    }
    result.push({
      id: t.dataValues.id,
      title: t.dataValues.title,
      start_date: moment(t.dataValues).format('LL'),
      end_date: moment(t.dataValues).format('LL'),
      slot_size: t.dataValues.slot_size,
      attributes,
    });
  }
  ctx.response.body = result;
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getTimetable(ctx) {
  const id = getIdFromUrl(ctx.request.url);
  const timetable = await Timetable.findOne({
    where: { id },
  });
  if (!timetable) {
    ctx.response.body = 'bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
  }
  const attributesInfo = await timetable.getAttribute();
  const attributes = [];
  for (const a of attributesInfo) {
    attributes.push({
      id: a.dataValues.id,
      title: a.dataValues.title,
      type: a.dataValues.type,
      required: a.dataValues.required,
    });
  }
  ctx.response.body = {
    id: timetable.dataValues.id,
    title: timetable.dataValues.title,
    start_date: moment(timetable.dataValues).format('LL'),
    end_date: moment(timetable.dataValues).format('LL'),
    slot_size: timetable.dataValues.slot_size,
    attributes,
  };
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function updateTimetable(ctx) {
  const timetableId = getIdFromUrl(ctx.request.url);
  if (timetableId <= 0) {
    ctx.response.body = 'Wrong timetable id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const timetable = await Timetable.findOne({ where: { id: timetableId } });
  if (timetable) {
  }
}

async function deleteTimetable(ctx) {
  const timetableId = getIdFromUrl(ctx.request.url);
  if (timetableId <= 0) {
    ctx.response.body = 'Wrong timetable id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const timetable = await Timetable.findOne({ where: { id: timetableId } });
  if (timetable) {
    await Timetable.destroy({ where: { id: timetableId } });
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'Timetable Not Found';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

module.exports = {
  getAll,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  addTimetable,
};
