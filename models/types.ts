import { Types } from "mongoose"

/* =========================
   Question
========================= */

export interface QuestionType {
  _id?: Types.ObjectId

  question: string

  options: string[]

  correctAnswer: number

  explanation?: string

  difficulty?: "easy" | "medium" | "hard"

  createdAt?: Date
}

/* =========================
   Exam
========================= */

export interface ExamType {
  _id?: Types.ObjectId

  title: string

  description: string

  questions: QuestionType[]

  createdAt?: Date
}

/* =========================
   Result - Answer (snapshot)
========================= */

export interface ResultAnswerType {
  questionId: Types.ObjectId

  questionText: string

  options: string[]

  selected: number

  correctAnswer: number

  isCorrect: boolean
}

/* =========================
   Result (FULL)
========================= */

export interface ResultType {
  _id?: Types.ObjectId

  user?: Types.ObjectId

  exam: Types.ObjectId

  examTitle: string

  answers: ResultAnswerType[]

  score: number

  totalQuestions: number

  correctCount: number

  duration?: number

  status?: "completed" | "timeout"

  createdAt?: Date
}

/* =========================
   API: Submit Response
========================= */

export interface SubmitResponse {
  score: number
  total: number
  correctCount: number
  resultId: string
}

/* =========================
   History List Item
========================= */

export interface HistoryItemType {
  _id: string

  examTitle: string

  score: number

  totalQuestions: number

  correctCount: number

  duration?: number

  createdAt: Date
}