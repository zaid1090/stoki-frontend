import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({ 
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "STOKI | الخزنة الحصرية",
  description: "منصة الاقتناء الذكي لأرقى المنتجات بأسعار استثنائية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} bg-[#050505] text-white antialiased selection:bg-yellow-600`}>
        {children}
      </body>
    </html>
  );
}