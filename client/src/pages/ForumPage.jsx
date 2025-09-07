


// // import { useState, useEffect } from 'react';
// // import { getConsultancyPosts, createPost } from '../services/forumService';
// // import { Link } from 'react-router-dom';
// // import {
// //   Container,
// //   Paper,
// //   Typography,
// //   TextField,
// //   Button,
// //   Box,
// //   CircularProgress,
// //   Alert,
// //   Chip,
// //   Card,
// //   CardContent,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   useTheme,
// //   useMediaQuery
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   Comment as CommentIcon,
// //   Person as PersonIcon,
// //   Schedule as TimeIcon
// // } from '@mui/icons-material';

// // const ForumPage = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [newPost, setNewPost] = useState({ title: '', content: '' });
// //   const [submitting, setSubmitting] = useState(false);
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const postsData = await getConsultancyPosts();
// //         setPosts(postsData);
// //       } catch (err) {
// //         setError(err.message || 'An error occurred while fetching forum posts.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPosts();
// //   }, []);

// //   const handleCreatePost = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     try {
// //       const createdPost = await createPost(newPost);
// //       setPosts(prevPosts => [createdPost, ...prevPosts]);
// //       setIsModalOpen(false);
// //       setNewPost({ title: '', content: '' });
// //       setError('');
// //     } catch (err) {
// //       setError(err.message || 'Failed to create post. Please try again.');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
// //         <CircularProgress sx={{ color: '#2e7d32' }} />
// //       </Box>
// //     );
// //   }

// //   if (error && posts.length === 0) {
// //     return (
// //       <Container maxWidth="lg" sx={{ py: 4 }}>
// //         <Alert severity="error" sx={{ mb: 2 }}>
// //           {error}
// //         </Alert>
// //         <Button
// //           variant="contained"
// //           onClick={() => window.location.reload()}
// //           sx={{
// //             backgroundColor: '#2e7d32',
// //             '&:hover': { backgroundColor: '#1b5e20' }
// //           }}
// //         >
// //           Try Again
// //         </Button>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       {/* Header Section */}
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
// //         <Typography variant="h3" component="h1" sx={{ fontWeight: 600, color: '#1b5e20' }}>
// //           Community Forum
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           startIcon={<AddIcon />}
// //           onClick={() => setIsModalOpen(true)}
// //           sx={{
// //             backgroundColor: '#2e7d32',
// //             '&:hover': { backgroundColor: '#1b5e20' },
// //             width: isMobile ? '100%' : 'auto'
// //           }}
// //         >
// //           Create New Post
// //         </Button>
// //       </Box>

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 3 }}>
// //           {error}
// //         </Alert>
// //       )}
// //       {/* Posts List */}
// //       <Box sx={{ mb: 4 }}>
// //         {posts.length > 0 ? (
// //           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //             {posts.map((post) => (
// //               <Card
// //                 key={post._id}
// //                 component={Link}
// //                 to={`/forums/posts/${post._id}`}
// //                 sx={{
// //                   textDecoration: 'none',
// //                   transition: 'transform 0.2s, box-shadow 0.2s',
// //                   '&:hover': {
// //                     transform: 'translateY(-2px)',
// //                     boxShadow: 2
// //                   }
// //                 }}
// //               >
// //                 <CardContent sx={{ p: 3 }}>
// //                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
// //                     <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#2e7d32', flexGrow: 1, mr: 2 }}>
// //                       {post.title}
// //                     </Typography>
// //                     <Chip
// //                       icon={<CommentIcon />}
// //                       label={post.comments?.length || 0}
// //                       size="small"
// //                       variant="outlined"
// //                       sx={{ color: '#2e7d32', borderColor: '#2e7d32', flexShrink: 0 }}
// //                     />
// //                   </Box>

// //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
// //                     {post.content}
// //                   </Typography>

// //                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <PersonIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
// //                       <Typography variant="caption" color="text.secondary">
// //                         {post.author?.name || 'Unknown'}
// //                       </Typography>
// //                     </Box>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <TimeIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
// //                       <Typography variant="caption" color="text.secondary">
// //                         {new Date(post.createdAt).toLocaleDateString()}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </Box>
// //         ) : (
// //           <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f9f9f9' }}>
// //             <CommentIcon sx={{ fontSize: 48, color: '#e0e0e0', mb: 2 }} />
// //             <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
// //               No discussions yet
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
// //               Be the first to start a discussion in our community forum!
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={() => setIsModalOpen(true)}
// //               sx={{
// //                 backgroundColor: '#2e7d32',
// //                 '&:hover': { backgroundColor: '#1b5e20' }
// //               }}
// //             >
// //               Create First Post
// //             </Button>
// //           </Paper>
// //         )}
// //       </Box>

// //       {/* Create Post Dialog */}
// //       <Dialog
// //         open={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         maxWidth="md"
// //         fullWidth
// //         fullScreen={isMobile}
// //       >
// //         <DialogTitle sx={{ color: '#2e7d32', borderBottom: '1px solid #e0e0e0' }}>
// //           Create a New Post
// //         </DialogTitle>
// //         <form onSubmit={handleCreatePost}>
// //           <DialogContent sx={{ pt: 3 }}>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               id="title"
// //               label="Post Title"
// //               type="text"
// //               fullWidth
// //               variant="outlined"
// //               value={newPost.title}
// //               onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
// //               required
// //               sx={{
// //                 mb: 3,
// //                 '& .MuiOutlinedInput-root': {
// //                   '&.Mui-focused fieldset': {
// //                     borderColor: '#4caf50',
// //                   },
// //                 },
// //               }}
// //             />
// //             <TextField
// //               margin="dense"
// //               id="content"
// //               label="Post Content"
// //               multiline
// //               rows={6}
// //               fullWidth
// //               variant="outlined"
// //               value={newPost.content}
// //               onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
// //               required
// //               sx={{
// //                 '& .MuiOutlinedInput-root': {
// //                   '&.Mui-focused fieldset': {
// //                     borderColor: '#4caf50',
// //                   },
// //                 },
// //               }}
// //             />
// //           </DialogContent>
// //           <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
// //             <Button
// //               onClick={() => setIsModalOpen(false)}
// //               sx={{ color: '#2e7d32' }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               disabled={submitting}
// //               sx={{
// //                 backgroundColor: '#2e7d32',
// //                 '&:hover': { backgroundColor: '#1b5e20' },
// //                 '&:disabled': { backgroundColor: '#a5d6a7' }
// //               }}
// //             >
// //               {submitting ? <CircularProgress size={24} /> : 'Create Post'}
// //             </Button>
// //           </DialogActions>
// //         </form>
// //       </Dialog>
// //     </Container>
// //   );
// // };

// // export default ForumPage;

// import { useState, useEffect } from 'react';
// import { getConsultancyPosts, createPost } from '../services/forumService';
// import { Link } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Comment as CommentIcon,
//   Person as PersonIcon,
//   Schedule as TimeIcon,
//   MenuBook as BookIcon,
//   AutoStories as BookCoverIcon
// } from '@mui/icons-material';

// const ForumPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPost, setNewPost] = useState({ title: '', content: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsData = await getConsultancyPosts();
//         setPosts(postsData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching forum posts.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const createdPost = await createPost(newPost);
//       setPosts(prevPosts => [createdPost, ...prevPosts]);
//       setIsModalOpen(false);
//       setNewPost({ title: '', content: '' });
//       setError('');
//     } catch (err) {
//       setError(err.message || 'Failed to create post. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//         <CircularProgress sx={{ color: '#8B4513' }} />
//       </Box>
//     );
//   }

//   if (error && posts.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//         <Button
//           variant="contained"
//           onClick={() => window.location.reload()}
//           sx={{
//             backgroundColor: '#8B4513',
//             '&:hover': { backgroundColor: '#654321' }
//           }}
//         >
//           Try Again
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header Section */}
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 6,
//         flexDirection: isMobile ? 'column' : 'row',
//         gap: isMobile ? 2 : 0
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <BookIcon sx={{ fontSize: 42, color: '#8B4513' }} />
//           <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#8B4513', fontFamily: '"Playfair Display", serif' }}>
//             Community Library
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => setIsModalOpen(true)}
//           sx={{
//             backgroundColor: '#8B4513',
//             '&:hover': { backgroundColor: '#654321' },
//             width: isMobile ? '100%' : 'auto',
//             px: 3,
//             py: 1.5,
//             fontSize: '1.1rem',
//             fontFamily: '"Crimson Text", serif'
//           }}
//         >
//           Add New Book
//         </Button>
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Bookshelf Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h5" sx={{
//           mb: 3,
//           color: '#5D4037',
//           fontFamily: '"Crimson Text", serif',
//           borderBottom: '2px solid #D7CCC8',
//           pb: 1,
//           display: 'inline-block'
//         }}>
//           Our Bookshelf
//         </Typography>

