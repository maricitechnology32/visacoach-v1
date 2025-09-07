import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConsultancies, createConsultancy, updateConsultancy, toggleConsultancyStatus, createCounselor } from '../../services/adminService';
import Modal from '../../components/Modal';

const ManageConsultanciesPage = () => {
  const [consultancies, setConsultancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for modals
  const [isConsultancyModalOpen, setIsConsultancyModalOpen] = useState(false);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);
  const [selectedConsultancy, setSelectedConsultancy] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', contactEmail: '' });
  const [newCounselor, setNewCounselor] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchConsultancies = async () => {
      try {
        const data = await getConsultancies();
        setConsultancies(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch consultancies.');
      } finally {
        setLoading(false);
      }
    };
    fetchConsultancies();
  }, []);

  // Handlers for opening modals
  const handleOpenCreateModal = () => {
    setSelectedConsultancy(null);
    setFormData({ name: '', contactEmail: '' });
    setIsConsultancyModalOpen(true);
  };

  const handleOpenEditModal = (consultancy) => {
    setSelectedConsultancy(consultancy);
    setFormData({ name: consultancy.name, contactEmail: consultancy.contactEmail });
    setIsConsultancyModalOpen(true);
  };

  // Single handler for both creating and updating a consultancy
  const handleConsultancySubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedConsultancy) { // We are editing
        const updated = await updateConsultancy(selectedConsultancy._id, formData);
        setConsultancies(consultancies.map(c => c._id === updated._id ? updated : c));
      } else { // We are creating
        const created = await createConsultancy(formData);
        setConsultancies([...consultancies, created]);
      }
      setIsConsultancyModalOpen(false);
    } catch (err) { setError(err.message); }
  };

  const handleCreateCounselor = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createCounselor({ ...newCounselor, consultancyId: selectedConsultancy._id });
      setIsCounselorModalOpen(false);
      setNewCounselor({ name: '', email: '' });
      alert('Counselor created successfully! They will receive an invitation email.');
    } catch (err) { setError(err.message); }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleConsultancyStatus(id);
      setConsultancies(consultancies.map(c => c._id === id ? updated : c));
    } catch (err) { setError(err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Consultancies</h1>
        <button onClick={handleOpenCreateModal} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          + Add Consultancy
        </button>
      </div>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {consultancies.map((c) => (
              <tr key={c._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link to={`/consultancies/${c._id}`} className="text-indigo-600 hover:underline">{c.name}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.contactEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button onClick={() => { setSelectedConsultancy(c); setIsCounselorModalOpen(true); }} className="text-green-600 hover:text-green-900">Add Counselor</button>
                  <button onClick={() => handleOpenEditModal(c)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleToggleStatus(c._id)} className="text-gray-500 hover:text-gray-900">{c.isActive ? 'Disable' : 'Enable'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isConsultancyModalOpen} onClose={() => setIsConsultancyModalOpen(false)} title={selectedConsultancy ? 'Edit Consultancy' : 'Add New Consultancy'}>
        <form onSubmit={handleConsultancySubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Consultancy Name</label>
            <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium">Contact Email</label>
            <input type="email" id="contactEmail" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsConsultancyModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isCounselorModalOpen} onClose={() => setIsCounselorModalOpen(false)} title={`Add Counselor to ${selectedConsultancy?.name}`}>
        <form onSubmit={handleCreateCounselor} className="space-y-4">
          <div>
            <label htmlFor="counselorName" className="block text-sm font-medium">Counselor's Full Name</label>
            <input type="text" id="counselorName" value={newCounselor.name} onChange={(e) => setNewCounselor({ ...newCounselor, name: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div>
            <label htmlFor="counselorEmail" className="block text-sm font-medium">Counselor's Email</label>
            <input type="email" id="counselorEmail" value={newCounselor.email} onChange={(e) => setNewCounselor({ ...newCounselor, email: e.target.value })} className="mt-1 w-full border rounded-md p-2" required />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsCounselorModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Create & Send Invite</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageConsultanciesPage;