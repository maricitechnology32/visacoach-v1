// import { useState } from 'react';
// import Vapi from '@vapi-ai/web';
// import { startInterview } from '../services/interviewService';

// const InterviewPage = () => {
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [transcript, setTranscript] = useState([]);
//   const [error, setError] = useState('');

//   // Initialize Vapi with your Public Key from the Vapi dashboard
//   const vapi = new Vapi('9b3c871a-e73c-4186-af31-292c21731a32');

//   const beginInterview = async () => {
//     setError('');
//     try {
//       console.log("Interview Started")
//       const vapiConfig = await startInterview();

//       vapi.start(vapiConfig);

//       vapi.on('call-start', () => {
//         setIsSessionActive(true);
//         setTranscript([]);
//       });

//       vapi.on('message', (message) => {
//         if (message.type === 'transcript') {
//           setTranscript(prev => [...prev, { speaker: message.role, text: message.transcript }]);
//         }
//       });

//       vapi.on('call-end', () => {
//         setIsSessionActive(false);
//         // Here you would navigate to the results page
//       });

//     } catch (err) {
//       setError(err.message || 'Failed to start the interview session.');
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Mock Interview Hub</h1>

//       {!isSessionActive ? (
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-xl font-semibold">Ready to Practice?</h2>
//           <p className="text-gray-600 mt-2">Click the button below to start a new, personalized mock interview session.</p>
//           <button
//             onClick={beginInterview}
//             className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Start New Interview
//           </button>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-center mb-4">Interview in Progress...</h2>
//           <div className="space-y-4 h-96 overflow-y-auto p-4 border rounded-md">
//             {transcript.map((item, index) => (
//               <div key={index} className={`flex ${item.speaker === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//                 <p className={`max-w-xs md:max-w-md p-3 rounded-lg ${item.speaker === 'assistant' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewPage;   
import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { startInterview } from '../services/interviewService';

const InterviewPage = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');
  const vapiRef = useRef(null);

  // Initialize Vapi only once using useEffect and useRef
  useEffect(() => {
    vapiRef.current = new Vapi("9eff32e1-04fe-4680-b2df-f767d3fa90fc");

    // Define event listeners here
    vapiRef.current.on("call-start", () => {
      console.log("Interview session started ✅");
      setIsSessionActive(true);
      setTranscript([]);
    });

    vapiRef.current.on("message", (message) => {
      if (message.type === "transcript" && message.transcript) {
        setTranscript(prev => [...prev, { speaker: message.role, text: message.transcript }]);
      }
    });

    vapiRef.current.on("call-end", () => {
      console.log("Interview ended ❌");
      setIsSessionActive(false);
      // In a real app, you would navigate to a results page here
    });

    // Cleanup function to stop Vapi when the component unmounts
    return () => {
      vapiRef.current?.stop();
    };
  }, []); // Empty dependency array ensures this runs only once

  const beginInterview = async () => {
    setError('');
    try {
      const vapiConfig = await startInterview();
      vapiRef.current.start(vapiConfig);
    } catch (err) {
      setError(err.message || 'Failed to start the interview session.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mock Interview Hub</h1>

      {!isSessionActive ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Ready to Practice?</h2>
          <p className="text-gray-600 mt-2">Click the button below to start a new, personalized mock interview session.</p>
          <button
            onClick={beginInterview}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start New Interview
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Interview in Progress...</h2>
          <div className="space-y-4 h-96 overflow-y-auto p-4 border rounded-md">
            {transcript.map((item, index) => (
              <div key={index} className={`flex ${item.speaker === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <p className={`max-w-xs md:max-w-md p-3 rounded-lg ${item.speaker === 'assistant' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;