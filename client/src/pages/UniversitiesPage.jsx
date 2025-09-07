 


import { useState, useEffect, useCallback } from 'react';
import { getPartnerUniversities, getCountries, getProgramLevels } from '../services/universityService';
import { Search, MapPin, Globe, BookOpen, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// A custom hook to debounce user input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState('All');

  // Data for filter dropdowns
  const [countries, setCountries] = useState([]);
  const [programLevels, setProgramLevels] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });

  // Debounce search term to prevent API calls on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch static data for filters only once on component mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [countriesData, levelsData] = await Promise.all([
          getCountries(),
          getProgramLevels()
        ]);
        setCountries(['All', ...countriesData]);
        setProgramLevels(['All', ...levelsData]);
      } catch (error) {
        setError('Could not load filter options.');
        console.error('Error loading filter options:', error);
      }
    };
    fetchFilterData();
  }, []);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchAndSetUniversities = useCallback(async (page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const filters = {
        page,
        limit: pagination.limit,
        search: debouncedSearchTerm || undefined,
        country: selectedCountry !== 'All' ? selectedCountry : undefined,
        programLevel: selectedProgramLevel !== 'All' ? selectedProgramLevel : undefined,
      };

      const data = await getPartnerUniversities(filters);

      // If it's the first page, replace the data. Otherwise, append it.
      if (page === 1) {
        setUniversities(data.universities || []);
      } else {
        setUniversities(prev => [...prev, ...(data.universities || [])]);
      }

      setPagination({
        page: data.currentPage || page,
        limit: data.limit || pagination.limit,
        total: data.total || 0,
        totalPages: data.totalPages || 1,
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch universities');
      console.error('Error fetching universities:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [debouncedSearchTerm, selectedCountry, selectedProgramLevel, pagination.limit]);

  // Trigger a new search (from page 1) when filters change
  useEffect(() => {
    fetchAndSetUniversities(1, false);
  }, [debouncedSearchTerm, selectedCountry, selectedProgramLevel, fetchAndSetUniversities]);

  const loadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchAndSetUniversities(pagination.page + 1, true);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('All');
    setSelectedProgramLevel('All');
  };

  const removeFilter = (filterType) => {
    if (filterType === 'search') setSearchTerm('');
    if (filterType === 'country') setSelectedCountry('All');
    if (filterType === 'program') setSelectedProgramLevel('All');
  };

  if (loading && universities.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600">Loading universities...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-3">Partner Universities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover our global network of partner institutions.</p>
        </div>

        <div className="bg-white rounded-sm border-2 border-green-400 shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search universities, countries, or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search universities"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              aria-expanded={showFilters}
              aria-controls="filter-section"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div id="filter-section" className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="country-filter"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                >
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700 mb-1">Program Level</label>
                <select
                  id="program-filter"
                  value={selectedProgramLevel}
                  onChange={(e) => setSelectedProgramLevel(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                >
                  {programLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          )}

          {(searchTerm || selectedCountry !== 'All' || selectedProgramLevel !== 'All') && (
            <div className="mt-4 pt-4 border-t flex items-center flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Search: {searchTerm}
                  <button onClick={() => removeFilter('search')} className="ml-1" aria-label="Remove search filter">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCountry !== 'All' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Country: {selectedCountry}
                  <button onClick={() => removeFilter('country')} className="ml-1" aria-label="Remove country filter">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedProgramLevel !== 'All' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Program: {selectedProgramLevel}
                  <button onClick={() => removeFilter('program')} className="ml-1" aria-label="Remove program filter">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-800 ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 text-red-700">
            <p>{error}</p>
            <button
              onClick={() => fetchAndSetUniversities(1, false)}
              className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
            >
              Try again
            </button>
          </div>
        )}

        <p className="mb-6 text-gray-600">Showing {universities.length} of {pagination.total} universities</p>

        {universities.length === 0 && !loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">No universities found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   rounded-sm  ">
              {universities.map(uni => (
                <Link
                  to={`/universities/${uni._id}`}
                  key={uni._id}
                  className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-sm hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{uni.name}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{uni.city}, {uni.country}</span>
                    </div>
                    {uni.programs?.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 mb-2">
                          <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">Top Programs:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {uni.programs.slice(0, 3).map((p, i) => (
                            <span key={i} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {p.level}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-700">View Details &rarr;</span>
                      <div className="text-xs font-semibold px-2.5 py-0.5 rounded bg-green-100 text-green-800">
                        {uni.partnershipLevel} Partner
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pagination.page < pagination.totalPages && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : `Load More (${pagination.total - universities.length} remaining)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UniversitiesPage;