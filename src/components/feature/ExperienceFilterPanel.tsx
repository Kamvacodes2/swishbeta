// src/components/feature/ExperienceFilterPanel.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';

interface ExperienceFilterPanelProps {
  onFilterChange: (filters: {
    search?: string;
    groupType?: string;
    groupSize?: string;
    duration?: string;
    deliveryType?: string;
    goals?: string;
  }) => void;
}

const ExperienceFilterPanel: React.FC<ExperienceFilterPanelProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [duration, setDuration] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [goals, setGoals] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ search: search.trim() || undefined, groupType: groupType || undefined, groupSize: groupSize || undefined, duration: duration || undefined, deliveryType: deliveryType || undefined, goals: goals || undefined });
  };

  const handleClearFilters = () => {
    setSearch('');
    setGroupType('');
    setGroupSize('');
    setDuration('');
    setDeliveryType('');
    setGoals('');
    onFilterChange({}); // Clear all filters
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h4 className="text-lg font-semibold mb-4">Filter & Search Experiences</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search by name</label>
          <input
            id="search"
            type="text"
            placeholder="Search experiences..."
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700 mb-1">Delivery type</label>
          <select
            id="deliveryType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
          >
            <option value="">All</option>
            <option value="in-person">In-person</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div>
          <label htmlFor="groupType" className="block text-sm font-medium text-gray-700 mb-1">Group Type</label>
          <select
            id="groupType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
          >
            <option value="">All</option>
            <option value="corporate">Corporate</option>
            <option value="church">Church</option>
            <option value="large-groups">Large Groups</option>
          </select>
        </div>
        <div>
          <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
          <select
            id="groupSize"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
          >
            <option value="">All</option>
            <option value="small">1-10</option>
            <option value="medium">11-50</option>
            <option value="large">51+</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <select
            id="duration"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">All</option>
            <option value="short">Short (1-2 hours)</option>
            <option value="half-day">Half Day (3-4 hours)</option>
            <option value="full-day">Full Day (5-8 hours)</option>
          </select>
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
          <select
            id="goals"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          >
            <option value="">All</option>
            <option value="communication">Communication</option>
            <option value="trust">Trust</option>
            <option value="leadership">Leadership</option>
            <option value="fun">Fun</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="ghost" onClick={handleClearFilters}>Clear Filters</Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default ExperienceFilterPanel;
