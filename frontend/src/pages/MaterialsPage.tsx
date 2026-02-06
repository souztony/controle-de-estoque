import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMaterials } from '../features/materialSlice';
import { Package, Plus, Loader2, Edit3 } from 'lucide-react';
// Importamos o tipo para usar no .map()
import type { RawMaterial } from '../types/index';

const MaterialsPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Package size={28} />
            </div>
            Raw Materials
          </h1>
          <p className="text-gray-500 mt-1">Manage your inventory stocks and supplies</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-sm active:scale-95">
          <Plus size={20} />
          New Material
        </button>
      </div>

      {/* Tabela / Loading */}
      {status === 'loading' ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-500 font-medium text-lg">Loading materials...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">In Stock</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length > 0 ? (
                  items.map((item: RawMaterial) => ( // AQUI: Tipamos o parâmetro 'item'
                    <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{item.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-2 h-2 rounded-full ${item.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-gray-600">{item.stockQuantity} units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-flex items-center gap-1">
                          <Edit3 size={18} />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic">
                      No materials found. Start by adding a new one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;