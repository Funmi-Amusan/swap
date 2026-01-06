'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PhoneModelsPage() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/phone-models');
      const data = await res.json();
      setModels(data);
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
    setLoading(false);
  };

  const deleteModel = async (id: string) => {
    if (!confirm('Delete this phone model?')) return;
    try {
      await fetch(`/api/admin/phone-models/${id}`, { method: 'DELETE' });
      fetchModels();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Phone Models</h1>
          <p className="text-gray-600 mt-2">Manage available iPhone models and base prices</p>
        </div>
        <Link
          href="/admin/phone-models/new"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          + Add Model
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Label</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Model</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Storage</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Base Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{model.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{model.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{model.storage}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦{model.basePrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${model.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {model.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-3">
                    <Link href={`/admin/phone-models/${model.id}`} className="text-gray-600 hover:text-gray-900 font-medium">
                      Edit
                    </Link>
                    <button onClick={() => deleteModel(model.id)} className="text-gray-600 hover:text-gray-900 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {models.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-600">
            <p>No phone models found</p>
          </div>
        )}
      </div>
    </div>
  );
}
