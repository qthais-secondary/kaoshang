import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({

  question: String,

  options: [String],

  correctAnswer: Number

})

export const Question =
  mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema)