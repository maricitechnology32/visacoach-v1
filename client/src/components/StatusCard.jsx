const StatusCard = ({ status, count }) => {
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )
        };
      case 'Rejected':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )
        };
      case 'Pending':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )
        };
      case 'Withdrawn':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: null
        };
    }
  };

  const details = getStatusDetails(status);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center">
      <div className={`rounded-xl p-3 mr-4 ${details.bgColor} ${details.textColor}`}>
        {details.icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
};

export default StatusCard;