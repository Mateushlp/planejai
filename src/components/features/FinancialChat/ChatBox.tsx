import { useState } from 'react';

import type { ChatMessage, SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { sendChatMessage } from '@/services/chatService';

interface ChatBoxProps {
  simulation: SimulationRecord;
}

export function ChatBox({ simulation }: ChatBoxProps) {
  const { updateSimulation } = useSimulationStorage();

  const [question, setQuestion] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>(
    simulation.chatHistory ?? [],
  );

  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const context = `
Dados financeiros do usuário:

Renda mensal:
${simulation.income}

Despesas:
${simulation.expenses}

Dívidas:
${simulation.debts}

Objetivo:
${simulation.goalName}

Valor da meta:
${simulation.goalAmount}

Prazo:
${simulation.goalDeadline} meses
`;

      const response = await sendChatMessage(question, context);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        createdAt: new Date().toISOString(),
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];

      setMessages(updatedMessages);

      updateSimulation({
        ...simulation,
        chatHistory: updatedMessages,
      });

      setQuestion('');
    } catch (error) {
      console.error('Erro ao conversar com Educador Financeiro:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-xl">💬</span>

        <h2 className="text-lg font-bold">
          Converse com seu Educador Financeiro
        </h2>
      </div>

      <div className="mb-5 max-h-96 space-y-3 overflow-y-auto">
        {messages.length === 0 && (
          <p className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
            Faça uma pergunta sobre sua vida financeira. Exemplo: "Como posso
            economizar mais?"
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === 'user'
                ? 'ml-auto max-w-[85%] rounded-xl bg-primary p-3 text-sm text-white'
                : 'bg-muted mr-auto max-w-[85%] rounded-xl p-3 text-sm'
            }
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ex: Devo quitar minhas dívidas antes de investir?"
        className="mb-3 min-h-28 w-full rounded-xl border bg-background p-3 text-sm outline-none"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="rounded-xl bg-primary px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Pensando...' : 'Enviar pergunta'}
      </button>
    </div>
  );
}
