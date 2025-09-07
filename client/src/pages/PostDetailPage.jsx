/* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
// // // // client/src/pages/PostDetailPage.jsx
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { getPostById, addCommentToPost } from '../services/forumService';
// // // import { useAuth } from '../context/AuthContext';
// // // import HTMLFlipBook from 'react-pageflip';
// // // import {
// // //   Comment as CommentIcon,
// // //   Person as PersonIcon,
// // //   Schedule as TimeIcon,
// // //   Send as SendIcon,
// // //   ArrowBack as ArrowBackIcon,
// // //   NavigateBefore as PrevIcon,
// // //   NavigateNext as NextIcon,
// // //   MenuBook as BookIcon,
// // //   FirstPage as FirstPageIcon,
// // //   LastPage as LastPageIcon,
// // //   Visibility as ReadIcon
// // // } from '@mui/icons-material';

// // // const PostDetailPage = () => {
// // //   const [post, setPost] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [newComment, setNewComment] = useState('');
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [currentPage, setCurrentPage] = useState(0);
// // //   const [isBookOpen, setIsBookOpen] = useState(false);
// // //   const { postId } = useParams();
// // //   const { user } = useAuth();
// // //   const flipBook = useRef();

// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       if (!postId) return;
// // //       try {
// // //         const postData = await getPostById(postId);
// // //         setPost(postData);
// // //         // Trigger book opening animation after a short delay
// // //         setTimeout(() => setIsBookOpen(true), 500);
// // //       } catch (err) {
// // //         setError(err.message || 'An error occurred while fetching the post.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchPost();
// // //   }, [postId]);

// // //   const handleCommentSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!newComment.trim()) return;

// // //     setIsSubmitting(true);
// // //     try {
// // //       const addedComment = await addCommentToPost(postId, newComment);
// // //       setPost(prevPost => ({
// // //         ...prevPost,
// // //         comments: [...prevPost.comments, addedComment]
// // //       }));
// // //       setNewComment('');
// // //     } catch (err) {
// // //       setError('Failed to post comment. Please try again.');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // Enhanced text formatting function with better spacing
// // //   const formatPlainText = (text) => {
// // //     if (!text) return '';

// // //     // Split text into paragraphs and preserve formatting
// // //     return text
// // //       .split('\n')
// // //       .map((paragraph, index) => {
// // //         const trimmed = paragraph.trim();

// // //         // Skip empty paragraphs but preserve minimal spacing
// // //         if (!trimmed) {
// // //           return <div key={index} className="h-2"></div>;
// // //         }

// // //         // Check if it's a header (starts with # or is in ALL CAPS and short)
// // //         if (trimmed.startsWith('#')) {
// // //           const level = trimmed.match(/^#+/)[0].length;
// // //           const text = trimmed.replace(/^#+\s*/, '');
// // //           const HeaderTag = `h${Math.min(level, 6)}`;

// // //           return React.createElement(HeaderTag, {
// // //             key: index,
// // //             className: `font-bold mb-3 mt-4 text-green-800 ${level === 1 ? 'text-2xl' :
// // //                 level === 2 ? 'text-xl' :
// // //                   level === 3 ? 'text-lg' : 'text-base'
// // //               }`
// // //           }, text);
// // //         }

// // //         // Check if it's a potential header (short line in caps)
// // //         if (trimmed.length < 80 && trimmed === trimmed.toUpperCase() && /^[A-Z\s\d\-:]+$/.test(trimmed)) {
// // //           return (
// // //             <h3 key={index} className="font-bold text-lg mb-3 mt-4 text-green-800">
// // //               {trimmed}
// // //             </h3>
// // //           );
// // //         }

// // //         // Check if it's a list item
// // //         if (trimmed.match(/^[-*•]\s+/) || trimmed.match(/^\d+\.\s+/)) {
// // //           return (
// // //             <div key={index} className="ml-4 mb-2 flex">
// // //               <span className="mr-2 flex-shrink-0 text-green-600">
// // //                 {trimmed.match(/^\d+\.\s+/) ? trimmed.match(/^\d+\./)[0] : '•'}
// // //               </span>
// // //               <span className="flex-1">
// // //                 {trimmed.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '')}
// // //               </span>
// // //             </div>
// // //           );
// // //         }

// // //         // Regular paragraph with enhanced formatting
// // //         let formattedText = trimmed;

// // //         // Handle bold text **text** or __text__
// // //         formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
// // //         formattedText = formattedText.replace(/__(.*?)__/g, '<strong>$1</strong>');

// // //         // Handle italic text *text* or _text_
// // //         formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
// // //         formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');

// // //         // Handle inline code `text`
// // //         formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');

// // //         return (
// // //           <p
// // //             key={index}
// // //             className="mb-4 text-justify leading-relaxed text-gray-800"
// // //             dangerouslySetInnerHTML={{ __html: formattedText }}
// // //           />
// // //         );
// // //       });
// // //   };

// // //   // Function to split content into pages with better text handling
// // //   const splitIntoPages = (textContent, linesPerPage = 30) => {
// // //     if (!textContent) return [];

// // //     const lines = textContent.split('\n');
// // //     const pages = [];
// // //     let currentPage = [];
// // //     let currentLineCount = 0;

// // //     for (let i = 0; i < lines.length; i++) {
// // //       const line = lines[i];
// // //       const isHeader = line.trim().startsWith('#') ||
// // //         (line.trim().length < 80 && line.trim() === line.trim().toUpperCase() && /^[A-Z\s\d\-:]+$/.test(line.trim()));

// // //       // If adding this line would exceed the page limit, or if it's a header and we have content
// // //       if ((currentLineCount >= linesPerPage) ||
// // //         (isHeader && currentPage.length > 0 && currentLineCount > linesPerPage * 0.7)) {
// // //         pages.push(currentPage.join('\n'));
// // //         currentPage = [];
// // //         currentLineCount = 0;
// // //       }

// // //       currentPage.push(line);

// // //       // Count lines more accurately based on content
// // //       if (line.trim() === '') {
// // //         currentLineCount += 0.3; // Reduced empty line weight
// // //       } else if (isHeader) {
// // //         currentLineCount += 1.5; // Reduced header weight
// // //       } else {
// // //         // Estimate lines based on content length (assuming ~80 chars per line)
// // //         const estimatedLines = Math.max(1, Math.ceil(line.length / 80));
// // //         currentLineCount += estimatedLines;
// // //       }
// // //     }