//         {posts.length > 0 ? (
//           <Box sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//             gap: 4
//           }}>
//             {posts.map((post) => (
//               <Box
//                 key={post._id}
//                 component={Link}
//                 to={`/forums/posts/${post._id}`}
//                 sx={{
//                   textDecoration: 'none',
//                   position: 'relative',
//                   perspective: '1500px',
//                   height: '320px',
//                   '&:hover .book-cover': {
//                     transform: 'rotateY(-35deg)',
//                     boxShadow: '20px 10px 30px rgba(0, 0, 0, 0.3)'
//                   },
//                   '&:hover .book-spine': {
//                     opacity: 0.8
//                   }
//                 }}
//               >
//                 {/* Book Container */}
//                 <Box className="book-cover" sx={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   backgroundColor: '#8B4513',
//                   background: 'linear-gradient(45deg, #8B4513 0%, #A0522D 100%)',
//                   borderRadius: '4px 12px 12px 4px',
//                   transition: 'transform 0.5s ease, box-shadow 0.5s ease',
//                   transformStyle: 'preserve-3d',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   padding: 3,
//                   color: 'white',
//                   boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.2)',
//                   overflow: 'hidden',
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
//                     zIndex: 1
//                   }
//                 }}>
//                   {/* Book Title */}
//                   <Box sx={{ position: 'relative', zIndex: 2 }}>
//                     <Typography variant="h6" sx={{
//                       fontWeight: 700,
//                       fontFamily: '"Playfair Display", serif',
//                       fontSize: '1.3rem',
//                       lineHeight: 1.3,
//                       mb: 1,
//                       textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden'
//                     }}>
//                       {post.title}
//                     </Typography>

//                     <Typography variant="body2" sx={{
//                       opacity: 0.9,
//                       fontFamily: '"Crimson Text", serif',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden'
//                     }}>
//                       {post.content}
//                     </Typography>
//                   </Box>

//                   {/* Book Footer */}
//                   <Box sx={{
//                     position: 'relative',
//                     zIndex: 2,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     borderTop: '1px solid rgba(255,255,255,0.3)',
//                     pt: 1.5
//                   }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                       <Typography variant="caption" sx={{ fontFamily: '"Crimson Text", serif' }}>
//                         {post.author?.name || 'Unknown'}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <CommentIcon sx={{ fontSize: 16 }} />
//                       <Typography variant="caption">
//                         {post.comments?.length || 0}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Decorative Elements */}
//                   <Box sx={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     width: 30,
//                     height: 30,
//                     borderRadius: '50%',
//                     background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
//                   }} />
//                 </Box>

//                 {/* Book Spine */}
//                 <Box className="book-spine" sx={{
//                   position: 'absolute',
//                   left: 0,
//                   top: '10%',
//                   height: '80%',
//                   width: '12px',
//                   backgroundColor: '#654321',
//                   borderRadius: '2px 0 0 2px',
//                   transform: 'rotateY(90deg) translateX(-12px)',
//                   transformOrigin: 'left center',
//                   opacity: 0.6,
//                   transition: 'opacity 0.5s ease',
//                   boxShadow: '-5px 0 10px rgba(0,0,0,0.2)'
//                 }} />

