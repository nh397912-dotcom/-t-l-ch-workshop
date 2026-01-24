
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLoginModal from './AdminLoginModal';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-brand-sand">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="https://gom-my-thien-70d9mszo5-nh397912-dotcoms-projects.vercel.app/" className="flex items-center gap-3 group">
              <div className="bg-brand-clay text-white w-10 h-10 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                🏺
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-brand-terracotta leading-none">
                  MỸ THIỆN
                </h1>
                <p className="text-[10px] md:text-xs text-brand-dark tracking-[0.2em] font-bold uppercase mt-1">Booking Workshop</p>
              </div>
            </a>
          </div>
          
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[11px] font-bold text-brand-dark uppercase tracking-wider">
            <a href="index.html" className="text-brand-clay transition-colors border-b-2 border-brand-clay pb-1">Đặt lịch</a>
            <a href="https://gom-my-thien-70d9mszo5-nh397912-dotcoms-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors whitespace-nowrap flex items-center gap-1">
              Di sản <span className="text-[8px] opacity-50">↗</span>
            </a>
            <a href="https://nan-gom.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors whitespace-nowrap flex items-center gap-1 text-brand-terracotta">
              Xưởng 3D <span className="text-[8px] opacity-50">↗</span>
            </a>
            <a href="https://shop-gom-my-thien.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors whitespace-nowrap flex items-center gap-1 text-brand-accent">
              Cửa hàng <span className="text-[8px] opacity-50">↗</span>
            </a>
            <a href="exchange.html" className="hover:text-brand-clay transition-colors whitespace-nowrap">Sàn Giao lưu</a>
            <a href="https://chatgpt.com" className="hover:text-brand-clay transition-colors whitespace-nowrap">Tư vấn AI</a>
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-xs font-bold text-brand-accent border-2 border-brand-accent hover:bg-brand-accent hover:text-white py-2 px-4 rounded-full transition-all"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-brand-clay hover:text-brand-terracotta py-2 px-3 transition-colors uppercase tracking-tight"
              >
                Quản trị
              </button>
            )}
          </div>
        </div>
      </header>
      {!isLoggedIn && <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
