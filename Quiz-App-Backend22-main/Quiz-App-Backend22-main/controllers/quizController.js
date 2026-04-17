const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const SubCategory = require('../models/SubCategory');

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, categoryId, subCategoryId, questionIds, totalMarks, duration, passingMarks, shuffleQuestions, showCorrectAnswers } = req.body;

    const quiz = new Quiz({
      title,
      description,
      category: categoryId,
      subCategory: subCategoryId,
      questions: questionIds,
      totalMarks,
      duration,
      passingMarks,
      totalQuestions: questionIds.length,
      shuffleQuestions,
      showCorrectAnswers,
      createdBy: req.user.id
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const { categoryId, isPublished } = req.query;
    const filter = {};

    if (categoryId) filter.category = categoryId;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const quizzes = await Quiz.find(filter)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('questions');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { title, description, questionIds, totalMarks, duration, passingMarks, shuffleQuestions, showCorrectAnswers, isPublished } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        questions: questionIds,
        totalMarks,
        duration,
        passingMarks,
        totalQuestions: questionIds?.length,
        shuffleQuestions,
        showCorrectAnswers,
        isPublished
      },
      { new: true }
    ).populate('questions');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz published successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addQuestionsToQuiz = async (req, res) => {
  try {
    const { questionIds } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Add new questions
    quiz.questions = [...new Set([...quiz.questions, ...questionIds])];
    quiz.totalQuestions = quiz.questions.length;

    await quiz.save();

    res.status(200).json({
      success: true,
      message: 'Questions added to quiz successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.removeQuestionFromQuiz = async (req, res) => {
  try {
    const { questionId } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    quiz.questions = quiz.questions.filter(q => q.toString() !== questionId);
    quiz.totalQuestions = quiz.questions.length;

    await quiz.save();

    res.status(200).json({
      success: true,
      message: 'Question removed from quiz successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const toPublicQuestion = (question) => ({
  id: question._id,
  _id: question._id,
  question: question.text,
  text: question.text,
  options: question.type === 'true-false' ? ['True', 'False'] : question.options,
  type: question.type,
  marks: question.marks
});

// Start Quiz - Get questions for a student
exports.startQuiz = async (req, res) => {
  try {
    const { subCategoryId, numberOfQuestions = 20 } = req.body;

    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: 'subCategoryId is required'
      });
    }

    let quiz = await Quiz.findOne({
      subCategory: subCategoryId,
      isPublished: true
    }).populate({
      path: 'questions',
      match: { isActive: true }
    });

    // Fallback path: create/update a subcategory quiz from active questions.
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      const questionPool = await Question.find({
        subCategory: subCategoryId,
        isActive: true
      });

      if (!questionPool.length) {
        return res.status(404).json({
          success: false,
          message: 'No questions found for this subcategory'
        });
      }

      const subCategory = await SubCategory.findById(subCategoryId).select('name category');
      const title = subCategory?.name ? `${subCategory.name} Quiz` : 'Quiz';
      const totalMarks = questionPool.reduce((sum, q) => sum + (q.marks || 1), 0);
      const questionIds = questionPool.map((q) => q._id);

      quiz = await Quiz.findOneAndUpdate(
        { subCategory: subCategoryId },
        {
          title,
          description: `${title} (auto-generated from question bank)`,
          category: subCategory?.category || questionPool[0].category,
          subCategory: subCategoryId,
          questions: questionIds,
          totalMarks,
          duration: 30,
          passingMarks: Math.max(1, Math.ceil(totalMarks * 0.5)),
          totalQuestions: questionIds.length,
          isPublished: true,
          shuffleQuestions: true,
          showCorrectAnswers: true,
          createdBy: req.user.id
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      ).populate({
        path: 'questions',
        match: { isActive: true }
      });
    }

    const requestedCount = Number.isInteger(Number(numberOfQuestions))
      ? Math.max(1, Number(numberOfQuestions))
      : 20;
    const pool = Array.isArray(quiz.questions) ? quiz.questions : [];

    if (!pool.length) {
      return res.status(404).json({
        success: false,
        message: 'No active questions available for this quiz'
      });
    }

    const selectedQuestions = shuffle(pool).slice(0, Math.min(requestedCount, pool.length));
    const publicQuestions = selectedQuestions.map(toPublicQuestion);

    res.status(200).json({
      success: true,
      quizId: quiz._id,
      questions: publicQuestions,
      answers: publicQuestions.map((q) => ({ id: q.id, selectedAnswer: null })),
      startTime: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Submit answer for a question
exports.submitAnswer = async (req, res) => {
  try {
    const { id, selectedAnswer } = req.body;

    if (!id || selectedAnswer === undefined || selectedAnswer === null) {
      return res.status(400).json({
        success: false,
        message: 'Question id and selectedAnswer are required'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Answer saved successfully',
      answer: { id, selectedAnswer: Number(selectedAnswer) }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuizEffectiveness = async (req, res) => {
  try {
    const Result = require('../models/Result');

    const quizzes = await Quiz.find({ isPublished: true })
      .select('title totalQuestions totalMarks')
      .limit(10);

    const effectiveness = await Promise.all(quizzes.map(async (quiz) => {
      const results = await Result.find({ quiz: quiz._id });
      const accuracy = results.length > 0
        ? ((results.filter(r => r.isPassed).length / results.length) * 100).toFixed(2)
        : 0;

      return {
        quizId: quiz._id,
        title: quiz.title,
        attempts: results.length,
        passedAttempts: results.filter(r => r.isPassed).length,
        accuracy: parseFloat(accuracy),
        totalQuestions: quiz.totalQuestions,
        totalMarks: quiz.totalMarks
      };
    }));

    res.status(200).json({
      success: true,
      quizzes: effectiveness
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
