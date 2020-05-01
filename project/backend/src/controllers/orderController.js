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
    console.log('USER ', user);
    const createdOrder = await Order.create(
      {
        status: 'CREATED',
        slot_id: slot.dataValues.id,
        user_id: user.dataValues.id,
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
    transaction.commit();
    ctx.response.status = HttpStatus.CREATED;
    ctx.response.body = createdOrder;
    return ctx.response;
  } catch (e) {
    console.log(e);
    transaction.rollback();
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
}

async function getAll(ctx) {
  ctx.response.body = 'orderController.getAll called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getOrder(ctx) {
  const orderId = ctx.params.id;
  const order = await Order.findOne({
    where: { id: orderId },
    attributes: ['id', 'status'],
    include: [
      // { model: AttributeValue, as: 'AttributeValue', attributes: ['id', 'value'] },
      // { model: User, as: 'User', attributes: ['id','role', 'name', 'email'] },
    ],
  });
  console.log(order);
  if (!order) {
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
  ctx.response.body = order;
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function updateOrder(ctx) {
  ctx.response.body = 'orderController.update called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function deleteOrder(ctx) {
  const orderId = ctx.params.id;
  if (orderId <= 0) {
    ctx.response.body = 'Wrong order id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const order = await Order.findOne({ where: { id: orderId } });
  if (order) {
    await Order.destroy({ where: { id: orderId } });
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'Order Not Found';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

module.exports = {
  getOrder,
  getAll,
  updateOrder,
  deleteOrder,
  createOrder,
};