//                 {/* Pages Edge */}
//                 <Box sx={{
//                   position: 'absolute',
//                   left: 0,
//                   top: 0,
//                   height: '100%',
//                   width: '8px',
//                   backgroundColor: '#F5F5DC',
//                   borderRadius: '2px 0 0 2px',
//                   transform: 'translateX(-8px)',
//                   opacity: 0.8,
//                   boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
//                 }} />
//               </Box>
//             ))}
//           </Box>
//         ) : (
//           <Box sx={{
//             textAlign: 'center',
//             p: 8,
//             backgroundColor: '#F5F5DC',
//             borderRadius: 2,
//             border: '2px dashed #D7CCC8'
//           }}>
//             <BookCoverIcon sx={{ fontSize: 64, color: '#8B4513', mb: 2, opacity: 0.7 }} />
//             <Typography variant="h5" gutterBottom sx={{ color: '#5D4037', fontFamily: '"Playfair Display", serif' }}>
//               The Library is Empty
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontFamily: '"Crimson Text", serif' }}>
//               Be the first to add a book to our community library!
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setIsModalOpen(true)}
//               sx={{
//                 backgroundColor: '#8B4513',
//                 '&:hover': { backgroundColor: '#654321' },
//                 px: 4,
//                 py: 1.5,
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               Add First Book
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Create Post Dialog */}
//       <Dialog
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         maxWidth="md"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             background: 'linear-gradient(to bottom, #F5F5DC 0%, #F8F4E9 100%)',
//             border: '2px solid #D7CCC8'
//           }
//         }}
//       >
//         <DialogTitle sx={{
//           color: '#8B4513',
//           borderBottom: '2px solid #D7CCC8',
//           fontFamily: '"Playfair Display", serif',
//           fontSize: '1.8rem',
//           textAlign: 'center',
//           py: 3
//         }}>
//           <BookIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
//           Write a New Book
//         </DialogTitle>
//         <form onSubmit={handleCreatePost}>
//           <DialogContent sx={{ pt: 3, pb: 2 }}>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="title"
//               label="Book Title"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={newPost.title}
//               onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//               required
//               sx={{
//                 mb: 3,
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'white',
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#8B4513',
//                   },
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#8B4513',
//                 }
//               }}
//             />
//             <TextField
//               margin="dense"
//               id="content"
//               label="Book Content"
//               multiline
//               rows={6}
//               fullWidth
//               variant="outlined"
//               value={newPost.content}
//               onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//               required
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'white',
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#8B4513',
//                   },
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#8B4513',
//                 }
//               }}
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: 3, borderTop: '2px solid #D7CCC8', gap: 1 }}>
//             <Button
//               onClick={() => setIsModalOpen(false)}
//               sx={{
//                 color: '#8B4513',
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={submitting}
//               sx={{
//                 backgroundColor: '#8B4513',
//                 '&:hover': { backgroundColor: '#654321' },
//                 '&:disabled': { backgroundColor: '#BCAAA4' },
//                 px: 4,
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               {submitting ? <CircularProgress size={24} /> : 'Publish Book'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* Add custom fonts to the head */}
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
//         `}
//       </style>
//     </Container>
//   );
// };

// export default ForumPage;

// import { useState, useEffect } from 'react';
// import { getConsultancyPosts, createPost } from '../services/forumService';
// import { Link } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Comment as CommentIcon,
//   Person as PersonIcon,
//   Schedule as TimeIcon,
//   MenuBook as BookIcon,
//   AutoStories as BookCoverIcon
// } from '@mui/icons-material';

// const ForumPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPost, setNewPost] = useState({ title: '', content: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsData = await getConsultancyPosts();
//         setPosts(postsData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching forum posts.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const createdPost = await createPost(newPost);
//       setPosts(prevPosts => [createdPost, ...prevPosts]);
//       setIsModalOpen(false);
//       setNewPost({ title: '', content: '' });
//       setError('');
//     } catch (err) {
//       setError(err.message || 'Failed to create post. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//         <CircularProgress sx={{ color: '#2E7D32' }} />
//       </Box>
//     );
//   }

//   if (error && posts.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//         <Button
//           variant="contained"
//           onClick={() => window.location.reload()}
//           sx={{
//             backgroundColor: '#2E7D32',
//             '&:hover': { backgroundColor: '#1B5E20' }
//           }}
//         >
//           Try Again
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header Section */}
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 6,
//         flexDirection: isMobile ? 'column' : 'row',
//         gap: isMobile ? 2 : 0
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <BookIcon sx={{ fontSize: 42, color: '#2E7D32' }} />
//           <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#2E7D32', fontFamily: '"Playfair Display", serif' }}>
//             Community Library
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => setIsModalOpen(true)}
//           sx={{
//             backgroundColor: '#2E7D32',
//             '&:hover': { backgroundColor: '#1B5E20' },
//             width: isMobile ? '100%' : 'auto',
//             px: 3,
//             py: 1.5,
//             fontSize: '1.1rem',
//             fontFamily: '"Crimson Text", serif'
//           }}
//         >
//           Add New Book
//         </Button>
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Bookshelf Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h5" sx={{
//           mb: 3,
//           color: '#33691E',
//           fontFamily: '"Crimson Text", serif',
//           borderBottom: '2px solid #C5E1A5',
//           pb: 1,
//           display: 'inline-block'
//         }}>
//           Our Bookshelf
//         </Typography>

