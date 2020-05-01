const HttpStatus = require('http-status-codes');
const { slotsFunctionMap } = require('../utils/utils');
const db = require('@db');
const moment = require('moment');
const { Timetable, Attribute, Slot } = db.models;

async function addTimetable(ctx) {
  let transaction;
  try {
    transaction = await db.transaction({ autocommit: false });
    const { title, start, end, slot_size, attributes } = ctx.request.body;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const slotSize = slot_size.toUpperCase();
    for (const a of attributes) {
      a.title = a.title.toUpperCase();
    }
    if (endDate < startDate) {
      throw new Error();
    }
    if (!isValidSlotSize(slotSize)) {
      throw new Error();
    }
    const slots = await slotsFunctionMap[slotSize](startDate, endDate);
    const createdTimetable = await Timetable.create(
      {
        title: title,
        start_date: startDate,
        end_date: endDate,
        slot_size: slotSize,
        Attribute: attributes,
        Slot: slots,
      },
      {
        include: [
          {
            model: Attribute,
            as: 'Attribute',
          },
          {
            model: Slot,
            as: 'Slot',
          },
        ],
        transaction,
      },
    );
    ctx.response.status = HttpStatus.CREATED;
    const createdAttributes = [];
    for (const a of createdTimetable.Attribute) {
      createdAttributes.push({
        id: a.dataValues.id,
        title: a.dataValues.title,
        type: a.dataValues.type,
        required: a.dataValues.required,
      });
    }
    ctx.response.body = {
      id: createdTimetable.id,
      title: createdTimetable.title,
      start: moment(createdTimetable.start_date).format('LL'),
      end: moment(createdTimetable.end_date).format('LL'),
      slotSize: createdTimetable.slot_size,
      Attribute: createdAttributes,
    };
    transaction.commit();
    return ctx.response;
  } catch (e) {
    transaction.rollback();
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'Bad request';
    return ctx.response;
  }
}

async function getAll(ctx) {
  const timetables = await Timetable.findAll({
    attributes: ['id', 'title', 'start_date', 'end_date', 'slot_size'],
    include: [
      { model: Attribute, as: 'Attribute', attributes: ['id', 'title', 'type', 'required'] },
      { model: Slot, as: 'Slot', attributes: ['id', 'start', 'end'] },
    ],
  });
  if (!timetables) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  ctx.response.body = timetables;
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getTimetable(ctx) {
  try {
    const timetableId = ctx.params.id;
    if (timetableId <= 0) {
      throw new Error();
    }
    const timetable = await Timetable.findOne({
      where: { id: timetableId },
      attributes: ['id', 'title', 'start_date', 'end_date', 'slot_size'],
      include: [
        { model: Attribute, as: 'Attribute', attributes: ['id', 'title', 'type', 'required'] },
        { model: Slot, as: 'Slot', attributes: ['id', 'start', 'end'] },
      ],
    });
    if (!timetable) {
      throw new Error();
    }
    ctx.response.body = timetable;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'Bad request';
    return ctx.response;
  }
}

async function updateTimetable(ctx) {
  try {
    const timetableId = ctx.params.id;
    if (timetableId <= 0) {
      throw new Error();
    }
    const { title } = ctx.request.body;
    const timetable = await Timetable.findOne({ where: { id: timetableId } });
    if (!timetable) {
      throw new Error();
    }
    await Timetable.update(
      {
        title: title || timetable.title,
      },
      { where: { timetableId } },
    );
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.status = {
      id: timetable.id,
      title: title || timetable.title,
      start: moment(timetable.start_date).format('LL'),
      end: moment(timetable.end_date).format('LL'),
      slotSize: timetable.slot_size,
    };
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function deleteTimetable(ctx) {
  try {
    const timetableId = ctx.params.id;
    if (timetableId <= 0) {
      throw new Error();
    }
    const timetable = await Timetable.findOne({ where: { id: timetableId } });
    if (!timetable) {
      throw new Error();
    }
    await Timetable.destroy({ where: { id: timetableId } });
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

function isValidSlotSize(size) {
  return size === 'HOUR' || size === 'DAY' || size === 'WEEK';
}

module.exports = {
  getAll,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  addTimetable,
  isValidSlotSize,
};
