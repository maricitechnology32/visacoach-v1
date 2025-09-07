/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */


// // // src/pages/Ds160SummaryPage.jsx

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Container,
// //   Paper,
// //   Typography,
// //   Button,
// //   Box,
// //   CircularProgress,
// //   Alert,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Grid,
// //   Stack,
// //   Avatar,
// //   Fade,
// //   Slide
// // } from '@mui/material';
// // import {
// //   PictureAsPdf as PdfIcon,
// //   Description as DocIcon,
// //   CheckCircle as CheckIcon,
// //   Schedule as PendingIcon,
// //   Error as ErrorIcon,
// //   FileDownload as DownloadIcon,
// //   Assignment as DocumentIcon,
// //   Person as PersonIcon,
// //   Flight as TravelIcon,
// //   Work as WorkIcon,
// //   Security as SecurityIcon
// // } from '@mui/icons-material';
// // import { getMyDs160, downloadDs160Pdf } from '../services/ds160Service';
// // import InfoSection from '../components/summary/InfoSection';

// // const Ds160SummaryPage = () => {
// //   const [formData, setFormData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [downloadLoading, setDownloadLoading] = useState(false);

// //   // Clean green theme with modern colors
// //   const theme = {
// //     primary: {
// //       main: '#059669',      // Emerald 600
// //       light: '#10B981',     // Emerald 500
// //       dark: '#047857',      // Emerald 700
// //       surface: '#ECFDF5',   // Emerald 50
// //     },
// //     neutral: {
// //       50: '#F9FAFB',
// //       100: '#F3F4F6',
// //       200: '#E5E7EB',
// //       300: '#D1D5DB',
// //       600: '#4B5563',
// //       700: '#374151',
// //       900: '#111827',
// //     },
// //     status: {
// //       success: '#10B981',
// //       warning: '#F59E0B',
// //       error: '#EF4444',
// //       info: '#3B82F6',
// //     }
// //   };

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const data = await getMyDs160();
// //         setFormData(data);
// //       } catch (err) {
// //         setError('Failed to load DS-160 summary data.', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadData();
// //   }, []);

// //   const handleDownloadPdf = async () => {
// //     if (!formData?.applicationId) return;
// //     setDownloadLoading(true);
// //     try {
// //       const pdfBlob = await downloadDs160Pdf(formData.applicationId);
// //       const url = window.URL.createObjectURL(new Blob([pdfBlob]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', `DS-160_${formData.applicationId}.pdf`);
// //       document.body.appendChild(link);
// //       link.click();
// //       link.parentNode.removeChild(link);
// //     } catch (err) {
// //       setError('Failed to download PDF.', err);
// //     } finally {
// //       setDownloadLoading(false);
// //     }
// //   };

// //   const getStatusConfig = (status) => {
// //     const statusLower = status?.toLowerCase();
// //     switch (statusLower) {
// //       case 'completed':
// //       case 'approved':
// //         return {
// //           icon: CheckIcon,
// //           color: theme.status.success,
// //           bg: '#ECFDF5',
// //           label: 'Completed'
// //         };
// //       case 'pending':
// //       case 'in review':
// //         return {
// //           icon: PendingIcon,
// //           color: theme.status.warning,
// //           bg: '#FFFBEB',
// //           label: 'Pending Review'
// //         };
// //       case 'rejected':
// //       case 'error':
// //         return {
// //           icon: ErrorIcon,
// //           color: theme.status.error,
// //           bg: '#FEF2F2',
// //           label: 'Needs Attention'
// //         };
// //       default:
// //         return {
// //           icon: PendingIcon,
// //           color: theme.neutral[600],
// //           bg: theme.neutral[100],
// //           label: status || 'Unknown'
// //         };
// //     }
// //   };

// //   // eslint-disable-next-line no-unused-vars
// //   const sectionIcons = {
// //     'Personal Information': PersonIcon,
// //     'Passport Information': DocumentIcon,
// //     'Contact Information': PersonIcon,
// //     'Travel Information': TravelIcon,
// //     'Work & Education': WorkIcon,
// //     'Security and Background': SecurityIcon,
// //   };

// //   if (loading) {
// //     return (
// //       <Box sx={{
// //         bgcolor: theme.neutral[50],
// //         minHeight: '100vh',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center'
// //       }}>
// //         <Card elevation={0} sx={{ p: 6, textAlign: 'center', maxWidth: 400 }}>
// //           <CircularProgress
// //             size={56}
// //             thickness={4}
// //             sx={{
// //               color: theme.primary.main,
// //               mb: 3
// //             }}
// //           />
// //           <Typography variant="h6" sx={{ color: theme.neutral[700], mb: 1 }}>
// //             Loading Application
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary">
// //             Retrieving your DS-160 information...
// //           </Typography>
// //         </Card>
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
// //         <Container maxWidth="sm">
// //           <Alert
// //             severity="error"
// //             sx={{
// //               borderRadius: 2,
// //               '& .MuiAlert-icon': { fontSize: 28 }
// //             }}
// //           >
// //             <Typography variant="h6" sx={{ mb: 1 }}>
// //               Unable to Load Application
// //             </Typography>
// //             <Typography variant="body2">
// //               {error}
// //             </Typography>
// //           </Alert>
// //         </Container>
// //       </Box>
// //     );
// //   }

