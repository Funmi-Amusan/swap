'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConditionAttributesPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/condition-attributes/groups');
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
    setLoading(false);
  };

  const deleteGroup = async (id: string) => {
    if (!confirm('Delete this attribute group?')) return;
    try {
      await fetch(`/api/admin/condition-attributes/groups/${id}`, { method: 'DELETE' });
      fetchGroups();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const deleteOption = async (id: string) => {
    if (!confirm('Delete this option?')) return;
    try {
      await fetch(`/api/admin/condition-attributes/options/${id}`, { method: 'DELETE' });
      fetchGroups();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Condition Attributes</h1>
          <p className="text-gray-600 mt-2">Manage attribute groups and options for multi-factor pricing</p>
        </div>
        <Link
          href="/admin/condition-attributes/new"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          + Add Group
        </Link>
      </div>

      {/* Groups List */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.key} className="bg-white border border-gray-200 rounded-lg">
            {/* Group Header */}
            <div
              className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedGroup(expandedGroup === group.key ? null : group.key)}
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{group.label}</h2>
                <p className="text-sm text-gray-600">{group.options.length} options</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">{expandedGroup === group.key ? '▼' : '▶'}</span>
                <div className="space-x-2">
                  <Link
                    href={`/admin/condition-attributes/${group.key}`}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGroup(group.key);
                    }}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Options */}
            {expandedGroup === group.key && (
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Options</h3>
                  <Link
                    href={`/admin/condition-attributes/${group.key}/option/new`}
                    className="text-black text-sm font-medium hover:underline"
                  >
                    + Add Option
                  </Link>
                </div>

                <div className="space-y-2">
                  {group.options.map((option: any) => (
                    <div key={option.value} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.value} • {(option.priceModifier * 100).toFixed(0)}% modifier</div>
                      </div>
                      <div className="space-x-3 text-sm">
                        <Link
                          href={`/admin/condition-attributes/${group.key}/option/${option.value}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteOption(option.value)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {groups.length === 0 && !loading && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No attribute groups found</p>
        </div>
      )}
    </div>
  );
}
