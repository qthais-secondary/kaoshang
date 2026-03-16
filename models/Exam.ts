import mongoose from "mongoose"
const ExamSchema = new mongoose.Schema({

  title: String,

  description: String,

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

})

export const Exam =
  mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema)