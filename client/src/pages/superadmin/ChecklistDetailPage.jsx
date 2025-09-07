import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById, addTaskToTemplate } from '../../services/checklistService';
import Modal from '../../components/Modal';

const ChecklistDetailPage = () => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: 'Pre-Application' });
  const { templateId } = useParams();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const data = await getTemplateById(templateId);
        setTemplate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTemplate = await addTaskToTemplate(templateId, newTask);
      setTemplate(updatedTemplate);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', category: 'Pre-Application' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading template...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Link to="/manage-checklists" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Back to All Templates</Link>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{template?.name}</h1>
          <p className="text-gray-500">Visa Type: {template?.visaType}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          + Add Task
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {template?.tasks?.map(task => (
            <li key={task._id} className="px-6 py-4">
              <p className="font-semibold text-gray-800">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">Category: {task.category}</p>
              {/* Add Edit/Delete buttons here */}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label>Task Title</label>
            <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label>Description</label>
            <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} rows="3" className="w-full border rounded-md p-2" required />
          </div>
          <div>
            <label>Category</label>
            <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="w-full border rounded-md p-2">
              <option>Pre-Application</option>
              <option>Application Filing</option>
              <option>Interview Prep</option>
              <option>Post-Approval</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Add Task</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ChecklistDetailPage;