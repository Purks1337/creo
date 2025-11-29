"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Requisites() {
  return (
    // Исправлено: h-screen overflow-y-auto
    <main className="h-screen w-full overflow-y-auto bg-black text-zinc-300 font-sans selection:bg-white/20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ChevronLeft size={16} className="mr-1" />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Реквизиты</h1>

        <div className="space-y-6 text-sm md:text-base border border-zinc-800 rounded-xl p-6 bg-zinc-900/50 pb-20">
          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">Наименование</span>
            <span className="font-medium text-white mt-1 md:mt-0 text-right">
                ИП Двоеглазов Вячеслав Игоревич
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">ИНН</span>
            <span className="font-medium text-white mt-1 md:mt-0">
                661711790680
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">ОГРНИП</span>
            <span className="font-medium text-white mt-1 md:mt-0">
                321665800224752
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">Юридический адрес</span>
            <span className="font-medium text-white mt-1 md:mt-0 text-right max-w-md">
                Свердловская область, город Краснотурьинск
            </span>
          </div>

          {/* === БАНКОВСКИЕ РЕКВИЗИТЫ === */}
          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">Банк</span>
            <span className="font-medium text-yellow-500 mt-1 md:mt-0">
                [[ НАЗВАНИЕ ВАШЕГО БАНКА ]]
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">БИК</span>
            <span className="font-medium text-yellow-500 mt-1 md:mt-0">
                [[ 000000000 ]]
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">Расчетный счет</span>
            <span className="font-medium text-yellow-500 mt-1 md:mt-0">
                [[ 00000000000000000000 ]]
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-800 pb-4">
            <span className="text-zinc-500">Корр. счет</span>
            <span className="font-medium text-yellow-500 mt-1 md:mt-0">
                [[ 00000000000000000000 ]]
            </span>
          </div>
          {/* ========================== */}

          <div className="flex flex-col md:flex-row justify-between pt-2">
            <span className="text-zinc-500">Email для связи</span>
            <span className="font-medium text-white mt-1 md:mt-0">
            creogang@mail.ru
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}