// // //     // Add the last page if it has content
// // //     if (currentPage.length > 0) {
// // //       pages.push(currentPage.join('\n'));
// // //     }

// // //     return pages;
// // //   };

// // //   const pages = post ? splitIntoPages(post.content) : [];
// // //   const totalPages = pages.length;

// // //   const nextButtonClick = () => {
// // //     if (flipBook.current) {
// // //       flipBook.current.pageFlip().flipNext();
// // //     }
// // //   };

// // //   const prevButtonClick = () => {
// // //     if (flipBook.current) {
// // //       flipBook.current.pageFlip().flipPrev();
// // //     }
// // //   };

// // //   const onPageChange = (e) => {
// // //     setCurrentPage(e.data);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-screen bg-white">
// // //         <div className="text-center">
// // //           <div className="relative mb-8">
// // //             <BookIcon className="text-8xl text-green-700 animate-pulse" />
// // //           </div>
// // //           <div className="relative">
// // //             <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin mx-auto"></div>
// // //           </div>
// // //           <p className="mt-6 text-green-700 text-xl font-medium animate-pulse">
// // //             Preparing your reading experience...
// // //           </p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="max-w-2xl mx-auto py-8 px-4 min-h-screen bg-white flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="bg-green-50 text-green-800 px-6 py-4 rounded-lg mb-6">
// // //             <div className="text-4xl mb-2">📚</div>
// // //             <p className="font-medium">{error}</p>
// // //           </div>
// // //           <Link
// // //             to="/forum"
// // //             className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
// // //           >
// // //             <ArrowBackIcon className="mr-2" />
// // //             Return to Library
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!post) {
// // //     return (
// // //       <div className="max-w-2xl mx-auto py-8 px-4 text-center min-h-screen bg-white flex items-center justify-center">
// // //         <div>
// // //           <div className="text-8xl mb-6">📖</div>
// // //           <h2 className="text-3xl font-bold text-green-700 mb-4">Story Not Found</h2>
// // //           <p className="text-gray-600 mb-8 text-lg">
// // //             The tale you seek has wandered off to another realm...
// // //           </p>
// // //           <Link
// // //             to="/forum"
// // //             className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
// // //           >
// // //             <ArrowBackIcon className="mr-2" />
// // //             Discover Other Stories
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Enhanced Front cover component
// // //   const FrontCover = () => (
// // //     <div className="w-full h-full bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 text-white flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
// // //       <div className="relative z-10">
// // //         <div className="animate-float">
// // //           <BookIcon className="text-9xl mb-6" />
// // //         </div>
// // //         <div className="border-t-2 border-b-2 border-white py-6 my-6">
// // //           <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2 leading-tight">
// // //             {post.title}
// // //           </h1>
// // //         </div>
// // //         <div className="space-y-3">
// // //           <p className="text-xl font-light">by</p>
// // //           <p className="text-2xl font-bold tracking-wide">{post.author.name}</p>
// // //         </div>
// // //         <div className="mt-8 flex items-center justify-center bg-white bg-opacity-20 rounded-full px-4 py-2">
// // //           <TimeIcon className="mr-2" />
// // //           <span className="font-medium">
// // //             {new Date(post.createdAt).toLocaleDateString('en-US', {
// // //               year: 'numeric',
// // //               month: 'long',
// // //               day: 'numeric'
// // //             })}
// // //           </span>
// // //         </div>
// // //         <p className="mt-8 text-green-200 italic">
// // //           ✨ Click or drag the corner to begin your journey ✨
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );

// // //   // Enhanced Back cover component
// // //   const BackCover = () => (
// // //     <div className="w-full h-full bg-gradient-to-br from-amber-800 via-amber-700 to-orange-900 text-white flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
// // //       <div className="relative z-10">
// // //         <h2 className="text-3xl font-bold font-serif mb-8 border-b-2 border-white pb-2">
// // //           About the Author
// // //         </h2>
// // //         <div className="w-28 h-28 rounded-full bg-gradient-to-r from-white to-amber-100 mb-6 flex items-center justify-center">
// // //           {post.author.profilePicture ? (
// // //             <img
// // //               src={post.author.profilePicture}
// // //               alt={post.author.name}
// // //               className="w-full h-full rounded-full object-cover"
// // //             />
// // //           ) : (
// // //             <PersonIcon className="text-5xl text-amber-700" />
// // //           )}
// // //         </div>
// // //         <h3 className="text-2xl font-bold mb-4">{post.author.name}</h3>
// // //         <p className="text-amber-100 max-w-md leading-relaxed mb-8">
// // //           A valued member of our VisaCoach community, sharing knowledge and experiences
// // //           to help fellow travelers on their journey.
// // //         </p>
// // //         <div className="space-y-4">
// // //           <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
// // //             <ReadIcon className="mr-2" />
// // //             <span>Thank you for reading!</span>
// // //           </div>
// // //           <Link
// // //             to="/forum"
// // //             className="inline-block px-6 py-3 bg-white text-amber-800 rounded-lg font-bold hover:bg-amber-100 transition-all duration-300"
// // //           >
// // //             📚 Explore More Stories
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   // Enhanced Page component with better text formatting
// // //   const Page = ({ number, content, isEven }) => (
// // //     <div className="w-full h-full bg-gradient-to-r from-amber-50 to-orange-50 p-4">
// // //       <div className="w-full h-full bg-white border border-amber-200 rounded-lg p-6 relative overflow-hidden">
// // //         {/* Page number */}
// // //         <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} text-sm text-amber-600 font-medium`}>
// // //           {number}
// // //         </div>

// // //         {/* Decorative header line */}
// // //         <div className={`absolute top-12 ${isEven ? 'left-6' : 'right-6'} w-12 h-0.5 bg-gradient-to-r from-green-400 to-amber-400`}></div>

