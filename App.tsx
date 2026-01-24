
import React, { useState, useMemo } from 'react';
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

  // Logic tính giá hợp lý
  const pricing = useMemo(() => {
    let basePricePerGuest = 150000; // Mặc định 60 phút
    if (formData.duration === '90 phút') basePricePerGuest = 220000;
    if (formData.duration === '120 phút') basePricePerGuest = 300000;

    const rawTotal = basePricePerGuest * formData.guests;
    
    // Chiết khấu theo số lượng khách
    let discount = 0;
    if (formData.guests >= 10) discount = 0.2; // Giảm 20% cho đoàn > 10 người
    else if (formData.guests >= 5) discount = 0.1; // Giảm 10% cho đoàn > 5 người

    const discountAmount = rawTotal * discount;
    const finalTotal = rawTotal - discountAmount;

    return {
      unitPrice: basePricePerGuest,
      subtotal: rawTotal,
      discountPercent: discount * 100,
      discountAmount,
      total: finalTotal
    };
  }, [formData.guests, formData.duration]);

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
        <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 text-center border-t-[12px] border-brand-clay animate-fade-in-up">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Thông tin Thanh toán</h2>
          <p className="text-gray-600 mb-8">Yêu cầu của bạn đã được ghi nhận. Vui lòng kiểm tra lại chi phí và thực hiện thanh toán để hoàn tất đặt lịch.</p>
          
          <div className="bg-brand-glaze/30 p-8 rounded-3xl mb-8 border border-brand-sand/50 text-left font-sans shadow-inner">
            <div className="flex justify-between border-b border-brand-sand/30 pb-4 mb-4">
              <span className="text-gray-500">Khách hàng:</span>
              <span className="font-bold text-brand-dark">{formData.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Dịch vụ:</span>
              <span className="text-brand-dark">Workshop {formData.duration} ({formData.guests} người)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Đơn giá:</span>
              <span>{pricing.unitPrice.toLocaleString()}đ / khách</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-500">Tạm tính:</span>
              <span>{pricing.subtotal.toLocaleString()}đ</span>
            </div>
            {pricing.discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 text-sm italic">
                <span>Ưu đãi đoàn đông ({pricing.discountPercent}%):</span>
                <span>-{pricing.discountAmount.toLocaleString()}đ</span>
              </div>
            )}
            <div className="flex justify-between border-t border-brand-clay/20 pt-4 mt-4">
              <span className="text-lg font-bold text-brand-terracotta uppercase">Tổng chi phí:</span>
              <span className="text-2xl font-black text-brand-terracotta">{pricing.total.toLocaleString()}đ</span>
            </div>
          </div>

          <div className="bg-white border-2 border-dashed border-brand-clay/30 p-6 rounded-2xl mb-8 flex flex-col items-center">
             <div className="text-sm font-bold text-brand-clay uppercase mb-2">Quét mã QR Thanh toán</div>
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STK:123456789-NH:VCB-AMT:${pricing.total}-MSG:Booking-${formData.phone}`} alt="QR Code" className="w-32 h-32 mb-4" />
             <p className="text-xs text-gray-500 italic">Nội dung chuyển khoản: Workshop - {formData.phone}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gray-100 text-gray-700 font-bold py-4 px-8 rounded-2xl hover:bg-gray-200 transition-all"
            >
              Chỉnh sửa thông tin
            </button>
            <button 
              onClick={() => window.location.href = 'index.html'}
              className="bg-brand-terracotta text-white font-bold py-4 px-12 rounded-2xl hover:bg-brand-clay transition-all shadow-xl transform hover:-translate-y-1"
            >
              Hoàn tất & Về trang chủ
            </button>
          </div>
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
                <h4 className="text-brand-terracotta font-bold text-sm uppercase mb-4 text-center">Bảng giá tham khảo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 italic">Cơ bản (60 phút)</span>
                    <span className="font-bold">150k/người</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 italic">Sáng tạo (90 phút)</span>
                    <span className="font-bold">220k/người</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 italic">Chuyên sâu (120 phút)</span>
                    <span className="font-bold">300k/người</span>
                  </div>
                  <p className="text-[10px] text-brand-clay mt-2">* Miễn phí nung gốm & tráng men cơ bản. Giảm giá 10-20% cho đoàn khách từ 5 người.</p>
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
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Số lượng khách</label>
                  <div className="flex items-center gap-4">
                     <input 
                        type="number" 
                        min="1" 
                        max="50"
                        value={formData.guests}
                        onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                        className="flex-grow px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                      />
                      <div className="text-xs font-bold text-brand-clay bg-brand-clay/5 px-4 py-2 rounded-lg">
                        {formData.guests >= 10 ? 'Đoàn lớn (-20%)' : formData.guests >= 5 ? 'Đoàn vừa (-10%)' : 'Khách lẻ'}
                      </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Gói trải nghiệm</label>
                  <select 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10"
                  >
                    <option value="60 phút">Cơ bản (60 phút)</option>
                    <option value="90 phút">Sáng tạo (90 phút)</option>
                    <option value="120 phút">Chuyên sâu (120 phút)</option>
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
                    placeholder="Ví dụ: Cần nghệ nhân hướng dẫn kỹ thuật đắp nổi hoa văn cổ..."
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-brand-sand/30 focus:border-brand-clay outline-none transition-all bg-brand-glaze/10 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-brand-glaze/40 p-6 rounded-2xl border-2 border-brand-clay/10 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="text-center md:text-left">
                    <p className="text-xs uppercase font-bold text-gray-500 tracking-tighter">Tổng phí ước tính:</p>
                    <h3 className="text-3xl font-black text-brand-terracotta">{pricing.total.toLocaleString()}đ</h3>
                 </div>
                 <button 
                    type="submit"
                    className="w-full md:w-auto bg-brand-terracotta text-white font-bold py-5 px-12 rounded-2xl hover:bg-brand-clay transition-all shadow-2xl transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                  >
                    Gửi yêu cầu & Thanh toán
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
              </div>
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
