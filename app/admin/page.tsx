'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [phoneModels, setPhoneModels] = useState<any[]>([]);
  const [conditions, setConditions] = useState<any[]>([]);
  const [pricingRules, setPricingRules] = useState<any[]>([]);
  const [attributeGroups, setAttributeGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [modelsRes, conditionsRes, rulesRes, groupsRes] = await Promise.all([
        fetch('/api/admin/phone-models'),
        fetch('/api/admin/phone-conditions'),
        fetch('/api/admin/pricing-rules'),
        fetch('/api/admin/condition-attributes/groups'),
      ]);
      setPhoneModels(await modelsRes.json());
      setConditions(await conditionsRes.json());
      setPricingRules(await rulesRes.json());
      setAttributeGroups(await groupsRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const deletePhoneModel = async (id: string) => {
    if (!confirm('Delete this phone model?')) return;
    try {
      await fetch(`/api/admin/phone-models/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const deleteCondition = async (id: string) => {
    if (!confirm('Delete this condition?')) return;
    try {
      await fetch(`/api/admin/phone-conditions/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const deletePricingRule = async (id: string) => {
    if (!confirm('Delete this pricing rule?')) return;
    try {
      await fetch(`/api/admin/pricing-rules/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage phone models, conditions, attributes, and pricing rules</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-2">Phone Models</div>
          <div className="text-3xl font-bold text-gray-900">{phoneModels.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-2">Conditions</div>
          <div className="text-3xl font-bold text-gray-900">{conditions.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-2">Attributes</div>
          <div className="text-3xl font-bold text-gray-900">{attributeGroups.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-2">Pricing Rules</div>
          <div className="text-3xl font-bold text-gray-900">{pricingRules.length}</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-12">
        {/* Phone Models Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Phone Models</h2>
            <Link
              href="/admin/phone-models/new"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              + Add Model
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Label</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Storage</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {phoneModels.slice(0, 5).map((model) => (
                  <tr key={model.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{model.label}</td>
                    <td className="px-4 py-3 text-gray-600">{model.model}</td>
                    <td className="px-4 py-3 text-gray-600">{model.storage}</td>
                    <td className="px-4 py-3 text-gray-900">₦{model.basePrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <Link href={`/admin/phone-models/${model.id}`} className="text-gray-600 hover:text-gray-900">
                        Edit
                      </Link>
                      <button onClick={() => deletePhoneModel(model.id)} className="text-gray-600 hover:text-gray-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {phoneModels.length > 5 && <p className="text-sm text-gray-500 mt-4">Showing 5 of {phoneModels.length} models</p>}
        </div>

        {/* Conditions Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Conditions</h2>
            <Link
              href="/admin/conditions/new"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              + Add Condition
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Label</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Modifier</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((condition) => (
                  <tr key={condition.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{condition.label}</td>
                    <td className="px-4 py-3 text-gray-600">{condition.description}</td>
                    <td className="px-4 py-3 text-gray-900">{(condition.priceModifier * 100).toFixed(0)}%</td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <Link href={`/admin/conditions/${condition.id}`} className="text-gray-600 hover:text-gray-900">
                        Edit
                      </Link>
                      <button onClick={() => deleteCondition(condition.id)} className="text-gray-600 hover:text-gray-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Rules Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pricing Rules</h2>
            <Link
              href="/admin/pricing-rules/new"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              + Add Rule
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Adjustment</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pricingRules.slice(0, 5).map((rule) => (
                  <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{rule.name}</td>
                    <td className="px-4 py-3 text-gray-600">{rule.baseModel}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {rule.isPercentage ? `${rule.priceAdjustment}%` : `₦${rule.priceAdjustment.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <Link href={`/admin/pricing-rules/${rule.id}`} className="text-gray-600 hover:text-gray-900">
                        Edit
                      </Link>
                      <button onClick={() => deletePricingRule(rule.id)} className="text-gray-600 hover:text-gray-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pricingRules.length > 5 && <p className="text-sm text-gray-500 mt-4">Showing 5 of {pricingRules.length} rules</p>}
        </div>
      </div>
    </div>
  );
}
