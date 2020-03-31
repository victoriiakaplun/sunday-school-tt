const Router = require('koa-router');
const timetableController = require('@controllers/timetableController');
const { authenticateCheck } = require('../middleware/authHandler');
const { adminRootCheck } = require('../middleware/adminRootHandler');

module.exports = new Router({
  prefix: '/timetables',
})
    .post('/', authenticateCheck, adminRootCheck, timetableController.addTimetable)
    .get('/', authenticateCheck, timetableController.getAll)
    .get('/:id', authenticateCheck, timetableController.getTimetable)
    .put('/:id', authenticateCheck, adminRootCheck, timetableController.updateTimetable)
    .delete('/:id', authenticateCheck, adminRootCheck, timetableController.deleteTimetable);

