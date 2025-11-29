"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Refund() {
  return (
    // Исправлено: h-screen overflow-y-auto (для скролла)
    <main className="h-screen w-full overflow-y-auto bg-black text-zinc-400 font-sans selection:bg-white/20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ChevronLeft size={16} className="mr-1" />
          Назад в магазин
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8 uppercase">Политика возврата средств</h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed pb-20">
          <section>
            <p className="mb-4">
              У нас есть 7-дневная политика возврата, что означает, что у вас есть 7 дней после получения вашего товара, чтобы запросить возврат.
            </p>
            <p>
              Чтобы иметь право на возврат, ваш товар должен быть в том же состоянии, в котором вы его получили, неношеный или неиспользованный, с бирками и в оригинальной упаковке. Вам также понадобится квитанция или подтверждение покупки.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Как оформить возврат</h2>
            <p className="mb-4">
              Чтобы начать возврат, вы можете связаться в мессенджер Telegram по адресу:{" "}
              <a href="https://t.me/creosupport" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300">
                @creosupport
              </a>
            </p>
            <p className="mb-4">
              Если ваш возврат будет принят, мы отправим вам этикетку с обратной доставкой, а также инструкции о том, как и куда отправить вашу посылку. Товары, отправленные нам без предварительного запроса на возврат, не будут приняты.
            </p>
            <p>
              Вы всегда можете связаться с нами по любому вопросу о возврате по адресу в Telegram:{" "}
              <a href="https://t.me/creosupport" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300">
                @creosupport
              </a>{" "}
              или по электронной почте:{" "}
              <a href="mailto:creogang@mail.ru" className="text-white underline hover:text-zinc-300">
                creogang@mail.ru
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Повреждения и брак</h2>
            <p>
              Пожалуйста, проверьте свой заказ при получении и немедленно свяжитесь с нами, если товар неисправен, поврежден или если вы получили не тот товар, чтобы мы могли оценить проблему и исправить ее.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Возврат средств</h2>
            <p>
              Мы сообщим вам, как только получим и проверим ваш возврат, был ли запрос одобрен или нет. В случае одобрения вам будет автоматически возвращен ваш первоначальный способ оплаты.
            </p>
            <p className="mt-2 text-zinc-500 text-xs">
              Помните, что вашему банку или эмитенту кредитной карты может потребоваться некоторое время, чтобы обработать и осуществить возврат.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}