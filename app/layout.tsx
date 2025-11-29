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

// Базовый URL для корректной работы SEO и картинок
const baseUrl = "https://www.creo-brand.ru";

export const metadata: Metadata = {
  // META BASE: Критически важно для SEO в Next.js
  metadataBase: new URL(baseUrl),

  // TITLE: Должен содержать главные поисковые запросы
  // Люди ищут: "Слава Трешер мерч", "Бренд CREO", "Коллекция Скука"
  title: {
    default: "CREO — Официальный бренд Славы Трешера | Дроп «Скука»",
    template: "%s | CREO",
  },

  // DESCRIPTION: Содержит твою философию + Unicode зачеркивание + ключевые слова
  // Роботы считывают текст, а люди видят стиль.
  // Ск̶ука (зачеркнута к) и С̶к̶у̶к̶а̶ (зачеркнуто все слово)
  description: "Лимитированный дроп одежды от Славы Трешера. 3 этапа принятия: Скука (осознание) — Ск̶ука (злость) — С̶к̶у̶к̶а̶ (борьба/решение). Футболка унисекс для креаторов, которые не готовы мириться с серостью.",

  // KEYWORDS: Теги, по которым сайт будет выдаваться в поиске
  keywords: [
    "CREO",
    "Слава Трешер",
    "мерч Славы Трешера",
    "Скука мерч",
    "бренд одежды CREO",
    "футболка унисекс",
    "одежда для креаторов",
    "стритвир",
    "дроп одежды"
  ],

  // AUTHORS & CREATOR
  authors: [{ name: "Слава Трешер" }],
  creator: "Slava Thresher",

  // ROBOTS: Явное разрешение на индексацию
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // OPEN GRAPH: Как ссылка выглядит в Telegram/VK/WhatsApp
  openGraph: {
    title: "CREO: Скука — Ск̶ука — С̶к̶у̶к̶а̶",
    description: "Дроп от Славы Трешера. История о том, как злость превращается в решение. Забирай свой манифест.",
    url: baseUrl,
    siteName: "CREO",
    locale: "ru_RU",
    type: "website",
    // Next.js автоматически подтянет opengraph-image.png из папки app/, если ты его туда положишь
  },

  // CANONICAL: Защита от дублей страниц
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Обязательно 'ru' для правильной гео-привязки
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}