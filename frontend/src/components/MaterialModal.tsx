import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addMaterial } from '../features/materialSlice';
import { X, Save, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', stockQuantity: 0 });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // O ID o Hibernate gera sozinho via Sequence
      await dispatch(addMaterial(formData as any)).unwrap();
      onClose();
      setFormData({ name: '', stockQuantity: 0 });
    } catch (error) {
      alert("Erro ao salvar no banco!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">New Material</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Material Name</label>
            <input 
              required
              placeholder="Ex: Aluminum Ingot"
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Initial Stock Quantity</label>
            <input 
              required
              min="0"
              type="number" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button 
              disabled={isSaving}
              type="submit" 
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 cursor-pointer"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {isSaving ? 'Saving...' : 'Save Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};