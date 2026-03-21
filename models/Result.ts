import mongoose from "mongoose"

const ResultSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  examTitle: String, // snapshot

  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,

      questionText: String,

      options: [String],

      selected: Number,

      correctAnswer: Number,

      isCorrect: Boolean
    }
  ],

  score: Number,

  totalQuestions: Number,

  correctCount: Number,

  duration: Number, // thời gian làm bài (giây)

  status: {
    type: String,
    enum: ["completed", "timeout"],
    default: "completed"
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }

})

// 🔥 index tối ưu history
ResultSchema.index({ user: 1, createdAt: -1 })

export const Result =
  mongoose.models.Result ||
  mongoose.model("Result", ResultSchema)