// // //         {number === 1 ? (
// // //           <div className="h-full flex flex-col justify-center items-center text-center">
// // //             <div className="animate-fadeIn">
// // //               <h2 className="text-3xl text-green-800 font-serif mb-8 border-b-2 border-green-200 pb-4">
// // //                 Begin Reading
// // //               </h2>
// // //               <div className="space-y-6 max-w-md">
// // //                 <div className="text-6xl">📖</div>
// // //                 <p className="text-lg leading-relaxed font-serif text-gray-700">
// // //                   Welcome to this carefully curated piece of content. Each page has been
// // //                   thoughtfully designed to provide you with an immersive reading experience.
// // //                 </p>
// // //                 <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
// // //                   <p className="text-green-700 font-medium">
// // //                     🌟 Use the navigation controls or simply click and drag to turn pages
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-center text-amber-600 italic">
// // //                   Turn the page to begin your journey...
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="h-full pt-16 pb-8">
// // //             <div className="h-full overflow-y-auto pr-2">
// // //               <div className="text-content animate-fadeIn">
// // //                 {formatPlainText(content)}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Page footer */}
// // //         <div className={`absolute bottom-4 ${isEven ? 'left-6' : 'right-6'} text-xs text-amber-500 font-medium`}>
// // //           VisaCoach Library ✨
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen py-8 bg-white">
// // //       <div className="max-w-7xl mx-auto px-4">
// // //         {/* Enhanced Back Navigation */}
// // //         <div className="mb-8">
// // //           <Link
// // //             to="/forum"
// // //             className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition-all duration-300 bg-white px-4 py-2 rounded-lg"
// // //           >
// // //             <ArrowBackIcon className="mr-2" />
// // //             Return to Library
// // //           </Link>
// // //         </div>

// // //         {/* Enhanced Book with Page Flip Animation */}
// // //         <div className={`flex flex-col items-center mb-12 transition-all duration-1000 ${isBookOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

// // //           {/* Enhanced Navigation Controls */}
// // //           <div className="mb-6 flex flex-wrap justify-center items-center gap-3 bg-white rounded-full px-6 py-3">
// // //             <button
// // //               onClick={() => flipBook.current.pageFlip().flip(0)}
// // //               disabled={currentPage === 0}
// // //               className={`p-3 rounded-full transition-all duration-300 ${currentPage === 0
// // //                 ? 'text-gray-400 cursor-not-allowed'
// // //                 : 'text-green-700 hover:bg-green-100 hover:scale-110 active:scale-95'
// // //                 }`}
// // //               title="First Page"
// // //             >
// // //               <FirstPageIcon className="text-xl" />
// // //             </button>

// // //             <button
// // //               onClick={prevButtonClick}
// // //               disabled={currentPage === 0}
// // //               className={`p-3 rounded-full transition-all duration-300 ${currentPage === 0
// // //                 ? 'text-gray-400 cursor-not-allowed'
// // //                 : 'text-green-700 hover:bg-green-100 hover:scale-110 active:scale-95'
// // //                 }`}
// // //               title="Previous Page"
// // //             >
// // //               <PrevIcon className="text-xl" />
// // //             </button>

// // //             <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
// // //               <span className="text-green-800 font-bold text-sm">
// // //                 Page {currentPage} of {totalPages + 3}
// // //               </span>
// // //             </div>

// // //             <button
// // //               onClick={nextButtonClick}
// // //               disabled={currentPage === totalPages + 2}
// // //               className={`p-3 rounded-full transition-all duration-300 ${currentPage === totalPages + 2
// // //                 ? 'text-gray-400 cursor-not-allowed'
// // //                 : 'text-green-700 hover:bg-green-100 hover:scale-110 active:scale-95'
// // //                 }`}
// // //               title="Next Page"
// // //             >
// // //               <NextIcon className="text-xl" />
// // //             </button>

// // //             <button
// // //               onClick={() => flipBook.current.pageFlip().flip(totalPages + 2)}
// // //               disabled={currentPage === totalPages + 2}
// // //               className={`p-3 rounded-full transition-all duration-300 ${currentPage === totalPages + 2
// // //                 ? 'text-gray-400 cursor-not-allowed'
// // //                 : 'text-green-700 hover:bg-green-100 hover:scale-110 active:scale-95'
// // //                 }`}
// // //               title="Last Page"
// // //             >
// // //               <LastPageIcon className="text-xl" />
// // //             </button>
// // //           </div>

// // //           {/* Enhanced Flip Book - Larger and more readable */}
// // //           <div className="book-container">
// // //             <HTMLFlipBook
// // //               ref={flipBook}
// // //               width={750}
// // //               height={900}
// // //               size="stretch"
// // //               minWidth={500}
// // //               maxWidth={1000}
// // //               minHeight={700}
// // //               maxHeight={1200}
// // //               maxShadowOpacity={0}
// // //               showCover={true}
// // //               mobileScrollSupport={true}
// // //               onFlip={onPageChange}
// // //               className="rounded-lg"
// // //               flippingTime={800}
// // //               usePortrait={true}
// // //               autoSize={true}
// // //               maxAngle={45}
// // //               showPageCorners={true}
// // //               disableFlipByClick={false}
// // //             >
// // //               {/* Front Cover */}
// // //               <div className="demoPage">
// // //                 <FrontCover />
// // //               </div>

// // //               {/* Introduction Page */}
// // //               <div className="demoPage">
// // //                 <Page number={1} isEven={true} />
// // //               </div>

// // //               {/* Content Pages */}
// // //               {pages.map((pageContent, index) => (
// // //                 <div key={index} className="demoPage">
// // //                   <Page
// // //                     number={index + 2}
// // //                     content={pageContent}
// // //                     isEven={(index + 1) % 2 === 0}
// // //                   />
// // //                 </div>
// // //               ))}

// // //               {/* Back Cover */}
// // //               <div className="demoPage">
// // //                 <BackCover />
// // //               </div>
// // //             </HTMLFlipBook>
// // //           </div>
// // //         </div>

// // //         {/* Enhanced Comments Section */}
// // //         <div className="rounded-xl p-8 max-w-4xl mx-auto border border-gray-200 bg-white">
// // //           <div className="text-center mb-8">
// // //             <h2 className="text-3xl font-serif flex items-center justify-center mb-2 text-green-800">
// // //               <CommentIcon className="mr-3 text-4xl" />
// // //               Reader's Discussion
// // //             </h2>
// // //             <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
// // //             <p className="mt-2 text-gray-600">{post.comments.length} thoughtful responses</p>
// // //           </div>

