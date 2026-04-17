const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const {
      text,
      question: questionText,
      options,
      correctAnswer,
      explanation,
      type,
      categoryId,
      subCategoryId,
      subcategoryId,
      marks
    } = req.body;
    const normalizedText = text || questionText;
    const resolvedSubCategoryId = subCategoryId || subcategoryId;

    if (!normalizedText || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Question text and options are required'
      });
    }

    const question = new Question({
      text: normalizedText,
      options,
      correctAnswer,
      explanation,
      type,
      category: categoryId,
      subCategory: resolvedSubCategoryId,
      marks,
      createdBy: req.user.id
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const { categoryId, subCategoryId, subcategoryId, type } = req.query;
    const filter = { isActive: true };

    if (categoryId) filter.category = categoryId;
    if (subCategoryId || subcategoryId) filter.subCategory = subCategoryId || subcategoryId;
    if (type) filter.type = type;

    const questions = await Question.find(filter)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('category', 'name')
      .populate('subCategory', 'name');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer, explanation, type, marks, isActive } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        text,
        options,
        correctAnswer,
        explanation,
        type,
        marks,
        isActive
      },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const Quiz = require('../models/Quiz');
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      questions: quiz.questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuestionsBySubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const filter = { isActive: true, subCategory: subCategoryId };

    const questions = await Question.find(filter)
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
