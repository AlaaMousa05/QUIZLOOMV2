const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin'), questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/quiz/:quizId', questionController.getQuestionsByQuiz);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', authenticate, authorize('admin'), questionController.updateQuestion);
router.delete('/:id', authenticate, authorize('admin'), questionController.deleteQuestion);

module.exports = router;