// // //           {post.comments.length === 0 ? (
// // //             <div className="text-center py-12">
// // //               <div className="mb-6">
// // //                 <CommentIcon className="text-6xl text-gray-300" />
// // //               </div>
// // //               <h3 className="text-xl font-medium mb-3 text-gray-600">Start the Conversation</h3>
// // //               <p className="text-gray-500 max-w-md mx-auto">
// // //                 Your thoughts and insights make our community richer. Be the first to share what this post means to you!
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <div className="mb-10 space-y-6">
// // //               {post.comments.map((comment, index) => (
// // //                 <div
// // //                   key={comment._id}
// // //                   className="transform transition-all duration-500 hover:scale-[1.02]"
// // //                   style={{ animationDelay: `${index * 0.1}s` }}
// // //                 >
// // //                   <div className="rounded-xl p-6 border-l-4 border-green-500 bg-gradient-to-r from-gray-50 to-blue-50">
// // //                     <div className="flex items-start space-x-4">
// // //                       <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 overflow-hidden flex-shrink-0">
// // //                         {comment.author.profilePicture ? (
// // //                           <img
// // //                             src={comment.author.profilePicture}
// // //                             alt={comment.author.name}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                         ) : (
// // //                           <div className="w-full h-full flex items-center justify-center">
// // //                             <PersonIcon className="text-white text-xl" />
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                       <div className="flex-1">
// // //                         <div className="flex items-center space-x-3 mb-3">
// // //                           <h4 className="font-bold text-gray-800">{comment.author.name}</h4>
// // //                           <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
// // //                             {new Date(comment.createdAt).toLocaleDateString()}
// // //                           </span>
// // //                         </div>
// // //                         <div className="text-gray-700 leading-relaxed">
// // //                           {formatPlainText(comment.content)}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}

// // //           {/* Enhanced Comment Form */}
// // //           <div className="border-t-2 border-gray-100 pt-8">
// // //             <h3 className="text-2xl font-serif flex items-center mb-6 text-green-700">
// // //               ✍️ Share Your Thoughts
// // //             </h3>

// // //             {user ? (
// // //               <form onSubmit={handleCommentSubmit} className="space-y-4">
// // //                 <div className="relative">
// // //                   <textarea
// // //                     rows="5"
// // //                     value={newComment}
// // //                     onChange={(e) => setNewComment(e.target.value)}
// // //                     placeholder="What are your thoughts on this post? Share your insights, questions, or experiences..."
// // //                     className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 resize-none font-serif leading-relaxed text-gray-700"
// // //                   />
// // //                   <div className="absolute bottom-3 right-3 text-xs text-gray-400">
// // //                     {newComment.length}/1000
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex justify-between items-center">
// // //                   <p className="text-sm text-gray-500">
// // //                     💡 Tip: Use line breaks to separate paragraphs in your comment
// // //                   </p>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={isSubmitting || !newComment.trim()}
// // //                     className={`px-8 py-3 rounded-xl flex items-center font-medium transition-all duration-300 transform ${isSubmitting || !newComment.trim()
// // //                       ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
// // //                       : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:scale-105 active:scale-95'
// // //                       }`}
// // //                   >
// // //                     {isSubmitting ? (
// // //                       <>
// // //                         <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
// // //                         Publishing...
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <SendIcon className="mr-2" />
// // //                         Share Comment
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             ) : (
// // //               <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl text-center">
// // //                 <div className="text-4xl mb-3">🔐</div>
// // //                 <p className="font-medium">Join the conversation!</p>
// // //                 <p className="text-sm text-blue-600 mt-1">Please sign in to share your thoughts and connect with other readers.</p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Custom Styles */}
// // //       <style>
// // //         {`
// // //           @keyframes float {
// // //             0%, 100% { transform: translateY(0px); }
// // //             50% { transform: translateY(-10px); }
// // //           }

// // //           @keyframes fadeIn {
// // //             from { opacity: 0; transform: translateY(20px); }
// // //             to { opacity: 1; transform: translateY(0); }
// // //           }

// // //           .animate-float {
// // //             animation: float 3s ease-in-out infinite;
// // //           }

// // //           .animate-fadeIn {
// // //             animation: fadeIn 1s ease-out;
// // //           }

// // //           .book-container {
// // //             perspective: 1500px;
// // //             transform-style: preserve-3d;
// // //           }

// // //           /* Enhanced text content styling */
// // //           .text-content {
// // //             font-family: 'Georgia', 'Times New Roman', serif;
// // //             line-height: 1.7;
// // //           }

// // //           .text-content p {
// // //             margin-bottom: 1rem;
// // //             text-indent: 1.2rem;
// // //             hyphens: auto;
// // //           }

// // //           .text-content h1, 
// // //           .text-content h2, 
// // //           .text-content h3, 
// // //           .text-content h4, 
// // //           .text-content h5, 
// // //           .text-content h6 {
// // //             margin-top: 1.5rem;
// // //             margin-bottom: 0.8rem;
// // //             font-weight: bold;
// // //             text-indent: 0;
// // //             line-height: 1.3;
// // //           }

// // //           .text-content h1 { 
// // //             font-size: 1.7rem; 
// // //             border-bottom: 2px solid #10b981;
// // //             padding-bottom: 0.4rem;
// // //           }
// // //           .text-content h2 { 
// // //             font-size: 1.5rem; 
// // //             border-bottom: 1px solid #34d399;
// // //             padding-bottom: 0.3rem;
// // //           }
// // //           .text-content h3 { font-size: 1.3rem; }
// // //           .text-content h4 { font-size: 1.1rem; }

// // //           .text-content ul, 
// // //           .text-content ol {
// // //             margin-bottom: 1.2rem;
// // //             padding-left: 1.8rem;
// // //           }

// // //           .text-content li {
// // //             margin-bottom: 0.6rem;
// // //             text-indent: 0;
// // //           }

// // //           .text-content blockquote {
// // //             border-left: 4px solid #10b981;
// // //             padding-left: 1.2rem;
// // //             margin: 1.2rem 0;
// // //             font-style: italic;
// // //             background: linear-gradient(to right, #f0fdf4, transparent);
// // //             padding-top: 0.8rem;
// // //             padding-bottom: 0.8rem;
// // //             border-radius: 0 8px 8px 0;
// // //           }

// // //           .text-content code {
// // //             background: #f3f4f6;
// // //             padding: 0.2rem 0.5rem;
// // //             border-radius: 6px;
// // //             font-family: 'Monaco', 'Menlo', monospace;
// // //             font-size: 0.85rem;
// // //             border: 1px solid #d1d5db;
// // //           }

// // //           .text-content pre {
// // //             background: #1f2937;
// // //             color: #f9fafb;
// // //             padding: 1.2rem;
// // //             border-radius: 12px;
// // //             overflow-x: auto;
// // //             margin: 1.2rem 0;
// // //             border: 1px solid #4b5563;
// // //           }

// // //           .text-content pre code {
// // //             background: none;
// // //             padding: 0;
// // //             border: none;
// // //             color: inherit;
// // //           }

// // //           .text-content a {
// // //             color: #059669;
// // //             text-decoration: none;
// // //             border-bottom: 2px solid transparent;
// // //             transition: border-color 0.3s ease;
// // //           }

// // //           .text-content a:hover {
// // //             border-bottom-color: #10b981;
// // //           }

// // //           .text-content strong {
// // //             font-weight: bold;
// // //           }

// // //           .text-content em {
// // //             font-style: italic;
// // //           }

// // //           /* Enhanced responsive design */
// // //           @media (max-width: 1024px) {
// // //             .book-container {
// // //               transform: scale(0.9);
// // //             }
// // //           }

// // //           @media (max-width: 768px) {
// // //             .text-content {
// // //               font-size: 0.9rem;
// // //               line-height: 1.6;
// // //             }

// // //             .text-content p {
// // //               text-indent: 1rem;
// // //               margin-bottom: 0.9rem;
// // //             }

// // //             .text-content h1 { font-size: 1.4rem; }
// // //             .text-content h2 { font-size: 1.2rem; }
// // //             .text-content h3 { font-size: 1.1rem; }

// // //             .book-container {
// // //               transform: scale(0.8);
// // //             }
// // //           }

// // //           @media (max-width: 640px) {
// // //             .book-container {
// // //               transform: scale(0.7);
// // //             }
// // //           }

// // //           @media (max-width: 480px) {
// // //             .book-container {
// // //               transform: scale(0.6);
// // //             }
// // //           }

// // //           /* Print-like styling for better readability */
// // //           .text-content {
// // //             text-rendering: optimizeLegibility;
// // //             -webkit-font-smoothing: antialiased;
// // //             -moz-osx-font-smoothing: grayscale;
// // //           }
// // //         `}
// // //       </style>
// // //     </div>
// // //   );
// // // };

// // // export default PostDetailPage;

// // /* eslint-disable no-unused-vars */
// // // client/src/pages/PostDetailPage.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { getPostById, addCommentToPost } from '../services/forumService';
// // import { useAuth } from '../context/AuthContext';
// // import {
// //   Comment as CommentIcon,
// //   Person as PersonIcon,
// //   Schedule as TimeIcon,
// //   Send as SendIcon,
// //   ArrowBack as ArrowBackIcon,
// //   Visibility as ReadIcon,
// //   Share as ShareIcon,
// //   BookmarkBorder as BookmarkIcon,
// //   ThumbUp as LikeIcon,
// //   AccessTime as ReadTimeIcon,
// //   Category as CategoryIcon
// // } from '@mui/icons-material';

// // const PostDetailPage = () => {
// //   const [post, setPost] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [newComment, setNewComment] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isVisible, setIsVisible] = useState(false);
// //   const { postId } = useParams();
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       if (!postId) return;
// //       try {
// //         const postData = await getPostById(postId);
// //         setPost(postData);
// //         // Trigger content animation
// //         setTimeout(() => setIsVisible(true), 300);
// //       } catch (err) {
// //         setError(err.message || 'An error occurred while fetching the post.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPost();
// //   }, [postId]);

// //   const handleCommentSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!newComment.trim()) return;

// //     setIsSubmitting(true);
// //     try {
// //       const addedComment = await addCommentToPost(postId, newComment);
// //       setPost(prevPost => ({
// //         ...prevPost,
// //         comments: [...prevPost.comments, addedComment]
// //       }));
// //       setNewComment('');
// //     } catch (err) {
// //       setError('Failed to post comment. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Enhanced text formatting function for blog content
// //   const formatBlogContent = (text) => {
// //     if (!text) return '';

// //     return text
// //       .split('\n')
// //       .map((paragraph, index) => {
// //         const trimmed = paragraph.trim();

// //         if (!trimmed) {
// //           return <div key={index} className="h-6"></div>;
// //         }

// //         // Headers
// //         if (trimmed.startsWith('#')) {
// //           const level = trimmed.match(/^#+/)[0].length;
// //           const headerText = trimmed.replace(/^#+\s*/, '');
// //           const HeaderTag = `h${Math.min(level, 6)}`;

// //           return React.createElement(HeaderTag, {
// //             key: index,
// //             className: `font-bold mb-6 mt-8 text-gray-900 ${level === 1 ? 'text-4xl border-b-4 border-blue-500 pb-4' :
// //                 level === 2 ? 'text-3xl border-b-2 border-gray-300 pb-3' :
// //                   level === 3 ? 'text-2xl' :
// //                     level === 4 ? 'text-xl' : 'text-lg'
// //               }`
// //           }, headerText);
// //         }

// //         // Detect all caps headers
// //         if (trimmed.length < 80 && trimmed === trimmed.toUpperCase() && /^[A-Z\s\d\-:]+$/.test(trimmed)) {
// //           return (
// //             <h3 key={index} className="font-bold text-2xl mb-6 mt-8 text-gray-900 border-b-2 border-gray-300 pb-3">
// //               {trimmed}
// //             </h3>
// //           );
// //         }

// //         // List items
// //         if (trimmed.match(/^[-*•]\s+/) || trimmed.match(/^\d+\.\s+/)) {
// //           const isNumbered = trimmed.match(/^\d+\.\s+/);
// //           const content = trimmed.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '');

// //           return (
// //             <div key={index} className="ml-6 mb-3 flex items-start">
// //               <span className="mr-3 flex-shrink-0 text-blue-600 font-medium mt-1">
// //                 {isNumbered ? trimmed.match(/^\d+\./)[0] : '•'}
// //               </span>
// //               <span className="flex-1 text-gray-700 leading-relaxed">
// //                 {content}
// //               </span>
// //             </div>
// //           );
// //         }

// //         // Quote blocks
// //         if (trimmed.startsWith('>')) {
// //           const quoteContent = trimmed.replace(/^>\s*/, '');
// //           return (
// //             <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-r-lg italic text-gray-800">
// //               {quoteContent}
// //             </blockquote>
// //           );
// //         }

// //         // Regular paragraphs with enhanced formatting
// //         let formattedText = trimmed;

// //         // Bold text
// //         formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
// //         formattedText = formattedText.replace(/__(.*?)__/g, '<strong class="font-semibold text-gray-900">$1</strong>');

// //         // Italic text
// //         formattedText = formattedText.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
// //         formattedText = formattedText.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

// //         // Inline code
// //         formattedText = formattedText.replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border">$1</code>');

// //         // Links (basic detection)
// //         formattedText = formattedText.replace(
// //           /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
// //           '<a href="$&" class="text-blue-600 hover:text-blue-800 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">$&</a>'
// //         );

// //         return (
// //           <p
// //             key={index}
// //             className="mb-6 text-gray-700 leading-relaxed text-lg"
// //             dangerouslySetInnerHTML={{ __html: formattedText }}
// //           />
// //         );
// //       });
// //   };

// //   // Calculate estimated read time
// //   const calculateReadTime = (content) => {
// //     if (!content) return 1;
// //     const wordsPerMinute = 200;
// //     const wordCount = content.split(/\s+/).length;
// //     return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative mb-8">
// //             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-700 mb-2">Loading Article</h2>
// //           <p className="text-gray-500">Please wait while we prepare your content...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// //         <div className="text-center max-w-md">
// //           <div className="text-6xl mb-6">😕</div>
// //           <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h2>
// //           <p className="text-gray-600 mb-8">{error}</p>
// //           <Link
// //             to="/forum"
// //             className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
// //           >
// //             <ArrowBackIcon className="mr-2" />
// //             Back to Articles
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!post) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// //         <div className="text-center max-w-md">
// //           <div className="text-6xl mb-6">📄</div>
// //           <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
// //           <p className="text-gray-600 mb-8">
// //             The article you're looking for doesn't exist or has been removed.
// //           </p>
// //           <Link
// //             to="/forum"
// //             className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
// //           >
// //             <ArrowBackIcon className="mr-2" />
// //             Explore Articles
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const readTime = calculateReadTime(post.content);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Navigation Bar */}
// //       <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
// //         <div className="max-w-4xl mx-auto px-4 py-4">
// //           <Link
// //             to="/forum"
// //             className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
// //           >
// //             <ArrowBackIcon className="mr-2" />
// //             Back to Articles
// //           </Link>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// //         }`}>
// //         <div className="max-w-4xl mx-auto px-4 py-16">
// //           <div className="text-center mb-8">
// //             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
// //               {post.title}
// //             </h1>

