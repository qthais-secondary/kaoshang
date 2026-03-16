import { NextResponse } from "next/server"
import { Exam } from "@/models/Exam"
import { Result } from "@/models/Result"
import { Question } from "@/models/Question"
import "@/lib/mongodb"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  await connectDB()

  const exams = await Exam.find().populate("questions")

  const stats = []

  for (const exam of exams) {

    const results = await Result.find({
      exam: exam._id
    })

    let correct = 0
    let wrong = 0

    const questionStats: any = {}

    for (const r of results) {

      correct += r.correctCount
      wrong += r.totalQuestions - r.correctCount

      for (const ans of r.answers) {

        const qid = ans.question.toString()

        if (!questionStats[qid]) {

          questionStats[qid] = {
            wrong: 0,
            total: 0
          }

        }

        questionStats[qid].total++

        if (!ans.correct) {
          questionStats[qid].wrong++
        }

      }

    }

    const questions = exam.questions.map((q: any) => {

      const stat = questionStats[q._id] || { wrong: 0, total: 0 }

      const wrongRate =
        stat.total === 0 ? 0 :
          Math.round((stat.wrong / stat.total) * 100)

      return {
        question: q.question,
        wrong: stat.wrong,
        total: stat.total,
        wrongRate
      }

    })

    const total = correct + wrong

    stats.push({

      title: exam.title,

      correct,
      wrong,

      correctRate: total === 0 ? 0 :
        Math.round((correct / total) * 100),

      wrongRate: total === 0 ? 0 :
        Math.round((wrong / total) * 100),

      questions

    })

  }

  return NextResponse.json(stats)

}