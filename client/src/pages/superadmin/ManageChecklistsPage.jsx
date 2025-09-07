// // client/src/pages/superadmin/ManageChecklistsPage.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getChecklistTemplates, createChecklistTemplate } from '../../services/checklistService';
// import Modal from '../../components/Modal';

// const ManageChecklistsPage = () => {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTemplate, setNewTemplate] = useState({ name: '', visaType: '' });

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const data = await getChecklistTemplates();
//         setTemplates(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTemplates();
//   }, []);

//   const handleCreateTemplate = async (e) => {
//     e.preventDefault();
//     try {
//       const created = await createChecklistTemplate(newTemplate);
//       setTemplates([...templates, created]); // Add to UI instantly
//       setIsModalOpen(false);
//       setNewTemplate({ name: '', visaType: '' });
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <div>Loading Checklist Templates...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manage Checklist Templates</h1>
//         <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
//           + Add Template
//         </button>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visa Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Count</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {templates.map((t) => (
//               <tr key={t._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium">
//                   <Link to={`/checklists/${t._id}`} className="text-indigo-600 hover:underline">{t.name}</Link>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-500">{t.visaType}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">{t.tasks.length}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Template">
//         <form onSubmit={handleCreateTemplate} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium">Template Name</label>
//             <input type="text" id="name" value={newTemplate.name} onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
//           </div>
//           <div>
//             <label htmlFor="visaType" className="block text-sm font-medium">Visa Type (e.g., F-1)</label>
//             <input type="text" id="visaType" value={newTemplate.visaType} onChange={(e) => setNewTemplate({ ...newTemplate, visaType: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
//           </div>
//           <div className="flex justify-end gap-2 pt-4">
//             <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Create</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ManageChecklistsPage;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChecklistTemplates, createChecklistTemplate } from '../../services/checklistService';
import Modal from '../../components/Modal';

const ManageChecklistsPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', visaType: '' });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getChecklistTemplates();
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    try {
      const created = await createChecklistTemplate(newTemplate);
      setTemplates([...templates, created]);
      setIsModalOpen(false);
      setNewTemplate({ name: '', visaType: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading Checklist Templates...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Checklist Templates</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          + Add Template
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visa Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">
                  <Link to={`/checklists/${t._id}`} className="text-indigo-600 hover:underline">{t.name}</Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{t.visaType}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{t.tasks.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Template">
        <form onSubmit={handleCreateTemplate} className="space-y-4">
          <div>
            <label htmlFor="name">Template Name</label>
            <input type="text" id="name" value={newTemplate.name} onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div>
            <label htmlFor="visaType">Visa Type (e.g., F-1)</label>
            <input type="text" id="visaType" value={newTemplate.visaType} onChange={(e) => setNewTemplate({ ...newTemplate, visaType: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageChecklistsPage;