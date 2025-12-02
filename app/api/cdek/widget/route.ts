import { NextResponse } from 'next/server';

export async function GET() {
  // ОПРЕДЕЛЯЕМ СРЕДУ:
  // Если мы запускаем 'npm run dev' -> это 'development'.
  // Если это Vercel -> это 'production'.
  const isDev = process.env.NODE_ENV === 'development';

  // ВЫБИРАЕМ КЛЮЧ:
  // 1. Для локальной разработки берем публичный тестовый ключ (он работает везде на localhost).
  // 2. Для продакшена берем твой личный ключ из ENV (он работает на твоем домене).
  const apiKey = isDev 
    ? 'f4e034c2-8c37-4168-8b97-99b6b3b268d7' 
    : (process.env.YANDEX_MAP_KEY || '');

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Выбор ПВЗ СДЭК</title>
    <script src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3" type="text/javascript"></script>
    <style>
        html, body, #cdek-map {
            margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="cdek-map"></div>

    <script type="text/javascript">
        window.onerror = function(msg) { console.error("❌ IFRAME ERROR:", msg); };

        document.addEventListener('DOMContentLoaded', () => {
            new window.CDEKWidget({
                root: 'cdek-map',
                
                // Сюда подставится нужный ключ в зависимости от сервера
                apiKey: '${apiKey}', 
                
                defaultLocation: [37.6176, 55.7558], 
                from: 'Москва',
                canChoose: true,
                debug: ${isDev}, // Включаем дебаг только на локалке
                servicePath: '/api/cdek', 

                hideDeliveryOptions: { office: false, door: true },
                hideFilters: { have_cashless: false, have_cash: false, is_dressing_room: false, type: false },

                onChoose(type, tariff, address) {
                    const payload = {
                        id: address.code,
                        city: address.city,
                        address: address.address,
                        name: address.name,
                        fullAddress: address.formatted
                    };
                    window.parent.postMessage({ type: 'CDEK_CHOICE', payload: payload }, '*');
                }
            });
        });
    </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}