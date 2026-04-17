const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize('admin'), studentController.getAllStudents);
router.get('/search', authenticate, authorize('admin'), studentController.searchStudents);
router.get('/profile', authenticate, studentController.getStudentProfile);
router.put('/profile', authenticate, authorize('student'), studentController.updateStudentProfile);
router.get('/performance', authenticate, studentController.getStudentPerformance);
router.get('/:id', authenticate, authorize('admin'), studentController.getStudentById);
router.put('/:id/status', authenticate, authorize('admin'), studentController.updateStudentStatus);
router.delete('/:id', authenticate, authorize('admin'), studentController.deleteStudent);

module.exports = router;
