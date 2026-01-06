'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ConditionAttributeOption {
  id: string;
  value: string;
  label: string;
  description: string | null;
  priceModifier: number;
  order: number;
  isActive: boolean;
  groupId: string;
  group: {
    id: string;
    key: string;
    label: string;
  };
}

interface FormData {
  value: string;
  label: string;
  description: string;
  priceModifier: number;
  order: number;
  isActive: boolean;
}

export default function EditConditionAttributeOptionPage({
  params,
}: {
  params: { groupKey: string; optionValue: string };
}) {
  const router = useRouter();
  const { groupKey, optionValue } = params;
  const isNew = optionValue === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [option, setOption] = useState<ConditionAttributeOption | null>(null);
  const [group, setGroup] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    value: '',
    label: '',
    description: '',
    priceModifier: 1.0,
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the group info first
        const groupResponse = await fetch(`/api/admin/condition-attributes/${groupKey}`);
        if (!groupResponse.ok) {
          console.error('Group not found');
          return;
        }
        const groupData = await groupResponse.json();
        setGroup(groupData);

        if (!isNew) {
          // Get the specific option using the new API route
          const optionResponse = await fetch(`/api/admin/condition-attributes/${groupKey}/option/${optionValue}`);
          if (optionResponse.ok) {
            const optionData = await optionResponse.json();
            setOption(optionData);
            setFormData({
              value: optionData.value,
              label: optionData.label,
              description: optionData.description || '',
              priceModifier: optionData.priceModifier,
              order: optionData.order,
              isActive: optionData.isActive,
            });
          } else {
            console.error('Option not found');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupKey, optionValue, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!group) return;

      const payload = {
        ...formData,
        groupId: group.id,
      };

      const url = isNew 
        ? '/api/admin/condition-attributes/options'
        : `/api/admin/condition-attributes/${groupKey}/option/${optionValue}`;
      
      const method = isNew ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/condition-attributes');
      } else {
        console.error('Failed to save option');
      }
    } catch (error) {
      console.error('Error saving option:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/admin" className="hover:text-gray-900">Admin</Link>
          <span>/</span>
          <Link href="/admin/condition-attributes" className="hover:text-gray-900">Condition Attributes</Link>
          <span>/</span>
          <span className="text-gray-900">{group?.label || groupKey}</span>
          <span>/</span>
          <span className="text-gray-900">{isNew ? 'New Option' : formData.label}</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? `New Option for ${group?.label}` : `Edit ${formData.label}`}
        </h1>
        <p className="text-gray-600 mt-2">
          {isNew ? 'Create a new condition attribute option' : 'Modify condition attribute option settings'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Option Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                Value (Key)
              </label>
              <input
                type="text"
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., mint, cracked, 90+"
                required
              />
            </div>

            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-2">
                Display Label
              </label>
              <input
                type="text"
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mint Condition, Cracked Screen"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional description for this option"
              />
            </div>

            <div>
              <label htmlFor="priceModifier" className="block text-sm font-medium text-gray-700 mb-2">
                Price Modifier
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="2"
                id="priceModifier"
                value={formData.priceModifier}
                onChange={(e) => setFormData({ ...formData, priceModifier: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">1.0 = 100%, 0.8 = 80%, 1.2 = 120%</p>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active (visible to customers)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/condition-attributes"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : isNew ? 'Create Option' : 'Update Option'}
          </button>
        </div>
      </form>
    </div>
  );
}