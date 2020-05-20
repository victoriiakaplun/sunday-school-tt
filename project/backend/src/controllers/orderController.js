const HttpStatus = require('http-status-codes');
const db = require('@db');
const { Timetable, Attribute, Slot, Order, User, AttributeValue, Notification } = db.models;

async function createOrder(ctx) {
  let transaction;
  try {
    transaction = await db.transaction({ autocommit: false });
    const { timetable_id, slot_id, attributeValues } = ctx.request.body;
    const timetable = await Timetable.findOne({
      where: { id: timetable_id },
      attributes: ['id', 'title', 'start_date', 'end_date', 'slot_size'],
      include: [
        { model: Attribute, as: 'Attribute', attributes: ['id', 'title', 'type', 'required'] },
      ],
    });
    if (!timetable) {
      throw new Error();
    }
    const slot = await Slot.findOne({ where: { id: slot_id } });
    if (!slot) {
      throw new Error();
    }
    const otherOrder = await Order.findOne({ where: { slot_id: slot_id, status: 'CONFIRMED' } });
    if (otherOrder) {
      throw new Error();
    }
    const attributes = timetable.dataValues.Attribute;
    for (const { dataValues } of attributes) {
      const { id, required } = dataValues;
      const isWrongAttributeValues =
        required && !required && !attributeValues.includes(value => value.attribute_id === id);
      if (isWrongAttributeValues) {
        throw new Error();
      }
    }
    const user = await User.findOne({ where: ctx.state.user.id });
    const createdOrder = await Order.create(
      {
        status: 'CREATED',
        slot_id: slot.dataValues.id,
        user_id: user.dataValues.id,
        timetable_id: timetable.id,
        AttributeValue: attributeValues,
        Notification: {
          type: 'CREATED',
          isRead: false,
          user_id: user.dataValues.id,
        },
      },
      {
        include: [
          { model: AttributeValue, as: 'AttributeValue' },
          { model: Notification, as: 'Notification' },
        ],
        transaction,
      },
    );
    if (!createdOrder) {
      throw new Error();
    }
    await createdOrder.setSlot(slot, { transaction });
    await createdOrder.setUser(user, { transaction });
    ctx.response.status = HttpStatus.CREATED;
    ctx.response.body = createdOrder;
    transaction.commit();
    return ctx.response;
  } catch (e) {
    transaction.rollback();
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
}

async function getAll(ctx) {
  const params = ctx.request.query;
  let orders;
  if (params.timetable_id) {
    orders = await Order.findAll({
      where: { timetable_id: params.timetable_id },
      attributes: ['id', 'status'],
      include: [
        {
          model: Slot,
          as: 'Slot',
          attributes: ['id', 'start', 'end'],
        },
        {
          model: AttributeValue,
          as: 'AttributeValue',
          attributes: ['id', 'value'],
          include: {
            model: Attribute,
            as: 'Attribute',
            attributes: ['id', 'title'],
          },
        },
        { model: User, as: 'User', attributes: ['id', 'name'] },
      ],
    });
  } else {
    orders = await Order.findAll({
      attributes: ['id', 'status'],
      include: [
        {
          model: Slot,
          as: 'Slot',
          attributes: ['id', 'start', 'end'],
        },
        {
          model: AttributeValue,
          as: 'AttributeValue',
          attributes: ['id', 'value'],
          include: {
            model: Attribute,
            as: 'Attribute',
            attributes: ['id', 'title'],
          },
        },
        { model: User, as: 'User', attributes: ['id', 'name'] },
      ],
    });
  }
  if (!orders) {
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
  ctx.response.body = orders;
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getOrder(ctx) {
  try {
    const orderId = ctx.params.id;
    if (orderId <= 0) {
      throw new Error();
    }
    const order = await Order.findOne({
      where: { id: orderId },
      attributes: ['id', 'status'],
      include: [
        {
          model: Slot,
          as: 'Slot',
          attributes: ['id', 'start', 'end'],
        },
        {
          model: AttributeValue,
          as: 'AttributeValue',
          attributes: ['id', 'value'],
          include: {
            model: Attribute,
            as: 'Attribute',
            attributes: ['id', 'title'],
          },
        },
        { model: User, as: 'User', attributes: ['id', 'name'] },
      ],
    });
    if (!order) {
      throw new Error();
    }
    ctx.response.body = order;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function updateOrder(ctx) {
  let transaction;
  try {
    transaction = await db.transaction({ autocommit: false });
    const orderId = ctx.params.id;
    if (orderId <= 0) {
      throw new Error();
    }
    const { status } = ctx.request.body;
    const order = await Order.findOne({
      where: { id: orderId },
      attributes: ['id', 'status', 'user_id'],
    });
    if (!order) {
      throw new Error();
    }
    if (status === 'CREATED' || order.dataValues.status !== 'CREATED') {
      throw new Error();
    }
    await Order.update(
      {
        status: status,
      },
      { where: { id: orderId }, transaction },
    );
    await order.createNotification(
      {
        type: status,
        isRead: false,
        user_id: order.dataValues.user_id,
      },
      { transaction },
    );
    transaction.commit();
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = {
      status: status,
    };
  } catch (e) {
    transaction.rollback();
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
}

async function deleteOrder(ctx) {
  let transaction;
  try {
    transaction = await db.transaction({ autocommit: false });
    const orderId = ctx.params.id;
    if (orderId <= 0) {
      throw new Error();
    }
    const order = await Order.findOne({ where: { id: orderId } });
    await order.createNotification(
      {
        type: 'DELETED',
        isRead: false,
        user_id: order.dataValues.user_id,
      },
      { transaction },
    );
    await Order.destroy({ where: { id: orderId }, transaction });
    transaction.commit();
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    transaction.rollback();
    console.log(e);
    ctx.response.body = 'bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

module.exports = {
  getOrder,
  getAll,
  updateOrder,
  deleteOrder,
  createOrder,
};
