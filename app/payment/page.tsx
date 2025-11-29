"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Payment() {
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

        <h1 className="text-3xl font-bold text-white mb-8 uppercase">Оплата заказа</h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed pb-20">
          <section>
            <p className="mb-4">
              При оформлении заказа в интернет-магазине возможна только онлайн-оплата. <span className="text-white">Оплата при получении недоступна.</span>
            </p>
            <p>
              Доступные способы оплаты: <strong>банковской картой</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Авторизация платежа</h2>
            <p>
              Все запросы, оплачиваемые с помощью банковских карт, должны быть авторизованы банком.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Безналичный расчет</h2>
            <p className="mb-4">
              Обращаем внимание, что в платёжных терминалах всех банков Российской Федерации оплата с помощью Apple Pay и Google Pay невозможна. Оплата онлайн-заказа банковской картой осуществляется в Интернет-магазине при оформлении Заказа.
            </p>
            
            <p className="mb-2 text-white">Процесс оплаты:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Оплата осуществляется в Интернет-магазине сразу же после оформления Заказа.</li>
              <li>После подтверждения состава Заказа, личных данных и адреса доставки, необходимо будет ввести данные Вашей банковской карты (номер карты, фамилию и имя владельца, срок действия карты и CVV/CVC код).</li>
              <li>Оплата происходит через авторизационный сервер платежных систем MasterCard, VISA, Maestro, «Мир». К оплате принимаются карты любых банков.</li>
            </ul>

            <p>
              Электронный чек за заказы, оплаченные безналичным способом, высылается на ваш e-mail сразу же после проведения оплаты. Электронный чек содержит все данные о проведенной платежной транзакции.
            </p>
          </section>

          <section className="bg-zinc-900/30 p-4 rounded-lg border border-zinc-800">
            <h3 className="text-white font-medium mb-2">В случае ошибки создания заказа:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Возврат денежных средств Продавцом осуществляется в течение 10 дней.</li>
              <li>Операция по зачислению денежных средств банком-эмитентом может составлять до 30 календарных дней.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}