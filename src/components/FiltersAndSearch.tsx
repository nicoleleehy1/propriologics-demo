import React from 'react';
import { Search } from 'lucide-react';

interface FiltersAndSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  testTypeFilter: string;
  setTestTypeFilter: (value: string) => void;
}

const FiltersAndSearch: React.FC<FiltersAndSearchProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  testTypeFilter,
  setTestTypeFilter
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-lg shadow-sm p-4 mb-6 bg-white border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by patient name, ID, or test type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={testTypeFilter}
              onChange={(e) => setTestTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Test Types</option>
              <option value="Static Balance">Static Balance</option>
              <option value="Dynamic Balance">Dynamic Balance</option>
              <option value="Proprioceptive">Proprioceptive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersAndSearch;
