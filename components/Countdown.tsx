"use client";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ target }: { target: string }) {
  const targetDate = new Date(target);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#eaf2f6] py-16 text-center">
      <h3 className="text-primary font-bold mb-10 tracking-widest">
        ĐẾM NGƯỢC ĐẾN KỲ THI THPTQG 2026 (DỰ KIẾN)
      </h3>

      <div className="flex justify-center gap-6 flex-wrap">
        {[
          { label: "NGÀY", value: time.days },
          { label: "GIỜ", value: time.hours },
          { label: "PHÚT", value: time.minutes },
          { label: "GIÂY", value: time.seconds },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-28 h-24 flex items-center justify-center text-3xl font-black bg-white rounded-lg shadow">
              {item.value}
            </div>
            <span className="text-sm text-gray-500 mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}