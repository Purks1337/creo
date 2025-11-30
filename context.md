# Структура проекта

```
📄 .gitignore
📄 README.md
📄 components.json
📄 eslint.config.mjs
📄 next-env.d.ts
📄 next.config.ts
📄 package.json
📄 postcss.config.mjs
📄 tsconfig.json
📁 app/
│   📄 globals.css
│   📄 layout.tsx
│   📄 page.tsx
📁 public/
│   📁 images/
📁 lib/
│   📄 utils.ts
📁 components/
│   📄 Dither.tsx
│   📄 ProfileCard.css
│   📄 ProfileCard.tsx
```

# Содержимое файлов


---

## ` .gitignore `

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```


---

## ` README.md `

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```


---

## ` components.json `

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "stone",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}

```


---

## ` eslint.config.mjs `

```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```


---

## ` next-env.d.ts `

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```


---

## ` next.config.ts `

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    // Разрешаем SVG, так как placehold.co часто отдает их
    dangerouslyAllowSVG: true, 
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
```


---

## ` package.json `

```json
{
  "name": "creo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@react-three/fiber": "^9.4.0",
    "@react-three/postprocessing": "^3.0.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.554.0",
    "next": "16.0.4",
    "postprocessing": "^6.38.0",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "tailwind-merge": "^3.4.0",
    "three": "^0.167.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}

```


---

## ` postcss.config.mjs `

```mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```


---

## ` tsconfig.json `

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```


---

## ` app/globals.css `

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  /* ... остальные переменные темы (они остаются как были в прошлом шаге) ... */
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* === FIXED VIEWPORT SETTINGS === */
html {
  height: 100%;
}

body {
  height: 100%;
  width: 100%;
  overflow: hidden; /* Отключаем скролл самого окна */
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
  background: var(--background);
  color: var(--foreground);
}

@layer utilities {
  .perspective-1000 { perspective: 1000px; }
  .preserve-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }

  /* Скрываем скроллбар, но оставляем возможность скроллить */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .bg-noise { position: relative; }
  .bg-noise::before {
    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: -1; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
}

:root {
  --radius: 0.625rem;
  /* FORCED DARK THEME COLORS */
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --card: oklch(0.216 0.006 56.043);
  --card-foreground: oklch(0.985 0.001 106.423);
  --popover: oklch(0.216 0.006 56.043);
  --popover-foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.985 0.001 106.423);
  --primary-foreground: oklch(0.216 0.006 56.043);
  --secondary: oklch(0.268 0.007 34.298);
  --secondary-foreground: oklch(0.985 0.001 106.423);
  --muted: oklch(0.268 0.007 34.298);
  --muted-foreground: oklch(0.709 0.01 56.259);
  --accent: oklch(0.268 0.007 34.298);
  --accent-foreground: oklch(0.985 0.001 106.423);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.985 0.001 106.423 / 10%);
  --input: oklch(0.985 0.001 106.423 / 15%);
  --ring: oklch(0.553 0.013 58.071);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.216 0.006 56.043);
  --sidebar-foreground: oklch(0.985 0.001 106.423);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0.001 106.423);
  --sidebar-accent: oklch(0.268 0.007 34.298);
  --sidebar-accent-foreground: oklch(0.985 0.001 106.423);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.553 0.013 58.071);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```


---

## ` app/layout.tsx `

```tsx
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
```


---

## ` app/page.tsx `

```tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

// --- Global Types for CloudPayments ---
declare global {
  interface Window {
    cp: {
      CloudPayments: new () => {
        pay: (
          type: "auth" | "charge",
          options: any,
          callbacks: {
            onSuccess?: (options: any) => void;
            onFail?: (reason: any, options: any) => void;
            onComplete?: (paymentResult: any, options: any) => void;
          }
        ) => void;
      };
    };
  }
}

// --- Types ---
type CheckoutStep = "detail" | "delivery" | "payment" | "success";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  size: string;
  images: string[];
}