// //   if (!formData) {
// //     return (
// //       <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
// //         <Container maxWidth="sm">
// //           <Card elevation={0} sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
// //             <Avatar sx={{
// //               bgcolor: theme.primary.surface,
// //               color: theme.primary.main,
// //               width: 64,
// //               height: 64,
// //               mx: 'auto',
// //               mb: 3
// //             }}>
// //               <DocumentIcon fontSize="large" />
// //             </Avatar>
// //             <Typography variant="h5" sx={{ color: theme.neutral[900], mb: 2 }}>
// //               No Application Found
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary">
// //               You don't have any DS-160 applications yet.
// //             </Typography>
// //           </Card>
// //         </Container>
// //       </Box>
// //     );
// //   }

// //   const statusConfig = getStatusConfig(formData.status);
// //   const StatusIcon = statusConfig.icon;

// //   return (
// //     <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh' }}>
// //       {/* Header */}
// //       <Box sx={{
// //         bgcolor: 'white',
// //         borderBottom: `1px solid ${theme.neutral[200]}`,
// //         py: 4
// //       }}>
// //         <Container maxWidth="lg">
// //           <Fade in timeout={800}>
// //             <Box>
// //               <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
// //                 <Avatar sx={{
// //                   bgcolor: theme.primary.main,
// //                   width: 48,
// //                   height: 48
// //                 }}>
// //                   <DocumentIcon />
// //                 </Avatar>
// //                 <Box>
// //                   <Typography variant="h4" sx={{
// //                     fontWeight: 700,
// //                     color: theme.neutral[900],
// //                     lineHeight: 1.2
// //                   }}>
// //                     DS-160 Application
// //                   </Typography>
// //                   <Typography variant="body1" color="text.secondary">
// //                     Nonimmigrant Visa Application
// //                   </Typography>
// //                 </Box>
// //               </Stack>

// //               <Grid container spacing={3} alignItems="center">
// //                 <Grid item xs={12} md={8}>
// //                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
// //                     <Box>
// //                       <Typography variant="caption" sx={{
// //                         color: theme.neutral[600],
// //                         textTransform: 'uppercase',
// //                         letterSpacing: 1,
// //                         fontWeight: 600
// //                       }}>
// //                         Application ID
// //                       </Typography>
// //                       <Typography variant="h6" sx={{
// //                         fontWeight: 600,
// //                         color: theme.neutral[900],
// //                         fontFamily: 'monospace'
// //                       }}>
// //                         {formData.applicationId || 'N/A'}
// //                       </Typography>
// //                     </Box>

// //                     <Box>
// //                       <Typography variant="caption" sx={{
// //                         color: theme.neutral[600],
// //                         textTransform: 'uppercase',
// //                         letterSpacing: 1,
// //                         fontWeight: 600
// //                       }}>
// //                         Status
// //                       </Typography>
// //                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                         <Chip
// //                           icon={<StatusIcon sx={{ fontSize: '18px !important' }} />}
// //                           label={statusConfig.label}
// //                           sx={{
// //                             bgcolor: statusConfig.bg,
// //                             color: statusConfig.color,
// //                             fontWeight: 600,
// //                             border: `1px solid ${statusConfig.color}20`,
// //                             '& .MuiChip-icon': {
// //                               color: 'inherit'
// //                             }
// //                           }}
// //                         />
// //                       </Box>
// //                     </Box>
// //                   </Stack>
// //                 </Grid>

// //                 <Grid item xs={12} md={4}>
// //                   <Stack
// //                     direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
// //                     spacing={2}
// //                     sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
// //                   >
// //                     <Button
// //                       variant="contained"
// //                       size="large"
// //                       startIcon={
// //                         downloadLoading ?
// //                           <CircularProgress size={20} color="inherit" /> :
// //                           <DownloadIcon />
// //                       }
// //                       onClick={handleDownloadPdf}
// //                       disabled={downloadLoading}
// //                       sx={{
// //                         bgcolor: theme.primary.main,
// //                         px: 3,
// //                         py: 1.5,
// //                         borderRadius: 2,
// //                         fontWeight: 600,
// //                         textTransform: 'none',
// //                         fontSize: '0.95rem',
// //                         boxShadow: `0 4px 12px ${theme.primary.main}25`,
// //                         '&:hover': {
// //                           bgcolor: theme.primary.dark,
// //                           transform: 'translateY(-1px)',
// //                           boxShadow: `0 6px 20px ${theme.primary.main}30`,
// //                         },
// //                         '&:disabled': {
// //                           bgcolor: theme.neutral[300],
// //                         },
// //                         transition: 'all 0.2s ease'
// //                       }}
// //                     >
// //                       {downloadLoading ? 'Downloading...' : 'Download PDF'}
// //                     </Button>

// //                     <Button
// //                       variant="outlined"
// //                       size="large"
// //                       startIcon={<DocIcon />}
// //                       disabled
// //                       sx={{
// //                         borderColor: theme.neutral[300],
// //                         color: theme.neutral[600],
// //                         px: 3,
// //                         py: 1.5,
// //                         borderRadius: 2,
// //                         fontWeight: 600,
// //                         textTransform: 'none',
// //                         fontSize: '0.95rem',
// //                       }}
// //                     >
// //                       Download DOCS
// //                     </Button>
// //                   </Stack>
// //                 </Grid>
// //               </Grid>
// //             </Box>
// //           </Fade>
// //         </Container>
// //       </Box>

