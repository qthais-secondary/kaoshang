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
          <div className="flex flex-col items-center gap-2 p-4 mb-6 text-center">
            <h1 className="text-gray-500 dark:text-gray-600 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Thư viện Đề thi THPTQG Tiếng Trung
            </h1>
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