'use strict';

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
              start_date: new Date('2020', '3', '1'),
              end_date: new Date('2020', '3', '8'),
              slot_size: 'HOUR',
            },
            {
              id: 2,
              title: 'Artek Schedule',
              start_date: new Date('2020', '3', '1'),
              end_date: new Date('2020', '3', '8'),
              slot_size: 'HOUR',
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
            },
            {
              title: 'Description',
              type: 'STRING',
              required: false,
              timetable_id: 1,
            },
            {
              title: 'Name',
              type: 'STRING',
              required: true,
              timetable_id: 2,
            },
            {
              title: 'Description',
              type: 'STRING',
              required: false,
              timetable_id: 2,
            },
          ],
          { transaction: t },
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Timetable', null, {});
  },
};
