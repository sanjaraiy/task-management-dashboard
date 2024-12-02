import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Search } from 'lucide-react';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const { filter, searchQuery } = useSelector((state: RootState) => state.tasks);

  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value as any))}
            className={`px-4 py-2 rounded-lg ${
              filter === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}