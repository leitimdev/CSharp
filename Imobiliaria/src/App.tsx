import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PreVendas from './pages/PreVendas';
import Administrativo from './pages/Administrativo';
import Comercial from './pages/Comercial';
import Financeiro from './pages/Financeiro';
import PosVenda from './pages/PosVenda';
import FunilVendas from './pages/FunilVendas';
import Integracoes from './pages/Integracoes';
import Contratos from './pages/Contratos';
import Comissoes from './pages/Comissoes';
import EmailAutomatico from './pages/EmailAutomatico';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pre-vendas" element={<PreVendas />} />
            <Route path="administrativo" element={<Administrativo />} />
            <Route path="comercial" element={<Comercial />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="pos-venda" element={<PosVenda />} />
            <Route path="funil-vendas" element={<FunilVendas />} />
            <Route path="integracoes" element={<Integracoes />} />
            <Route path="contratos" element={<Contratos />} />
            <Route path="comissoes" element={<Comissoes />} />
            <Route path="emails" element={<EmailAutomatico />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
