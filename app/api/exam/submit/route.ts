import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Result } from "@/models/Result";
import { Exam } from "@/models/Exam";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, examId, answers, duration } = await req.json();

    // ❗ validate
    if (!userId) {
      return NextResponse.json({ message: "Thiếu userId" }, { status: 400 });
    }

    if (!examId) {
      return NextResponse.json({ message: "Thiếu examId" }, { status: 400 });
    }

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ message: "Thiếu answers" }, { status: 400 });
    }

    // 🔥 tìm exam
    const exam = await Exam.findById(examId).populate("questions")

    if (!exam) {
      return NextResponse.json(
        { message: "Không tìm thấy đề" },
        { status: 404 },
      );
    }

    let score = 0;
    let correctCount = 0;

    // 🔥 xử lý answers
    const resultAnswers = exam.questions.map((q: any, index: number) => {
      const selected = answers[index];

      // ✅ đảm bảo options luôn là array
      const options = Array.isArray(q.options) ? q.options : [];

      // ❗ chưa chọn
      if (selected === null || selected === undefined) {
        return {
          questionId: q._id,
          questionText: q.question,
          options,
          selected: null,
          correctAnswer: q.correctAnswer,
          isCorrect: false,
        };
      }

      // ✅ đảm bảo selected nằm trong range
      const isValidIndex = selected >= 0 && selected < options.length;

      let isCorrect = false;

      if (isValidIndex) {
        // 🔥 CASE 1: correctAnswer là index
        if (typeof q.correctAnswer === "number") {
          isCorrect = selected === q.correctAnswer;
        }
        // 🔥 CASE 2: correctAnswer là value
        else {
          isCorrect = options[selected] === q.correctAnswer;
        }
      }

      if (isCorrect) {
        score++;
        correctCount++;
      }

      return {
        questionId: q._id,
        questionText: q.question,
        options, // ✅ luôn có dữ liệu
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    const total = exam.questions.length;

    // 🔥 SAVE RESULT
    const result = await Result.create({
      user: userId,
      exam: exam._id,
      examTitle: exam.title,
      answers: resultAnswers,
      score,
      totalQuestions:total,
      correctCount,
      duration: duration || 0,
      status: "completed",
    });

    // 🔥 RESPONSE CHUẨN CHO FRONTEND
    return NextResponse.json({
      message: "Nộp bài thành công",
      score,
      total,
      correctCount,
      resultId: result._id,
      result, // optional
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
