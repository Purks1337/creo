"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

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
    price: 5000,
    currency: "RUB",
    description: "Плотный хлопок, оверсайз крой. Идеально для работы и рейвов. Создана, чтобы пережить любые дедлайны.",
    size: "One Size",
    images: [
      "/images/tshirt.webp", // Main local image
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

// --- Components ---

const Header = () => (
  <motion.header 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    // REMOVED: fixed top-0 left-0
    // ADDED: w-full z-40 relative
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

// --- Checkout Flow ---
const CheckoutFlow = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<CheckoutStep>("detail");

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

  const [direction, setDirection] = useState(0);

  const paginate = (newStep: CheckoutStep, newDirection: number) => {
    setDirection(newDirection);
    setStep(newStep);
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

      {/* Left: Gallery */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen bg-zinc-900 relative overflow-hidden">
         <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full absolute inset-0"
         >
             <Image 
                src={DATA.product.images[0]} 
                alt="T-Shirt" 
                fill 
                className="object-contain p-12" 
             />
         </motion.div>
      </div>

      {/* Right: Content Steps */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative p-8 md:p-16 pt-12 flex flex-col bg-background text-foreground">
        <AnimatePresence mode="wait" custom={direction}>
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
                    <div className="space-y-4 flex-1">
                        <input className="w-full bg-transparent border-b border-zinc-700 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-600" placeholder="ФИО" />
                        <input className="w-full bg-transparent border-b border-zinc-700 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-600" placeholder="Адрес" />
                        <input className="w-full bg-transparent border-b border-zinc-700 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-600" placeholder="Телефон" />
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button onClick={() => paginate('detail', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                        <button onClick={() => paginate('payment', 1)} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">К оплате</button>
                    </div>
                </motion.div>
            )}

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
                    <div className="bg-zinc-900 p-6 rounded-xl mb-6">
                        <div className="flex justify-between font-bold text-lg"><span>Итого</span><span>{DATA.product.price} ₽</span></div>
                    </div>
                    <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center">
                        <span className="text-zinc-600">Card Widget</span>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button onClick={() => paginate('delivery', -1)} className="flex-1 py-4 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">Назад</button>
                        <button onClick={() => paginate('success', 1)} className="flex-[2] py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">Оплатить</button>
                    </div>
                </motion.div>
            )}

            {step === 'success' && (
                <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                >
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold mb-2">Заказ принят!</h2>
                    <p className="text-zinc-400 mb-8">Скоро отправим трек-номер.</p>
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

  // Dark grain texture
  const grainUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  if (!isMounted) {
    return <main className="h-screen w-full bg-background bg-noise overflow-hidden relative" />;
  }

  return (
    <main className="h-screen w-full bg-background text-foreground bg-noise overflow-hidden relative">
      
      {/* Inner Scroll Container */}
      <div className="h-full w-full overflow-y-auto no-scrollbar">
          
          {/* Header moved INSIDE the scroll container */}
          <Header />

          {/* View 1: Centered Card */}
          {/* We remove min-h-screen to let it flow naturally, OR keep it if you want full height spacer */}
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
          
          {/* View 2: History & Details */}
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

      <AnimatePresence>
        {checkoutOpen && <CheckoutFlow onClose={() => setCheckoutOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}