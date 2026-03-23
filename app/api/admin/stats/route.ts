import { NextResponse } from "next/server";
import { Exam } from "@/models/Exam";
import { Result } from "@/models/Result";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  // 🔥 lấy exams + questions
  const exams = await Exam.find().populate("questions");

  // 🔥 lấy toàn bộ results 1 lần
  const allResults = await Result.aggregate([
    // 1. Sắp xếp theo thời gian tăng dần (lần đầu tiên sẽ lên đầu)
    {
      $sort: { createdAt: 1 },
    },

    // 2. Group theo user + exam
    {
      $group: {
        _id: {
          user: "$user",
          exam: "$exam",
        },
        firstAttempt: { $first: "$$ROOT" },
      },
    },

    // 3. Lấy lại document gốc
    {
      $replaceRoot: { newRoot: "$firstAttempt" },
    },
  ]);

  const stats: any[] = [];

  for (const exam of exams) {
    // 🔥 filter results theo exam
    const results = allResults.filter(
      (r) => r.exam?.toString() === exam._id.toString(),
    );

    let correct = 0;
    let wrong = 0;

    const questionStats: Record<string, { wrong: number; total: number }> = {};

    for (const r of results) {
      const correctCount = r.correctCount || 0;
      const totalQuestions = r.totalQuestions || 0;

      correct += correctCount;
      wrong += totalQuestions - correctCount;

      for (const ans of r.answers || []) {
        // 🔥 support cả data mới + cũ
        const qid = ans.questionId?.toString() || ans.question?.toString();

        if (!qid) continue;

        if (!questionStats[qid]) {
          questionStats[qid] = { wrong: 0, total: 0 };
        }

        questionStats[qid].total++;

        const isCorrect = ans.isCorrect ?? ans.correct;

        if (!isCorrect) {
          questionStats[qid].wrong++;
        }
      }
    }

    // 🔥 map questions
    const questions = (exam.questions || []).filter(Boolean).map((q: any) => {
      const stat = questionStats[q._id.toString()] || {
        wrong: 0,
        total: 0,
      };

      const wrongRate =
        stat.total === 0 ? 0 : Math.round((stat.wrong / stat.total) * 100);

      return {
        question: q.question,
        wrong: stat.wrong,
        total: stat.total,
        wrongRate,
      };
    });

    const total = correct + wrong;

    stats.push({
      title: exam.title,

      correct,
      wrong,

      correctRate: total === 0 ? 0 : Math.round((correct / total) * 100),

      wrongRate: total === 0 ? 0 : Math.round((wrong / total) * 100),

      questions,
    });
  }

  return NextResponse.json(stats);
}
