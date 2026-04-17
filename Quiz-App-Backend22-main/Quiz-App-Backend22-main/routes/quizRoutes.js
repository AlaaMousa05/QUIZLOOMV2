const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin'), quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/effectiveness', quizController.getQuizEffectiveness);
router.get('/:id', quizController.getQuizById);
router.put('/:id', authenticate, authorize('admin'), quizController.updateQuiz);
router.delete('/:id', authenticate, authorize('admin'), quizController.deleteQuiz);
router.put('/:id/publish', authenticate, authorize('admin'), quizController.publishQuiz);
router.post('/:id/questions', authenticate, authorize('admin'), quizController.addQuestionsToQuiz);
router.delete('/:id/questions', authenticate, authorize('admin'), quizController.removeQuestionFromQuiz);

// Student quiz endpoints
router.post('/start', authenticate, authorize('student'), quizController.startQuiz);
router.put('/:id/answer', authenticate, authorize('student'), quizController.submitAnswer);

module.exports = router;
