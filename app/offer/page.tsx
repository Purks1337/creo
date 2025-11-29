"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Offer() {
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

        <h1 className="text-3xl font-bold text-white mb-2">Публичная оферта</h1>
        
        {/* Исправлено: Статичная дата */}
        <p className="text-sm text-zinc-600 mb-10">Редакция от 29.11.2025</p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed pb-20">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Общие положения</h2>
            <p className="mb-2">
              1.1. Настоящая Публичная оферта (далее — Оферта) является официальным предложением 
              <span className="text-white font-medium mx-1">ИП Двоеглазов Вячеслав Игоревич</span> 
              (далее — Продавец) в адрес любого физического лица (далее — Покупатель) заключить договор купли-продажи товаров на сайте 
              <span className="text-white font-medium mx-1">creo-brand.ru</span>.
            </p>
            <p>1.2. Заказ Покупателем товара, размещенного на сайте, означает, что Покупатель согласен со всеми условиями настоящей Оферты.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Предмет договора</h2>
            <p>
              2.1. Продавец обязуется передать в собственность Покупателю, а Покупатель обязуется оплатить и принять Товар, заказанный в интернет-магазине.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Оплата и доставка</h2>
            <p className="mb-2">3.1. Цены на Товар определяются Продавцом в одностороннем порядке и указываются на страницах интернет-магазина.</p>
            <p className="mb-2">3.2. Оплата Товара осуществляется банковской картой через сервис CloudPayments (или другой эквайринг).</p>
            <p>3.3. Доставка осуществляется транспортными компаниями (СДЭК) за счет Покупателя или согласно условиям акции.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Возврат товара</h2>
            <p className="mb-2">
              4.1. Покупатель вправе отказаться от Товара надлежащего качества в любое время до его передачи, а после передачи Товара — в течение 7 дней.
            </p>
            <p>
              4.2. Возврат Товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт покупки.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Реквизиты продавца</h2>
            <div className="bg-zinc-900 p-4 rounded-lg text-sm border border-zinc-800">
               <p className="text-white font-medium mb-1">ИП Двоеглазов Вячеслав Игоревич</p>
               <p>ИНН: 661711790680</p>
               <p>ОГРНИП: 321665800224752</p>
               <p>Email: creogang@mail.ru</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}