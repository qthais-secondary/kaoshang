
const Footer = () => {
  return (
    <footer className="bg-[#0f1c23] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg text-xl">
            📧
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="font-semibold">kaoshang@gmail.vn</p>
          </div>
        </div>

        {/* Facebook */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg text-xl">
            📘
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Facebook</p>
            <p className="font-semibold">KAOSHANG</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg text-xl">
            📍
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Địa chỉ</p>
            <p className="font-semibold leading-relaxed">
              28 An Dương Vương, Phường Chợ Quán, TP.HCM
            </p>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom */}
      <div className="text-center text-gray-400 py-6 text-sm">
        © 2026 KAOSHANG. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;