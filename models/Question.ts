import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  correctAnswer: {
    type: Number,
    required: true
  },

  explanation: String, // 👈 để review lại

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

export const Question =
  mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema)