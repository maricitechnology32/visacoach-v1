

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getCourseById } from '../services/courseService';

// const CourseDetailPage = () => {
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { courseId } = useParams();

//   useEffect(() => {
//     const fetchCourse = async () => {
//       if (!courseId) return;
//       try {
//         const courseData = await getCourseById(courseId);
//         setCourse(courseData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching course.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-red-600 text-xl font-medium mb-6">Error: {error}</div>
//       <button
//         onClick={() => window.location.reload()}
//         className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
//       >
//         Try Again
//       </button>
//     </div>
//   );

//   if (!course) return (
//     <div className="text-center text-gray-600 text-lg font-medium min-h-screen flex items-center justify-center">
//       Course not found.
//     </div>
//   );

//   // Data URL for a simple gray placeholder with text
//   const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3EThumbnail Not Available%3C/text%3E%3C/svg%3E';

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Course Header with Thumbnail */}
//         <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 mb-8">
//           {course.thumbnail ? (
//             <img
//               src={
//                 course.thumbnail
//                   ? `http://localhost:5001${course.thumbnail}`
//                   : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3S9FqOWEjqGZPQ98L55jzxu9OXbJqwXx_Gw&s'
//               }
//               alt={`${course.title} thumbnail`}
//               className="w-full h-48 object-fit p-2"
//             />

//           ) : (
//             <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
//               <img src={fallbackImage} alt="Placeholder" className="w-full h-full object-cover rounded-lg" />
//             </div>
//           )}
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{course.title}</h1>
//           <p className="mt-2 text-gray-700 text-lg leading-relaxed">{course.description}</p>
//           <p className="mt-4 text-sm text-gray-500">
//             Created by: <span className="font-semibold text-gray-700">{course.createdBy?.name || 'Admin'}</span>
//           </p>
//         </div>

//         {/* Course Curriculum */}
//         <div className="space-y-6">
//           {course.modules?.length > 0 ? (
//             course.modules.map((module, index) => (
//               <div key={module.title + index} className="bg-white rounded-xl shadow-lg p-8">
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//                   Module {index + 1}: {module.title}
//                 </h2>
//                 {module.lessons?.length > 0 ? (
//                   <ul className="space-y-3">
//                     {module.lessons.map((lesson, lessonIndex) => (
//                       <li key={lesson._id}>
//                         <Link
//                           to={`/lessons/${lesson._id}`}
//                           state={{ courseId: course._id }}
//                           className="flex items-center p-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
//                         >
//                           <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
//                             {lessonIndex + 1}
//                           </span>
//                           <span className="ml-4 font-medium text-gray-800 text-lg">{lesson.title}</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500 text-lg">No lessons in this module yet.</p>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg p-8 text-gray-500 text-lg">
//               No modules have been added to this course yet.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailPage;


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../services/courseService';

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching course.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading course content...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
        <Link
          to="/courses"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );

  // Data URL for a simple gray placeholder with text
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3EThumbnail Not Available%3C/text%3E%3C/svg%3E';

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Header with Thumbnail */}
        <div className="bg-white rounded-sm    overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="relative h-64 sm:h-80">
            {course.thumbnail ? (
              <img
                src={`http://localhost:5001${course.thumbnail}`}
                alt={`${course.title} thumbnail`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            ) : (
              <img src={fallbackImage} alt="Course thumbnail" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{course.title}</h1>
                <p className="text-lg opacity-90 line-clamp-2">{course.description}</p>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-2">
                    {course.createdBy?.name ? course.createdBy.name.charAt(0) : 'A'}
                  </div>
                  <span className="text-sm font-medium">By {course.createdBy?.name || 'Admin'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Curriculum */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Course Curriculum
        </h2>

        <div className="space-y-6">
          {course.modules?.length > 0 ? (
            course.modules.map((module, index) => (
              <div key={module.title + index} className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                </div>

                {module.lessons?.length > 0 ? (
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lesson._id}>
                        <Link
                          to={`/lessons/${lesson._id}`}
                          state={{ courseId: course._id }}
                          className="flex items-center p-4 rounded-lg hover:bg-green-50 transition-all duration-200 border border-gray-100 hover:border-green-200 group"
                        >
                          <span className="flex-shrink-0 w-8 h-8 bg-white border border-green-200 text-green-600 rounded-full flex items-center justify-center font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                            {lessonIndex + 1}
                          </span>
                          <span className="ml-4 font-medium text-gray-800 group-hover:text-green-700 transition-colors">{lesson.title}</span>
                          <svg className="ml-auto w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500">No lessons in this module yet.</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No modules yet</h3>
              <p className="text-gray-500">This course doesn't have any modules added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