// //             {/* Article Meta */}
// //             <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100 mb-8">
// //               <div className="flex items-center">
// //                 <PersonIcon className="mr-2" />
// //                 <span className="font-medium">{post.author.name}</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <TimeIcon className="mr-2" />
// //                 <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
// //                   year: 'numeric',
// //                   month: 'long',
// //                   day: 'numeric'
// //                 })}</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <ReadTimeIcon className="mr-2" />
// //                 <span>{readTime} min read</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <CommentIcon className="mr-2" />
// //                 <span>{post.comments.length} comments</span>
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex flex-wrap justify-center gap-4">
// //               <button className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200">
// //                 <LikeIcon className="mr-2" />
// //                 Like
// //               </button>
// //               <button className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200">
// //                 <BookmarkIcon className="mr-2" />
// //                 Save
// //               </button>
// //               <button className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200">
// //                 <ShareIcon className="mr-2" />
// //                 Share
// //               </button>
// //             </div>
// //           </div>

// //           {/* Author Info */}
// //           <div className="flex items-center justify-center">
// //             <div className="flex items-center bg-white bg-opacity-10 rounded-full px-6 py-3">
// //               <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
// //                 {post.author.profilePicture ? (
// //                   <img
// //                     src={post.author.profilePicture}
// //                     alt={post.author.name}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
// //                     <PersonIcon className="text-white text-xl" />
// //                   </div>
// //                 )}
// //               </div>
// //               <div>
// //                 <p className="font-medium">{post.author.name}</p>
// //                 <p className="text-blue-200 text-sm">Community Member</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <article className={`max-w-4xl mx-auto px-4 py-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// //         }`}>
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //           <div className="p-8 md:p-12">
// //             {/* Content */}
// //             <div className="prose prose-lg max-w-none">
// //               {formatBlogContent(post.content)}
// //             </div>

// //             {/* Article Footer */}
// //             <div className="border-t border-gray-200 pt-8 mt-12">
// //               <div className="flex flex-wrap justify-between items-center gap-4">
// //                 <div className="flex items-center space-x-4">
// //                   <span className="text-gray-500">Share this article:</span>
// //                   <div className="flex space-x-2">
// //                     <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
// //                       <ShareIcon className="w-4 h-4" />
// //                     </button>
// //                     <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
// //                       <ShareIcon className="w-4 h-4" />
// //                     </button>
// //                     <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
// //                       <ShareIcon className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="text-sm text-gray-500">
// //                   Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
// //                     year: 'numeric',
// //                     month: 'long',
// //                     day: 'numeric'
// //                   })}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </article>

// //       {/* Comments Section */}
// //       <section className={`max-w-4xl mx-auto px-4 pb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// //         }`}>
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //           <div className="p-8 md:p-12">
// //             {/* Comments Header */}
// //             <div className="text-center mb-10">
// //               <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
// //                 <CommentIcon className="mr-3 text-blue-600" />
// //                 Discussion ({post.comments.length})
// //               </h2>
// //               <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
// //             </div>

// //             {/* Comments List */}
// //             {post.comments.length === 0 ? (
// //               <div className="text-center py-16">
// //                 <CommentIcon className="text-6xl text-gray-300 mb-6 mx-auto" />
// //                 <h3 className="text-2xl font-semibold text-gray-700 mb-4">Be the first to comment</h3>
// //                 <p className="text-gray-500 max-w-md mx-auto">
// //                   Start the conversation! Share your thoughts, questions, or insights about this article.
// //                 </p>
// //               </div>
// //             ) : (
// //               <div className="space-y-8 mb-12">
// //                 {post.comments.map((comment, index) => (
// //                   <div
// //                     key={comment._id}
// //                     className="transform transition-all duration-500 hover:scale-[1.01]"
// //                     style={{ animationDelay: `${index * 0.1}s` }}
// //                   >
// //                     <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
// //                       <div className="flex items-start space-x-4">
// //                         <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
// //                           {comment.author.profilePicture ? (
// //                             <img
// //                               src={comment.author.profilePicture}
// //                               alt={comment.author.name}
// //                               className="w-full h-full object-cover"
// //                             />
// //                           ) : (
// //                             <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
// //                               <PersonIcon className="text-white text-xl" />
// //                             </div>
// //                           )}
// //                         </div>
// //                         <div className="flex-1">
// //                           <div className="flex items-center space-x-3 mb-3">
// //                             <h4 className="font-semibold text-gray-900">{comment.author.name}</h4>
// //                             <span className="text-sm text-gray-500">
// //                               {new Date(comment.createdAt).toLocaleDateString('en-US', {
// //                                 year: 'numeric',
// //                                 month: 'short',
// //                                 day: 'numeric'
// //                               })}
// //                             </span>
// //                           </div>
// //                           <div className="text-gray-700 leading-relaxed">
// //                             {formatBlogContent(comment.content)}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* Comment Form */}
// //             <div className="border-t border-gray-200 pt-10">
// //               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
// //                 ✍️ Join the Discussion
// //               </h3>

