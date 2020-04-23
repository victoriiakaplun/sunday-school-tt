'use strict';

const baikalScheduleSlots = [];

for (let i = 0; i < 24; i++) {
  baikalScheduleSlots.push({
    start: new Date(2020, 3, 1, i),
    end: new Date(2020, 3, 1, i + 1),
    timetable_id: 1,
  });
}
const artekScheduleSlots = [];

for (let i = 1; i < 8; i++) {
  artekScheduleSlots.push({
    start: new Date(2020, 3, i),
    end: new Date(2020, 3, i + 1),
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
              start_date: new Date(2020, 3, 1),
              end_date: new Date(2020, 3, 1),
              slot_size: 'HOUR',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              title: 'Artek Schedule',
              start_date: new Date(2020, 3, 1),
              end_date: new Date(2020, 3, 7),
              slot_size: 'DAY',
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
              title: 'Name',
              type: 'STRING',
              required: true,
              timetable_id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: 'Description',
              type: 'STRING',
              required: false,
              timetable_id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              title: 'Name',
              type: 'STRING',
              required: true,
              timetable_id: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
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
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Timetable', null, {});
  },
};
