
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const LocationService: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState<string | null>(null);
  const [links, setLinks] = useState<{ uri: string; title: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getDirections = async () => {
    setLoading(true);
    setError(null);
    setDirections(null);
    setLinks([]);

    if (!navigator.geolocation) {
      setError("Trình duyệt của bạn không hỗ trợ định vị.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Tôi đang ở vị trí có tọa độ (${latitude}, ${longitude}). Hãy chỉ đường cho tôi đi đến Làng gốm Mỹ Thiện, thị trấn Châu Ổ, huyện Bình Sơn, tỉnh Quảng Ngãi. Cung cấp một vài chỉ dẫn ngắn gọn và link bản đồ Google Maps.`,
            config: {
              tools: [{ googleMaps: {} }],
              toolConfig: {
                retrievalConfig: {
                  latLng: { latitude, longitude }
                }
              }
            },
          });

          setDirections(response.text || "Không tìm thấy thông tin chỉ đường.");
          
          // Extract maps grounding chunks
          const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
          if (chunks) {
            const mapLinks = chunks
              .filter((c: any) => c.maps)
              .map((c: any) => ({
                uri: c.maps.uri,
                title: c.maps.title || "Xem trên bản đồ"
              }));
            setLinks(mapLinks);
          }
        } catch (err: any) {
          console.error(err);
          setError("Có lỗi khi kết nối với dịch vụ chỉ đường AI.");
        } finally {
          setLoading(false);
        }
      },
      (geoErr) => {
        setLoading(false);
        setError("Không thể truy cập vị trí của bạn. Vui lòng cho phép quyền định vị.");
      }
    );
  };

  return (
    <div className="space-y-4">
      <button
        onClick={getDirections}
        disabled={loading}
        className="w-full bg-brand-accent hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tìm đường...
          </span>
        ) : (
          <>
            <span className="text-xl">🗺️</span>
            Chỉ đường từ vị trí của bạn
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      {directions && (
        <div className="bg-brand-glaze/50 p-4 rounded-xl border border-brand-sand/50 animate-fade-in">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
            {directions}
          </p>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-terracotta hover:underline bg-white px-3 py-1.5 rounded-full border border-brand-sand/30 shadow-sm"
                >
                  📍 {link.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationService;
