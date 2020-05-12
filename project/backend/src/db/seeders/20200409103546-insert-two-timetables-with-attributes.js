const baikalScheduleStart = new Date(2020, 3, 1);
const baikalScheduleEnd = new Date(2020, 3, 1);

const artekScheduleStart = new Date(2020, 3, 1);
const artekScheduleEnd = new Date(2020, 3, 7);

const slotSize = 'HOUR';

const baikalScheduleSlots = [];

for (let i = 0; i < 24; i++) {
  baikalScheduleSlots.push({
    id: i + 1,
    start: new Date(2020, 3, 1, i),
    end: new Date(2020, 3, 1, i + 1),
    timetable_id: 1,
  });
}

const artekScheduleSlots = [];
for (let i = 0; i < 168; i++) {
  artekScheduleSlots.push({
    id: 25 + i,
    start: new Date(2020, 3, 1, i),
    end: new Date(2020, 3, 1, i + 1),
    timetable_id: 2,
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert(
          'Timetable',
          [
            {
              id: 1,
              title: 'Baikal Schedule',
              start_date: baikalScheduleStart,
              end_date: baikalScheduleEnd,
              slot_size: slotSize,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              title: 'Artek Schedule',
              start_date: artekScheduleStart,
              end_date: artekScheduleEnd,
              slot_size: slotSize,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert(
          'Attribute',
          [
            {
              id: 1,
              title: 'Name',
              type: 'STRING',
              required: true,
              timetable_id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              title: 'Description',
              type: 'STRING',
              required: false,
              timetable_id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 3,
              title: 'Name',
              type: 'STRING',
              required: true,
              timetable_id: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 4,
              title: 'Description',
              type: 'STRING',
              required: false,
              timetable_id: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert('Slot', baikalScheduleSlots, { transaction: t }),
        queryInterface.bulkInsert('Slot', artekScheduleSlots, { transaction: t }),
        queryInterface.bulkInsert(
          'Order',
          [
            {
              id: 1,
              status: 'CREATED',
              timetable_id: 1,
              slot_id: 8,
              user_id: 2,
            },
            {
              id: 2,
              status: 'CREATED',
              timetable_id: 1,
              slot_id: 15,
              user_id: 3,
            },
            {
              id: 3,
              status: 'CREATED',
              timetable_id: 2,
              slot_id: 39,
              user_id: 2,
            },
            {
              id: 4,
              status: 'CREATED',
              timetable_id: 2,
              slot_id: 114,
              user_id: 3,
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert(
          'AttributeValue',
          [
            {
              order_id: 1,
              attribute_id: 1,
              value: 'Mr.Cat',
            },
            {
              order_id: 1,
              attribute_id: 2,
              value: 'Meeting',
            },
            {
              order_id: 2,
              attribute_id: 1,
              value: 'Mr. Dog',
            },
            {
              order_id: 3,
              attribute_id: 3,
              value: 'Mr.Cat',
            },
            {
              order_id: 4,
              attribute_id: 3,
              value: 'Mr. Human',
            },
            {
              order_id: 4,
              attribute_id: 4,
              value: 'Meeting',
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert(
          'Notification',
          [
            {
              type: 'CREATED',
              isRead: false,
              order_id: 1,
              user_id: 2,
            },
            {
              type: 'CREATED',
              isRead: false,
              order_id: 2,
              user_id: 3,
            },
            {
              type: 'CREATED',
              isRead: false,
              order_id: 3,
              user_id: 2,
            },
            {
              type: 'CREATED',
              isRead: false,
              order_id: 4,
              user_id: 3,
            },
          ],
          { transaction: t },
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('Timetable', null, { transaction: t }),
        queryInterface.bulkDelete('Slot', null, { transaction: t }),
        queryInterface.bulkDelete('Order', null, { transaction: t }),
        queryInterface.bulkDelete('Notification', null, { transaction: t }),
      ]);
    });
  },
};
