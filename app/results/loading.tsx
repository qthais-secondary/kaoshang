export default function Loading() {
  return (
    <div className="px-6 py-8 animate-pulse">
      {/* Title */}
      <div className="mb-6">
        <div className="h-10 w-80 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-96 bg-gray-200 rounded"></div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow border p-4">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-10 w-64 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 py-3 border-b text-sm font-medium text-gray-500">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 py-4 border-b items-center"
          >
            {/* Tên đề */}
            <div className="h-4 bg-gray-300 rounded w-40"></div>

            {/* Ngày */}
            <div className="h-4 bg-gray-200 rounded w-24"></div>

            {/* Điểm */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-16 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-10 bg-gray-200 rounded"></div>
            </div>

            {/* Thời gian */}
            <div className="h-4 bg-gray-200 rounded w-16"></div>

            {/* Action */}
            <div className="h-4 bg-blue-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
}