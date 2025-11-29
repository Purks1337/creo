"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Privacy() {
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

        <h1 className="text-3xl font-bold text-white mb-2">Политика конфиденциальности</h1>
        <p className="text-sm text-zinc-600 mb-10">В отношении обработки персональных данных</p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed pb-20">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Введение</h2>
            <p>
              Настоящая политика конфиденциальности определяет порядок обработки и защиты информации о физических лицах, пользующихся услугами интернет-магазина 
              <span className="text-white font-medium mx-1">creo-brand.ru</span>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Сбор данных</h2>
            <p className="mb-2">Мы собираем следующие персональные данные:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Фамилия, Имя;</li>
              <li>Номер телефона;</li>
              <li>Адрес электронной почты;</li>
              <li>Адрес доставки.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Цели обработки</h2>
            <p>
              Данные используются исключительно для: обработки и доставки заказов; связи с Клиентом для уточнения деталей; информирования о статусе заказа.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Передача данных третьим лицам</h2>
            <p>
              Мы не передаем ваши данные третьим лицам, за исключением случаев, связанных с исполнением законодательства (запросы госорганов) или исполнением контракта (службы доставки СДЭК, платежные системы CloudPayments).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Безопасность</h2>
            <p>
              Администрация сайта принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного доступа.
            </p>
          </section>
          
           <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Контакты</h2>
            <p>
               По всем вопросам касательно обработки персональных данных вы можете обращаться по адресу: 
               <a href="mailto:creogang@mail.ru" className="text-white hover:text-zinc-300 ml-1">creogang@mail.ru</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}