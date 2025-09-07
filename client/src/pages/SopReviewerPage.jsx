import { useState, useEffect } from 'react';
import { reviewSop, getSopHistory, generateSop } from '../services/sopService';

const SopReviewerPage = () => {
  const [activeTab, setActiveTab] = useState('writer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for SOP Writer
  const [sopInputs, setSopInputs] = useState({
    university: '',
    major: '',
    background: '',
    goals: ''
  });
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [generating, setGenerating] = useState(false);

  // State for SOP Reviewer
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [review, setReview] = useState(null);

  // State for History
  const [history, setHistory] = useState([]);

  // State for copy feedback
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeTab === 'history') {
      const fetchHistory = async () => {
        try {
          setLoading(true);
          const historyData = await getSopHistory();
          setHistory(historyData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [activeTab]);

  const handleInputChange = (e) => {
    setSopInputs({ ...sopInputs, [e.target.name]: e.target.value });
  };

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setError('');
    try {
      const result = await generateSop(sopInputs);
      setGeneratedSOP(result.draft);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to review.');
      return;
    }
    setLoading(true);
    setError('');
    setReview(null);
    try {
      const newSopReview = await reviewSop(file);
      setReview(newSopReview.review);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to download generated SOP as text file
  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedSOP], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "sop-SOP.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to download generated SOP as PDF (simulated)
  const downloadAsPDF = () => {
    // In a real application, this would generate an actual PDF
    // For this example, we'll create a text file with PDF extension
    const element = document.createElement("a");
    const file = new Blob([generatedSOP], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = "sop-SOP.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to copy generated SOP to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSOP)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        setError('Failed to copy text: ' + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Statement of Purpose Assistant</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-powered tool to help you create and refine your Statement of Purpose for academic applications
          </p>
        </div>

        <div className="bg-white rounded-sm shadow-sm overflow-hidden mb-8 border-2 border-green-300">
          <div className="border-b border-green-200">
            <nav className="flex flex-col sm:flex-row">
              <button
                onClick={() => setActiveTab('writer')}
                className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${activeTab === 'writer' ? 'bg-green-50 text-green-700 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-700 hover:bg-gray-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                SOP Writer
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${activeTab === 'review' ? 'bg-green-50 text-green-700 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-700 hover:bg-gray-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                SOP Reviewer
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-6 text-center font-medium text-sm flex-1 flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-green-50 text-green-700 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-700 hover:bg-gray-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {activeTab === 'writer' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-sm border-1 border-green-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate Your SOP</h2>
                  <p className="text-gray-600 mb-6">Provide the key points, and our AI will craft a compelling first SOP for you.</p>

                  <form onSubmit={handleGenerateSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University & Program</label>
                      <input
                        type="text"
                        name="university"
                        value={sopInputs.university}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300  rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Stanford University Computer Science PhD"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Major/Field of Study</label>
                      <input
                        type="text"
                        name="major"
                        value={sopInputs.major}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Computer Science with focus on AI"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Background & Key Experiences</label>
                      <textarea
                        name="background"
                        value={sopInputs.background}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe your academic background, research experience, projects, etc."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Future Goals</label>
                      <textarea
                        name="goals"
                        value={sopInputs.goals}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-green-300 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="What do you hope to achieve through this program? What are your career aspirations?"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={generating}
                      className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    >
                      {generating ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Generate SOP
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-white border border-green-200 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Generated Statement of Purpose</h2>
                    {generatedSOP && (
                      <div className="flex gap-2">
                        <button
                          onClick={copyToClipboard}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm flex items-center gap-1 transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </button>
                        <div className="relative group">
                          <button
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm flex items-center gap-1 transition-colors"
                            title="Download options"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </button>
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 border border-green-200">
                            <button
                              onClick={downloadAsText}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              As Text File
                            </button>
                            <button
                              onClick={downloadAsPDF}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              As PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {copied && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center text-sm">
                      Copied to clipboard!
                    </div>
                  )}

                  <div className="mt-4 p-5 border-1 border-green-200 rounded-md bg-gray-50 h-96 overflow-y-auto whitespace-pre-wrap">
                    {generating ? (
                      <div className="flex items-center  justify-center h-full">
                        <div className="text-center">
                          <svg className="animate-spin h-10 w-10 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="mt-3 text-gray-600">AI is crafting your SOP...</p>
                        </div>
                      </div>
                    ) : generatedSOP ? (
                      <div className="prose max-w-none text-gray-700">
                        {generatedSOP}
                      </div>
                    ) : (
                      <div className="flex flex-col  items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>Your generated SOP will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'review' && (
              <div>
                <div className="bg-gray-50 p-6 rounded-lg border border-green-200 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your SOP</h2>
                  <p className="text-gray-600 mb-6">Upload your completed SOP for an instant, AI-powered review with detailed feedback.</p>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload your SOP document</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <label className="relative flex-1 overflow-hidden">
                            <input
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="sr-only"
                              id="file-upload"
                            />
                            <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-green-300 rounded-md text-center cursor-pointer hover:border-green-400 hover:bg-green-25 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <div className="ml-2 text-sm">
                                <p className="font-medium text-gray-600">Click to upload</p>
                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                              </div>
                            </div>
                          </label>
                        </div>
                        {fileName && (
                          <p className="mt-2 text-sm text-green-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Selected: {fileName}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !file}
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed mt-7 sm:mt-7 flex items-center justify-center gap-2 transition-colors"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Review My SOP
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {review && (
                  <div className="bg-white border border-green-200 p-6 rounded-lg space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-green-200">
                      <h2 className="text-xl font-semibold text-gray-800">Review Results</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-gray-700">Overall Score:</span>
                        <div className="text-3xl font-bold text-green-600">{review.overallScore}/100</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-5 rounded-md border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Strengths
                        </h3>
                        <p className="text-green-700">{review.strengths}</p>
                      </div>

                      <div className="bg-amber-50 p-5 rounded-md border border-amber-200">
                        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Areas for Improvement
                        </h3>
                        <ul className="list-disc list-inside text-amber-700 space-y-1">
                          {review.areasForImprovement.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-md border border-green-200">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tone Analysis
                      </h3>
                      <p className="text-gray-700">{review.toneAnalysis}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Grammar & Phrasing Corrections
                      </h3>
                      <div className="space-y-4">
                        {review.grammarCorrections.map((corr, i) => (
                          <div key={i} className="border p-4 rounded-md bg-white">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <p className="text-red-500 text-sm line-through">{corr.original}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <p className="text-green-700 text-sm font-medium">{corr.corrected}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 italic">{corr.explanation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white border border-green-200 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Past Reviews</h2>

                {loading ? (
                  <div className="flex justify-center py-10">
                    <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : history.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {history.map(item => (
                      <div key={item._id} className="py-5 first:pt-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                          <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Score:</span>
                            <div className="text-lg font-bold text-green-600">{item.review.overallScore}/100</div>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{item.content}</p>
                        <button className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium transition-colors">
                          View detailed review →
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No review history</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by reviewing your first SOP!</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setActiveTab('review')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        Review Your SOP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SopReviewerPage;