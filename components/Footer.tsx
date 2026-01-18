
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
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Workshop</h4>
            <ul className="space-y-2 text-sm opacity-70 font-sans">
              <li><a href="#" className="hover:text-brand-clay transition-colors">Hướng dẫn đặt lịch</a></li>
              <li><a href="exchange.html" className="hover:text-brand-clay transition-colors">Sàn giao lưu gốm</a></li>
              <li><a href="#" className="hover:text-brand-clay transition-colors">Chính sách trải nghiệm</a></li>
              <li><a href="https://chatgpt.com" className="hover:text-brand-clay transition-colors">Tư vấn trực tuyến</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest font-sans">Địa chỉ liên hệ</h4>
            <p className="text-sm opacity-70 font-sans">
              Thị trấn Châu Ổ, Huyện Bình Sơn,<br />
              Tỉnh Quảng Ngãi, Việt Nam.<br/>
              Hotline: 09xx xxx xxx
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6 border-t border-white/10 pt-8 text-center">
          <p className="text-xs opacity-50 font-sans">&copy; {new Date().getFullYear()} Làng Gốm Mỹ Thiện. Hệ thống Đặt lịch Workshop Trực tuyến.</p>
        </div>
      </footer>
  );
};

export default Footer;