// --- Mock Data ---
const DATA = {
  product: {
    id: "001",
    name: "creo basic t-shirt",
    price: 4900,
    currency: "RUB",
    description: "Плотный хлопок, оверсайз крой. Идеально для работы и рейвов. Создана, чтобы пережить любые дедлайны.",
    size: "One Size",
    images: [
      "/images/tshirt.webp", // Убедись, что картинка есть в public/images/
      "https://placehold.co/600x800/222222/FFF?text=Back+View",
      "https://placehold.co/600x800/333333/FFF?text=Detail",
    ],
  } as Product,
  history: {
    text: "В 2025 году мы решили, что миру нужна только одна футболка. Мы убрали всё лишнее, оставив только суть.",
    photos: [
      "https://placehold.co/400x500/e5e5e5/171717?text=Vibe+1",
      "https://placehold.co/400x500/d4d4d4/171717?text=Vibe+2",
      "https://placehold.co/400x500/a3a3a3/171717?text=Vibe+3",
    ],
  },
};

// --- Header Component ---
const Header = () => (
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full z-40 px-8 py-8 flex justify-center items-center pointer-events-none relative"
  >
    <div className="pointer-events-auto cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
       <Image 
         src="/images/creo-v-white.svg" 
         alt="creo logo" 
         width={96} 
         height={96} 
         className="w-24 h-auto drop-shadow-lg"
         priority
       />
    </div>
  </motion.header>
);

