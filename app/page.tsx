"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Truck, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import Dither from "@/components/Dither";
import LightRays from "@/components/LightRays";

// === ССЫЛКА НА ТЕЛЕГРАМ-СКРИПТ ===
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

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
// Тип DeliveryType больше не нужен, т.к. остался только один способ доставки
// type DeliveryType = "pickup" | "courier"; 

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  size: string;
  images: string[];
  specs?: {
    size: string;
    dimensions: string;
    composition: string;
    density: string;
    measurements: { label: string; value: string }[];
  };
}

// --- Mock Data ---
const DATA = {
  product: {
    id: "001",
    name: "СКУКА",
    price: 4900,
    currency: "RUB",
    // Описание было изменено, чтобы текст о доставке и поддержке рендерился через JSX
    description: "Оверсайз футболка имеет единый универсальный размер - L. Из-за своего свободного кроя она подходит любому человеку ростом до 190см. Материал футболки очень плотный и мягкий. 310гр.",
    size: "One Size",
    specs: {
      size: "48-50",
      dimensions: "Ширина 58, длина 75",
      composition: "Хлопок 80%, полиэстер 20%",
      density: "310г/м²",
      measurements: [
        { label: "Грудь", value: "94-102" },
        { label: "Талия", value: "74-82" },
        { label: "Бедра", value: "102-110" },
      ]
    },
    images: [
      "/images/tshirt.webp",
      "/images/img1.webp",
      "/images/img2.webp",
    ],
  } as Product,
  history: {
    photos: [
      "https://placehold.co/400x500/e5e5e5/171717?text=Vibe+1",
      "https://placehold.co/400x500/d4d4d4/171717?text=Vibe+2",
      "https://placehold.co/400x500/a3a3a3/171717?text=Vibe+3",
    ],
    stories: [
      "/images/stories/1.webp",
      "/images/stories/2.webp",
      "/images/stories/3.webp",
      "/images/stories/4.webp",
      "/images/stories/5.webp",
    ]
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

  const [currentImage, setCurrentImage] = useState(0);
  const [imageDirection, setImageDirection] = useState(0);

  const [cdekModalOpen, setCdekModalOpen] = useState(false);

  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });
  const [errors, setErrors] = useState({ name: false, address: false, phone: false, email: false });

  // === CDEK LISTENER ===
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CDEK_CHOICE') {
        const info = event.data.payload;
        const formattedAddress = `${info.city}, ${info.address} (ПВЗ: ${info.id})`;

        setForm(prev => ({ ...prev, address: formattedAddress }));
        if (errors.address) setErrors(prev => ({ ...prev, address: false }));

        setCdekModalOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [errors.address]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const paginate = (newStep: CheckoutStep, newDirection: number) => {
    setDirection(newDirection);
    setStep(newStep);
  };

  const paginateImage = (newDirection: number) => {
    setImageDirection(newDirection);
    if (newDirection > 0) {
      setCurrentImage((prev) => (prev === DATA.product.images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentImage((prev) => (prev === 0 ? DATA.product.images.length - 1 : prev - 1));
    }
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validateAndProceedToPayment = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: !form.name.trim(),
      address: !form.address.trim(),
      phone: !form.phone.trim(),
      email: !form.email.trim() || !emailRegex.test(form.email),
    };

    setErrors(newErrors);
    if (!Object.values(newErrors).some(Boolean)) paginate('payment', 1);
  };

  const handlePayment = () => {
    if (!window.cp) {
      console.error("CloudPayments widget script not loaded");
      return;
    }

    const orderId = String(Date.now());
    
    const addressPrefix = "[СДЭК ПВЗ]";
    const fullAddress = `${addressPrefix} ${form.address}`;

    const widget = new window.cp.CloudPayments();
    widget.pay('charge', {
      publicId: 'pk_da6583e5d4a2bf9d6236da80df0e7',
      description: `Оплата заказа: ${DATA.product.name}`,
      amount: DATA.product.price,
      currency: DATA.product.currency,
      invoiceId: orderId,
      accountId: form.email,
      skin: "mini",
      data: {
        name: form.name,
        address: fullAddress,
        phone: form.phone,
        email: form.email
      }
    }, {
      onSuccess: (options) => {
        console.log("Payment successful, waiting for widget to close...");
      },
      onFail: (reason, options) => {
        alert("Ошибка при оплате: " + reason)
      },
      onComplete: (paymentResult, options) => {
        if (paymentResult && paymentResult.success) {
          if (GOOGLE_SCRIPT_URL) {
            fetch(GOOGLE_SCRIPT_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderId,
                name: form.name,
                address: fullAddress,
                phone: form.phone,
                email: form.email,
                price: DATA.product.price
              })
            }).catch(err => console.error("Failed to send data to Google Script", err));
          }
          paginate('success', 1);
        }
      }
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
      >
        <X size={20} />
      </button>

      <div className="w-full h-full overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">

        {/* Left: Product Image Slider */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-zinc-900 relative overflow-hidden shrink-0 flex items-center justify-center">
          {/* Dither background */}
          <div className="absolute inset-0 z-0">
            <Dither
              waveColor={[0, 0.3, 0]}
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div>

          {/* Slider content */}
          <AnimatePresence initial={false} custom={imageDirection}>
            <motion.div
              key={currentImage}
              custom={imageDirection}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <Image
                src={DATA.product.images[currentImage]}
                alt={`Product image ${currentImage + 1}`}
                fill
                className="object-contain rounded-lg p-2"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginateImage(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginateImage(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>


        {/* Right: Steps */}
        <div className="w-full md:w-1/2 h-auto md:h-screen relative p-8 md:p-16 pt-12 flex flex-col bg-background text-foreground shrink-0">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 'detail' && (
              <motion.div
                key="detail"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-h-full md:h-full flex flex-col justify-between md:overflow-y-auto no-scrollbar"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{DATA.product.name}</h1>
                    <span className="text-xl md:text-2xl font-medium">{DATA.product.price} ₽</span>
                  </div>
                  
                  <div className="text-zinc-400 text-lg leading-relaxed mb-6 space-y-4">
                    <p className="whitespace-pre-line">{DATA.product.description}</p>
                    <p>
                      📦 Доставка: (<span className="line-through text-red-500/80">754₽</span>) Бесплатно.
                    </p>
                    <p>
                      🛠 Если у вас возникли вопросы или трудности с оплатой, напишите нам в ТГ для быстрого ответа: <a href="https://t.me/creosupport" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">https://t.me/creosupport</a>
                    </p>
                  </div>
                  
                  {DATA.product.specs && (
                    <div className="bg-zinc-900/50 rounded-xl p-4 mb-6 text-sm space-y-3 border border-zinc-800">
                      <div className="flex justify-between border-b border-zinc-800 pb-2"><span className="text-zinc-500">Размер</span><span className="font-medium">{DATA.product.specs.size}</span></div>
                      <div className="flex justify-between border-b border-zinc-800 pb-2"><span className="text-zinc-500">Габариты</span><span className="font-medium">{DATA.product.specs.dimensions}</span></div>
                      <div className="flex justify-between border-b border-zinc-800 pb-2"><span className="text-zinc-500">Состав</span><span className="font-medium text-right max-w-[60%]">{DATA.product.specs.composition}</span></div>
                      <div className="flex justify-between pb-2"><span className="text-zinc-500">Плотность</span><span className="font-medium">{DATA.product.specs.density}</span></div>
                      <div className="pt-2">
                        <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider font-bold">Параметры фигуры (см)</p>
                        <div className="grid grid-cols-3 gap-2">
                          {DATA.product.specs.measurements.map((m) => (
                            <div key={m.label} className="bg-zinc-950 p-2 rounded text-center border border-zinc-800/50">
                              <div className="text-xs text-zinc-500 mb-1">{m.label}</div>
                              <div className="font-medium">{m.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={() => paginate('delivery', 1)} className="w-full py-4 mt-6 md:mt-0 bg-white text-black text-lg font-medium rounded-full hover:bg-zinc-200 transition-colors shrink-0">Оформить заказ</button>
              </motion.div>
            )}

            {step === 'delivery' && (
              <motion.div
                key="delivery"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-h-full md:h-full flex flex-col md:overflow-y-auto no-scrollbar"
              >
                <h2 className="text-2xl font-bold mb-6">Доставка</h2>

                <div className="space-y-6 flex-1">
                  <div className="relative">
                    <input value={form.name} onChange={(e) => handleInputChange('name', e.target.value)} className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${errors.name ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}`} placeholder="ФИО" />
                    {errors.name && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                  </div>

                  <div className="relative">
                    <input
                      value={form.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`
                                    w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 
                                    ${errors.address ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}
                                    pr-40
                                  `}
                      readOnly
                      placeholder="Выберите пункт на карте →"
                    />
                    {errors.address && <span className="text-xs text-red-500 absolute right-0 top-12">Обязательное поле</span>}

                    <button
                      onClick={() => setCdekModalOpen(true)}
                      className="absolute right-0 top-2 text-xs text-black font-semibold flex items-center gap-1 bg-white hover:bg-zinc-200 px-3 py-2 rounded-lg transition-colors z-10"
                    >
                      <span className="hidden sm:inline">Выбрать на карте</span>
                      <span className="inline sm:hidden">Карта</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${errors.email ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}`}
                      placeholder="Email (для чека)"
                    />
                    {errors.email && <span className="text-xs text-red-500 absolute right-0 top-4">Некорректный email</span>}
                  </div>

                  <div className="relative">
                    <input type="tel" value={form.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${errors.phone ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}`} placeholder="Телефон (+7...)" />
                    {errors.phone && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => paginate('detail', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                  <button onClick={validateAndProceedToPayment} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">К оплате</button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-h-full md:h-full flex flex-col md:overflow-y-auto no-scrollbar"
              >
                <h2 className="text-2xl font-bold mb-6">Оплата</h2>
                <div className="bg-zinc-900 p-6 rounded-xl mb-6">
                  <div className="flex justify-between font-bold text-lg"><span>Итого</span><span>{DATA.product.price} ₽</span></div>
                  <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-500">Доставка:</span>
                      <span className="bg-zinc-800 text-white px-2 py-0.5 rounded text-xs">
                        В пункт СДЭК
                      </span>
                    </div>
                    <p>Получатель: {form.name}</p>
                    <p className="break-words">Адрес: {form.address}</p>
                    <p>Email: {form.email}</p>
                    <p>Тел: {form.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-auto">
                  <button onClick={() => paginate('delivery', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                  <button onClick={handlePayment} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">Оплатить</button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-2">Заказ оплачен!</h2>
                <p className="text-zinc-400 mb-8">Скоро отправим трек-номер на почту.</p>
                <button onClick={onClose} className="px-8 py-3 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">В магазин</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* === CDEK MODAL (IFRAME) === */}
      <AnimatePresence>
        {cdekModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <div className="bg-zinc-900 w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden relative border border-zinc-700 shadow-2xl flex flex-col">
              {/* Modal Header */}
              <div className="bg-zinc-800 p-4 flex justify-between items-center shrink-0">
                <h3 className="text-white font-medium">Выберите пункт выдачи</h3>
                <button
                  onClick={() => setCdekModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Iframe */}
              <div className="flex-1 relative bg-white">
                <iframe
                  src="/api/cdek/widget"
                  className="w-full h-full absolute inset-0 border-0"
                  title="CDEK Map"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 276;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const grainUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  if (!isMounted) {
    return <main className="h-screen w-full bg-background bg-noise overflow-hidden relative" />;
  }

  return (
    <main className="h-screen w-full bg-background text-foreground bg-noise overflow-hidden relative">

      {/* CloudPayments Script */}
      <Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js" strategy="lazyOnload" />

      {/* Content Scroll Container */}
      <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth relative z-10">

        {/* Global Background Rays (Fixed & Behind everything) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#737373"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
          />
        </div>

        <Header />

        {/* Hero Section */}
        <div className="min-h-[calc(100vh-160px)] w-full flex flex-col items-center justify-center p-6 pb-20 relative">

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex justify-center"
          >
            <ProfileCard
              name="СКУКА"
              title="oversized t-shirt"
              handle="creo.design"
              status="Limited Edition"
              avatarUrl={DATA.product.images[0]}
              miniAvatarUrl="/images/round-ava.webp"
              iconUrl="/images/creo-v-white.svg"
              contactText="КУПИТЬ"
              onContactClick={() => setCheckoutOpen(true)}
              grainUrl={grainUrl}
              innerGradient="linear-gradient(135deg, rgba(18,18,20,0.95) 0%, rgba(30,30,35,0.95) 100%)"
              behindGlowColor="rgba(255, 255, 255, 0.20)"
              behindGlowSize="60%"
              enableTilt={true}
              className="cursor-pointer"
            />
          </motion.div>
        </div>

        {/* History Section */}
        <div className="w-full flex flex-col items-center pb-12">
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
            className="mt-16 max-w-3xl px-6 text-zinc-400 text-lg leading-relaxed space-y-8 text-left"
          >
            <p>
              Совершенно спонтанно, в один из серых дней, я выложил у себя в блоге такую же серую сторис. Про то, как скучно делать буквально всё в этой жизни. Это и вправду сводит меня с ума. В следующей сторис я написал и выложил одну фразу по центру экрана: <span className="text-zinc-100 font-medium">«скука»</span>.
            </p>
            <p>
              В этот же момент я заметил деталь: если зачеркнуть одну букву «к», получится всеми известное литературное слово <span className="text-zinc-100 font-medium">«сука»</span>. Именно так я и сделал в следующей сторис, потому что именно так я себя и чувствовал, именно это я и хотел закричать от всей злости в душе, которая накопилась. Вот и крикнул!! Правда, пикселями в интернет.
            </p>
            <p>
              И на той стороне отразилось эхо - в виде больших охватов, лайков, репостов и заваленного директа в стиле: <i>«это про меня, как же знакомо, жиза»</i>. Это и послужило идеей создания линейки под названием «скука», которая будет объединять всех, кому это дерьмо близко, и всех, кто не готов с этим мириться.
            </p>
            <p>
              Для меня мув с зачеркиванием всё так же символизирует злость того момента. Но мерч продолжает эту метафору и завершает её окончательно.
            </p>

            {/* Manifesto Block */}
            <div className="my-12">
              <p className="italic text-zinc-500 mb-6 text-base">Перед вами 3 слова, 3 этапа принятия:</p>
              <div className="space-y-4 font-mono text-xl md:text-2xl text-zinc-100">

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <span className="text-zinc-600 text-sm md:text-base">01</span>
                  <span>Скука <span className="text-zinc-500 text-base font-sans font-normal ml-2">— осознание</span></span>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <span className="text-zinc-600 text-sm md:text-base">02</span>
                  <span className="flex items-baseline">
                    <span>С</span>
                    <span className="relative mx-[1px] text-zinc-300">
                      к
                      <span className="absolute left-[-1px] right-[-1px] top-[52%] h-[2px] bg-red-600 -translate-y-1/2"></span>
                    </span>
                    <span>ука</span>
                    <span className="text-zinc-500 text-base font-sans font-normal ml-2">— злость</span>
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <span className="text-zinc-600 text-sm md:text-base">03</span>
                  <span className="flex items-baseline">
                    <span className="relative text-zinc-300">
                      Скука
                      <span className="absolute left-[-2px] right-[-2px] top-[52%] h-[2px] bg-red-600 -translate-y-1/2"></span>
                    </span>
                    <span className="text-zinc-500 text-base font-sans font-normal ml-2">— решение, борьба</span>
                  </span>
                </div>

              </div>
            </div>

            <p className="text-zinc-300 font-medium">
              Посмотрите на эту линейку новым взглядом и, надеюсь, этот мерч станет для вас напоминанием: хоть жизнь и бывает дерьмом, но на этом она не заканчивается.
            </p>
          </motion.div>
        </div>

        {/* === STORIES GALLERY SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full pb-32"
        >
          <div className="relative max-w-3xl mx-auto">

            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar touch-pan-x py-2 px-[calc(50%-130px)]"
              style={{ maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)" }}
            >
              {DATA.history.stories.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[260px] aspect-[9/16] relative snap-center rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900"
                >
                  <Image
                    src={src}
                    alt={`story ${i + 1}`}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === FOOTER === */}
        <footer className="w-full py-12 border-t border-zinc-900 mt-12 bg-black/20">
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6 text-xs text-zinc-600">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              <a href="/offer" className="hover:text-zinc-400 transition-colors">Публичная оферта</a>
              <a href="/terms" className="hover:text-zinc-400 transition-colors">Условия обслуживания</a>
              <a href="/delivery" className="hover:text-zinc-400 transition-colors">Доставка</a>
              <a href="/payment" className="hover:text-zinc-400 transition-colors">Оплата</a>
              <a href="/refund" className="hover:text-zinc-400 transition-colors">Возврат</a>
              <a href="/privacy" className="hover:text-zinc-400 transition-colors">Конфиденциальность</a>
              <a href="/requisites" className="hover:text-zinc-400 transition-colors">Реквизиты</a>
            </div>
            <div>
              © {new Date().getFullYear()} CREO. All rights reserved.
            </div>
          </div>
        </footer>

      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && <CheckoutFlow onClose={() => setCheckoutOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}