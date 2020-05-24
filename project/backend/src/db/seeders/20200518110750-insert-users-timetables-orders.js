'use strict';
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

const baikalScheduleStart = new Date(2020, 5, 1);
const baikalScheduleEnd = new Date(2020, 5, 7);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        name: 'Mr. Cat',
        email: 'mrcat@gmail.com',
        password: bcrypt.hashSync('123456789', salt),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const newUserId = await queryInterface.rawSelect(
      'User',
      {
        where: {
          name: 'Mr. Cat',
        },
      },
      ['id'],
    );

    await queryInterface.bulkInsert('Timetable', [
      {
        title: 'Baikal Schedule',
        start_date: baikalScheduleStart,
        end_date: baikalScheduleEnd,
        slot_size: 'HOUR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const newTimetableId = await queryInterface.rawSelect(
      'Timetable',
      {
        where: {
          title: 'Baikal Schedule',
        },
      },
      ['id'],
    );

    await queryInterface.bulkInsert('Attribute', [
      {
        title: 'Name',
        type: 'STRING',
        required: true,
        timetable_id: newTimetableId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Description',
        type: 'STRING',
        required: false,
        timetable_id: newTimetableId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const nameAttributeId = await queryInterface.rawSelect(
      'Attribute',
      {
        where: {
          title: 'Name',
        },
      },
      ['id'],
    );

    const descriptionAttributeId = await queryInterface.rawSelect(
      'Attribute',
      {
        where: {
          title: 'Description',
        },
      },
      ['id'],
    );

    const newTimetableScheduleSlots = [];
    for (let i = 0; i < 168; i++) {
      newTimetableScheduleSlots.push({
        id: 25 + i,
        start: new Date(2020, 5, 1, i),
        end: new Date(2020, 5, 1, i + 1),
        timetable_id: newTimetableId,
      });
    }

    await queryInterface.bulkInsert('Slot', newTimetableScheduleSlots);

    const someSlotIdFromTimetable = await queryInterface.rawSelect(
      'Slot',
      {
        where: {
          start: new Date(2020, 5, 1, 8),
          end: new Date(2020, 5, 1, 9),
        },
      },
      ['id'],
    );

    console.log('SLOT ID: ', someSlotIdFromTimetable);
    await queryInterface.bulkInsert('Order', [
      {
        status: 'CREATED',
        timetable_id: newTimetableId,
        slot_id: someSlotIdFromTimetable,
        user_id: newUserId,
      },
    ]);

    const newOrderId = await queryInterface.rawSelect(
      'Order',
      {
        where: {
          status: 'CREATED',
          timetable_id: newTimetableId,
          slot_id: someSlotIdFromTimetable,
          user_id: newUserId,
        },
      },
      ['id'],
    );

    console.log('ORDER ID: ', newOrderId);
    queryInterface.bulkInsert('AttributeValue', [
      {
        order_id: newOrderId,
        attribute_id: nameAttributeId,
        value: 'Mr.Cat',
      },
      {
        order_id: newOrderId,
        attribute_id: descriptionAttributeId,
        value: 'Meeting',
      },
    ]);
    queryInterface.bulkInsert('Notification', [
      {
        type: 'CREATED',
        isRead: false,
        order_id: newOrderId,
        user_id: newUserId,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('User', null, { transaction });
      await queryInterface.bulkDelete('Timetable', null, { transaction });
      await queryInterface.bulkDelete('Slot', null, { transaction });
      await queryInterface.bulkDelete('Order', null, { transaction });
      await queryInterface.bulkDelete('Notification', null, { transaction });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
    }
  },
};