// --- Checkout Flow Component ---
const CheckoutFlow = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<CheckoutStep>("detail");
  const [direction, setDirection] = useState(0);

  // Состояние формы и ошибок
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    phone: false
  });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const paginate = (newStep: CheckoutStep, newDirection: number) => {
    setDirection(newDirection);
    setStep(newStep);
  };

  // Обработка ввода
  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Сбрасываем ошибку при вводе
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Валидация перед переходом к оплате
  const validateAndProceedToPayment = () => {
    const newErrors = {
      name: !form.name.trim(),
      address: !form.address.trim(),
      phone: !form.phone.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) {
      paginate('payment', 1);
    }
  };

  // Вызов виджета оплаты
  const handlePayment = () => {
    if (!window.cp) {
      console.error("CloudPayments widget script not loaded");
      return;
    }

    const widget = new window.cp.CloudPayments();

    widget.pay('charge', { 
        publicId: 'pk_da6583e5d4a2bf9d6236da80df0e7', // ВАЖНО: Замени на свой Public ID
        description: `Оплата заказа: ${DATA.product.name}`,
        amount: DATA.product.price,
        currency: DATA.product.currency,
        invoiceId: String(Date.now()), // Уникальный номер заказа
        accountId: 'user@example.com', 
        skin: "mini", 
        data: {
            name: form.name,
            address: form.address,
            phone: form.phone
        }
    }, {
        onSuccess: (options) => { 
            console.log("Success", options);
            paginate('success', 1);
        },
        onFail: (reason, options) => { 
            console.log("Fail", reason, options);
            alert("Ошибка при оплате: " + reason);
        },
        onComplete: (paymentResult, options) => { 
            console.log("Complete", paymentResult, options);
        }
    });
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background flex flex-col md:flex-row overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        ✕
      </button>

      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen bg-zinc-900 relative overflow-hidden">
         <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full absolute inset-0"
         >
             <Image 
                src={DATA.product.images[0]} 
                alt="Product" 
                fill 
                className="object-contain p-12" 
             />
         </motion.div>
      </div>

      {/* Right: Steps */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative p-8 md:p-16 pt-12 flex flex-col bg-background text-foreground">
        <AnimatePresence mode="wait" custom={direction}>
            
            {/* Step 1: Details */}
            {step === 'detail' && (
                <motion.div 
                    key="detail"
                    custom={direction}
                    variants={variants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full flex flex-col justify-between"
                >
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{DATA.product.name}</h1>
                            <span className="text-xl md:text-2xl font-medium">{DATA.product.price} ₽</span>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">{DATA.product.description}</p>
                    </div>
                    <button onClick={() => paginate('delivery', 1)} className="w-full py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-zinc-200 transition-colors">Оформить заказ</button>
                </motion.div>
            )}

            {/* Step 2: Delivery (Form) */}
            {step === 'delivery' && (
                <motion.div 
                    key="delivery"
                    custom={direction}
                    variants={variants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full flex flex-col"
                >
                    <h2 className="text-2xl font-bold mb-6">Доставка</h2>
                    <div className="space-y-6 flex-1">
                        
                        {/* ФИО */}
                        <div className="relative">
                            <input 
                                value={form.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${
                                    errors.name ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'
                                }`} 
                                placeholder="ФИО" 
                            />
                            {errors.name && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                        </div>

                        {/* Адрес */}
                        <div className="relative">
                            <input 
                                value={form.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${
                                    errors.address ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'
                                }`} 
                                placeholder="Адрес доставки (Город, Улица, Дом)" 
                            />
                             {errors.address && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                        </div>

                        {/* Телефон */}
                        <div className="relative">
                            <input 
                                type="tel"
                                value={form.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${
                                    errors.phone ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'
                                }`} 
                                placeholder="Телефон (+7...)" 
                            />
                             {errors.phone && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button onClick={() => paginate('detail', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                        <button onClick={validateAndProceedToPayment} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">К оплате</button>
                    </div>
                </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
                 <motion.div 
                    key="payment"
                    custom={direction}
                    variants={variants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full flex flex-col"
                >
                    <h2 className="text-2xl font-bold mb-6">Оплата</h2>
                    
                    {/* Сводка заказа */}
                    <div className="bg-zinc-900 p-6 rounded-xl mb-6">
                        <div className="flex justify-between font-bold text-lg"><span>Итого</span><span>{DATA.product.price} ₽</span></div>
                        <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
                             <p>Получатель: {form.name}</p>
                             <p>Адрес: {form.address}</p>
                             <p>Тел: {form.phone}</p>
                        </div>
                    </div>

                    {/* Блок с dashed border удален */}

                    {/* Кнопки прижаты к низу с помощью mt-auto */}
                    <div className="flex gap-4 mt-auto">
                        <button onClick={() => paginate('delivery', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                        <button onClick={handlePayment} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">Оплатить</button>
                    </div>
                </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 'success' && (
                <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                >
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold mb-2">Заказ оплачен!</h2>
                    <p className="text-zinc-400 mb-8">Скоро отправим трек-номер на почту.</p>
                    <button onClick={onClose} className="px-8 py-3 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">В магазин</button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Main Page ---
export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const grainUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  if (!isMounted) {
    return <main className="h-screen w-full bg-background bg-noise overflow-hidden relative" />;
  }

  return (
    <main className="h-screen w-full bg-background text-foreground bg-noise overflow-hidden relative">
      
      {/* CloudPayments Script */}
      <Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js" strategy="lazyOnload" />

      {/* Content Scroll Container */}
      <div className="h-full w-full overflow-y-auto no-scrollbar">
          
          <Header />

          {/* Hero Section */}
          <div className="min-h-[calc(100vh-160px)] w-full flex flex-col items-center justify-center p-6 pb-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl flex justify-center"
              >
                <ProfileCard 
                   name={DATA.product.name}
                   title={`${DATA.product.price} ${DATA.product.currency}`}
                   handle="creo.design"
                   status="Limited Edition"
                   avatarUrl={DATA.product.images[0]}
                   miniAvatarUrl="/images/round-ava.webp"
                   iconUrl="/images/creo-v-white.svg"
                   contactText="КУПИТЬ"
                   onContactClick={() => setCheckoutOpen(true)}
                   grainUrl={grainUrl}
                   innerGradient="linear-gradient(135deg, rgba(18,18,20,0.95) 0%, rgba(30,30,35,0.95) 100%)"
                   behindGlowColor="rgba(255, 255, 255, 0.05)"
                   behindGlowSize="60%"
                   enableTilt={true}
                   className="cursor-pointer"
                />
              </motion.div>
          </div>
          
          {/* History Section */}
          <div className="w-full flex flex-col items-center pb-24">
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl px-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                 {DATA.history.photos.map((src, i) => (
                    <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                      <Image src={src} alt="history" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                 ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 max-w-2xl px-6 text-center text-zinc-500 text-lg leading-relaxed"
              >
                {DATA.history.text}
              </motion.div>
          </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && <CheckoutFlow onClose={() => setCheckoutOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
```


---

## ` lib/utils.ts `

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```


---

## ` components/Dither.tsx `

```tsx
import { useRef, useState, useEffect, forwardRef } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
  public uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ['colorNum', new THREE.Uniform(4.0)],
      ['pixelSize', new THREE.Uniform(2.0)]
    ]);
    super('RetroEffect', ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
  set colorNum(value: number) {
    this.uniforms.get('colorNum')!.value = value;
  }
  get colorNum(): number {
    return this.uniforms.get('colorNum')!.value;
  }
  set pixelSize(value: number) {
    this.uniforms.get('pixelSize')!.value = value;
  }
  get pixelSize(): number {
    return this.uniforms.get('pixelSize')!.value;
  }
}

const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>((props, ref) => {
  const { colorNum, pixelSize } = props;
  const WrappedRetroEffect = wrapEffect(RetroEffectImpl);
  return <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />;
});

RetroEffect.displayName = 'RetroEffect';

interface WaveUniforms {
  [key: string]: THREE.Uniform<any>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waveSpeed: THREE.Uniform<number>;
  waveFrequency: THREE.Uniform<number>;
  waveAmplitude: THREE.Uniform<number>;
  waveColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
}

interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();

  const waveUniformsRef = useRef<WaveUniforms>({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius)
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    const currentRes = waveUniformsRef.current.resolution.value;
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
      currentRes.set(newWidth, newHeight);
    }
  }, [size, gl]);

  const prevColor = useRef([...waveColor]);
  useFrame(({ clock }) => {
    const u = waveUniformsRef.current;

    if (!disableAnimation) {
      u.time.value = clock.getElapsedTime();
    }

    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;

    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }

    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;

    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  };

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={waveUniformsRef.current}
        />
      </mesh>

      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>

      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1
}: DitherProps) {
  return (
    <Canvas
      className="w-full h-full relative"
      camera={{ position: [0, 0, 6] }}
      dpr={1}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <DitheredWaves
        waveSpeed={waveSpeed}
        waveFrequency={waveFrequency}
        waveAmplitude={waveAmplitude}
        waveColor={waveColor}
        colorNum={colorNum}
        pixelSize={pixelSize}
        disableAnimation={disableAnimation}
        enableMouseInteraction={enableMouseInteraction}
        mouseRadius={mouseRadius}
      />
    </Canvas>
  );
}

```


---

## ` components/ProfileCard.css `

```css
:root {
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --grain: none;
  --icon: none;
  --behind-gradient: none;
  --behind-glow-color: rgba(125, 190, 255, 0.67);
  --behind-glow-size: 25%;
  --inner-gradient: none;
  /* Цвета бликов сделаем чуть мягче */
  --sunpillar-1: hsl(2, 100%, 73%);
  --sunpillar-2: hsl(53, 100%, 69%);
  --sunpillar-3: hsl(93, 100%, 69%);
  --sunpillar-4: hsl(176, 100%, 76%);
  --sunpillar-5: hsl(228, 100%, 74%);
  --sunpillar-6: hsl(283, 100%, 73%);
  --sunpillar-clr-1: var(--sunpillar-1);
  --sunpillar-clr-2: var(--sunpillar-2);
  --sunpillar-clr-3: var(--sunpillar-3);
  --sunpillar-clr-4: var(--sunpillar-4);
  --sunpillar-clr-5: var(--sunpillar-5);
  --sunpillar-clr-6: var(--sunpillar-6);
  --card-radius: 30px;
}

.pc-card-wrapper {
  perspective: 500px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: none;
}

.pc-behind {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--pointer-x) var(--pointer-y),
    var(--behind-glow-color) 0%,
    transparent var(--behind-glow-size)
  );
  filter: blur(50px) saturate(1.1);
  opacity: calc(0.8 * var(--card-opacity));
  transition: opacity 200ms ease;
}

