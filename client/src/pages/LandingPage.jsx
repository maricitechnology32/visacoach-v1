// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { getApprovedReviews } from '../services/reviewService';
// // import { FiCheckCircle, FiCompass, FiMessageSquare, FiStar } from 'react-icons/fi';

// // const LandingPage = () => {
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchReviews = async () => {
// //       try {
// //         const approvedReviews = await getApprovedReviews();
// //         setReviews(approvedReviews);
// //       } catch (error) {
// //         console.error("Failed to fetch reviews:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchReviews();
// //   }, []);

// //   return (
// //     <div className="bg-white">
// //       {/* Header */}
// //       <header className="absolute inset-x-0 top-0 z-50">
// //         <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
// //           <div className="flex lg:flex-1">
// //             <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-gray-900">
// //               Visa<span className="text-green-600">Coach</span>
// //             </Link>
// //           </div>
// //           <div className="lg:flex lg:flex-1 lg:justify-end">
// //             <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
// //               Log in <span aria-hidden="true">&rarr;</span>
// //             </Link>
// //           </div>
// //         </nav>
// //       </header>

// //       {/* Hero Section */}
// //       <div className="relative isolate px-6 pt-14 lg:px-8">
// //         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
// //               Navigate Your Visa Journey with Confidence
// //             </h1>
// //             <p className="mt-6 text-lg leading-8 text-gray-600">
// //               From personalized checklists and AI-powered SOP reviews to mock interviews, VisaCoach is the ultimate platform for students and consultancies.
// //             </p>
// //             <div className="mt-10 flex items-center justify-center gap-x-6">
// //               <Link to="/login" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
// //                 Get started
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Features Section */}
// //       <div className="bg-gray-50 py-24 sm:py-32">
// //         <div className="mx-auto max-w-7xl px-6 lg:px-8">
// //           <div className="mx-auto max-w-2xl lg:text-center">
// //             <h2 className="text-base font-semibold leading-7 text-green-600">Everything You Need</h2>
// //             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A smarter way to prepare for your visa</p>
// //           </div>
// //           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
// //             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
// //               <div className="relative pl-16">
// //                 <dt className="text-base font-semibold leading-7 text-gray-900">
// //                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
// //                     <FiCheckCircle className="h-6 w-6 text-white" />
// //                   </div>
// //                   Dynamic Checklists
// //                 </dt>
// //                 <dd className="mt-2 text-base leading-7 text-gray-600">Get a personalized, step-by-step journey for your specific visa type, ensuring you never miss a critical deadline.</dd>
// //               </div>
// //               <div className="relative pl-16">
// //                 <dt className="text-base font-semibold leading-7 text-gray-900">
// //                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
// //                     <FiCompass className="h-6 w-6 text-white" />
// //                   </div>
// //                   AI-Powered Assistants
// //                 </dt>
// //                 <dd className="mt-2 text-base leading-7 text-gray-600">From writing and reviewing your SOP to practicing with a realistic AI visa officer, get an unfair advantage.</dd>
// //               </div>
// //               <div className="relative pl-16">
// //                 <dt className="text-base font-semibold leading-7 text-gray-900">
// //                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
// //                     <FiMessageSquare className="h-6 w-6 text-white" />
// //                   </div>
// //                   Counselor Collaboration
// //                 </dt>
// //                 <dd className="mt-2 text-base leading-7 text-gray-600">Work directly with your educational consultancy, get documents approved, and receive real-time feedback and notices.</dd>
// //               </div>
// //             </dl>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Reviews Section */}
// //       <div className="bg-white py-24 sm:py-32">
// //         <div className="mx-auto max-w-7xl px-6 lg:px-8">
// //           <div className="mx-auto max-w-2xl text-center">
// //             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Students Say</h2>
// //             <p className="mt-6 text-lg leading-8 text-gray-600">Real stories from students who successfully navigated their visa process with VisaCoach.</p>
// //           </div>
// //           <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
// //             {reviews.map(review => (
// //               <div key={review._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-100">
// //                 <div className="p-6 flex-1">
// //                   <div className="flex items-center mb-2">
// //                     <p className="font-semibold text-gray-900 text-lg mr-3">{review.student.name}</p>
// //                     <div className="flex">
// //                       {[...Array(5)].map((_, i) => (
// //                         <FiStar
// //                           key={i}
// //                           className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
// //                           fill={i < review.rating ? 'currentColor' : 'none'}
// //                         />
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <p className="italic text-gray-600 text-base">"{review.comment}"</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           {reviews.length === 0 && !loading && (
// //             <p className="text-center text-gray-500 mt-8">No reviews to display yet.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { getApprovedReviews } from '../services/reviewService';
// import { FiCheckCircle, FiCompass, FiMessageSquare, FiStar } from 'react-icons/fi';

// const LandingPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const approvedReviews = await getApprovedReviews();
//         setReviews(approvedReviews);
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <header className="absolute inset-x-0 top-0 z-50">
//         <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
//           <div className="flex lg:flex-1">
//             <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-gray-900">
//               Visa<span className="text-green-600">Coach</span>
//             </Link>
//           </div>
//           <div className="lg:flex lg:flex-1 lg:justify-end">
//             <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
//               Log in <span aria-hidden="true">&rarr;</span>
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <div className="relative isolate px-6 pt-14 lg:px-8">
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//               Navigate Your Visa Journey with Confidence
//             </h1>
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               From personalized checklists and AI-powered SOP reviews to mock interviews, VisaCoach is the ultimate platform for students and consultancies.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link to="/login" className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
//                 Get started
//               </Link>
//               {user && user.role === 'student' && (
//                 <Link to="/leave-a-review" className="text-sm font-semibold leading-6 text-gray-900">
//                   Leave a review <span aria-hidden="true">&rarr;</span>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-gray-50 py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:text-center">
//             <h2 className="text-base font-semibold leading-7 text-green-600">Everything You Need</h2>
//             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A smarter way to prepare for your visa</p>
//           </div>
//           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
//             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
//                     <FiCheckCircle className="h-6 w-6 text-white" />
//                   </div>
//                   Dynamic Checklists
//                 </dt>
//                 <dd className="mt-2 text-base leading-7 text-gray-600">Get a personalized, step-by-step journey for your specific visa type, ensuring you never miss a critical deadline.</dd>
//               </div>
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
//                     <FiCompass className="h-6 w-6 text-white" />
//                   </div>
//                   AI-Powered Assistants
//                 </dt>
//                 <dd className="mt-2 text-base leading-7 text-gray-600">From writing and reviewing your SOP to practicing with a realistic AI visa officer, get an unfair advantage.</dd>
//               </div>
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
//                     <FiMessageSquare className="h-6 w-6 text-white" />
//                   </div>
//                   Counselor Collaboration
//                 </dt>
//                 <dd className="mt-2 text-base leading-7 text-gray-600">Work directly with your educational consultancy, get documents approved, and receive real-time feedback and notices.</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="bg-white py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Students Say</h2>
//             <p className="mt-6 text-lg leading-8 text-gray-600">Real stories from students who successfully navigated their visa process with VisaCoach.</p>
//           </div>
//           <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
//             {reviews.map(review => (
//               <div key={review._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-100">
//                 <div className="p-6 flex-1">
//                   <div className="flex items-center mb-2">
//                     <p className="font-semibold text-gray-900 text-lg mr-3">{review.student.name}</p>
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FiStar
//                           key={i}
//                           className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                           fill={i < review.rating ? 'currentColor' : 'none'}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <p className="italic text-gray-600 text-base">"{review.comment}"</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {reviews.length === 0 && !loading && (
//             <p className="text-center text-gray-500 mt-8">No reviews to display yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApprovedReviews } from '../services/reviewService';
import {
  FiCheckCircle,
  FiCompass,
  FiMessageSquare,
  FiStar,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiGlobe,
  FiAward,
  FiBookOpen,
  FiVideo,
  FiFileText,
  FiCalendar,
  FiHeadphones
} from 'react-icons/fi';

const LandingPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const { user } = useAuth();

  const features = [
    {
      icon: <FiCheckCircle className="h-8 w-8" />,
      title: "Dynamic Checklists",
      description: "Get a personalized, step-by-step journey for your specific visa type, ensuring you never miss a critical deadline.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiCompass className="h-8 w-8" />,
      title: "AI-Powered Assistants",
      description: "From writing and reviewing your SOP to practicing with a realistic AI visa officer, get an unfair advantage.",
      color: "from-green-500 to-pink-500"
    },
    {
      icon: <FiMessageSquare className="h-8 w-8" />,
      title: "Counselor Collaboration",
      description: "Work directly with your educational consultancy, get documents approved, and receive real-time feedback and notices.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { icon: <FiUsers className="h-6 w-6" />, value: "10,000+", label: "Students Helped" },
    { icon: <FiTrendingUp className="h-6 w-6" />, value: "98%", label: "Success Rate" },
    { icon: <FiGlobe className="h-6 w-6" />, value: "25+", label: "Countries Supported" },
    { icon: <FiAward className="h-6 w-6" />, value: "50+", label: "Expert Counselors" }
  ];

  const steps = [
    { icon: <FiBookOpen className="h-6 w-6" />, title: "Sign Up & Profile", description: "Create your account and complete your profile" },
    { icon: <FiFileText className="h-6 w-6" />, title: "Document Preparation", description: "Get help with SOPs and required documents" },
    { icon: <FiVideo className="h-6 w-6" />, title: "Mock Interview", description: "Practice with AI-powered visa officer simulation" },
    { icon: <FiCalendar className="h-6 w-6" />, title: "Schedule Appointment", description: "Get guidance on booking your visa appointment" }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const approvedReviews = await getApprovedReviews();
        setReviews(approvedReviews.slice(0, 6)); // Show only 6 reviews
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg flex items-center justify-center mr-2">
                <FiCompass className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Visa<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">Coach</span>
              </span>
            </Link>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-200 flex items-center group"
            >
              Log in
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-100 to-green-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Navigate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">Visa Journey</span> with Confidence
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              From personalized checklists and AI-powered SOP reviews to mock interviews, VisaCoach is the ultimate platform for students and consultancies to streamline the visa application process.
            </p>
            <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
              <Link
                to="/login"
                className="rounded-full bg-gradient-to-r from-green-600 to-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center group"
              >
                Get Started Free
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              {user && user.role === 'student' && (
                <Link
                  to="/leave-a-review"
                  className="rounded-full border border-green-600 px-8 py-4 text-lg font-semibold text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center group"
                >
                  Leave a Review
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-green-100 to-green-100 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-green-100 rounded-full text-green-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Simple Process</h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Visa Journey in 4 Easy Steps
            </h3>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300 group"
                >
                  <div className="flex justify-center">
                    <div className="p-4 bg-green-100 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-lg font-semibold text-gray-900">{step.title}</div>
                    <div className="text-sm text-gray-600 mt-2">{step.description}</div>
                  </div>
                  <div className="mt-4 text-xs font-medium text-green-600">Step {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Everything You Need</h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A smarter way to prepare for your visa
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our comprehensive platform provides all the tools you need for a successful visa application.
            </p>
          </div>

          {/* Interactive Features */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Feature Content */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${features[activeFeature].color} w-14 h-14 flex items-center justify-center text-white mb-6`}>
                    {features[activeFeature].icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {features[activeFeature].title}
                  </h4>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                  <div className="flex space-x-2 mt-8">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeFeature
                            ? 'bg-green-600 w-8'
                            : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 h-full flex items-center justify-center">
                  <div className="relative w-full h-64">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-600/10 rounded-xl"></div>
                    <div className="absolute top-8 left-8 w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <FiCheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <div className="absolute bottom-8 right-8 w-40 h-40 bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <FiCompass className="h-16 w-16 text-green-600" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <FiMessageSquare className="h-10 w-10 text-cyan-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Testimonials</h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Students Say
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Real stories from students who successfully navigated their visa process with VisaCoach.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-100 rounded-full flex items-center justify-center mr-4">
                      <FiHeadphones className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{review.student.name}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed italic">"{review.comment}"</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-50 px-8 py-4 border-t border-gray-100">
                  <div className="text-sm text-green-600 font-medium">Successful Visa Approval</div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-2xl p-12">
                <FiStar className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h4>
                <p className="text-gray-600">Be the first to share your experience!</p>
              </div>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/reviews"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
              >
                View all reviews
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-600 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your visa journey?
            </h2>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Join thousands of students who have successfully navigated their visa process with VisaCoach.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center group"
              >
                Get Started Free
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg flex items-center justify-center mr-2">
                <FiCompass className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Visa<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-400">Coach</span>
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 VisaCoach. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;