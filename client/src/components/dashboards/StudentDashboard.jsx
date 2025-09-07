// // client/src/components/dashboards/StudentDashboard.jsx
// import { useState, useEffect } from 'react';
// import { getMyJourney, updateTaskStatus } from '../../services/journeyService'; // Import the new service

// const StudentDashboard = () => {
//   const [journey, setJourney] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // The useEffect hook to fetch the journey remains the same
//   useEffect(() => {
//     const fetchJourney = async () => {
//       try {
//         const journeyData = await getMyJourney();
//         setJourney(journeyData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching your journey.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJourney();
//   }, []);

//   // ==> ADD THIS HANDLER FUNCTION <==
//   const handleStatusUpdate = async (taskId, newStatus) => {
//     // ==> 1. Define originalJourney outside the try block <==
//     const originalJourney = journey;

//     // 2. Optimistically update the UI
//     const updatedTasks = journey.tasks.map(task =>
//       task._id === taskId ? { ...task, status: newStatus } : task
//     );
//     setJourney({ ...journey, tasks: updatedTasks });

//     try {
//       // 3. Then call the API
//       await updateTaskStatus(taskId, newStatus);
//     } catch (err) {
//       // 4. If it fails, revert to the original state
//       setJourney(originalJourney);
//       setError('Failed to update task. Please try again.', err);
//     }
//   };

//   if (loading) return <div>Loading your journey...</div>;
//   if (error) return <div className="text-red-600">Error: {error}</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800">Your Visa Journey</h2>
//       <p className="mt-1 text-md text-gray-600">
//         Here is your personalized checklist. Complete each task to move forward.
//       </p>

//       <div className="mt-6">
//         {journey && journey.tasks.length > 0 ? (
//           <div className="space-y-4">
//             {journey.tasks.map((task) => (
//               <div key={task._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{task.description}</p>
//                   </div>
//                   <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full
//                     ${task.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
//                     ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
//                     ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
//                     ${task.status === 'approved' ? 'bg-purple-100 text-purple-800' : ''}
//                   `}>
//                     {task.status}
//                   </span>
//                 </div>
//                 {/* ==> ADD ACTION BUTTONS <== */}
//                 {task.status !== 'approved' && (
//                   <div className="mt-3 flex gap-2">
//                     {task.status === 'pending' && (
//                       <button onClick={() => handleStatusUpdate(task._id, 'in-progress')} className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
//                         Start Task
//                       </button>
//                     )}
//                     {task.status === 'in-progress' && (
//                       <button onClick={() => handleStatusUpdate(task._id, 'completed')} className="text-xs px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
//                         Mark as Completed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>Your journey checklist has not been assigned yet. Please contact your counselor.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


// client/src/components/dashboards/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import { getMyJourney, updateTaskStatus } from '../../services/journeyService';

const StudentDashboard = () => {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const journeyData = await getMyJourney();
        setJourney(journeyData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching your journey.');
      } finally {
        setLoading(false);
      }
    };
    fetchJourney();
  }, []);

  const handleStatusUpdate = async (taskId, newStatus) => {
    const originalJourney = journey;
    const updatedTasks = journey.tasks.map(task =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setJourney({ ...journey, tasks: updatedTasks });

    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      setJourney(originalJourney);
      setError('Failed to update task. Please try again.',err);
    }
  };

  // Filter tasks based on active filter
  const filteredTasks = journey?.tasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });

  // Calculate progress percentage
  const progressPercentage = journey
    ? Math.round((journey.tasks.filter(task => task.status === 'completed' || task.status === 'approved').length / journey.tasks.length) * 100)
    : 0;

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading your visa journey...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Visa Journey</h1>
              <p className="mt-2 text-gray-600">
                Track your progress through the visa application process
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
              {journey?.country || "Study Destination"}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-green-600">{progressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveFilter('in-progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'completed' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'approved' ? 'bg-purple-100 text-purple-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Approved
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                        ${task.status === 'completed' || task.status === 'approved' ? 'bg-green-100 text-green-600' : ''}
                        ${task.status === 'pending' ? 'bg-gray-200 text-gray-600' : ''}
                        ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : ''}
                      `}>
                        {task.status === 'completed' || task.status === 'approved' ? (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${task.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : ''}
                      ${task.status === 'approved' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {task.status.replace('-', ' ')}
                    </span>

                    {/* Action Buttons */}
                    {task.status !== 'approved' && (
                      <div className="flex gap-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(task._id, 'in-progress')}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Start
                          </button>
                        )}
                        {task.status === 'in-progress' && (
                          <button
                            onClick={() => handleStatusUpdate(task._id, 'completed')}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline info if available */}
                {task.dueDate && (
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No tasks found</h3>
              <p className="text-gray-600">No tasks match your current filter selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;