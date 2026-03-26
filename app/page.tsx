import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <div className="bg-background-light font-display">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold">
            LỘ TRÌNH ÔN THI 2026
          </span>

          <h1 className="text-5xl font-black leading-tight">
            Chinh phục kỳ thi <br />
            THPT Quốc gia <br />
            môn <span className="text-primary">Tiếng Trung</span>
          </h1>

          <p className="text-gray-600 max-w-lg">
            Nền tảng ôn luyện thông minh, bám sát cấu trúc đề thi của Bộ Giáo dục.
            Giúp bạn tự tin đạt điểm 9+, 10.
          </p>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* MAIN CARD */}
          <div className="aspect-square rounded-xl bg-white shadow-2xl border flex items-center justify-center relative overflow-hidden">

            {/* grid bg */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-primary"></div>
              ))}
            </div>

            {/* content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="text-7xl text-primary opacity-30">文A</div>

              <div className="flex gap-4">
                <div className="w-16 h-16 bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold italic rounded-lg">
                  中
                </div>
                <div className="w-16 h-16 bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold italic rounded-lg">
                  文
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING */}
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/20 rounded-lg" />
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
            ⚙️
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown target="2026-06-12T00:00:00" />

      {/* INFO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#0f1c23] text-white p-12 rounded-xl grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Thông tin dự án nghiên cứu
            </h2>
            <p className="text-gray-400">
              Trang web KAOSHANG là sản phẩm đề tài NCKHSV ĐH Sư phạm TP.HCM,
              hỗ trợ học sinh ôn thi THPTQG môn Tiếng Trung.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <p className="text-primary text-sm mb-2">Giáo viên hướng dẫn</p>
              <h4 className="font-bold">ThS. Lê Thanh Huy</h4>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <p className="text-primary text-sm mb-2">Nhóm nghiên cứu</p>
              <p className="text-sm text-gray-300">
                Nguyễn Đặng Ngọc Trâm <br />
                Võ Thị Thu Hà <br />
                Nguyễn Thanh Huệ <br />
                Đỗ Trần Thanh Ngọc <br />
                Võ Thị Mỹ Hạnh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
    </div>
  )
}