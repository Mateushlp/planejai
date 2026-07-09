import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye } from 'lucide-react';

import { useSimulationStorage } from '@/hooks/useSimulationStorage';

export default function HistoryPage() {
  const navigate = useNavigate();

  const { getAllSimulations, deleteSimulation } = useSimulationStorage();

  const [reload, setReload] = useState(false);

  const simulations = useMemo(() => {
    return getAllSimulations();
  }, [reload]);

  function handleDelete(id: string) {
    if (!confirm('Deseja excluir esta simulação?')) return;

    deleteSimulation(id);

    setReload((old) => !old);
  }

  function handleOpen(id: string) {
    navigate(`/resultado/${id}`);
  }
  console.log(simulations);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Histórico de Simulações</h1>

      {simulations.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          Nenhuma simulação encontrada.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {simulations.map((simulation) => {
            console.log("Simulation:", simulation);

            return (
              <div key={simulation.id} className="rounded-xl border p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                  {simulation.goalName}
                </h2>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Renda:</strong> R$ {simulation.income}
                  </p>

                  <p>
                    <strong>Despesas:</strong> R$ {simulation.expenses}
                  </p>

                  <p>
                    <strong>Dívidas:</strong> R$ {simulation.debts}
                  </p>

                  <p>
                    <strong>Meta:</strong> R$ {simulation.goalAmount}
                  </p>

                  <p>
                    <strong>Prazo:</strong> {simulation.goalDeadline} meses
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleOpen(simulation.id)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    <Eye size={18} />
                    Ver detalhes
                  </button>

                  <button
                    onClick={() => handleDelete(simulation.id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    <Trash2 size={18} />
                    Excluir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  )
};