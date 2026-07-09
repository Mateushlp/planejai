interface GeminiChatResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL_NAME = 'gemini-2.0-flash';

const GEMINI_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

export async function sendChatMessage(question: string, context: string) {
  const prompt = `
Você é um Educador Financeiro Inteligente.

Analise os dados financeiros do usuário:

${context}


Responda a pergunta:

${question}


Regras:
- Seja claro e objetivo.
- Dê exemplos práticos.
- Ajude o usuário a tomar decisões melhores.
`;

  const response = await fetch(GEMINI_CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

    if (response.status === 429) {
        throw new Error(
            "O limite da IA foi atingido. Aguarde alguns minutos e tente novamente."
  
        );
    }

  const data = (await response.json()) as GeminiChatResponse;

  return data.candidates[0].content.parts[0].text;
}
