// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getCourseById, addLessonToCourse } from '../services/courseService';
// import Modal from '../components/Modal';

// const CourseEditorPage = () => {
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // State for the new lesson form
//   const [newLesson, setNewLesson] = useState({ moduleTitle: '', title: '', content: '', videoUrl: '' });
//   const [resourceFile, setResourceFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { courseId } = useParams();

//   const fetchCourse = async () => {
//     try {
//       setLoading(true);
//       const courseData = await getCourseById(courseId);
//       setCourse(courseData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, [courseId]);

//   const handleAddLesson = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');
//     try {
//       const updatedCourse = await addLessonToCourse(courseId, newLesson, resourceFile);
//       setCourse(updatedCourse);
//       setIsModalOpen(false);
//       // Reset form states
//       setNewLesson({ moduleTitle: '', title: '', content: '', videoUrl: '' });
//       setResourceFile(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading course...</div>;
//   if (error) return <div className="text-red-600 p-8">Error: {error}</div>;

//   return (
//     <div>
//       <Link to="/manage-courses" className="text-green-600 hover:underline mb-4 inline-block">&larr; Back to All Courses</Link>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">{course?.title}</h1>
//           <p className="text-gray-500">Course Content</p>
//         </div>
//         <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//           + Add Lesson
//         </button>
//       </div>

//       {/* Modules and Lessons List */}
//       <div className="space-y-6">
//         {course?.modules?.map((module, index) => (
//           <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-700">Module: {module.title}</h2>
//             <ul className="mt-4 list-disc list-inside space-y-2">
//               {module.lessons.map(lesson => (
//                 <li key={lesson._id} className="text-gray-600">
//                   <Link to={`/lessons/${lesson._id}`} state={{ courseId: course._id }} className="font-medium text-gray-800 hover:text-green-600">
//                     {lesson.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Add Lesson Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lesson">
//         <form onSubmit={handleAddLesson} className="space-y-4">
//           <div>
//             <label htmlFor="moduleTitle" className="block text-sm font-medium">Module Title</label>
//             <input type="text" id="moduleTitle" value={newLesson.moduleTitle} onChange={(e) => setNewLesson({ ...newLesson, moduleTitle: e.target.value })} className="mt-1 w-full border p-2 rounded-md" placeholder="Enter existing or new module title" required />
//           </div>
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium">Lesson Title</label>
//             <input type="text" id="title" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} className="mt-1 w-full border p-2 rounded-md" required />
//           </div>
//           <div>
//             <label htmlFor="videoUrl" className="block text-sm font-medium">Video URL (Optional)</label>
//             <input type="text" id="videoUrl" value={newLesson.videoUrl} onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })} className="mt-1 w-full border p-2 rounded-md" />
//           </div>
//           <div>
//             <label htmlFor="content" className="block text-sm font-medium">Lesson Content (Text)</label>
//             <textarea id="content" value={newLesson.content} onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} rows="4" className="mt-1 w-full border p-2 rounded-md" />
//           </div>
//           <div>
//             <label htmlFor="resourceFile" className="block text-sm font-medium">Attach Resource File (Optional)</label>
//             <input
//               type="file"
//               id="resourceFile"
//               onChange={(e) => setResourceFile(e.target.files[0])}
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//             />
//           </div>
//           <div className="flex justify-end gap-2 pt-4">
//             <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
//             <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-green-400">
//               {isSubmitting ? 'Adding...' : 'Add Lesson'}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default CourseEditorPage;


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, addLessonToCourse } from '../services/courseService';
import Modal from '../components/Modal';

const CourseEditorPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for the new lesson form
  const [newLesson, setNewLesson] = useState({ moduleTitle: '', title: '', content: '', videoUrl: '' });
  const [resourceFile, setResourceFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { courseId } = useParams();

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const courseData = await getCourseById(courseId);
      setCourse(courseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const updatedCourse = await addLessonToCourse(courseId, newLesson, resourceFile);
      setCourse(updatedCourse);
      setIsModalOpen(false);
      // Reset form states
      setNewLesson({ moduleTitle: '', title: '', content: '', videoUrl: '' });
      setResourceFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading course content...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-red-600 text-lg font-medium mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/manage-courses" className="text-green-600 hover:underline mb-4 inline-block flex items-center">
         
          Back to All Courses
          {/* <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg> */}
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{course?.title}</h1>
            <p className="text-gray-500 mt-1">Course Content</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Lesson
          </button>
        </div>

        {/* Modules and Lessons List */}
        <div className="space-y-4 sm:space-y-6">
          {course?.modules?.length > 0 ? (
            course.modules.map((module, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">
                  <span className="text-green-600 mr-2">Module {index + 1}:</span>
                  {module.title}
                </h2>
                {module.lessons.length > 0 ? (
                  <ul className="space-y-2 sm:space-y-3">
                    {module.lessons.map(lesson => (
                      <li key={lesson._id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors">
                        <Link
                          to={`/lessons/${lesson._id}`}
                          state={{ courseId: course._id }}
                          className="font-medium text-gray-800 hover:text-green-600 flex items-center justify-between"
                        >
                          <span className="truncate">{lesson.title}</span>
                          <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-4">No lessons in this module yet.</p>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No modules yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first lesson</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Your First Lesson
              </button>
            </div>
          )}
        </div>

        {/* Add Lesson Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lesson">
          <form onSubmit={handleAddLesson} className="space-y-4">
            <div>
              <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
              <input
                type="text"
                id="moduleTitle"
                value={newLesson.moduleTitle}
                onChange={(e) => setNewLesson({ ...newLesson, moduleTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter existing or new module title"
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
              <input
                type="text"
                id="title"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">Video URL (Optional)</label>
              <input
                type="text"
                id="videoUrl"
                value={newLesson.videoUrl}
                onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Lesson Content (Text)</label>
              <textarea
                id="content"
                value={newLesson.content}
                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter lesson content here..."
              />
            </div>
            <div>
              <label htmlFor="resourceFile" className="block text-sm font-medium text-gray-700 mb-1">Attach Resource File (Optional)</label>
              <div className="mt-1 flex justify-center px-4 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center flex-wrap">
                    <label htmlFor="resourceFile" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        id="resourceFile"
                        type="file"
                        onChange={(e) => setResourceFile(e.target.files[0])}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, PPT up to 10MB</p>
                </div>
              </div>
              {resourceFile && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Selected: {resourceFile.name}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : 'Add Lesson'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CourseEditorPage;