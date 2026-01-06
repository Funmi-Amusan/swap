'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

interface FormData {
  name: string;
  description: string;
  baseModel: string;
  condition: string;
  priceAdjustment: number;
  isPercentage: boolean;
  isActive: boolean;
}

export default function EditPricingRulePage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isNew = id === 'new';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    baseModel: '',
    condition: '',
    priceAdjustment: 0,
    isPercentage: false,
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) {
      const fetchRule = async () => {
        try {
          const response = await fetch(`/api/admin/pricing-rules/${id}`);
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load');
        }
      };
      fetchRule();
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const method = isNew ? 'POST' : 'PATCH';
      const url = isNew ? '/api/admin/pricing-rules' : `/api/admin/pricing-rules/${id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save');

      router.push('/admin/pricing-rules');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isNew ? 'Add Pricing Rule' : 'Edit Pricing Rule'}
          </h1>
          <p className="text-gray-600 mt-2">Manage custom pricing rules and discounts</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Rule Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="e.g., 'Holiday Discount'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Base Model (e.g., "15pro")
                </label>
                <input
                  type="text"
                  required
                  value={formData.baseModel}
                  onChange={(e) => setFormData({ ...formData, baseModel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Condition (optional, e.g., "like-new")
                </label>
                <input
                  type="text"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price Adjustment
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.priceAdjustment}
                  onChange={(e) => setFormData({ ...formData, priceAdjustment: parseFloat(e.target.value) })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <select
                  value={formData.isPercentage ? 'percent' : 'fixed'}
                  onChange={(e) => setFormData({ ...formData, isPercentage: e.target.value === 'percent' })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="fixed">Fixed (₦)</option>
                  <option value="percent">Percentage (%)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-900">
                Active
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <Link
                href="/admin/pricing-rules"
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 text-center transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
