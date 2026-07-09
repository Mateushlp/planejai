import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

import { useInsight } from '@/hooks/useInsight';

interface AIInsightCardProps {
  simulationId: string;
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  console.log(insight);

  return (
    <div className="order-2 rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-medium text-red-600">{error}</p>

          <button
            onClick={() => fetchInsight(simulationId)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
          >
            Tentar novamente
          </button>
        </div>
      )}
      {!isLoading && insight && !error && (
        <div className="space-y-6">
          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-2 font-bold">📊 Análise da situação</h3>

            <p className="text-sm leading-relaxed">
              {insight.diagnosis.content}
            </p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-2 font-bold">🎯 Viabilidade da meta</h3>

            <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {insight.feasibility.status}
            </span>

            <p className="text-sm leading-relaxed">
              {insight.feasibility.content}
            </p>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-3 font-bold">💡 Sugestões</h3>

            <ul className="list-disc space-y-2 pl-5 text-sm">
              {insight.suggestions.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-3 font-bold">💰 Ideias de renda extra</h3>

            <ul className="list-disc space-y-2 pl-5 text-sm">
              {insight.extraIncome.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-3 font-bold">📈 Investimentos sugeridos</h3>

            <ul className="list-disc space-y-2 pl-5 text-sm">
              {insight.investment.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="mb-2 font-bold">🚀 Motivação</h3>

            <p className="text-sm leading-relaxed">
              {insight.motivation.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}