.pc-card-wrapper:hover,
.pc-card-wrapper.active {
  --card-opacity: 1;
}

.pc-card {
  height: 80svh;
  max-height: 540px;
  display: grid;
  aspect-ratio: 0.718;
  border-radius: var(--card-radius);
  position: relative;
  background-blend-mode: color-dodge, normal, normal, normal;
  animation: glow-bg 12s linear infinite;
  box-shadow: rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px)
    calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px;
  transition: transform 1s ease;
  transform: translateZ(0) rotateX(0deg) rotateY(0deg);
  background: rgba(0, 0, 0, 0.9);
  backface-visibility: hidden;
  overflow: hidden;
}

.pc-card:hover,
.pc-card.active {
  transition: none;
  transform: translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
}

.pc-card-shell.entering .pc-card {
  transition: transform 180ms ease-out;
}

.pc-card-shell {
  position: relative;
  z-index: 1;
}

.pc-card * {
  display: grid;
  grid-area: 1/-1;
  border-radius: var(--card-radius);
  pointer-events: none;
}

.pc-inside {
  inset: 0;
  position: absolute;
  background-image: var(--inner-gradient);
  background-color: rgba(0, 0, 0, 0.9);
  transform: none;
  /* Убеждаемся, что контент внутри правильно слоится */
  display: grid;
}

