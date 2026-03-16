import mongoose from "mongoose"

const ResultSchema = new mongoose.Schema({

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },

      selected: Number,

      correct: Boolean
    }
  ],

  score: Number,

  totalQuestions: Number,

  correctCount: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

})

export const Result =
  mongoose.models.Result ||
  mongoose.model("Result", ResultSchema)