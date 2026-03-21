"use client"

import Link from "next/link"
import { ExamType } from "@/models/types"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
const iconList = [
  "menu_book",
  "edit_note",
  "history_edu",
  "school",
  "auto_stories",
  "description",
  "quiz",
  "assignment",
  "import_contacts",
  "draw",
]

export default function ExamCard({
  exam,
  index,
}: {
  exam: ExamType
  index: number
}) {
  const icon = iconList[index % iconList.length]

  return (
    <Link href={`/exams/${exam._id}`} className="group">
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow overflow-hidden cursor-pointer">

        {/* ICON */}
        <div className="bg-blue-50/50 dark:bg-slate-800/50 p-6 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-5xl text-primary/60 dark:text-primary/40"
            style={{
              fontVariationSettings: '"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 48',
            }}
          >
            {icon}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-6 min-h-[48px] line-clamp-2">
            {exam.title}
          </h3>

          <div className="mt-auto">
            <div className="w-full bg-primary group-hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              Bắt đầu thi
              <ArrowForwardIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}