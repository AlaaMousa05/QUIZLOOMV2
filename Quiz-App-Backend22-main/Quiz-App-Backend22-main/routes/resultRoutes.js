const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, resultController.submitQuizResult);
router.get('/viewhistory', authenticate, resultController.getStudentQuizHistory);
router.get('/my-results', authenticate, resultController.getStudentResults);
router.get('/:id', authenticate, resultController.getResultById);
router.get('/quiz/:quizId/results', authenticate, authorize('admin'), resultController.getQuizResults);
router.get('/quiz/:quizId/my-result', authenticate, resultController.getStudentQuizResult);
router.get('/student/performance', authenticate, resultController.getStudentPerformance);
router.get('/quiz/:quizId/statistics', authenticate, authorize('admin'), resultController.getQuizStatistics);

module.exports = router;
