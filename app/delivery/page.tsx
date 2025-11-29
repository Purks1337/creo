"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Delivery() {
  return (
    // Исправлено: h-screen overflow-y-auto
    <main className="h-screen w-full overflow-y-auto bg-black text-zinc-400 font-sans selection:bg-white/20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ChevronLeft size={16} className="mr-1" />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8 uppercase">Политика доставки</h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed pb-20">
          <section>
            <p className="mb-4">
              Как правило, мы отправляем товары как можно скорее после завершения оплаты.
            </p>
            <p>
              Мы отправляем по всей территории <span className="text-white">Российской Федерации</span>, а так же по ближнему зарубежью: 
              Республика Беларусь, Армения, Казахстан, Азербайджан, Киргизия, Молдавия, Таджикистан, Узбекистан.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Способ доставки</h2>
            <p>
              Заказы по России, СНГ и Миру отправляются и рассчитываются транспортной компанией <strong>СДЭК</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Сроки</h2>
            <p className="mb-2">
              Даты доставки и обработки заказа — <span className="text-white">до 21-го рабочего дня*</span>.
            </p>
            <p className="text-xs text-zinc-600">
              *указанные сроки доставки и обработки заказа ориентировочные, точные даты получения формируются в соответствии с условиями партнера перевозчика СДЭК.
            </p>
          </section>

          <section className="pt-4 border-t border-zinc-900">
            <p>
              Все ваши вопросы вы можете отправлять по электронному адресу:{" "}
              <a href="mailto:creogang@mail.ru" className="text-white underline hover:text-zinc-300">
              creogang@mail.ru
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}