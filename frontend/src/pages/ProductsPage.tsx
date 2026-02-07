import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, saveProduct, updateProduct, deleteProduct } from '../features/productSlice';
import { fetchMaterials } from '../features/materialSlice';
import { Package, Plus, Trash2, Edit2, X, Save, Layers, Hash } from 'lucide-react';
import type { Product, ProductComponent } from '../types';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { items: materials } = useAppSelector((state) => state.materials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<{
    code: string;
    name: string;
    price: string;
    components: { rawMaterialId: string; requiredQuantity: string }[];
  }>({
    code: '',
    name: '',
    price: '',
    components: []
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchMaterials());
  }, [dispatch]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        code: product.code,
        name: product.name,
        price: product.price.toString(),
        components: product.components.map(c => ({
          rawMaterialId: c.rawMaterial.id?.toString() || '',
          requiredQuantity: c.requiredQuantity.toString()
        }))
      });
    } else {
      setEditingProduct(null);
      setFormData({ code: '', name: '', price: '', components: [] });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ code: '', name: '', price: '', components: [] });
  };

  const handleAddComponent = () => {
    setFormData({
      ...formData,
      components: [...formData.components, { rawMaterialId: '', requiredQuantity: '' }]
    });
  };

  const handleRemoveComponent = (index: number) => {
    const newComponents = [...formData.components];
    newComponents.splice(index, 1);
    setFormData({ ...formData, components: newComponents });
  };

  const handleComponentChange = (index: number, field: string, value: string) => {
    const newComponents = [...formData.components];
    newComponents[index] = { ...newComponents[index], [field]: value };
    setFormData({ ...formData, components: newComponents });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedComponents: ProductComponent[] = formData.components
      .map(c => {
        const material = materials.find(m => m.id?.toString() === c.rawMaterialId);
        if (!material) return null;
        return {
          rawMaterial: material,
          requiredQuantity: parseFloat(c.requiredQuantity)
        };
      })
      .filter((c): c is ProductComponent => c !== null);

    const productPayload: Product = {
      id: editingProduct?.id,
      code: formData.code,
      name: formData.name,
      price: parseFloat(formData.price),
      components: formattedComponents
    };

    if (editingProduct) {
      dispatch(updateProduct(productPayload));
    } else {
      dispatch(saveProduct(productPayload));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-blue-600" />
            Product Management
          </h1>
          <p className="text-gray-500">Manage your products and their raw material requirements.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Product
        </button>
      </div>

      {status === 'loading' ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase tracking-tighter">
                      <Hash size={12} /> {product.code}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Layers size={14} /> Components
                  </h4>
                  <ul className="space-y-1">
                    {product.components.map((comp, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex justify-between">
                        <span>{comp.rawMaterial.name}</span>
                        <span className="font-medium text-gray-900">{comp.requiredQuantity} units</span>
                      </li>
                    ))}
                    {product.components.length === 0 && (
                      <li className="text-sm text-gray-400 italic">No components defined.</li>
                    )}
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => product.id && handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Product Code</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. FURN-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Luxury Chair"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Layers size={20} className="text-blue-500" />
                    Components Association
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddComponent}
                    className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors"
                  >
                    + Add Component
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.components.map((comp, index) => (
                    <div key={index} className="flex gap-3 items-end bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex-grow space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Material</label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none"
                          value={comp.rawMaterialId}
                          onChange={(e) => handleComponentChange(index, 'rawMaterialId', e.target.value)}
                        >
                          <option value="">Select Material</option>
                          {materials.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.code} - {m.name} (Stock: {m.stockQuantity})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-32 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Qty Needed</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
                          value={comp.requiredQuantity}
                          onChange={(e) => handleComponentChange(index, 'requiredQuantity', e.target.value)}
                          placeholder="0.0"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveComponent(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  {formData.components.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-gray-400 text-sm">No materials associated yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                disabled={status === 'loading'}
              >
                <Save size={20} />
                {editingProduct ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