// //               {user ? (
// //                 <form onSubmit={handleCommentSubmit} className="space-y-6">
// //                   <div className="relative">
// //                     <textarea
// //                       rows="6"
// //                       value={newComment}
// //                       onChange={(e) => setNewComment(e.target.value)}
// //                       placeholder="Share your thoughts, ask questions, or provide additional insights..."
// //                       className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 resize-none text-gray-700 leading-relaxed"
// //                       maxLength={1000}
// //                     />
// //                     <div className="absolute bottom-3 right-3 text-xs text-gray-400">
// //                       {newComment.length}/1000
// //                     </div>
// //                   </div>

// //                   <div className="flex justify-between items-center">
// //                     <div className="flex items-center text-sm text-gray-500">
// //                       <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
// //                         {user.profilePicture ? (
// //                           <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
// //                         ) : (
// //                           <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
// //                             <PersonIcon className="text-white text-sm" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <span>Commenting as <strong>{user.name}</strong></span>
// //                     </div>

// //                     <button
// //                       type="submit"
// //                       disabled={isSubmitting || !newComment.trim()}
// //                       className={`px-8 py-3 rounded-xl flex items-center font-semibold transition-all duration-300 transform ${isSubmitting || !newComment.trim()
// //                           ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
// //                           : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
// //                         }`}
// //                     >
// //                       {isSubmitting ? (
// //                         <>
// //                           <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
// //                           Publishing...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <SendIcon className="mr-2" />
// //                           Post Comment
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               ) : (
// //                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-900 px-8 py-6 rounded-xl text-center">
// //                   <div className="text-5xl mb-4">🔐</div>
// //                   <h4 className="text-xl font-semibold mb-2">Join the Conversation</h4>
// //                   <p className="text-blue-700">
// //                     Sign in to share your thoughts and connect with our community of readers.
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Custom Styles */}
// //       <style>
// //         {`
// //           @keyframes fadeInUp {
// //             from {
// //               opacity: 0;
// //               transform: translateY(30px);
// //             }
// //             to {
// //               opacity: 1;
// //               transform: translateY(0);
// //             }
// //           }

// //           .prose {
// //             max-width: none;
// //           }

// //           .prose p {
// //             margin-bottom: 1.5rem;
// //           }

// //           .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
// //             margin-top: 2rem;
// //             margin-bottom: 1rem;
// //             font-weight: 700;
// //           }

// //           .prose h1 {
// //             font-size: 2.5rem;
// //             line-height: 1.2;
// //           }

// //           .prose h2 {
// //             font-size: 2rem;
// //             line-height: 1.3;
// //           }

// //           .prose h3 {
// //             font-size: 1.75rem;
// //             line-height: 1.4;
// //           }

// //           .prose blockquote {
// //             font-size: 1.125rem;
// //             line-height: 1.6;
// //           }

// //           .prose ul, .prose ol {
// //             margin: 1.5rem 0;
// //           }

// //           .prose li {
// //             margin: 0.5rem 0;
// //           }

// //           .prose code {
// //             background-color: #f1f5f9;
// //             color: #334155;
// //             padding: 0.25rem 0.5rem;
// //             border-radius: 0.375rem;
// //             font-size: 0.875rem;
// //             font-weight: 500;
// //           }

// //           .prose pre {
// //             background-color: #1e293b;
// //             color: #f1f5f9;
// //             padding: 1.5rem;
// //             border-radius: 0.75rem;
// //             overflow-x: auto;
// //             margin: 2rem 0;
// //           }

// //           .prose pre code {
// //             background-color: transparent;
// //             color: inherit;
// //             padding: 0;
// //             font-weight: 400;
// //           }

// //           .prose a {
// //             color: #2563eb;
// //             text-decoration: underline;
// //             text-underline-offset: 4px;
// //             transition: color 0.2s ease;
// //           }

// //           .prose a:hover {
// //             color: #1d4ed8;
// //           }

// //           .prose strong {
// //             font-weight: 600;
// //             color: #111827;
// //           }

// //           .prose em {
// //             font-style: italic;
// //           }

// //           /* Smooth scrolling */
// //           html {
// //             scroll-behavior: smooth;
// //           }

// //           /* Enhanced responsive design */
// //           @media (max-width: 768px) {
// //             .prose {
// //               font-size: 1rem;
// //             }

// //             .prose h1 {
// //               font-size: 2rem;
// //             }

// //             .prose h2 {
// //               font-size: 1.75rem;
// //             }

// //             .prose h3 {
// //               font-size: 1.5rem;
// //             }
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default PostDetailPage;

// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPostById, addCommentToPost } from "../services/forumService";
// import { useAuth } from "../context/AuthContext";
// import DOMPurify from "dompurify";
// import { marked } from "marked";
// import {
//   ArrowBack as ArrowBackIcon,
//   Comment as CommentIcon,
//   Person as PersonIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";

// const PostDetailPage = () => {
//   const { postId } = useParams();
//   const { user } = useAuth();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const data = await getPostById(postId);
//         setPost(data);
//       } catch (err) {
//         setError("Failed to load post.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     setIsSubmitting(true);
//     try {
//       const added = await addCommentToPost(postId, newComment);
//       setPost((prev) => ({
//         ...prev,
//         comments: [...prev.comments, added],
//       }));
//       setNewComment("");
//     } catch (err) {
//       setError("Failed to add comment.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleContent = () => setShowFullContent((prev) => !prev);
//   const toggleComments = () => setShowComments((prev) => !prev);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-green-600 font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   if (error || !post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600">{error || "Post not found."}</p>
//       </div>
//     );
//   }

//   // Convert + sanitize content
//   const createFormattedHTML = (rawText) => {
//     const dirty = marked.parse(rawText || ""); // Markdown → HTML
//     return DOMPurify.sanitize(dirty); // Sanitize
//   };