/* === SHINE / PATTERN EFFECT === */
.pc-shine {
  /* Формируем паттерн через маску */
  mask-image: var(--icon);
  mask-mode: luminance;
  mask-repeat: repeat;
  /* Увеличиваем размер, чтобы логотипы не лепились друг к другу */
  mask-size: 140px; 
  mask-position: center;
  
  /* Начальное состояние - очень тусклое, чтобы не рябило */
  opacity: 0.1;
  
  transition: opacity 0.3s ease, filter 0.3s ease;
  filter: brightness(0.8) contrast(1.2);
  
  animation: holo-bg 18s linear infinite;
  animation-play-state: running;
  
  /* Color-dodge дает эффект свечения, но требует темного фона */
  mix-blend-mode: color-dodge;
  
  /* Слой ниже контента */
  z-index: 1; 
  transform: translate3d(0, 0, 1px);
}

.pc-shine,
.pc-shine::after {
  --space: 5%;
  --angle: -45deg;
  overflow: hidden;
  background: transparent;
  background-size: cover;
  background-position: center;
  
  /* Градиенты для голографического эффекта */
  background-image:
    /* Вертикальные полосы (Sunpillars) */
    repeating-linear-gradient(
      0deg,
      var(--sunpillar-clr-1) calc(var(--space) * 1),
      var(--sunpillar-clr-2) calc(var(--space) * 2),
      var(--sunpillar-clr-3) calc(var(--space) * 3),
      var(--sunpillar-clr-4) calc(var(--space) * 4),
      var(--sunpillar-clr-5) calc(var(--space) * 5),
      var(--sunpillar-clr-6) calc(var(--space) * 6),
      var(--sunpillar-clr-1) calc(var(--space) * 7)
    ),
    /* Диагональные полосы для перелива */
    repeating-linear-gradient(
      var(--angle),
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 29%, 66%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    /* Радиальный градиент, привязанный к курсору */
    radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.1) 20%,
      hsla(0, 0%, 0%, 0.8) 120%
    );
    
  background-blend-mode: soft-light, overlay, normal;
  /* Увеличиваем размер фона, чтобы градиенты были плавнее */
  background-size: 400% 400%, 300% 300%, 200% 200%;
  background-position:
    calc(var(--background-x) + var(--pointer-x)) calc(var(--background-y) + var(--pointer-y)),
    var(--background-x) var(--background-y),
    center;
}

.pc-shine::before,
.pc-shine::after {
  content: '';
  background-position: center;
  background-size: cover;
  grid-area: 1/1;
  opacity: 0;
  transition: opacity 0.8s ease;
}

/* При наведении делаем паттерн чуть ярче, но не кислотным */
.pc-card:hover .pc-shine,
.pc-card.active .pc-shine {
  opacity: 0.25; /* Максимум 25% непрозрачности */
  animation-play-state: paused;
}

.pc-card:hover .pc-shine::before,
.pc-card.active .pc-shine::before,
.pc-card:hover .pc-shine::after,
.pc-card.active .pc-shine::after {
  opacity: 1;
}

.pc-shine::before {
  /* Зернистость и дополнительные переливы */
  background-image:
    radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 90%) 0%, hsla(0, 0%, 10%, 0.1) 90%),
    var(--grain);
  background-size: 100% 100%, 220px 220px;
  background-position: center, 0 0;
  background-blend-mode: overlay;
  mix-blend-mode: overlay;
  opacity: 0.3;
}

.pc-shine::after {
  background-position:
    0 var(--background-y),
    calc(var(--background-x) * 0.4) calc(var(--background-y) * 0.5),
    center;
  background-size: 200% 300%, 700% 700%, 100% 100%;
  mix-blend-mode: overlay;
  filter: brightness(0.9) contrast(1.2);
}

.pc-glare {
  transform: translate3d(0, 0, 1.1px);
  overflow: hidden;
  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    hsla(0, 0%, 100%, 0.1) 0%,
    hsla(0, 0%, 100%, 0) 60%
  );
  mix-blend-mode: overlay;
  z-index: 4;
  opacity: 0.6;
}

