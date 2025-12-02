// app/api/cdek/route.ts
import { NextRequest, NextResponse } from "next/server";

// === ВАШИ ТЕСТОВЫЕ УЧЕТНЫЕ ДАННЫЕ ===
const CLIENT_ID = "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP";
const CLIENT_SECRET = "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5";

// === ТЕСТОВАЯ СРЕДА (SANDBOX) ===
const AUTH_URL = "https://api.edu.cdek.ru/v2/oauth/token";
const BASE_URL = "https://api.edu.cdek.ru/v2";

// Функция получения токена
async function getAuthToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);

  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ CDEK Auth Error:", res.status, errText);
    throw new Error(`Failed to get CDEK token: ${res.status} ${errText}`);
  }

  const data = await res.json();
  // console.log("✅ CDEK Token received"); // Можно раскомментировать для отладки
  return data.access_token;
}

// Обработчик запросов (GET и POST)
export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
    
    let body = {};
    try {
      if (req.method === 'POST') {
        body = await req.json();
      }
    } catch (e) {
      // Body может быть пустым
    }

    const requestData: any = { ...searchParams, ...body };
    const action = requestData.action;

    if (!action) {
      return NextResponse.json({ message: "Action is required" }, { status: 400 });
    }

    // 1. Получаем токен авторизации
    const token = await getAuthToken();

    // 2. Определяем, куда отправлять запрос в СДЭК
    let endpoint = "";
    let method = "GET";
    let payload = null;

    if (action === "offices") {
      endpoint = "/deliverypoints";
      method = "GET";
    } else if (action === "calculate") {
      endpoint = "/calculator/tarifflist";
      method = "POST";
      payload = requestData;
    } else {
      // Если виджет запрашивает что-то другое (например, geocode), возвращаем пустой успех, чтобы не падать
      console.warn(`⚠️ Unknown action requested: ${action}`);
      return NextResponse.json({ message: "Action not implemented in proxy" }, { status: 400 });
    }

    // 3. Формируем URL запроса к API СДЭК
    const fetchUrl = new URL(`${BASE_URL}${endpoint}`);
    
    // Переносим параметры в URL для GET запросов
    if (method === "GET") {
        Object.keys(requestData).forEach(key => {
            if (key !== 'action') {
                fetchUrl.searchParams.append(key, requestData[key]);
            }
        });
    }

    // 4. Выполняем запрос к СДЭК
    const cdekRes = await fetch(fetchUrl.toString(), {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: method === "POST" && payload ? JSON.stringify(payload) : undefined,
    });

    const cdekData = await cdekRes.json();
    
    // Прокидываем статус ответа от СДЭКа
    return NextResponse.json(cdekData, { status: cdekRes.status });

  } catch (error: any) {
    console.error("🔥 CDEK Proxy Critical Error:", error);
    return NextResponse.json({ 
        message: "Internal Proxy Error", 
        details: error.message 
    }, { status: 500 });
  }
}