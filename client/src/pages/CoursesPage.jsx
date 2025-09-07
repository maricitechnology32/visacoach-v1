

// // client/src/pages/CoursesPage.jsx
// import { useState, useEffect } from 'react';
// import { getAllCourses } from '../services/courseService';
// import { Link } from 'react-router-dom';

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const courseData = await getAllCourses();
//         setCourses(courseData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching courses.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) return <div>Loading courses...</div>;
//   if (error) return <div className="text-red-600">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-green-600 mb-6">Available Courses</h1>
//       {courses.length > 0 ? (
//         <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {courses.map((course) => (
//             <Link
//               to={`/courses/${course._id}`}
//               key={course._id}
//               className="block border-2 border-green-300 rounded-sm   transition-shadow duration-300 overflow-hidden"
//             >
//               <img
//                 src={
//                   course.thumbnail
//                     ? `http://localhost:5001${course.thumbnail}`
//                     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3S9FqOWEjqGZPQ98L55jzxu9OXbJqwXx_Gw&s'
//                 }
//                 alt={`${course.title} thumbnail`}
//                 className="w-full p-4 rounded-sm    h-48 object-fit"
//               />

//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//                 <p className="mt-2 text-sm text-gray-600 line-clamp-3">
//                   {course.description || 'No description available.'}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No courses are available yet.</p>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;
// client/src/pages/CoursesPage.jsx
import { useState, useEffect } from 'react';
import { getAllCourses } from '../services/courseService';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getAllCourses();
        setCourses(courseData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Skeleton loader component
  const CourseSkeleton = () => (
    <div className="bg-white rounded-sm   overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-800">Error loading courses</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-sm text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive curriculum designed to help you achieve your learning goals
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <CourseSkeleton key={index} />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              to={`/courses/${course._id}`}
              key={course._id}
              className="group bg-white rounded-sm   overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    course.thumbnail
                      ? `http://localhost:5001${course.thumbnail}`
                      : 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                  }
                  alt={`${course.title} thumbnail`}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {course.description || 'No description available.'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration || 'Self-paced'}
                  </span>
                  <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-700 transition-colors duration-300">
                    View Course
                    <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No courses available</h3>
          <p className="mt-2 text-gray-500">Check back later for new course offerings.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