/* === PRODUCT LAYER === */
.pc-avatar-content {
  mix-blend-mode: normal;
  overflow: visible;
  /* Поднимаем товар выше паттерна */
  transform: translateZ(10px); 
  z-index: 5;
  backface-visibility: hidden;
}

.pc-avatar-content .avatar {
  width: 90%; 
  height: auto;
  max-height: 60%;
  object-fit: contain;
  
  position: absolute;
  left: 50%;
  top: 53%; 
  
  transform-origin: 50% 50%;
  
  transform: translate3d(
    calc(-50% + (var(--pointer-from-left) - 0.5) * 20px), 
    calc(-50% + (var(--pointer-from-top) - 0.5) * 20px), 
    0
  );
  
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 120ms ease-out;
  
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
}

.pc-user-info {
  position: absolute;
  --ui-inset: 20px;
  --ui-radius-bias: 6px;
  bottom: var(--ui-inset);
  left: var(--ui-inset);
  right: var(--ui-inset);
  z-index: 10; /* Интерфейс поверх всего */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)));
  padding: 12px 14px;
  pointer-events: auto;
}

.pc-user-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pc-mini-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-mini-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.pc-user-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 6px;
}

.pc-handle {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
}

.pc-status {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
}

.pc-contact-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.pc-contact-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

.pc-content:not(.pc-avatar-content) {
  max-height: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  transform: translate3d(
    calc(var(--pointer-from-left) * -6px + 3px),
    calc(var(--pointer-from-top) * -6px + 3px),
    0.1px
  );
  z-index: 6;
  mix-blend-mode: luminosity;
}

.pc-details {
  width: 100%;
  position: absolute;
  top: 3em;
  display: flex;
  flex-direction: column;
}

.pc-details h3 {
  font-weight: 600;
  margin: 0;
  font-size: min(5svh, 3em);
  margin: 0;
  background-image: linear-gradient(to bottom, #fff, #6f6fbe);
  background-size: 1em 1.5em;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

@keyframes glow-bg {
  0% {
    --bgrotate: 0deg;
  }

  100% {
    --bgrotate: 360deg;
  }
}

@keyframes holo-bg {
  0% {
    background-position:
      0 var(--background-y),
      0 0,
      center;
  }

  100% {
    background-position:
      0 var(--background-y),
      90% 90%,
      center;
  }
}

@media (max-width: 768px) {
  .pc-card {
    height: 70svh;
    max-height: 450px;
  }
  .pc-details h3 {
    font-size: min(4svh, 2.5em);
  }
  .pc-user-info {
    --ui-inset: 15px;
    padding: 10px 12px;
  }
  .pc-mini-avatar {
    width: 28px;
    height: 28px;
  }
  .pc-contact-btn {
    padding: 6px 12px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .pc-card {
    height: 60svh;
    max-height: 380px;
  }
  .pc-details h3 {
    font-size: min(3.5svh, 2em);
  }
  .pc-user-info {
    --ui-inset: 12px;
    padding: 8px 10px;
  }
  .pc-mini-avatar {
    width: 24px;
    height: 24px;
  }
  .pc-contact-btn {
    padding: 5px 10px;
    font-size: 10px;
  }
}

@media (max-width: 320px) {
  .pc-card {
    height: 55svh;
    max-height: 320px;
  }
  .pc-details h3 {
    font-size: min(3svh, 1.5em);
  }
  .pc-user-info {
    padding: 6px 8px;
  }
  .pc-mini-avatar {
    width: 20px;
    height: 20px;
  }
  .pc-contact-btn {
    padding: 4px 8px;
    font-size: 9px;
  }
}
```


---

## ` components/ProfileCard.tsx `

```tsx
import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      } as Record<string, string>;

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      const anyMotion = window.DeviceMotionEvent as any;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        '--icon': iconUrl ? `url(${iconUrl})` : 'none',
        '--grain': grainUrl ? `url(${grainUrl})` : 'none',
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
        '--behind-glow-size': behindGlowSize ?? '50%'
      }) as React.CSSProperties,
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || 'User'} mini avatar`}
                        loading="lazy"
                        onError={e => {
                          const t = e.target as HTMLImageElement;
                          t.style.opacity = '0.5';
                          t.src = avatarUrl;
                        }}
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                    aria-label={`Contact ${name || 'user'}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                {/* Subtitle removed */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
```