// //       {/* Content */}
// //       <Container maxWidth="lg" sx={{ py: 6 }}>
// //         <Slide direction="up" in timeout={600}>
// //           <Grid container spacing={3}>
// //             {/* Main sections in clean cards */}
// //             {[
// //               { title: 'Personal Information', data: formData.personalInfo, icon: PersonIcon },
// //               { title: 'Passport Information', data: formData.passportInfo, icon: DocumentIcon },
// //               { title: 'Contact Information', data: formData.contactInfo, icon: PersonIcon },
// //               { title: 'Travel Information', data: formData.travelInfo, icon: TravelIcon },
// //               { title: 'Previous U.S. Travel', data: formData.previousUSTravel, span: 12 },
// //               { title: 'International Travel History', data: formData.internationalTravelHistory, span: 12 },
// //               { title: 'U.S. Point of Contact', data: formData.usContact },
// //               { title: 'Family Information', data: formData.familyInfo },
// //               { title: 'Work & Education', data: formData.workEducation, icon: WorkIcon, span: 12 },
// //               { title: 'SEVIS Information', data: formData.sevisInfo },
// //               { title: 'Security and Background', data: formData.security, icon: SecurityIcon },
// //               { title: 'Additional Contacts', data: formData.additionalContacts },
// //               { title: 'Social Media', data: formData.socialMedia },
// //               { title: 'Applicant Statement', data: formData.applicantStatement, span: 12 },
// //               { title: 'Photograph', data: formData.photograph }
// //               // eslint-disable-next-line no-unused-vars
// //             ].map((section, index) => {
// //               const IconComponent = section.icon;
// //               return (
// //                 <Grid item xs={12} md={section.span || 6} key={section.title}>
// //                   <Card
// //                     elevation={0}
// //                     sx={{
// //                       height: '100%',
// //                       border: `1px solid ${theme.neutral[200]}`,
// //                       borderRadius: 2,
// //                       overflow: 'hidden',
// //                       transition: 'all 0.2s ease',
// //                       '&:hover': {
// //                         borderColor: theme.primary.light,
// //                         transform: 'translateY(-2px)',
// //                         boxShadow: `0 8px 25px ${theme.primary.main}08`
// //                       }
// //                     }}
// //                   >
// //                     <Box sx={{
// //                       bgcolor: theme.neutral[50],
// //                       px: 3,
// //                       py: 2,
// //                       borderBottom: `1px solid ${theme.neutral[200]}`
// //                     }}>
// //                       <Stack direction="row" alignItems="center" spacing={2}>
// //                         {IconComponent && (
// //                           <Avatar sx={{
// //                             bgcolor: theme.primary.surface,
// //                             color: theme.primary.main,
// //                             width: 32,
// //                             height: 32
// //                           }}>
// //                             <IconComponent sx={{ fontSize: 18 }} />
// //                           </Avatar>
// //                         )}
// //                         <Typography variant="h6" sx={{
// //                           fontWeight: 600,
// //                           color: theme.neutral[900],
// //                           fontSize: '1.1rem'
// //                         }}>
// //                           {section.title}
// //                         </Typography>
// //                       </Stack>
// //                     </Box>
// //                     <CardContent sx={{ p: 3 }}>
// //                       <InfoSection data={section.data} minimal />
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               );
// //             })}

// //             {/* Counselor Feedback - Special styling */}
// //             {formData.counselorFeedback && (
// //               <Grid item xs={12}>
// //                 <Card
// //                   elevation={0}
// //                   sx={{
// //                     border: `2px solid ${theme.primary.light}`,
// //                     borderRadius: 2,
// //                     bgcolor: theme.primary.surface,
// //                     overflow: 'hidden'
// //                   }}
// //                 >
// //                   <Box sx={{
// //                     bgcolor: theme.primary.main,
// //                     color: 'white',
// //                     px: 3,
// //                     py: 2
// //                   }}>
// //                     <Stack direction="row" alignItems="center" spacing={2}>
// //                       <Avatar sx={{
// //                         bgcolor: 'rgba(255,255,255,0.2)',
// //                         color: 'white',
// //                         width: 32,
// //                         height: 32
// //                       }}>
// //                         <PersonIcon sx={{ fontSize: 18 }} />
// //                       </Avatar>
// //                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
// //                         Counselor Feedback
// //                       </Typography>
// //                     </Stack>
// //                   </Box>
// //                   <CardContent sx={{ p: 3 }}>
// //                     <InfoSection
// //                       data={{ Feedback: formData.counselorFeedback }}
// //                       minimal
// //                     />
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             )}
// //           </Grid>
// //         </Slide>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Ds160SummaryPage;

// // src/pages/Ds160SummaryPage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Card,
//   CardContent,
//   Chip,
//   Grid,
//   Stack,
//   Avatar,
//   Fade,
//   Slide
// } from '@mui/material';
// import {
//   PictureAsPdf as PdfIcon,
//   Description as DocIcon,
//   CheckCircle as CheckIcon,
//   Schedule as PendingIcon,
//   Error as ErrorIcon,
//   FileDownload as DownloadIcon,
//   Assignment as DocumentIcon,
//   Person as PersonIcon,
//   Flight as TravelIcon,
//   Work as WorkIcon,
//   Security as SecurityIcon,
//   CameraAlt as CameraIcon
// } from '@mui/icons-material';
// import { getMyDs160, downloadDs160Pdf } from '../services/ds160Service';
// import InfoSection from '../components/summary/InfoSection';

// const Ds160SummaryPage = () => {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [downloadLoading, setDownloadLoading] = useState(false);

