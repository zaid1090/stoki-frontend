// إطلاق الخزنة النهائي - نسخة نظيفة ومباشرة
"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [liveNotification, setLiveNotification] = useState({ visible: false, city: "", product: "" });
  
  // حالات حقول الإدخال
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const products = [
    { id: 1, name: "حقيبة كلاسيكية - إصدار الجلد الأسود", marketPrice: "12,500", stokiPrice: "8,200", saving: "34%", stock: "قطعتان" },
    { id: 2, name: "ساعة كرونوغراف - هيكل تيتانيوم", marketPrice: "45,000", stokiPrice: "29,500", saving: "34%", stock: "قطعة واحدة" },
    { id: 3, name: "طقم أزرار أكمام مرصع بالألماس", marketPrice: "8,800", stokiPrice: "5,100", saving: "42%", stock: "3 قطع" },
  ];

  // دالة الإرسال المباشر إلى n8n
  const handleExclusiveAcquisition = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // رابط n8n الحالي (تأكد إنه شغال في ngrok)
      const webhookUrl = 'https://dona-nonfelonious-carin.ngrok-free.dev/webhook/stoki-orders'; 

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' // لتخطي شاشة حماية ngrok
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          product: selectedProduct.name,
          source: "Stoki Premium Web",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert("تم تأكيد طلب الاقتناء بنجاح. سيتواصل معك مستشار الفخامة قريباً.");
        setIsCheckoutOpen(false);
        setName("");
        setPhone("");
      } else {
        alert("عذراً، حدث عائق تقني. يرجى المحاولة ذلحينه أو التأكد من تشغيل الخزنة (n8n).");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("تعذر الاتصال. تأكد أن رابط الخزنة (ngrok) يعمل بشكل صحيح.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // محرك الـ FOMO المحلي (بديل السيرفر المحذوف)
  useEffect(() => {
    const cities = ["الرياض", "جدة", "دبي", "الدوحة", "الكويت"];
    const productsList = ["حقيبة كلاسيكية", "ساعة كرونوغراف", "طقم أزرار أكمام"];

    const interval = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomProduct = productsList[Math.floor(Math.random() * productsList.length)];

      setLiveNotification({ visible: true, city: randomCity, product: randomProduct });

      setTimeout(() => setLiveNotification(prev => ({ ...prev, visible: false })), 6000);
    }, 45000); // يظهر إشعار جديد كل 45 ثانية

    return () => clearInterval(interval);
  }, []);

  // عداد الندرة التنازلي
  useEffect(() => {
    if (isCheckoutOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isCheckoutOpen, timeLeft]);

  return (
    <div className="min-h-screen relative font-['Tajawal']" dir="rtl">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a1a1a_0%,#050505_100%)] pointer-events-none" />

      <nav className="relative z-20 flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
        <div className="text-4xl font-light tracking-[0.2em] border-b border-white/20 pb-2">STOKI</div>
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-white transition-colors">المجموعة الحالية</a>
          <a href="#" className="hover:text-white transition-colors">كيفية الاقتناء</a>
          <a href="#" className="hover:text-white transition-colors">الخزنة</a>
        </div>
      </nav>

      <section className="relative z-10 pt-20 pb-32 text-center">
        <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
          اقتنِ <span className="italic font-serif text-yellow-600">الاستثناء</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          قطع مختارة بعناية من أرقى دور الأزياء العالمية، متاحة ذلحينه بأسعار تتجاوز التوقعات لفترة محدودة جداً.
        </p>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-40">
        {products.map((p) => (
          <div key={p.id} className="group relative">
            <div className="aspect-[3/4] bg-[#0a0a0a] border border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-800 uppercase tracking-widest text-[10px]">
                [صورة عالية الجودة]
              </div>
              <div className="absolute top-4 right-4 bg-red-600 text-[10px] px-2 py-1 tracking-tighter">
                وفر {p.saving}
              </div>
              <button 
                onClick={() => { setSelectedProduct(p); setTimeLeft(300); setIsCheckoutOpen(true); }}
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
              >
                <span className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest">اقتنِ الآن</span>
              </button>
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-light text-gray-300">{p.name}</h3>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-600 line-through">السعر الأصلي: {p.marketPrice} ر.س</p>
                  <p className="text-lg font-medium text-white">{p.stokiPrice} ر.س</p>
                </div>
                <p className="text-[10px] text-red-500/80 tracking-widest uppercase">بقي {p.stock} فقط</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {isCheckoutOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 relative">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-6 left-6 text-gray-500 hover:text-white">✕</button>
            <div className="text-center mb-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-600 mb-2">تأكيد الاقتناء</div>
              <h2 className="text-2xl font-light">{selectedProduct.name}</h2>
              <div className="mt-4 inline-block px-4 py-1 border border-yellow-600/30 text-yellow-600 font-mono text-xl">
                {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
              </div>
            </div>
            <form onSubmit={handleExclusiveAcquisition} className="space-y-6">
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم بالكامل" 
                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-yellow-600 transition-colors" 
              />
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="رقم الجوال (مع رمز الدولة)" 
                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-yellow-600 text-left" 
                dir="ltr" 
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-yellow-600 hover:text-white transition-all disabled:opacity-50"
              >
                {isSubmitting ? "جاري فتح الخزنة..." : "تأكيد الحجز الفوري"}
              </button>
            </form>
          </div>
        </div>
      )}

      {liveNotification.visible && (
        <div className="fixed bottom-10 right-10 z-50 animate-fade-in-up bg-black border border-white/10 p-5 flex items-center gap-5 shadow-2xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="text-xs tracking-wide">
            <span className="text-gray-400">عميل من {liveNotification.city}</span> <br/>
            اقتنى <span className="text-white">{liveNotification.product}</span> للتو.
          </div>
        </div>
      )}
    </div>
  );
}