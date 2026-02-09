import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MaterialsPage from './pages/MaterialsPage';
import ProductsPage from './pages/ProductsPage';
import ProductionDashboard from './pages/ProductionDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductionDashboard />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold text-gray-300">404</h1>
                <p className="text-gray-500">Page not found.</p>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            © 2026 Inventory Control System
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;