//   // Split words for "see more"
//   const words = post.content.split(" ");
//   const shouldTruncate = words.length > 80;
//   const displayedContent =
//     showFullContent || !shouldTruncate
//       ? post.content
//       : words.slice(0, 80).join(" ") + "...";

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       {/* Back Nav */}
//       <div className="mb-6">
//         <Link
//           to="/forum"
//           className="flex items-center text-green-700 hover:underline"
//         >
//           <ArrowBackIcon className="mr-2" />
//           Back to Forum
//         </Link>
//       </div>

//       {/* Post Title */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

//       {/* Author Info */}
//       <div className="flex items-center text-gray-600 text-sm mb-6">
//         {post.author?.profilePicture ? (
//           <img
//             src={post.author.profilePicture}
//             alt={post.author.name}
//             className="w-8 h-8 rounded-full mr-2"
//           />
//         ) : (
//           <PersonIcon className="mr-2 text-green-600" />
//         )}
//         <span className="font-medium">{post.author?.name || "Anonymous"}</span>
//         <span className="mx-2">·</span>
//         <span>
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </span>
//       </div>

//       {/* Post Content (Formatted Markdown → HTML) */}
//       <div
//         className="prose prose-green max-w-none mb-4"
//         dangerouslySetInnerHTML={{
//           __html: createFormattedHTML(displayedContent),
//         }}
//       />
//       {shouldTruncate && (
//         <button
//           onClick={toggleContent}
//           className="text-green-700 font-medium hover:underline"
//         >
//           {showFullContent ? "See less" : "See more"}
//         </button>
//       )}

//       {/* Comments Toggle */}
//       <div className="mt-8 border-t pt-4">
//         <button
//           onClick={toggleComments}
//           className="flex items-center text-green-700 font-medium hover:underline"
//         >
//           <CommentIcon className="mr-2" />
//           {showComments ? "Hide comments" : `View comments (${post.comments.length})`}
//         </button>
//       </div>

//       {/* Comments List */}
//       {showComments && (
//         <div className="mt-6 space-y-6">
//           {post.comments.length === 0 ? (
//             <p className="text-gray-500">No comments yet. Be the first!</p>
//           ) : (
//             post.comments.map((c) => (
//               <div key={c._id} className="flex items-start space-x-3">
//                 {c.author?.profilePicture ? (
//                   <img
//                     src={c.author.profilePicture}
//                     alt={c.author.name}
//                     className="w-8 h-8 rounded-full"
//                   />
//                 ) : (
//                   <PersonIcon className="text-green-600" />
//                 )}
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {c.author?.name || "User"}
//                   </p>
//                   {/* Comment Content (Formatted Markdown → HTML) */}
//                   <div
//                     className="prose prose-sm prose-green max-w-none"
//                     dangerouslySetInnerHTML={{
//                       __html: createFormattedHTML(c.content),
//                     }}
//                   />
//                   <p className="text-xs text-gray-400">
//                     {new Date(c.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Add Comment */}
//       {user && (
//         <form onSubmit={handleCommentSubmit} className="mt-6">
//           <textarea
//             rows="3"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <div className="flex justify-end mt-2">
//             <button
//               type="submit"
//               disabled={isSubmitting || !newComment.trim()}
//               className={`px-4 py-2 rounded-md flex items-center ${isSubmitting || !newComment.trim()
//                   ? "bg-gray-300 text-gray-500"
//                   : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//             >
//               {isSubmitting ? "Posting..." : <><SendIcon className="mr-1" /> Post</>}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PostDetailPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, addCommentToPost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Schedule as TimeIcon,
  Send as SendIcon,
  Comment as CommentIcon,
  ThumbUp as LikeIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon
} from '@mui/icons-material';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const postData = await getPostById(postId);
        setPost(postData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const addedComment = await addCommentToPost(postId, newComment);
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, addedComment]
      }));
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate reading time
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/forum"
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <ArrowBackIcon className="mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/forum"
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <ArrowBackIcon className="mr-2" />
            Explore Articles
          </Link>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/forum"
            className="inline-flex items-center text-gray-600 hover:text-green-600"
          >
            <ArrowBackIcon className="mr-1" />
            Back to Articles
          </Link>
          
        </div>
      </nav>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <PersonIcon className="text-green-600 text-sm" />
              </div>
              <span className="font-medium text-gray-700">{post.author.name}</span>
            </div>
            <div className="flex items-center mr-4">
              <TimeIcon className="mr-1 text-sm" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <span>•</span>
              <span className="ml-2">{readTime} min read</span>
            </div>
          </div>

          
        </div>

        {/* Article Content with Markdown */}
        <div className="prose prose-lg max-w-none mb-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mt-10 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="mb-6 text-gray-700 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="mb-6 list-disc list-inside space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="mb-6 list-decimal list-inside space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-green-500 pl-4 py-2 my-6 bg-green-50 italic text-gray-700" {...props} />
              ),
              a: ({ node, ...props }) => <a className="text-green-600 hover:text-green-800 underline" {...props} />,
              code: ({ node, inline, ...props }) =>
                inline ?
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} /> :
                  <div className="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
                    <code className="text-sm font-mono" {...props} />
                  </div>,
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full divide-y divide-gray-200" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => <th className="px-4 py-2 bg-gray-100 text-left font-semibold" {...props} />,
              td: ({ node, ...props }) => <td className="px-4 py-2 border-t" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center mb-6">
            <CommentIcon className="text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Comments ({post.comments.length})
            </h2>
          </div>

          {/* Comments List */}
          {post.comments.length > 0 ? (
            <div className="space-y-6 mb-8">
              {post.comments.map((comment) => (
                <div key={comment._id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <PersonIcon className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="prose prose-sm max-w-none mt-2">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => <p className="text-gray-700 mb-2" {...props} />,
                            a: ({ node, ...props }) => <a className="text-green-600 hover:text-green-800 underline" {...props} />,
                          }}
                        >
                          {comment.content}
                        </ReactMarkdown>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="text-sm text-gray-500 hover:text-green-600">Like</button>
                        <button className="text-sm text-gray-500 hover:text-green-600">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CommentIcon className="text-4xl mx-auto mb-3 text-gray-300" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-lg p-4 mt-6">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <PersonIcon className="text-green-600" />
                </div>
                <div className="flex-1">
                  <textarea
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 mb-3 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting || !newComment.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Posting...
                        </>
                      ) : (
                        <>
                          <SendIcon className="mr-1 text-sm" />
                          Post Comment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mt-6">
              <p className="text-green-800">
                Please sign in to leave a comment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostDetailPage;