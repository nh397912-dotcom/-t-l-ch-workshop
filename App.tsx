
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import LocationService from './components/LocationService';

const WorkshopBookingContent: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: 'Sáng (08:00 - 11:00)',
    guests: 1,
    duration: '60 phút',
    name: '',
    phone: '',
    note: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    if (!/^\d{10,11}$/.test(formData.phone)) {
      alert("Số điện thoại không hợp lệ (phải gồm 10-11 chữ số).");
      return;
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 bg-pottery-texture">
        <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl p-12 text-center border-t-[12px] border-brand-clay animate-fade-in-up">
          <div className="text-7xl mb-8">🏺</div>
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Xác nhận Đặt lịch</h2>
          <div className="text-left bg-brand-glaze/30 p-8 rounded-2xl mb-8 border border-brand-sand/50">
            <p className="mb-3 text-lg">Chào <strong>{formData.name}</strong>,</p>
            <p className="text-gray-700 leading-relaxed">
              Yêu cầu trải nghiệm gốm Mỹ Thiện vào ngày <strong>{formData.date}</strong> ({formData.timeSlot}) đã được ghi nhận. 
              Chúng tôi sẽ liên hệ sớm nhất qua số <strong>{formData.phone}</strong> để hoàn tất thủ tục.
            </p>
          </div>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-brand-terracotta text-white font-bold py-5 px-12 rounded-full hover:bg-brand-clay transition-all shadow-xl transform hover:-translate-y-1"
          >
            Đặt thêm lịch mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1 mb-6 border border-brand-clay/50 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md bg-white/5 text-brand-sand">
            Trải nghiệm văn hóa
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Đánh thức Nghệ nhân <br/><span className="text-brand-clay italic">trong bạn</span></h1>
          <p className="text-xl max-w-2xl mx-auto opacity-80 font-light leading-relaxed">
            Khám phá quy trình làm gốm Mỹ Thiện 200 năm tuổi qua chính đôi tay của bạn. 
            Tự do sáng tạo, nhào nặn và tạo hình những tác phẩm gốm mộc mạc.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-brand-sand/50">
              <h3 className="text-2xl font-serif font-bold text-brand-terracotta mb-6 flex items-center gap-2">
                <span>📍</span> Địa điểm & Chỉ đường
              </h3>
              <ul className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-clay/10 flex items-center justify-center shrink-0">🏛️</div>
                  <div>
                    <h4 className="font-bold text-sm uppercase">Làng gốm Mỹ Thiện</h4>
                    <p className="text-sm text-gray-600">Thị trấn Châu Ổ, Bình Sơn, Quảng Ngãi.</p>
                  </div>
                </li>
              </ul>
              
              <LocationService />

              <div className="mt-8 pt-6 border-t border-brand-sand/30">
                <h4 className="text-brand-terracotta font-bold text-sm uppercase mb-4">Chi phí trải nghiệm</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="w-10 h-10 rounded-full bg-brand-clay/10 flex items-center justify-center shrink-0">💵</span>
                  <p>150.000đ - 350.000đ / người</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative rounded-[2rem] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60"></div>
              <p className="absolute bottom-6 left-6 right-6 text-white font-serif italic text-lg">"Đất sét là linh hồn, đôi tay là nhịp cầu kết nối di sản."</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-8 bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl border border-brand-sand">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-10 flex items-center gap-4">
              Thông tin Đăng ký
              <span className="h-px bg-brand-sand flex-grow"></span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ngày tham gia *</label>
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Khung giờ trải nghiệm</label>
                  <select 
                    value={formData.timeSlot}
                    onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                  >
                    <option>Sáng (08:00 - 11:00)</option>
                    <option>Chiều (14:00 - 17:00)</option>
                    <option>Cả ngày (Chuyên sâu)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Số lượng người</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Thời gian trải nghiệm</label>
                  <select 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                  >
                    <option>60 phút</option>
                    <option>90 phút</option>
                    <option>120 phút</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-brand-sand/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Họ và tên *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="09xx xxx xxx"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ghi chú thêm (Nếu có)</label>
                  <textarea 
                    rows={3}
                    placeholder="Bạn có yêu cầu đặc biệt gì không?"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10 resize-none"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-terracotta text-white font-bold py-5 rounded-2xl hover:bg-brand-clay transition-all shadow-2xl transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
              >
                Gửi yêu cầu Đặt lịch
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-pottery-texture">
        <Header />
        <WorkshopBookingContent />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
