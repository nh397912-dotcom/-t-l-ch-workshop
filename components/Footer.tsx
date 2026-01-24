
import React from 'react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-brand-dark text-brand-glaze pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-serif text-2xl font-bold mb-4 text-brand-clay">Mỹ Thiện</h4>
            <p className="text-sm opacity-70 leading-relaxed font-sans">
              Trung tâm trải nghiệm gốm cổ truyền Mỹ Thiện. 
              Nơi lưu giữ hồn cốt xứ Quảng qua từng thớ đất sét mộc mạc.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm opacity-70 font-sans">
              <li><a href="https://gom-my-thien-70d9mszo5-nh397912-dotcoms-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">Khám phá Di sản Mỹ Thiện</a></li>
              <li><a href="https://shop-gom-my-thien.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">Cửa hàng Gốm trực tuyến</a></li>
              <li><a href="exchange.html" className="hover:text-brand-clay transition-colors">Sàn giao lưu gốm cổ</a></li>
              <li><a href="https://chatgpt.com" className="hover:text-brand-clay transition-colors">Tư vấn nghệ nhân AI</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Địa chỉ liên hệ</h4>
            <div className="text-sm opacity-70 font-sans space-y-2">
              <p>Thị trấn Châu Ổ, Huyện Bình Sơn,<br />Tỉnh Quảng Ngãi, Việt Nam.</p>
              <div className="pt-2 border-t border-white/10">
                <p className="flex items-center gap-2">
                  <span className="text-brand-clay">📞</span> 09xx xxx xxx
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-brand-clay">✉️</span> info@gommythien.vn
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/10 pt-8 text-center">
          <p className="text-xs opacity-50 font-sans">&copy; {new Date().getFullYear()} Làng Gốm Mỹ Thiện. Hệ thống Đặt lịch Workshop Trực tuyến.</p>
        </div>
      </footer>
  );
};

export default Footer;
