import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.YANDEX_MAP_KEY || '';

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
                
                // КЛЮЧ ТЕПЕРЬ БЕРЕТСЯ ИЗ ПЕРЕМЕННОЙ ОКРУЖЕНИЯ
                apiKey: '${apiKey}', 
                
                defaultLocation: [37.6176, 55.7558], 
                from: 'Москва',
                canChoose: true,
                debug: false, 
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