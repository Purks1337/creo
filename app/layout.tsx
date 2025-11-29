import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Title: Бренд + Автор + Название коллекции (главный хук)
  title: "CREO x Слава Трешер — Дроп «Скука» | Больше, чем просто мерч",
  
  // Description: Выжимка твоей истории. Боль -> Эмоция -> Продукт.
  description: "Лимитированный дроп «Скука» от Славы Трешера. 3 этапа принятия: осознание, злость (с*ука) и борьба. Футболка CREO для тех, кто не готов мириться с серостью. Универсальный размер.",
  
  // Ключевые слова: Смешиваем имя автора, название бренда и философию
  keywords: ["CREO", "Слава Трешер", "мерч Скука", "дроп Славы Трешера", "одежда для креаторов", "с(к)ука", "футболка унисекс"],
  
  // OpenGraph: Карточка, которая полетит в Телеграм и соцсети. Тут можно дать больше эмоций.
  openGraph: {
    title: "CREO: С(к)ука — злость, которая стала решением",
    description: "История о том, как серая сторис превратилась в манифест. Лимитированная футболка от Славы Трешера для тех, кто борется со скукой.",
    url: "https://твои-домен.com", // <-- НЕ ЗАБУДЬ ПОМЕНЯТЬ
    siteName: "CREO",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Обязательно 'ru' для правильной индексации в РФ/СНГ
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}