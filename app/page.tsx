"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    name: "creo basic t-shirt",
    price: 5000,
    currency: "RUB",
    description: "Плотный хлопок, оверсайз крой. Идеально для работы и рейвов. Создана, чтобы пережить любые дедлайны.",
    size: "One Size",
    specs: {
      size: "48-50",
      dimensions: "Ширина 58, длина 75",
      composition: "Хлопок 80%, полиэстер 20%, интерлок",
      density: "310г/м²",
      measurements: [
        { label: "Грудь", value: "94-102" },
        { label: "Талия", value: "74-82" },
        { label: "Бедра", value: "102-110" },
      ]
    },
    images: [
      "/images/tshirt.webp", 
      "https://placehold.co/600x800/222222/FFF?text=Back+View",
      "https://placehold.co/600x800/333333/FFF?text=Detail",
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
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState({ name: false, address: false, phone: false });

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const paginate = (newStep: CheckoutStep, newDirection: number) => {
    setDirection(newDirection);
    setStep(newStep);
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validateAndProceedToPayment = () => {
    const newErrors = {
      name: !form.name.trim(),
      address: !form.address.trim(),
      phone: !form.phone.trim(),
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some(Boolean)) paginate('payment', 1);
  };

  const handlePayment = () => {
    if (!window.cp) {
      console.error("CloudPayments widget script not loaded");
      return;
    }
    const widget = new window.cp.CloudPayments();
    widget.pay('charge', { 
        publicId: 'pk_da6583e5d4a2bf9d6236da80df0e7', 
        description: `Оплата заказа: ${DATA.product.name}`,
        amount: DATA.product.price,
        currency: DATA.product.currency,
        invoiceId: String(Date.now()), 
        accountId: 'user@example.com', 
        skin: "mini", 
        data: { name: form.name, address: form.address, phone: form.phone }
    }, {
        onSuccess: (options) => paginate('success', 1),
        onFail: (reason, options) => alert("Ошибка при оплате: " + reason),
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
      <button onClick={onClose} className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">✕</button>

      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen bg-zinc-900 relative overflow-hidden">
         <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full absolute inset-0"
         >
             <Image src={DATA.product.images[0]} alt="Product" fill className="object-contain p-12" />
         </motion.div>
      </div>

      {/* Right: Steps */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative p-8 md:p-16 pt-12 flex flex-col bg-background text-foreground">
        <AnimatePresence mode="wait" custom={direction}>
            {step === 'detail' && (
                <motion.div key="detail" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col justify-between overflow-y-auto no-scrollbar">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{DATA.product.name}</h1>
                            <span className="text-xl md:text-2xl font-medium">{DATA.product.price} ₽</span>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">{DATA.product.description}</p>
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
                    <button onClick={() => paginate('delivery', 1)} className="w-full py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-zinc-200 transition-colors shrink-0">Оформить заказ</button>
                </motion.div>
            )}

            {step === 'delivery' && (
                <motion.div key="delivery" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Доставка</h2>
                    <div className="space-y-6 flex-1">
                        <div className="relative">
                            <input value={form.name} onChange={(e) => handleInputChange('name', e.target.value)} className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${errors.name ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}`} placeholder="ФИО" />
                            {errors.name && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
                        </div>
                        <div className="relative">
                            <input value={form.address} onChange={(e) => handleInputChange('address', e.target.value)} className={`w-full bg-transparent border-b py-3 outline-none transition-colors placeholder:text-zinc-600 ${errors.address ? 'border-red-500 placeholder:text-red-500/50' : 'border-zinc-700 focus:border-white'}`} placeholder="Адрес доставки (Город, Улица, Дом)" />
                            {errors.address && <span className="text-xs text-red-500 absolute right-0 top-4">Обязательное поле</span>}
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
                 <motion.div key="payment" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-full flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Оплата</h2>
                    <div className="bg-zinc-900 p-6 rounded-xl mb-6">
                        <div className="flex justify-between font-bold text-lg"><span>Итого</span><span>{DATA.product.price} ₽</span></div>
                        <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
                             <p>Получатель: {form.name}</p>
                             <p>Адрес: {form.address}</p>
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
    </motion.div>
  );
};

// --- Main Page ---
export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        // Ширина картинки (260) + gap (16) = 276
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
      <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">
          
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
                       <span>С<span className="line-through decoration-red-500 decoration-2">к</span>ука <span className="text-zinc-500 text-base font-sans font-normal ml-2">— злость</span></span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                       <span className="text-zinc-600 text-sm md:text-base">03</span> 
                       <span><span className="line-through decoration-zinc-500/50">Скука</span> <span className="text-zinc-500 text-base font-sans font-normal ml-2">— решение, борьба</span></span>
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
             {/* Контейнер выровнен по ширине текста (max-w-3xl) */}
             <div className="relative max-w-3xl mx-auto">
                 
                 {/* Кнопка Влево (скрыта на мобильных) */}
                 <button 
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10"
                 >
                    <ChevronLeft size={24} />
                 </button>

                 {/* Кнопка Вправо (скрыта на мобильных) */}
                 <button 
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10"
                 >
                    <ChevronRight size={24} />
                 </button>

                 {/* Скролл контейнер с маской */}
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

      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && <CheckoutFlow onClose={() => setCheckoutOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}