//   // Clean green theme with modern colors
//   const theme = {
//     primary: {
//       main: '#059669',      // Emerald 600
//       light: '#10B981',     // Emerald 500
//       dark: '#047857',      // Emerald 700
//       surface: '#ECFDF5',   // Emerald 50
//     },
//     neutral: {
//       50: '#F9FAFB',
//       100: '#F3F4F6',
//       200: '#E5E7EB',
//       300: '#D1D5DB',
//       600: '#4B5563',
//       700: '#374151',
//       900: '#111827',
//     },
//     status: {
//       success: '#10B981',
//       warning: '#F59E0B',
//       error: '#EF4444',
//       info: '#3B82F6',
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await getMyDs160();
//         setFormData(data);
//       } catch (err) {
//         setError('Failed to load DS-160 summary data.', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   const handleDownloadPdf = async () => {
//     if (!formData?.applicationId) return;
//     setDownloadLoading(true);
//     try {
//       const pdfBlob = await downloadDs160Pdf(formData.applicationId);
//       const url = window.URL.createObjectURL(new Blob([pdfBlob]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `DS-160_${formData.applicationId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (err) {
//       setError('Failed to download PDF.', err);
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const getStatusConfig = (status) => {
//     const statusLower = status?.toLowerCase();
//     switch (statusLower) {
//       case 'completed':
//       case 'approved':
//         return {
//           icon: CheckIcon,
//           color: theme.status.success,
//           bg: '#ECFDF5',
//           label: 'Completed'
//         };
//       case 'pending':
//       case 'in review':
//         return {
//           icon: PendingIcon,
//           color: theme.status.warning,
//           bg: '#FFFBEB',
//           label: 'Pending Review'
//         };
//       case 'rejected':
//       case 'error':
//         return {
//           icon: ErrorIcon,
//           color: theme.status.error,
//           bg: '#FEF2F2',
//           label: 'Needs Attention'
//         };
//       default:
//         return {
//           icon: PendingIcon,
//           color: theme.neutral[600],
//           bg: theme.neutral[100],
//           label: status || 'Unknown'
//         };
//     }
//   };

//   // eslint-disable-next-line no-unused-vars
//   const sectionIcons = {
//     'Personal Information': PersonIcon,
//     'Passport Information': DocumentIcon,
//     'Contact Information': PersonIcon,
//     'Travel Information': TravelIcon,
//     'Work & Education': WorkIcon,
//     'Security and Background': SecurityIcon,
//     'Photograph': CameraIcon,
//   };

//   // Function to render photograph section
//   const renderPhotographSection = (photographData) => {
//     if (!photographData) {
//       return (
//         <Card
//           elevation={0}
//           sx={{
//             height: '100%',
//             border: `1px solid ${theme.neutral[200]}`,
//             borderRadius: 2,
//             overflow: 'hidden',
//             transition: 'all 0.2s ease',
//             '&:hover': {
//               borderColor: theme.primary.light,
//               transform: 'translateY(-2px)',
//               boxShadow: `0 8px 25px ${theme.primary.main}08`
//             }
//           }}
//         >
//           <Box sx={{
//             bgcolor: theme.neutral[50],
//             px: 3,
//             py: 2,
//             borderBottom: `1px solid ${theme.neutral[200]}`
//           }}>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar sx={{
//                 bgcolor: theme.primary.surface,
//                 color: theme.primary.main,
//                 width: 32,
//                 height: 32
//               }}>
//                 <CameraIcon sx={{ fontSize: 18 }} />
//               </Avatar>
//               <Typography variant="h6" sx={{
//                 fontWeight: 600,
//                 color: theme.neutral[900],
//                 fontSize: '1.1rem'
//               }}>
//                 Photograph
//               </Typography>
//             </Stack>
//           </Box>
//           <CardContent sx={{ p: 3, textAlign: 'center' }}>
//             <Typography variant="body2" color="text.secondary">
//               No photograph available
//             </Typography>
//           </CardContent>
//         </Card>
//       );
//     }

//     // Handle different data structures - could be a string or object with properties
//     const imageSrc = typeof photographData === 'string'
//       ? photographData
//       : photographData.String || photographData.data;

//     const uploadDate = photographData.uploadDate
//       ? new Date(photographData.uploadDate).toLocaleDateString()
//       : 'N/A';

//     const meetsRequirements = photographData.meetsRequirements !== undefined
//       ? (photographData.meetsRequirements ? 'Yes' : 'No')
//       : 'N/A';

//     return (
//       <Card
//         elevation={0}
//         sx={{
//           height: '100%',
//           border: `1px solid ${theme.neutral[200]}`,
//           borderRadius: 2,
//           overflow: 'hidden',
//           transition: 'all 0.2s ease',
//           '&:hover': {
//             borderColor: theme.primary.light,
//             transform: 'translateY(-2px)',
//             boxShadow: `0 8px 25px ${theme.primary.main}08`
//           }
//         }}
//       >
//         <Box sx={{
//           bgcolor: theme.neutral[50],
//           px: 3,
//           py: 2,
//           borderBottom: `1px solid ${theme.neutral[200]}`
//         }}>
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Avatar sx={{
//               bgcolor: theme.primary.surface,
//               color: theme.primary.main,
//               width: 32,
//               height: 32
//             }}>
//               <CameraIcon sx={{ fontSize: 18 }} />
//             </Avatar>
//             <Typography variant="h6" sx={{
//               fontWeight: 600,
//               color: theme.neutral[900],
//               fontSize: '1.1rem'
//             }}>
//               Photograph
//             </Typography>
//           </Stack>
//         </Box>
//         <CardContent sx={{ p: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//             {imageSrc ? (
//               <>
//                 <Box
//                   component="img"
//                   src={imageSrc}
//                   alt="Applicant Photograph"
//                   sx={{
//                     width: '100%',
//                     maxWidth: 300,
//                     height: 'auto',
//                     borderRadius: 1,
//                     border: `1px solid ${theme.neutral[200]}`,
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//                   }}
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'block';
//                   }}
//                 />
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ display: 'none' }}
//                 >
//                   Unable to load photograph
//                 </Typography>
//               </>
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 No photograph available
//               </Typography>
//             )}

//             <Box sx={{ width: '100%', mt: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" sx={{ color: theme.neutral[600], fontWeight: 600 }}>
//                     Upload Date:
//                   </Typography>
//                   <Typography variant="body2">
//                     {uploadDate}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" sx={{ color: theme.neutral[600], fontWeight: 600 }}>
//                     Meets Requirements:
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: meetsRequirements === 'Yes' ? theme.status.success :
//                         meetsRequirements === 'No' ? theme.status.error :
//                           theme.neutral[600],
//                       fontWeight: meetsRequirements !== 'N/A' ? 600 : 'normal'
//                     }}
//                   >
//                     {meetsRequirements}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     );
//   };

//   if (loading) {
//     return (
//       <Box sx={{
//         bgcolor: theme.neutral[50],
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <Card elevation={0} sx={{ p: 6, textAlign: 'center', maxWidth: 400 }}>
//           <CircularProgress
//             size={56}
//             thickness={4}
//             sx={{
//               color: theme.primary.main,
//               mb: 3
//             }}
//           />
//           <Typography variant="h6" sx={{ color: theme.neutral[700], mb: 1 }}>
//             Loading Application
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Retrieving your DS-160 information...
//           </Typography>
//         </Card>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
//         <Container maxWidth="sm">
//           <Alert
//             severity="error"
//             sx={{
//               borderRadius: 2,
//               '& .MuiAlert-icon': { fontSize: 28 }
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 1 }}>
//               Unable to Load Application
//             </Typography>
//             <Typography variant="body2">
//               {error}
//             </Typography>
//           </Alert>
//         </Container>
//       </Box>
//     );
//   }

