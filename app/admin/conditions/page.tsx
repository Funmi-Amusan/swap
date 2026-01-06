'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Condition {
  id: string;
  label: string;
  value: string;
  description?: string;
  priceModifier: number;
  isActive: boolean;
  order: number;
}

export default function ConditionsPage() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch('/api/admin/phone-conditions');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setConditions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load conditions');
      } finally {
        setLoading(false);
      }
    };

    fetchConditions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this condition?')) return;

    try {
      const response = await fetch(`/api/admin/phone-conditions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setConditions((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conditions</h1>
            <p className="text-gray-600 mt-2">Manage phone conditions and their price modifiers</p>
          </div>
          <Link
            href="/admin/conditions/new"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Add Condition
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Modifier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conditions.map((condition) => (
                <tr key={condition.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {condition.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {condition.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {(condition.priceModifier * 100).toFixed(0)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        condition.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {condition.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3 flex">
                    <Link
                      href={`/admin/conditions/${condition.id}`}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(condition.id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {conditions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No conditions found</p>
              <Link
                href="/admin/conditions/new"
                className="mt-4 inline-block text-black hover:underline font-medium"
              >
                Create one →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
