import { useState } from 'react';
import { getUniversityRecommendations } from '../services/universityService';

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUniversityRecommendations();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI University Recommendations</h1>
          <p className="text-gray-600">Personalized university matches based on your profile</p>
        </div>

        {!recommendations && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Personalized University Recommendations</h2>
            <p className="text-gray-600 mb-6">
              Our AI analyzes your academic profile, test scores, extracurricular activities, and preferences to generate a personalized list of Ambitious, Target, and Safe universities.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-green-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-75 flex items-center justify-center mx-auto"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate My Recommendations
                </>
              )}
            </button>
            {error && (
              <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {recommendations && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Your Personalized Recommendations</h2>
              <p className="text-gray-600">Based on your academic profile and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ambitious Schools */}
              <div className="bg-gradient-to-b from-red-50 to-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-red-700">Ambitious</h2>
                </div>
                <p className="text-sm text-red-600 mb-4">Reach schools that may be a stretch but worth trying</p>
                <div className="space-y-4">
                  {recommendations.ambitious.map(uni => (
                    <div key={uni.name} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm hover:border-red-200 transition-colors">
                      <p className="font-bold text-gray-900">{uni.name}</p>
                      <div className="flex items-start mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">{uni.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Schools */}
              <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-green-700">Target</h2>
                </div>
                <p className="text-sm text-green-600 mb-4">Great matches where you have a solid chance of admission</p>
                <div className="space-y-4">
                  {recommendations.target.map(uni => (
                    <div key={uni.name} className="bg-white p-4 rounded-lg border border-green-100 shadow-sm hover:border-green-200 transition-colors">
                      <p className="font-bold text-gray-900">{uni.name}</p>
                      <div className="flex items-start mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">{uni.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Schools */}
              <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-green-700">Safe</h2>
                </div>
                <p className="text-sm text-green-600 mb-4">Schools where you're very likely to be admitted</p>
                <div className="space-y-4">
                  {recommendations.safe.map(uni => (
                    <div key={uni.name} className="bg-white p-4 rounded-lg border border-green-100 shadow-sm hover:border-green-200 transition-colors">
                      <p className="font-bold text-gray-900">{uni.name}</p>
                      <div className="flex items-start mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">{uni.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setRecommendations(null)}
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;