//   if (!formData) {
//     return (
//       <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
//         <Container maxWidth="sm">
//           <Card elevation={0} sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
//             <Avatar sx={{
//               bgcolor: theme.primary.surface,
//               color: theme.primary.main,
//               width: 64,
//               height: 64,
//               mx: 'auto',
//               mb: 3
//             }}>
//               <DocumentIcon fontSize="large" />
//             </Avatar>
//             <Typography variant="h5" sx={{ color: theme.neutral[900], mb: 2 }}>
//               No Application Found
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               You don't have any DS-160 applications yet.
//             </Typography>
//           </Card>
//         </Container>
//       </Box>
//     );
//   }

//   const statusConfig = getStatusConfig(formData.status);
//   const StatusIcon = statusConfig.icon;

//   return (
//     <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh' }}>
//       {/* Header */}
//       <Box sx={{
//         bgcolor: 'white',
//         borderBottom: `1px solid ${theme.neutral[200]}`,
//         py: 4
//       }}>
//         <Container maxWidth="lg">
//           <Fade in timeout={800}>
//             <Box>
//               <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//                 <Avatar sx={{
//                   bgcolor: theme.primary.main,
//                   width: 48,
//                   height: 48
//                 }}>
//                   <DocumentIcon />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h4" sx={{
//                     fontWeight: 700,
//                     color: theme.neutral[900],
//                     lineHeight: 1.2
//                   }}>
//                     DS-160 Application
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     Nonimmigrant Visa Application
//                   </Typography>
//                 </Box>
//               </Stack>

//               <Grid container spacing={3} alignItems="center">
//                 <Grid item xs={12} md={8}>
//                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
//                     <Box>
//                       <Typography variant="caption" sx={{
//                         color: theme.neutral[600],
//                         textTransform: 'uppercase',
//                         letterSpacing: 1,
//                         fontWeight: 600
//                       }}>
//                         Application ID
//                       </Typography>
//                       <Typography variant="h6" sx={{
//                         fontWeight: 600,
//                         color: theme.neutral[900],
//                         fontFamily: 'monospace'
//                       }}>
//                         {formData.applicationId || 'N/A'}
//                       </Typography>
//                     </Box>

//                     <Box>
//                       <Typography variant="caption" sx={{
//                         color: theme.neutral[600],
//                         textTransform: 'uppercase',
//                         letterSpacing: 1,
//                         fontWeight: 600
//                       }}>
//                         Status
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Chip
//                           icon={<StatusIcon sx={{ fontSize: '18px !important' }} />}
//                           label={statusConfig.label}
//                           sx={{
//                             bgcolor: statusConfig.bg,
//                             color: statusConfig.color,
//                             fontWeight: 600,
//                             border: `1px solid ${statusConfig.color}20`,
//                             '& .MuiChip-icon': {
//                               color: 'inherit'
//                             }
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                   </Stack>
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <Stack
//                     direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
//                     spacing={2}
//                     sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
//                   >
//                     <Button
//                       variant="contained"
//                       size="large"
//                       startIcon={
//                         downloadLoading ?
//                           <CircularProgress size={20} color="inherit" /> :
//                           <DownloadIcon />
//                       }
//                       onClick={handleDownloadPdf}
//                       disabled={downloadLoading}
//                       sx={{
//                         bgcolor: theme.primary.main,
//                         px: 3,
//                         py: 1.5,
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         textTransform: 'none',
//                         fontSize: '0.95rem',
//                         boxShadow: `0 4px 12px ${theme.primary.main}25`,
//                         '&:hover': {
//                           bgcolor: theme.primary.dark,
//                           transform: 'translateY(-1px)',
//                           boxShadow: `0 6px 20px ${theme.primary.main}30`,
//                         },
//                         '&:disabled': {
//                           bgcolor: theme.neutral[300],
//                         },
//                         transition: 'all 0.2s ease'
//                       }}
//                     >
//                       {downloadLoading ? 'Downloading...' : 'Download PDF'}
//                     </Button>

