const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.submitQuizResult = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;

    if (!quizId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'quizId and answers are required'
      });
    }

    const quiz = await Quiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    const normalizedAnswerMap = new Map();
    answers.forEach((answer) => {
      const questionId = answer.questionId || answer.id;
      if (!questionId) return;
      normalizedAnswerMap.set(questionId.toString(), Number(answer.selectedAnswer));
    });

    if (!normalizedAnswerMap.size) {
      return res.status(400).json({
        success: false,
        message: 'No valid answers provided'
      });
    }

    let obtainedMarks = 0;
    let correctCount = 0;
    let wrongCount = 0;

    const processedAnswers = quiz.questions.reduce((acc, question) => {
      const key = question._id.toString();
      if (!normalizedAnswerMap.has(key)) {
        return acc;
      }

      const selectedAnswer = normalizedAnswerMap.get(key);
      const isCorrect = selectedAnswer === question.correctAnswer;
      const marksObtained = isCorrect ? question.marks : 0;
      obtainedMarks += marksObtained;
      if (isCorrect) correctCount += 1;
      else wrongCount += 1;

      acc.push({
        questionId: question._id,
        selectedAnswer,
        isCorrect,
        marksObtained
      });

      return acc;
    }, []);

    if (!processedAnswers.length) {
      return res.status(400).json({
        success: false,
        message: 'Submitted answers do not match quiz questions'
      });
    }

    const safeTimeTaken = Number(timeTaken) || 0;
    const totalMarks = quiz.totalMarks || quiz.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
    const isPassed = obtainedMarks >= quiz.passingMarks;

    const result = new Result({
      student: req.user.id,
      quiz: quizId,
      answers: processedAnswers,
      totalMarks,
      obtainedMarks,
      percentage,
      isPassed,
      timeTaken: safeTimeTaken,
      startTime: new Date(Date.now() - safeTimeTaken * 1000),
      endTime: new Date()
    });

    await result.save();

    res.status(201).json({
      success: true,
      message: 'Result submitted successfully',
      result,
      score: Number(percentage.toFixed(2)),
      correctCount,
      wrongCount,
      totalQuestions: quiz.questions.length,
      timeTaken: safeTimeTaken
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('student', 'firstName lastName email')
      .populate('quiz', 'title totalMarks')
      .populate('answers.questionId');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
      .populate('quiz', 'title totalMarks duration')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const results = await Result.find({ quiz: req.params.quizId })
      .populate('student', 'firstName lastName email enrollmentNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentQuizResult = async (req, res) => {
  try {
    const { quizId } = req.params;

    const result = await Result.findOne({
      student: req.user.id,
      quiz: quizId
    })
      .populate('quiz')
      .populate('answers.questionId');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentPerformance = async (req, res) => {
  try {
    const studentId = req.user.id;

    const results = await Result.find({ student: studentId })
      .populate('quiz', 'title category');

    const totalAttempts = results.length;
    const passedAttempts = results.filter(r => r.isPassed).length;
    const totalMarksObtained = results.reduce((sum, r) => sum + r.obtainedMarks, 0);
    const averagePercentage = results.length > 0 
      ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
      : 0;

    // Category-wise performance
    const categoryPerformance = {};
    results.forEach(result => {
      const category = result.quiz.category;
      if (!categoryPerformance[category]) {
        categoryPerformance[category] = {
          attempts: 0,
          passed: 0,
          totalMarks: 0,
          obtainedMarks: 0
        };
      }
      categoryPerformance[category].attempts += 1;
      if (result.isPassed) categoryPerformance[category].passed += 1;
      categoryPerformance[category].obtainedMarks += result.obtainedMarks;
    });

    res.status(200).json({
      success: true,
      performance: {
        totalAttempts,
        passedAttempts,
        totalMarksObtained,
        averagePercentage,
        categoryPerformance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getQuizStatistics = async (req, res) => {
  try {
    const { quizId } = req.params;

    const results = await Result.find({ quiz: quizId });

    const totalAttempts = results.length;
    const passedAttempts = results.filter(r => r.isPassed).length;
    const averageMarks = results.length > 0 
      ? (results.reduce((sum, r) => sum + r.obtainedMarks, 0) / results.length).toFixed(2)
      : 0;
    const averagePercentage = results.length > 0
      ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      statistics: {
        totalAttempts,
        passedAttempts,
        failedAttempts: totalAttempts - passedAttempts,
        averageMarks,
        averagePercentage,
        passPercentage: totalAttempts > 0 ? ((passedAttempts / totalAttempts) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentQuizHistory = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
      .populate('quiz', 'title category totalMarks duration')
      .sort({ createdAt: -1 });

    const passedAttempts = results.filter(r => r.isPassed).length;
    const totalAttempts = results.length;

    const stats = {
      total: totalAttempts,
      avg: totalAttempts > 0 
        ? Number((results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts).toFixed(2))
        : 0,
      highest: totalAttempts > 0 
        ? Number(Math.max(...results.map(r => r.percentage)).toFixed(2))
        : 0,
      lowest: totalAttempts > 0 
        ? Number(Math.min(...results.map(r => r.percentage)).toFixed(2))
        : 0,
      passRate: totalAttempts > 0 
        ? Number(((passedAttempts / totalAttempts) * 100).toFixed(2))
        : 0,
      quizzes: results.map(r => ({
        quizId: r.quiz._id,
        name: r.quiz.title,
        title: r.quiz.title,
        score: Number(r.percentage.toFixed(2)),
        correct: (r.answers || []).filter((a) => a.isCorrect).length,
        wrong: (r.answers || []).filter((a) => !a.isCorrect).length,
        percentage: r.percentage,
        isPassed: r.isPassed,
        obtainedMarks: r.obtainedMarks,
        totalMarks: r.totalMarks,
        timeTaken: r.timeTaken,
        attempts: 1,
        date: r.createdAt
      }))
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
