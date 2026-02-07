import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMaterials, deleteMaterial } from '../features/materialSlice';
import { Package, Plus, Loader2, Edit3, AlertCircle, Trash2 } from 'lucide-react';
import { MaterialModal } from '../components/MaterialModal';
import type { RawMaterial } from '../types/index';

const MaterialsPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.materials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  const handleOpenModal = (material?: RawMaterial) => {
    setEditingMaterial(material || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await dispatch(deleteMaterial(id)).unwrap();
      } catch (error) {
        alert("Error deleting material. It might be used by a product.");
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-blue-600" />
            Raw Materials
          </h1>
          <p className="text-gray-500 mt-1">Manage your inventory stocks and supplies</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus size={20} />
          New Material
        </button>
      </div>

      {/* Tabela / Estados de Carregamento e Erro */}
      {status === 'loading' ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-500 font-medium text-lg">Connecting to API...</p>
        </div>
      ) : status === 'failed' ? (
        <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-2xl border border-red-100 text-red-600">
          <AlertCircle size={48} className="mb-4" />
          <p className="font-bold text-lg">Failed to load materials</p>
          <p className="text-sm">Check if your Quarkus backend is running on port 8080.</p>
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
                  items.map((item: RawMaterial) => (
                    <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">#{item.code}</span>
                          <span className="font-semibold text-gray-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-2 h-2 rounded-full ${item.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className={`${item.stockQuantity > 0 ? 'text-gray-600' : 'text-red-500 font-medium'}`}>
                            {item.stockQuantity} units
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id!)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-16 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Package size={40} className="opacity-20" />
                        <p className="italic font-medium">No materials found in database.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Cadastro */}
      <MaterialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingMaterial={editingMaterial}
      />
    </div>
  );
};

export default MaterialsPage;