//                     <Button
//                       variant="outlined"
//                       size="large"
//                       startIcon={<DocIcon />}
//                       disabled
//                       sx={{
//                         borderColor: theme.neutral[300],
//                         color: theme.neutral[600],
//                         px: 3,
//                         py: 1.5,
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         textTransform: 'none',
//                         fontSize: '0.95rem',
//                       }}
//                     >
//                       Download DOCS
//                     </Button>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Fade>
//         </Container>
//       </Box>

//       {/* Content */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Slide direction="up" in timeout={600}>
//           <Grid container spacing={3}>
//             {/* Main sections in clean cards */}
//             {[
//               { title: 'Personal Information', data: formData.personalInfo, icon: PersonIcon },
//               { title: 'Passport Information', data: formData.passportInfo, icon: DocumentIcon },
//               { title: 'Contact Information', data: formData.contactInfo, icon: PersonIcon },
//               { title: 'Travel Information', data: formData.travelInfo, icon: TravelIcon },
//               { title: 'Previous U.S. Travel', data: formData.previousUSTravel, span: 12 },
//               { title: 'International Travel History', data: formData.internationalTravelHistory, span: 12 },
//               { title: 'U.S. Point of Contact', data: formData.usContact },
//               { title: 'Family Information', data: formData.familyInfo },
//               { title: 'Work & Education', data: formData.workEducation, icon: WorkIcon, span: 12 },
//               { title: 'SEVIS Information', data: formData.sevisInfo },
//               { title: 'Security and Background', data: formData.security, icon: SecurityIcon },
//               { title: 'Additional Contacts', data: formData.additionalContacts },
//               { title: 'Social Media', data: formData.socialMedia },
//               { title: 'Applicant Statement', data: formData.applicantStatement, span: 12 }
//               // Photograph section is handled separately below
//             ].map((section, index) => {
//               const IconComponent = section.icon;
//               return (
//                 <Grid item xs={12} md={section.span || 6} key={section.title}>
//                   <Card
//                     elevation={0}
//                     sx={{
//                       height: '100%',
//                       border: `1px solid ${theme.neutral[200]}`,
//                       borderRadius: 2,
//                       overflow: 'hidden',
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         borderColor: theme.primary.light,
//                         transform: 'translateY(-2px)',
//                         boxShadow: `0 8px 25px ${theme.primary.main}08`
//                       }
//                     }}
//                   >
//                     <Box sx={{
//                       bgcolor: theme.neutral[50],
//                       px: 3,
//                       py: 2,
//                       borderBottom: `1px solid ${theme.neutral[200]}`
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         {IconComponent && (
//                           <Avatar sx={{
//                             bgcolor: theme.primary.surface,
//                             color: theme.primary.main,
//                             width: 32,
//                             height: 32
//                           }}>
//                             <IconComponent sx={{ fontSize: 18 }} />
//                           </Avatar>
//                         )}
//                         <Typography variant="h6" sx={{
//                           fontWeight: 600,
//                           color: theme.neutral[900],
//                           fontSize: '1.1rem'
//                         }}>
//                           {section.title}
//                         </Typography>
//                       </Stack>
//                     </Box>
//                     <CardContent sx={{ p: 3 }}>
//                       <InfoSection data={section.data} minimal />
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}

//             {/* Photograph Section - Special handling */}
//             <Grid item xs={12} md={6}>
//               {renderPhotographSection(formData.photograph)}
//             </Grid>

//             {/* Counselor Feedback - Special styling */}
//             {formData.counselorFeedback && (
//               <Grid item xs={12}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     border: `2px solid ${theme.primary.light}`,
//                     borderRadius: 2,
//                     bgcolor: theme.primary.surface,
//                     overflow: 'hidden'
//                   }}
//                 >
//                   <Box sx={{
//                     bgcolor: theme.primary.main,
//                     color: 'white',
//                     px: 3,
//                     py: 2
//                   }}>
//                     <Stack direction="row" alignItems="center" spacing={2}>
//                       <Avatar sx={{
//                         bgcolor: 'rgba(255,255,255,0.2)',
//                         color: 'white',
//                         width: 32,
//                         height: 32
//                       }}>
//                         <PersonIcon sx={{ fontSize: 18 }} />
//                       </Avatar>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         Counselor Feedback
//                       </Typography>
//                     </Stack>
//                   </Box>
//                   <CardContent sx={{ p: 3 }}>
//                     <InfoSection
//                       data={{ Feedback: formData.counselorFeedback }}
//                       minimal
//                     />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             )}
//           </Grid>
//         </Slide>
//       </Container>
//     </Box>
//   );
// };

// export default Ds160SummaryPage;

// src/pages/Ds160SummaryPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Avatar,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  Error as ErrorIcon,
  FileDownload as DownloadIcon,
  Assignment as DocumentIcon,
  Person as PersonIcon,
  Flight as TravelIcon,
  Work as WorkIcon,
  Security as SecurityIcon,
  CameraAlt as CameraIcon,
  Close as CloseIcon,
  ZoomIn as ZoomIcon
} from '@mui/icons-material';
import { getMyDs160, downloadDs160Pdf, getPhotograph } from '../services/ds160Service';
import InfoSection from '../components/summary/InfoSection';

