"use client"

import Link from "next/link"
import { ExamType } from "@/models/types"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// 🔥 MUI ICONS
import MenuBookIcon from "@mui/icons-material/MenuBook"
import EditNoteIcon from "@mui/icons-material/EditNote"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import SchoolIcon from "@mui/icons-material/School"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import DescriptionIcon from "@mui/icons-material/Description"
import QuizIcon from "@mui/icons-material/Quiz"
import AssignmentIcon from "@mui/icons-material/Assignment"
import ImportContactsIcon from "@mui/icons-material/ImportContacts"
import DrawIcon from "@mui/icons-material/Draw"

const iconList = [
  MenuBookIcon,
  EditNoteIcon,
  HistoryEduIcon,
  SchoolIcon,
  AutoStoriesIcon,
  DescriptionIcon,
  QuizIcon,
  AssignmentIcon,
  ImportContactsIcon,
  DrawIcon,
]

export default function ExamCard({
  exam,
  index,
}: {
  exam: ExamType
  index: number
}) {
  const Icon = iconList[index % iconList.length]

  return (
    <Link href={`/exams/${exam._id}`} className="group">
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">

        {/* ICON */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-8 flex items-center justify-center">
          <Icon className="text-5xl text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-slate-900 dark:text-slate-100 text-base font-bold mb-6 min-h-[48px] line-clamp-2">
            {exam.title}
          </h3>

          {/* BUTTON */}
          <div className="mt-auto">
            <div className="w-full bg-primary group-hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md">
              Bắt đầu thi
              <ArrowForwardIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}