const HttpStatus = require('http-status-codes');
const { getIdFromUrl } = require('../utils/utils');
const db = require('@src/db');
const moment = require('moment');
const { Timetable, Attribute } = db.models;

// FIXME: insert with attributes error
async function addTimetable(ctx) {
  let transaction;
  try {
    transaction = await db.transaction({ autocommit: false });
    const { title, start_date, end_date, slot_size, attributes } = ctx.request.body;
    const createdTimetable = await Timetable.create(
      {
        title: title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        slot_size: slot_size,
        Attribute: attributes,
      },
      {
        include: [
          {
            association: Attribute,
            as: 'Attribute',
          },
        ],
      },
      { transaction },
    );
    if (!createdTimetable) {
      throw new Error('Timetable is not created!');
    }
    transaction.commit();
    ctx.response.status = HttpStatus.CREATED;
    ctx.response.body = createdTimetable;
    return ctx.response;
  } catch (e) {
    console.log(e);
    transaction.rollback();
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = e.message;
    return ctx.response;
  }
}

async function getAll(ctx) {
  const timetables = await Timetable.findAll({
    attributes: ['id', 'title', 'start_date', 'end_date', 'slot_size'],
    /* include: [{ model: Attribute, as: 'Attribute' }], */
  });
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
      startDate: moment(t.dataValues.start_date).format('LL'),
      endDate: moment(t.dataValues.end_date).format('LL'),
      slotSize: t.dataValues.slot_size,
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
    startDate: moment(timetable.dataValues.start_date).format('LL'),
    endDate: moment(timetable.dataValues.start_date).format('LL'),
    slotSize: timetable.dataValues.slot_size,
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
