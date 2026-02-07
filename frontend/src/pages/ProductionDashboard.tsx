import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, TrendingUp, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';
import type { ProductionSuggestion } from '../types';

const ProductionDashboard: React.FC = () => {
  const [suggestions, setSuggestions] = useState<ProductionSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get<ProductionSuggestion[]>('http://localhost:8080/production/suggestion');
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const totalObtainedValue = suggestions.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <LayoutDashboard className="text-blue-600" />
          Production Suggestions
        </h1>
        <p className="text-gray-500">Optimized production plan based on current raw material inventory.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <p className="text-blue-100 font-medium">Potential Revenue</p>
                  <h2 className="text-4xl font-black">${totalObtainedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                </div>
              </div>
              <div className="bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/20">
                <p className="text-sm text-blue-100 uppercase tracking-wider font-bold mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <span className="font-semibold">Calculated by Stock Priority</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Producible Items</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Product Name</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-center">Qty to Produce</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Unit Value</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {suggestions.map((s, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-900">{s.productName}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                          {s.quantity} units
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-gray-600">
                        ${(s.unitPrice ?? 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right font-black text-blue-600">
                        ${(s.totalPrice ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {suggestions.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-400">
                          <AlertTriangle size={48} className="opacity-20" />
                          <p className="text-lg font-medium">No products can be produced with current stock.</p>
                          <p className="text-sm">Try adding more raw materials or reducing requirements.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <DollarSign className="text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Survival priority is given to products with higher market value, ensuring maximum resource utilization for profit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionDashboard;