const Ds160SummaryPage = () => {
  const [formData, setFormData] = useState(null);
  const [photographData, setPhotographData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);

  // Clean green theme with modern colors
  const theme = {
    primary: {
      main: '#059669',
      light: '#10B981',
      dark: '#047857',
      surface: '#ECFDF5',
    },
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      600: '#4B5563',
      700: '#374151',
      900: '#111827',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMyDs160();
        setFormData(data);

        // Load photograph separately if needed
        if (data.photograph && data.photograph.id) {
          setPhotoLoading(true);
          try {
            const photoData = await getPhotograph(data.photograph.id);
            setPhotographData(photoData);
          } catch (photoError) {
            console.error('Failed to load photograph:', photoError);
          } finally {
            setPhotoLoading(false);
          }
        }
      } catch (err) {
        setError('Failed to load DS-160 summary data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDownloadPdf = async () => {
    if (!formData?.applicationId) return;
    setDownloadLoading(true);
    try {
      const pdfBlob = await downloadDs160Pdf(formData.applicationId);
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `DS-160_${formData.applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Failed to download PDF.');
      console.error(err);
    } finally {
      setDownloadLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'approved':
        return {
          icon: CheckIcon,
          color: theme.status.success,
          bg: '#ECFDF5',
          label: 'Completed'
        };
      case 'pending':
      case 'in review':
        return {
          icon: PendingIcon,
          color: theme.status.warning,
          bg: '#FFFBEB',
          label: 'Pending Review'
        };
      case 'rejected':
      case 'error':
        return {
          icon: ErrorIcon,
          color: theme.status.error,
          bg: '#FEF2F2',
          label: 'Needs Attention'
        };
      default:
        return {
          icon: PendingIcon,
          color: theme.neutral[600],
          bg: theme.neutral[100],
          label: status || 'Unknown'
        };
    }
  };

  // Function to render photograph section
  const renderPhotographSection = (photoData) => {
    const imageSrc = photoData?.base64Data || photoData?.url;
    const uploadDate = photoData?.uploadDate
      ? new Date(photoData.uploadDate).toLocaleDateString()
      : 'N/A';

    const meetsRequirements = photoData?.meetsRequirements !== undefined
      ? (photoData.meetsRequirements ? 'Yes' : 'No')
      : 'N/A';

    return (
      <Card
        elevation={0}
        sx={{
          height: '100%',
          border: `1px solid ${theme.neutral[200]}`,
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: theme.primary.light,
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${theme.primary.main}08`
          }
        }}
      >
        <Box sx={{
          bgcolor: theme.neutral[50],
          px: 3,
          py: 2,
          borderBottom: `1px solid ${theme.neutral[200]}`
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{
              bgcolor: theme.primary.surface,
              color: theme.primary.main,
              width: 32,
              height: 32
            }}>
              <CameraIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: theme.neutral[900],
              fontSize: '1.1rem'
            }}>
              Photograph
            </Typography>
          </Stack>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {photoLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={40} />
              </Box>
            ) : imageSrc ? (
              <>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="Applicant Photograph"
                    sx={{
                      width: '100%',
                      maxWidth: 300,
                      height: 'auto',
                      borderRadius: 1,
                      border: `1px solid ${theme.neutral[200]}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setPhotoDialogOpen(true)}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                    }}
                    size="small"
                    onClick={() => setPhotoDialogOpen(true)}
                  >
                    <ZoomIcon />
                  </IconButton>
                </Box>

                <Dialog
                  open={photoDialogOpen}
                  onClose={() => setPhotoDialogOpen(false)}
                  maxWidth="md"
                  fullWidth
                >
                  <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Applicant Photograph</Typography>
                      <IconButton onClick={() => setPhotoDialogOpen(false)}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </DialogTitle>
                  <DialogContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      component="img"
                      src={imageSrc}
                      alt="Applicant Photograph"
                      sx={{
                        width: '100%',
                        maxWidth: 400,
                        height: 'auto',
                        borderRadius: 1,
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No photograph available
              </Typography>
            )}

            <Box sx={{ width: '100%', mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: theme.neutral[600], fontWeight: 600 }}>
                    Upload Date:
                  </Typography>
                  <Typography variant="body2">
                    {uploadDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: theme.neutral[600], fontWeight: 600 }}>
                    Meets Requirements:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: meetsRequirements === 'Yes' ? theme.status.success :
                        meetsRequirements === 'No' ? theme.status.error :
                          theme.neutral[600],
                      fontWeight: meetsRequirements !== 'N/A' ? 600 : 'normal'
                    }}
                  >
                    {meetsRequirements}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{
        bgcolor: theme.neutral[50],
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card elevation={0} sx={{ p: 6, textAlign: 'center', maxWidth: 400 }}>
          <CircularProgress
            size={56}
            thickness={4}
            sx={{
              color: theme.primary.main,
              mb: 3
            }}
          />
          <Typography variant="h6" sx={{ color: theme.neutral[700], mb: 1 }}>
            Loading Application
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Retrieving your DS-160 information...
          </Typography>
        </Card>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
        <Container maxWidth="sm">
          <Alert
            severity="error"
            sx={{
              borderRadius: 2,
              '& .MuiAlert-icon': { fontSize: 28 }
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Unable to Load Application
            </Typography>
            <Typography variant="body2">
              {error}
            </Typography>
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!formData) {
    return (
      <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh', py: 8 }}>
        <Container maxWidth="sm">
          <Card elevation={0} sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
            <Avatar sx={{
              bgcolor: theme.primary.surface,
              color: theme.primary.main,
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 3
            }}>
              <DocumentIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ color: theme.neutral[900], mb: 2 }}>
              No Application Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You don't have any DS-160 applications yet.
            </Typography>
          </Card>
        </Container>
      </Box>
    );
  }

  const statusConfig = getStatusConfig(formData.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Box sx={{ bgcolor: theme.neutral[50], minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{
        bgcolor: 'white',
        borderBottom: `1px solid ${theme.neutral[200]}`,
        py: 4
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Avatar sx={{
                  bgcolor: theme.primary.main,
                  width: 48,
                  height: 48
                }}>
                  <DocumentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{
                    fontWeight: 700,
                    color: theme.neutral[900],
                    lineHeight: 1.2
                  }}>
                    DS-160 Application
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Nonimmigrant Visa Application
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <Box>
                      <Typography variant="caption" sx={{
                        color: theme.neutral[600],
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontWeight: 600
                      }}>
                        Application ID
                      </Typography>
                      <Typography variant="h6" sx={{
                        fontWeight: 600,
                        color: theme.neutral[900],
                        fontFamily: 'monospace'
                      }}>
                        {formData.applicationId || 'N/A'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{
                        color: theme.neutral[600],
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontWeight: 600
                      }}>
                        Status
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: '18px !important' }} />}
                          label={statusConfig.label}
                          sx={{
                            bgcolor: statusConfig.bg,
                            color: statusConfig.color,
                            fontWeight: 600,
                            border: `1px solid ${statusConfig.color}20`,
                            '& .MuiChip-icon': {
                              color: 'inherit'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
                    spacing={2}
                    sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={
                        downloadLoading ?
                          <CircularProgress size={20} color="inherit" /> :
                          <DownloadIcon />
                      }
                      onClick={handleDownloadPdf}
                      disabled={downloadLoading}
                      sx={{
                        bgcolor: theme.primary.main,
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        boxShadow: `0 4px 12px ${theme.primary.main}25`,
                        '&:hover': {
                          bgcolor: theme.primary.dark,
                          transform: 'translateY(-1px)',
                          boxShadow: `0 6px 20px ${theme.primary.main}30`,
                        },
                        '&:disabled': {
                          bgcolor: theme.neutral[300],
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {downloadLoading ? 'Downloading...' : 'Download PDF'}
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<DocIcon />}
                      disabled
                      sx={{
                        borderColor: theme.neutral[300],
                        color: theme.neutral[600],
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                      }}
                    >
                      Download DOCS
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Slide direction="up" in timeout={600}>
          <Grid container spacing={3}>
            {/* Main sections in clean cards */}
            {[
              { title: 'Personal Information', data: formData.personalInfo, icon: PersonIcon },
              { title: 'Passport Information', data: formData.passportInfo, icon: DocumentIcon },
              { title: 'Contact Information', data: formData.contactInfo, icon: PersonIcon },
              { title: 'Travel Information', data: formData.travelInfo, icon: TravelIcon },
              { title: 'Previous U.S. Travel', data: formData.previousUSTravel, span: 12 },
              { title: 'International Travel History', data: formData.internationalTravelHistory, span: 12 },
              { title: 'U.S. Point of Contact', data: formData.usContact },
              { title: 'Family Information', data: formData.familyInfo },
              { title: 'Work & Education', data: formData.workEducation, icon: WorkIcon, span: 12 },
              { title: 'SEVIS Information', data: formData.sevisInfo },
              { title: 'Security and Background', data: formData.security, icon: SecurityIcon },
              { title: 'Additional Contacts', data: formData.additionalContacts },
              { title: 'Social Media', data: formData.socialMedia },
              { title: 'Applicant Statement', data: formData.applicantStatement, span: 12 }
            ].map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Grid item xs={12} md={section.span || 6} key={section.title}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: `1px solid ${theme.neutral[200]}`,
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: theme.primary.light,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${theme.primary.main}08`
                      }
                    }}
                  >
                    <Box sx={{
                      bgcolor: theme.neutral[50],
                      px: 3,
                      py: 2,
                      borderBottom: `1px solid ${theme.neutral[200]}`
                    }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {IconComponent && (
                          <Avatar sx={{
                            bgcolor: theme.primary.surface,
                            color: theme.primary.main,
                            width: 32,
                            height: 32
                          }}>
                            <IconComponent sx={{ fontSize: 18 }} />
                          </Avatar>
                        )}
                        <Typography variant="h6" sx={{
                          fontWeight: 600,
                          color: theme.neutral[900],
                          fontSize: '1.1rem'
                        }}>
                          {section.title}
                        </Typography>
                      </Stack>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <InfoSection data={section.data} minimal />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

            {/* Photograph Section - Special handling */}
            <Grid item xs={12} md={6}>
              {renderPhotographSection(photographData || formData.photograph)}
            </Grid>

            {/* Counselor Feedback - Special styling */}
            {formData.counselorFeedback && (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    border: `2px solid ${theme.primary.light}`,
                    borderRadius: 2,
                    bgcolor: theme.primary.surface,
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{
                    bgcolor: theme.primary.main,
                    color: 'white',
                    px: 3,
                    py: 2
                  }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        width: 32,
                        height: 32
                      }}>
                        <PersonIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Counselor Feedback
                      </Typography>
                    </Stack>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <InfoSection
                      data={{ Feedback: formData.counselorFeedback }}
                      minimal
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Slide>
      </Container>
    </Box>
  );
};

export default Ds160SummaryPage;