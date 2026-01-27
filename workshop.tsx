
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

const WorkshopBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: 'Sáng (08:00 - 11:00)',
    guests: 1,
    customerType: 'Người lớn',
    name: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pricing = useMemo(() => {
    let basePrice = 0;
    switch (formData.customerType) {
      case 'Trẻ em': basePrice = 80000; break;
      case 'Người lớn': basePrice = 150000; break;
      case 'Tập thể (Học sinh/Sinh viên)': basePrice = 100000; break;
      case 'Tập thể (Doanh nghiệp/Team)': basePrice = 300000; break;
      case 'Gói tháng (Trẻ em)': basePrice = 500000; break;
      case 'Gói tháng (Người lớn)': basePrice = 1125000; break;
      default: basePrice = 150000;
    }
    return {
      unit: basePrice,
      total: basePrice * formData.guests
    };
  }, [formData.customerType, formData.guests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    if (formData.customerType === 'Tập thể (Học sinh/Sinh viên)' && formData.guests < 20) {
      alert("Gói học sinh áp dụng cho đoàn từ 20 người.");
      return;
    }
    if (!/^\d{10,11}$/.test(formData.phone)) {
      alert("Số điện thoại không hợp lệ.");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border-t-8 border-brand-clay animate-fade-in">
          <div className="text-5xl mb-6">🧾</div>
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Xác nhận Thanh toán</h2>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Khách hàng:</span>
              <span className="font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Dịch vụ:</span>
              <span>{formData.customerType}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Số lượng:</span>
              <span>{formData.guests} người</span>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between text-lg font-bold text-brand-terracotta">
              <span>Tổng chi phí:</span>
              <span>{pricing.total.toLocaleString()}đ</span>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-gray-600 text-sm">Vui lòng thanh toán qua số tài khoản sau để hoàn tất:</p>
            <div className="bg-brand-glaze/20 p-4 rounded-xl border border-brand-sand">
               <p className="font-bold text-brand-dark">Vietcombank: 123456789</p>
               <p className="text-xs text-gray-500">Chủ TK: Làng gốm Mỹ Thiện</p>
            </div>
          </div>

          <a href="index.html" className="inline-block w-full bg-brand-terracotta text-white font-bold py-4 rounded-xl hover:bg-brand-clay transition-all shadow-lg">
            Xác nhận & Quay về trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <a href="index.html" className="inline-flex items-center text-brand-clay hover:text-brand-terracotta font-bold mb-8 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Trở về trang chủ
        </a>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-6">Workshop Gốm Mỹ Thiện</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Đắm mình trong không gian yên bình của làng nghề, tự tay nhào nặn đất sét và tạo nên tác phẩm mang dấu ấn cá nhân.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-brand-clay/10 p-6 rounded-2xl border border-brand-clay/20">
            <h3 className="font-bold text-brand-terracotta uppercase tracking-wider text-sm mb-4">Chi tiết bảng giá</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span>Trẻ em:</span>
                <span className="font-bold">80.000đ</span>
              </li>
              <li className="flex justify-between">
                <span>Người lớn:</span>
                <span className="font-bold">150.000đ</span>
              </li>
              <li className="flex justify-between">
                <span>Tập thể (HS/SV):</span>
                <span className="font-bold">100.000đ</span>
              </li>
              <li className="flex justify-between border-t pt-2 mt-2">
                <span>Gói tháng (Trẻ em):</span>
                <span className="font-bold">500.000đ</span>
              </li>
              <li className="flex justify-between">
                <span>Gói tháng (Người lớn):</span>
                <span className="font-bold">1.125.000đ</span>
              </li>
            </ul>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800" 
            className="rounded-2xl shadow-xl w-full h-64 object-cover" 
            alt="Nghệ nhân hướng dẫn"
          />
        </div>

        <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-brand-sand">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tham gia *</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Khung giờ</label>
                <select 
                  value={formData.timeSlot}
                  onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
                >
                  <option>Sáng (08:00 - 11:00)</option>
                  <option>Chiều (14:00 - 17:00)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Đối tượng / Gói</label>
                <select 
                  value={formData.customerType}
                  onChange={e => setFormData({...formData, customerType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
                >
                  <option value="Trẻ em">Trẻ em (80k)</option>
                  <option value="Người lớn">Người lớn (150k)</option>
                  <option value="Tập thể (Học sinh/Sinh viên)">Tập thể (HS/SV - Đoàn > 20)</option>
                  <option value="Tập thể (Doanh nghiệp/Team)">Tập thể (Doanh nghiệp)</option>
                  <option value="Gói tháng (Trẻ em)">Gói tháng (Trẻ em - 500k)</option>
                  <option value="Gói tháng (Người lớn)">Gói tháng (Người lớn - 1.125k)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Số lượng khách</label>
                <input 
                  type="number" 
                  min="1" 
                  max="100"
                  value={formData.guests}
                  onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
                />
              </div>
            </div>

            <hr className="border-brand-sand/30" />

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên người đặt *</label>
              <input 
                type="text" 
                required
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
              <input 
                type="tel" 
                required
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none"
              />
            </div>

            <div className="bg-brand-glaze/30 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500 uppercase font-bold">Thành tiền:</span>
                <p className="text-2xl font-black text-brand-terracotta">{pricing.total.toLocaleString()}đ</p>
              </div>
              <button 
                type="submit"
                className="bg-brand-terracotta text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-clay transition-all shadow-lg transform active:scale-95 flex items-center gap-2"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('workshop-root')!);
root.render(<WorkshopBooking />);
