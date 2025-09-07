 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Refresh, Visibility, Assignment, CheckCircle,
  PendingActions, FilterList, Sort
} from '@mui/icons-material';
import { getConsultancyDs160Forms } from '../services/ds160Service';

const Ds160QueuePage = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchQueue();
  }, []);

  useEffect(() => {
    filterAndSortForms();
  }, [forms, searchTerm, statusFilter, sortBy]);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const data = await getConsultancyDs160Forms();
      setForms(data.forms || []);
    } catch (err) {
      setError('Failed to load DS-160 review queue. Please try again.');
      console.error('Error fetching DS-160 forms:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortForms = () => {
    let result = [...forms];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(form =>
        (form.student?.name || '').toLowerCase().includes(term) ||
        (form.applicationId || '').toLowerCase().includes(term) ||
        (form.student?.email || '').toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(form => form.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'oldest':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'name':
          return (a.student?.name || '').localeCompare(b.student?.name || '');
        default:
          return 0;
      }
    });

    setFilteredForms(result);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      'Submitted for Review': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <PendingActions className="h-4 w-4" />
      },
      'Under Review': {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <Refresh className="h-4 w-4" />
      },
      'Approved': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="h-4 w-4" />
      },
      'Rejected': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <Assignment className="h-4 w-4" />
      },
      'Draft': {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <Assignment className="h-4 w-4" />
      }
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: <Assignment className="h-4 w-4" />
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        {config.icon}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  const getDaysAgo = (date) => {
    const today = new Date();
    const updatedDate = new Date(date);
    const diffTime = Math.abs(today - updatedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h6 className="text-lg text-gray-600">
            Loading DS-160 Applications...
          </h6>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-md mt-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-700 hover:text-red-900"
            onClick={fetchQueue}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-full py-6 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2 flex items-center">
            <Assignment className="text-3xl mr-2 text-green-600" />
            DS-160 Review Queue
          </h1>
          <p className="text-gray-600">
            Manage and review student DS-160 applications
          </p>
        </div>
        <button
          className="flex items-center mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={fetchQueue}
        >
          <Refresh className="mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-gray-600 text-sm">Total Applications</p>
          <p className="text-3xl font-bold text-green-700">{forms.length}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <p className="text-gray-600 text-sm">Pending Review</p>
          <p className="text-3xl font-bold text-amber-700">
            {forms.filter(f => f.status === 'Submitted for Review').length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-gray-600 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-blue-700">
            {forms.filter(f => f.status === 'Under Review').length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-700">
            {forms.filter(f => f.status === 'Approved').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg   border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <FilterList className="text-green-500" />
          <input
            type="text"
            placeholder="Search applications"
            className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Submitted for Review">Submitted for Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {filteredForms.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-lg   border border-gray-200">
          <CheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
          <h6 className="text-lg font-medium mb-2">No applications found</h6>
          <p className="text-gray-600">
            {forms.length === 0
              ? "There are no DS-160 applications in the system yet."
              : "No applications match your current filters."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg   border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {form.student?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {form.student?.email || 'No email provided'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {form.applicationId || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusChip(form.status || 'Draft')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(form.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getDaysAgo(form.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/ds160/review/${form.student?._id}`}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
                    >
                      <Visibility className="mr-1 h-4 w-4" />
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Info */}
      {filteredForms.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>Showing {filteredForms.length} of {forms.length} applications</p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Ds160QueuePage;