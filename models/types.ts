
import { Types } from "mongoose"

/* =========================
   Question
========================= */

export interface QuestionType {
  _id?: Types.ObjectId
  question: string
  options: string[]
  correctAnswer: number
}

/* =========================
   Exam (dùng cho frontend)
========================= */

export interface ExamType {
  _id?: Types.ObjectId
  title: string
  description: string
  questions: QuestionType[]
  createdAt?: Date
}

/* =========================
   Result
========================= */

export type ResultAnswer = {

  question: string
  selected: number
  correct: boolean

}

export type ResultType = {

  score: number
  total: number
  answers: ResultAnswer[]
  correctAnswers: number[]

}

