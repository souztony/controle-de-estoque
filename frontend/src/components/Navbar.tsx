import { LayoutDashboard, Package, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { label: 'Materials', icon: <Package size={20} />, path: '/materials' },
    { label: 'Products', icon: <ShoppingCart size={20} />, path: '/products' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-blue-600 text-white p-1.5 rounded-lg">AF</span>
            <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">Autoflex Inventory</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-4 space-y-4 shadow-lg">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-gray-700 font-medium p-2 hover:bg-blue-50 rounded-lg"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;