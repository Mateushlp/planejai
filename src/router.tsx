import { PiggyBank } from 'lucide-react';
import { createBrowserRouter } from 'react-router-dom';
import { Button } from './components/shared/Button';
import { RootLayout } from './components/Layout/RootLayout';

//import { SimulationFormPage } from './pages/SimulationFormPage';
//import { SimulationResultsPage } from './pages/SimulationResultsPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <h1>formulario de simulaçao</h1>
            <Button
              variant= 'primary' icon={PiggyBank} className='w-full'
            >
              clique aqui
            </Button>
          </>
        ), //<SimulationFormPage />,
      },
      {
        path: '/resultado/:id',
        //element: <SimulationResultsPage />,
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
  },
]);
