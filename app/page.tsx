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
            Đồng hành cùng các bạn học sinh trong kỳ thi THPTQG
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* MAIN CARD */}
          <div className="aspect-square rounded-2xl bg-[#f4f8fb] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center relative overflow-hidden">

            {/* GRID */}
            {/* TOP GRID OVERLAY */}
            <div className="absolute top-10 left-10 right-10 flex gap-0 opacity-[0.05]">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-20 w-full border border-gray-1000 ${i > 5 ? 'opacity-0' : ''}`}
                ></div>
              ))}
            </div>

            {/* ILLUSTRATION */}
            <div className="relative z-10 flex flex-col items-center justify-center">

              {/* TOP BAR */}
              <div className="w-16 h-3 bg-primary/70 rounded-sm mb-2"></div>

              {/* MAIN STRUCTURE */}
              <div className="relative flex flex-col items-center w-72 h-72 justify-center">
  
                {/* THE COMPASS (Flat & Geometric, matching the image) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 opacity-40">
                  
                  {/* 1. Top peg/handle */}
                  <div className="w-4 h-8 bg-[#8ebce3] rounded-t-sm" />
                  
                  {/* 2. The main hinge (Flat circle) */}
                  <div className="w-10 h-10 bg-[#8ebce3] rounded-full -mt-2.5 z-10" />

                  {/* 3. The Legs (Simple flat rectangles with small points) */}
                  <div className="relative w-full flex justify-center -mt-3.5 px-4">
                    
                    {/* LEFT LEG */}
                    <div className="absolute top-0 origin-top rotate-[22deg] flex flex-col items-center -ml-1">
                      {/* Rectangular part */}
                      <div className="w-4 h-32 bg-[#8ebce3]" />
                      {/* Triangle tip */}
                      <div className="w-4 h-6 bg-[#8ebce3] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                    </div>

                    {/* RIGHT LEG */}
                    <div className="absolute top-0 origin-top -rotate-[22deg] flex flex-col items-center ml-1">
                      {/* Rectangular part */}
                      <div className="w-4 h-32 bg-[#8ebce3]" />
                      {/* Triangle tip */}
                      <div className="w-4 h-6 bg-[#8ebce3] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                    </div>
                    
                  </div>
                </div>

                {/* TEXT LAYER */}
                <div className="relative z-10 flex items-baseline mb-4">
                  <span className="text-[7.5rem] font-medium text-[#0070c0] leading-none select-none drop-shadow-sm">
                    文
                  </span>
                  <span className="text-[5.5rem] font-bold text-[#0070c0] translate-y-6 -ml-3 leading-none select-none drop-shadow-sm">
                    A
                  </span>
                </div>

                {/* BOTTOM GLASS BOXES */}
                <div className="relative z-10 flex gap-5 translate-y-2">
                  {/* Light blue tint glass with soft blur */}
                  <div className="w-16 h-16 bg-[#c8e1f5]/30 backdrop-blur-[4px] border border-white/40 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-bold text-[#0070c0] italic">中</span>
                  </div>
                  <div className="w-16 h-16 bg-[#c8e1f5]/30 backdrop-blur-[4px] border border-white/40 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-bold text-[#0070c0] italic">文</span>
                  </div>
                </div>

              </div>

              
            </div>
          </div>

          {/* FLOATING BLOCK */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-[24px] border border-white/60 bg-[#a5d7e8]/40 backdrop-blur-md shadow-lg z-0"></div>          
          {/* GEAR */}
          <div className="absolute -top-6 -right-6 w-25 h-25 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center text-xl">
            <img 
              src="/verified.png" 
              alt="Verify" 
              className="w-12 h-12 object-contain" 
            />
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
              Trang web KAOSHANG là sản phẩm đề tài NCKHSV Trường Đại học Sư phạm Thành phố Hồ Chí Minh năm 2025-2026, nhằm ứng dụng công nghệ vào giáo dục, hỗ trợ tối đa cho học sinh Việt Nam trong việc ôn tập cho kỳ thi THPTQG môn Tiếng Trung.
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
    </div>
  );
}