//         {posts.length > 0 ? (
//           <Box sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//             gap: 4
//           }}>
//             {posts.map((post) => (
//               <Box
//                 key={post._id}
//                 component={Link}
//                 to={`/forums/posts/${post._id}`}
//                 sx={{
//                   textDecoration: 'none',
//                   position: 'relative',
//                   perspective: '1500px',
//                   height: '320px',
//                   '&:hover .book-cover': {
//                     transform: 'rotateY(-35deg)',
//                     boxShadow: '20px 10px 30px rgba(0, 0, 0, 0.3)'
//                   },
//                   '&:hover .book-spine': {
//                     opacity: 0.8
//                   }
//                 }}
//               >
//                 {/* Book Container */}
//                 <Box className="book-cover" sx={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   backgroundColor: '#2E7D32',
//                   background: 'linear-gradient(45deg, #2E7D32 0%, #4CAF50 100%)',
//                   borderRadius: '4px 12px 12px 4px',
//                   transition: 'transform 0.5s ease, box-shadow 0.5s ease',
//                   transformStyle: 'preserve-3d',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   padding: 3,
//                   color: 'white',
//                   boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.2)',
//                   overflow: 'hidden',
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
//                     zIndex: 1
//                   }
//                 }}>
//                   {/* Book Title */}
//                   <Box sx={{ position: 'relative', zIndex: 2 }}>
//                     <Typography variant="h6" sx={{
//                       fontWeight: 700,
//                       fontFamily: '"Playfair Display", serif',
//                       fontSize: '1.3rem',
//                       lineHeight: 1.3,
//                       mb: 1,
//                       textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden'
//                     }}>
//                       {post.title}
//                     </Typography>

//                     <Typography variant="body2" sx={{
//                       opacity: 0.9,
//                       fontFamily: '"Crimson Text", serif',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden'
//                     }}>
//                       {post.content}
//                     </Typography>
//                   </Box>

//                   {/* Book Footer */}
//                   <Box sx={{
//                     position: 'relative',
//                     zIndex: 2,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     borderTop: '1px solid rgba(255,255,255,0.3)',
//                     pt: 1.5
//                   }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                       <Typography variant="caption" sx={{ fontFamily: '"Crimson Text", serif' }}>
//                         {post.author?.name || 'Unknown'}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <CommentIcon sx={{ fontSize: 16 }} />
//                       <Typography variant="caption">
//                         {post.comments?.length || 0}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Decorative Elements */}
//                   <Box sx={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     width: 30,
//                     height: 30,
//                     borderRadius: '50%',
//                     background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
//                   }} />

//                   {/* Book Details */}
//                   <Box sx={{
//                     position: 'absolute',
//                     bottom: 15,
//                     left: 15,
//                     width: 20,
//                     height: 20,
//                     borderRadius: '50%',
//                     border: '1px solid rgba(255,255,255,0.3)'
//                   }} />
//                 </Box>

//                 {/* Book Spine */}
//                 <Box className="book-spine" sx={{
//                   position: 'absolute',
//                   left: 0,
//                   top: '10%',
//                   height: '80%',
//                   width: '12px',
//                   backgroundColor: '#1B5E20',
//                   borderRadius: '2px 0 0 2px',
//                   transform: 'rotateY(90deg) translateX(-12px)',
//                   transformOrigin: 'left center',
//                   opacity: 0.6,
//                   transition: 'opacity 0.5s ease',
//                   boxShadow: '-5px 0 10px rgba(0,0,0,0.2)'
//                 }} />

//                 {/* Pages Edge */}
//                 <Box sx={{
//                   position: 'absolute',
//                   left: 0,
//                   top: 0,
//                   height: '100%',
//                   width: '8px',
//                   backgroundColor: '#E8F5E9',
//                   borderRadius: '2px 0 0 2px',
//                   transform: 'translateX(-8px)',
//                   opacity: 0.8,
//                   boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
//                 }} />

