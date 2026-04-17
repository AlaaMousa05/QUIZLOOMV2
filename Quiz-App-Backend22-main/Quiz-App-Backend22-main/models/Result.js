const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question'
        },
        selectedAnswer: String,
        isCorrect: Boolean,
        marksObtained: Number
      }
    ],
    totalMarks: {
      type: Number,
      required: true
    },
    obtainedMarks: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    isPassed: {
      type: Boolean,
      default: false
    },
    timeTaken: {
      type: Number,
      description: 'Time taken in seconds'
    },
    startTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ['submitted', 'graded', 'pending'],
      default: 'submitted'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
