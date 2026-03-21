import { ExamType } from "@/models/types"
import ExamCard from "@/components/ExamCard"

async function getExams(): Promise<ExamType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/exam/list`,
      { cache: "no-store" }
    )

    if (!res.ok) throw new Error("Failed to fetch exams")

    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ExamsPage() {
  const exams = await getExams()

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col px-6 py-8">

        <div className="layout-content-container flex flex-col flex-1">

          {/* TITLE */}
          <div className="flex flex-col gap-2 p-4 mb-6 text-left">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Thư viện Đề thi THPTQG Tiếng Trung
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base font-normal">
              Bám sát cấu trúc đề thi của Bộ Giáo dục & Đào tạo. Giúp bạn tự tin đạt điểm 9+, 10 trong kỳ thi THPTQG sắp tới.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {exams.map((exam, index) => (
              <ExamCard
                key={exam._id?.toString()}
                exam={exam}
                index={index}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}