//                 {/* Book Shine Effect */}
//                 <Box sx={{
//                   position: 'absolute',
//                   top: 0,
//                   right: 0,
//                   width: '40%',
//                   height: '100%',
//                   background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
//                   transform: 'skewX(-10deg)',
//                   zIndex: 2
//                 }} />
//               </Box>
//             ))}
//           </Box>
//         ) : (
//           <Box sx={{
//             textAlign: 'center',
//             p: 8,
//             backgroundColor: '#E8F5E9',
//             borderRadius: 2,
//             border: '2px dashed #C5E1A5'
//           }}>
//             <BookCoverIcon sx={{ fontSize: 64, color: '#2E7D32', mb: 2, opacity: 0.7 }} />
//             <Typography variant="h5" gutterBottom sx={{ color: '#33691E', fontFamily: '"Playfair Display", serif' }}>
//               The Library is Empty
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontFamily: '"Crimson Text", serif' }}>
//               Be the first to add a book to our community library!
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setIsModalOpen(true)}
//               sx={{
//                 backgroundColor: '#2E7D32',
//                 '&:hover': { backgroundColor: '#1B5E20' },
//                 px: 4,
//                 py: 1.5,
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               Add First Book
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Create Post Dialog */}
//       <Dialog
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         maxWidth="md"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             background: 'linear-gradient(to bottom, #E8F5E9 0%, #F1F8E9 100%)',
//             border: '2px solid #C5E1A5'
//           }
//         }}
//       >
//         <DialogTitle sx={{
//           color: '#2E7D32',
//           borderBottom: '2px solid #C5E1A5',
//           fontFamily: '"Playfair Display", serif',
//           fontSize: '1.8rem',
//           textAlign: 'center',
//           py: 3
//         }}>
//           <BookIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
//           Write a New Book
//         </DialogTitle>
//         <form onSubmit={handleCreatePost}>
//           <DialogContent sx={{ pt: 3, pb: 2 }}>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="title"
//               label="Book Title"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={newPost.title}
//               onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//               required
//               sx={{
//                 mb: 3,
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'white',
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#2E7D32',
//                   },
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#2E7D32',
//                 }
//               }}
//             />
//             <TextField
//               margin="dense"
//               id="content"
//               label="Book Content"
//               multiline
//               rows={6}
//               fullWidth
//               variant="outlined"
//               value={newPost.content}
//               onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//               required
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   backgroundColor: 'white',
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#2E7D32',
//                   },
//                 },
//                 '& .MuiInputLabel-root.Mui-focused': {
//                   color: '#2E7D32',
//                 }
//               }}
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: 3, borderTop: '2px solid #C5E1A5', gap: 1 }}>
//             <Button
//               onClick={() => setIsModalOpen(false)}
//               sx={{
//                 color: '#2E7D32',
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={submitting}
//               sx={{
//                 backgroundColor: '#2E7D32',
//                 '&:hover': { backgroundColor: '#1B5E20' },
//                 '&:disabled': { backgroundColor: '#A5D6A7' },
//                 px: 4,
//                 fontFamily: '"Crimson Text", serif',
//                 fontSize: '1.1rem'
//               }}
//             >
//               {submitting ? <CircularProgress size={24} /> : 'Publish Book'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* Add custom fonts to the head */}
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');
//         `}
//       </style>
//     </Container>
//   );
// };

// export default ForumPage;

import { useState, useEffect } from 'react';
import { getConsultancyPosts, createPost } from '../services/forumService';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  Comment as CommentIcon,
  Person as PersonIcon,
  MenuBook as BookIcon
} from '@mui/icons-material';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getConsultancyPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching forum posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const createdPost = await createPost(newPost);
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      setIsModalOpen(false);
      setNewPost({ title: '', content: '' });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#2E7D32' }} />
      </Box>
    );
  }

  if (error && posts.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ backgroundColor: '#2E7D32', '&:hover': { backgroundColor: '#1B5E20' } }}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BookIcon sx={{ fontSize: 36, color: '#2E7D32' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
            Community Library
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: '#2E7D32',
            '&:hover': { backgroundColor: '#1B5E20' },
            width: isMobile ? '100%' : 'auto'
          }}
        >
          Add New Post
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Blog-style Posts List */}
      {posts.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <Card key={post._id} component={Link} to={`/forums/posts/${post._id}`} sx={{ textDecoration: 'none' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1B5E20' }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">{post.author?.name || 'Unknown'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CommentIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">{post.comments?.length || 0} comments</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 6 }}>
          No Posts yet. Be the first to add one!
        </Typography>
      )}

      {/* Create Post Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: '#2E7D32', fontWeight: 700 }}>
          Add a New Post
        </DialogTitle>
        <form onSubmit={handleCreatePost}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Book Title"
              type="text"
              fullWidth
              variant="outlined"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Book Content"
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting} sx={{ backgroundColor: '#2E7D32', '&:hover': { backgroundColor: '#1B5E20' } }}>
              {submitting ? <CircularProgress size={20} /> : 'Publish'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ForumPage;
