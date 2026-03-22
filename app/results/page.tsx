import { cookies } from "next/headers";

type ResultType = {
  _id: string;
  examTitle: string;
  percentage: number;
  duration: number;
  createdAt: string;
};

async function getResults(): Promise<ResultType[]> {
  const cookieStore = await cookies()
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/result/user`, {
     headers: {
      Cookie: cookieStore.toString(), // 🔥 QUAN TRỌNG
    },
    cache: "no-store",
  })

  if (!res.ok) return []

  const data = await res.json()
  console.log({data})
  return data.results
}

export default async function ResultPage() {
  const results = await getResults();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const getColor = (p: number) => {
    if (p >= 90) return "bg-green-500";
    if (p >= 70) return "bg-primary";
    return "bg-orange-500";
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Lịch sử & Kết quả
        </h1>
        <p className="text-slate-600">
          Xem lại kết quả các bài thi đã làm và theo dõi sự tiến bộ của bạn.
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between">
          <input
            placeholder="Tìm kiếm đề thi..."
            className="px-4 py-2 border rounded-lg text-sm"
          />

          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
            + Đề thi mới
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Tên đề thi</th>
              <th className="px-6 py-4">Ngày làm</th>
              <th className="px-6 py-4">Điểm</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r._id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold">
                  {r.examTitle}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500">
                  {formatDate(r.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-slate-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getColor(
                          r.percentage
                        )}`}
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>

                    <span className="font-bold">
                      {r.percentage}%
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-500">
                  {formatDuration(r.duration)}
                </td>

                <td className="px-6 py-4 text-right">
                  <a
                    href={`/results/${r._id}`}
                    className="text-primary font-bold text-xs hover:underline"
                  >
                    CHI TIẾT
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {results.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            Chưa có dữ liệu
          </div>
        )}
      </div>
    </main>
  );
}