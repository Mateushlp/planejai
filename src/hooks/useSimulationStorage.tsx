import type { SimulationFormData, SimulationRecord } from "@/data/simulation"

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
 const saveFormData = (formData: SimulationFormData) => {
   const id = crypto.randomUUID();

   const record = {
     ...formData,
     id,
   };

   const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

   const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : [];

   localStorage.setItem(
     LOCAL_STORAGE_KEY,
     JSON.stringify([...savedData, record]),
   );

   return id; // 👈 ESTA LINHA ESTAVA FALTANDO
 };
    const getFormData = (id: string): SimulationRecord | null => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (!storage) {
            return null
        }
        const savedData = JSON.parse(storage) as SimulationRecord[]
        return savedData.find((record) => record.id === id) || null
    }
    
const getAllSimulations = () => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!storage) {
    return [];
  }

  return JSON.parse(storage) as SimulationRecord[];
};

const deleteSimulation = (id: string) => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!storage) {
    return;
  }

  const savedData = JSON.parse(storage) as SimulationRecord[];

  const updated = savedData.filter((item) => item.id !== id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    };
    const updateSimulation = (updatedSimulation: SimulationRecord) => {
      const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!storage) {
        return;
      }

      const savedData = JSON.parse(storage) as SimulationRecord[];

      const updated = savedData.map((simulation) =>
        simulation.id === updatedSimulation.id ? updatedSimulation : simulation,
      );

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    };

return {saveFormData,getFormData, updateSimulation,getAllSimulations,deleteSimulation,}
}