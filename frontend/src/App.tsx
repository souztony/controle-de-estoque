import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MaterialsPage from './pages/MaterialsPage';

// Componentes temporários para as rotas que faremos a seguir
const DashboardPlaceholder = () => (
  <div className="p-10 text-center">
    <h2 className="text-2xl font-bold text-gray-800">RF008 - Production Suggestions</h2>
    <p className="text-gray-500">Coming soon: Calculation of products based on stock.</p>
  </div>
);

const ProductsPlaceholder = () => (
  <div className="p-10 text-center">
    <h2 className="text-2xl font-bold text-gray-800">RF005/RF007 - Product Management</h2>
    <p className="text-gray-500">Coming soon: Product CRUD with raw material association.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar fixa no topo */}
        <Navbar />

        {/* Área de conteúdo que cresce para ocupar a tela */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DashboardPlaceholder />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/products" element={<ProductsPlaceholder />} />
            
            {/* Rota de fallback caso o usuário digite algo inexistente */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold text-gray-300">404</h1>
                <p className="text-gray-500">Page not found.</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Rodapé simples para dar um toque profissional ao teste */}
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            © 2026 Autoflex Technical Test - Inventory Control System
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;