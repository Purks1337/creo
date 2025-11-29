"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Terms() {
  return (
    // Исправлено: h-screen overflow-y-auto
    <main className="h-screen w-full overflow-y-auto bg-black text-zinc-400 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ChevronLeft size={16} className="mr-1" />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 uppercase">Условия обслуживания</h1>
        
        {/* Исправлено: Статичная дата вместо new Date() */}
        <p className="text-xs text-zinc-600 mb-10">Последнее обновление: 29.11.2025</p>

        <div className="space-y-10 text-sm leading-relaxed text-justify pb-20">
          
          <section>
            <p className="mb-4">
              Этот сайт управляется creo-brand.ru. На всем сайте термины «мы», «нас» и «наш» относятся к creo-brand.ru.
            </p>
            <p>
              Посещая наш сайт и/или приобретая что-либо у нас, вы участвуете в наших «Услугах» и соглашаетесь соблюдать следующие положения и условия.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Общие условия</h2>
            <p className="mb-2">Мы оставляем за собой право отказать в обслуживании любому лицу по любой причине в любое время.</p>
            <p className="mb-2">
              Вы понимаете, что ваш контент (не включая информацию о кредитной карте), может быть передан в незашифрованном виде. Информация о кредитных картах всегда шифруется при передаче по сетям.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Точность и полнота информации</h2>
            <p className="mb-2">
              Мы не несем ответственности, если информация, размещенная на данном сайте, не является точной, полной или актуальной. Материалы на этом сайте предоставляются только для общей информации.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Изменения в услугах и ценах</h2>
            <p className="mb-2">Цены на наши продукты могут быть изменены без предварительного уведомления.</p>
            <p>Мы не несем ответственности перед вами или любой третьей стороной за любые модификации, изменения цен, приостановку или прекращение предоставления Услуги.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Продукты или услуги</h2>
            <p className="mb-2">
              Определенные продукты или услуги могут быть доступны исключительно в режиме онлайн через веб-сайт. Эти продукты или услуги могут иметь ограниченное количество и подлежат возврату или обмену только в соответствии с нашей Политикой возврата.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Запрещенные виды использования</h2>
            <p>
              Вам запрещается использовать сайт для любых незаконных целей, для нарушения прав интеллектуальной собственности, для предоставления ложной информации, для загрузки вирусов, для сбора личной информации других лиц и для спама.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Отказ от гарантий</h2>
            <p className="mb-2">
              Мы не гарантируем, что использование вами нашего сервиса будет бесперебойным, своевременным, безопасным или безошибочным.
            </p>
            <p>
              Сервис предоставляется «как есть». Ни в коем случае creo-brand.ru не несет ответственности за любые травмы, потери или любые прямые, косвенные, случайные убытки.
            </p>
          </section>

          <section className="border-t border-zinc-800 pt-8 mt-8">
            <h2 className="text-lg font-semibold text-white mb-3">Контактная информация</h2>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
               <p className="font-bold text-white mb-2">ИП Двоеглазов Вячеслав Игоревич</p>
               <p className="mb-1"><span className="text-zinc-500">ИНН:</span> 661711790680</p>
               <p className="mb-4"><span className="text-zinc-500">ОГРНИП:</span> 321665800224752</p>
               <p className="mb-4 text-zinc-500">Российская Федерация, Свердловская область, г. Краснотурьинск</p>
               <p>
                 Вопросы по Условиям предоставления услуг следует направлять по email: <br/>
                 <a href="mailto:creogang@mail.ru" className="text-white underline hover:text-zinc-300">creogang@mail.ru</a>
               </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}