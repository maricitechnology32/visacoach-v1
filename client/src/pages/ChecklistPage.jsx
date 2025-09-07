import { useState, useEffect } from 'react';
import { getMyJourney, updateTaskStatus } from '../services/journeyService';

const ChecklistPage = () => {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const data = await getMyJourney();
        setJourney(data);
      } catch (err) {
        setError(err.message || "Failed to load your checklist.");
      } finally {
        setLoading(false);
      }
    };
    fetchJourney();
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    try {
      const updatedJourney = await updateTaskStatus(taskId, status);
      setJourney(updatedJourney);
    } catch (error) {
      console.error('Failed to update task:', error);
      setError("Could not update task status. Please try again.");
    }
  };

  if (loading) return <div>Loading Checklist...</div>;
  if (error) return <div className="p-4 text-red-600 bg-red-100 rounded-md">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Your Visa Journey</h1>
        <p className="mt-1 text-md text-gray-600">Follow these steps to complete your application.</p>
      </div>
      {journey?.tasks?.length > 0 ? (
        journey.tasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <span className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                }`}>
                {task.status}
              </span>
            </div>
            {task.status !== 'approved' && (
              <div className="mt-3 flex gap-2">
                {task.status === 'pending' && (
                  <button onClick={() => handleStatusUpdate(task._id, 'in-progress')} className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Start Task
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button onClick={() => handleStatusUpdate(task._id, 'completed')} className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    Mark as Complete
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Your journey has not been assigned yet. Please contact your counselor.</p>
      )}
    </div>
  );
};

export default ChecklistPage;