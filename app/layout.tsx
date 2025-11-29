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
  // Заголовок: Сначала Бренд, потом Личность (для поиска), потом Суть
  title: "CREO",
  
  // Описание: Содержит боль (одежда для креаторов), решение (футболка), уточнение (унисекс) и призыв
  description: "Официальный сайт бренда CREO. Одежда для креаторов контента от Славы Трешера. Эксклюзивный дроп: футболка унисекс (универсальный размер). Создавай стиль с нами.",
  
  // Ключевые слова для поисковиков
  keywords: ["CREO", "Слава Трешер", "мерч Славы Трешера", "одежда для креаторов", "лимитированный дроп", "футболка унисекс"],
  
  // Чтобы ссылка красиво выглядела в Telegram/VK/WhatsApp
  openGraph: {
    title: "CREO — Дроп от Славы Трешера",
    description: "Одежда для креативных людей. Успей забрать лимитированную футболку.",
    url: "https://www.creo-brand.ru/", // <-- ОБЯЗАТЕЛЬНО замени на свой реальный домен
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
    // ВАЖНО: меняем 'en' на 'ru', чтобы Google понимал, что сайт на русском
    <html lang="ru"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}