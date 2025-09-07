

// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Stepper,
//   Step,
//   StepLabel,
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Alert,
//   CircularProgress,
//   Divider,
//   AppBar,
//   Toolbar,
//   useMediaQuery,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from '@mui/material';
// import {
//   Save as SaveIcon,
//   NavigateNext as NextIcon,
//   NavigateBefore as BackIcon,
//   CheckCircle as CheckCircleIcon,
//   Info as InfoIcon,
//   ViewWeek as ViewWeekIcon
// } from '@mui/icons-material';
// import {
//   getMyDs160,
//   updateMyDs160,
//   submitDs160ForReview
// } from '../services/ds160Service';
// import PersonalInfoStep from '../components/tabs/formSteps/PersonalInfoStep';
// import PassportInfoStep from '../components/tabs/formSteps/PassportInfoStep';
// import ContactInfoStep from '../components/tabs/formSteps/ContactInfoStep';
// import TravelInfoStep from '../components/tabs/formSteps/TravelInfoStep';
// import TravelHistoryStep from '../components/tabs/formSteps/TravelHistoryStep';
// import UsContactStep from '../components/tabs/formSteps/UsContactStep';
// import FamilyInfoStep from '../components/tabs/formSteps/FamilyInfoStep';
// import WorkEducationStep from '../components/tabs/formSteps/WorkEducationStep';
// import SevisInfoStep from '../components/tabs/formSteps/SevisInfoStep';
// import SecurityStep from '../components/tabs/formSteps/SecurityStep';
// import SocialMediaStep from '../components/tabs/formSteps/SocialMediaStep';
// import AdditionalContactsStep from '../components/tabs/formSteps/AdditionalContactsStep';
// import ApplicantStatementStep from '../components/tabs/formSteps/ApplicantStatementStep';
// import PhotoUploadStep from '../components/tabs/formSteps/PhotoUploadStep';

// const steps = [
//   'Personal Info ',
//   'Passport Info ',
//   'Contact Info ',
//   'Travel Info ',
//   'Travel History',
//   'US Contact',
//   'Family Info ',
//   'Work/Education',
//   'SEVIS Info ',
//   'Security Background',
//   'Social Media',
//   'Additional Contacts',
//   'Applicant Statement',
//   'Photograph'
// ];

// // Custom green and gray theme colors
// const greenPalette = {
//   light: '#81c784',
//   main: '#4caf50',
//   dark: '#388e3c',
//   contrastText: '#fff',
// };

// const grayPalette = {
//   50: '#fafafa',
//   100: '#f5f5f5',
//   200: '#eeeeee',
//   300: '#e0e0e0',
//   400: '#bdbdbd',
//   500: '#9e9e9e',
//   600: '#757575',
//   700: '#616161',
//   800: '#424242',
//   900: '#212121',
// };

// const Ds160Page = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     personalInfo: {
//       surname: '',
//       givenNames: '',
//       fullNameNative: '',
//       telecode: '',
//       hasOtherNames: false,
//       otherNamesList: [],
//       sex: '',
//       maritalStatus: '',
//       dateOfBirth: null,
//       birthCity: '',
//       birthState: '',
//       birthCountry: '',
//       nationality: '',
//       hasOtherNationality: false,
//       otherNationalities: [],
//       nationalIdNumber: '',
//       hasUsSocialSecurityNumber: false,
//       usSocialSecurityNumber: '',
//       hasUsTaxpayerId: false,
//       usTaxpayerIdNumber: '',
//     },
//     passportInfo: {
//       passportNumber: '',
//       passportBookNumber: '',
//       passportIssueDate: null,
//       passportExpiryDate: null,
//       passportIssueAuthority: '',
//       passportIssueCity: '',
//       passportIssueCountry: '',
//       isPassportLostOrStolen: false,
//       lostOrStolenDetails: '',
//     },
//     contactInfo: {
//       homeAddress: {
//         street: '',
//         city: '',
//         stateProvince: '',
//         postalCode: '',
//         country: '',
//       },
//       isMailingAddressDifferent: false,
//       mailingAddress: {
//         street: '',
//         city: '',
//         stateProvince: '',
//         postalCode: '',
//         country: '',
//       },
//       primaryPhoneNumber: '',
//       secondaryPhoneNumber: '',
//       email: '',
//       additionalEmails: [],
//     },
//     travelInfo: {
//       purposeOfTrip: '',
//       hasSpecificTravelPlans: false,
//       intendedArrivalDate: null,
//       intendedLengthOfStay: '',
//       addressInUS: '',
//       personPayingForTrip: '',
//       payerName: '',
//       payerRelationship: '',
//       payerAddress: '',
//       payerPhone: '',
//       payerEmail: '',
//       travelCompanions: [],
//     },
//     previousUSTravel: {
//       hasBeenToUS: false,
//       visits: [],
//       hasBeenIssuedUsVisa: false,
//       visaIssueDate: null,
//       visaFoilingNumber: '',
//       hasVisaBeenLostOrStolen: false,
//       lostOrStolenVisaDetails: '',
//       hasBeenRefusedUsVisa: false,
//       visaRefusalDetails: '',
//       hasBeenRefusedAdmissionToUS: false,
//       refusalDetails: '',
//       hasFiledUSImmigrationPetition: false,
//       immigrationPetitionDetails: '',
//     },
//     internationalTravelHistory: {
//       hasTraveledInternationally: false,
//       trips: [],
//     },
//     usContact: {
//       organizationOrPerson: 'Person',
//       contactName: '',
//       organizationName: '',
//       relationship: '',
//       contactPhone: '',
//       contactEmail: '',
//       contactAddress: '',
//     },
//     familyInfo: {
//       father: {
//         surname: '',
//         givenName: '',
//         dateOfBirth: null,
//         isInUS: false,
//         usStatus: '',
//       },
//       mother: {
//         surname: '',
//         givenName: '',
//         dateOfBirth: null,
//         isInUS: false,
//         usStatus: '',
//       },
//       hasSpouse: false,
//       spouse: {
//         fullName: '',
//         dateOfBirth: null,
//         nationality: '',
//         address: '',
//         isInUS: false,
//         usStatus: '',
//       },
//       children: [],
//       siblings: [],
//       relativesInUS: [],
//     },
//     workEducation: {
//       presentOccupation: '',
//       isStudent: false,
//       current: {
//         occupation: '',
//         employerOrSchool: '',
//         address: '',
//         monthlySalary: '',
//         duties: '',
//         startDate: null,
//         supervisorName: '',
//         supervisorPhone: '',
//       },
//       previousEmployment: [],
//       educationalHistory: [],
//       otherTraining: [],
//       professionalMemberships: [],
//       specializedSkills: [],
//     },
//     sevisInfo: {
//       hasSevisId: false,
//       sevisId: '',
//       schoolProgramNumber: '',
//       schoolName: '',
//       courseOfStudy: '',
//       schoolAddress: '',
//       programStartDate: null,
//       programEndDate: null,
//     },
//     security: {
//       hasCommunicableDisease: false,
//       hasHarmfulPhysicalOrMentalDisorder: false,
//       isDrugAbuserOrAddict: false,
//       hasBeenArrested: false,
//       hasCriminalHistory: false,
//       hasViolatedDrugLaws: false,
//       hasBeenInvolvedInProstitution: false,
//       hasEngagedInMoneyLaundering: false,
//       hasCommitedFraud: false,
//       hasTterroristConnections: false,
//       hasEngagedInEspionage: false,
//       hasEngagedInGenocide: false,
//       hasBeenInvolvedInTorture: false,
//       hasBeenInvolvedInExtrajudicialKillings: false,
//       hasVisaOverstay: false,
//       hasBeenDeported: false,
//       hasHelpedOthersEnterUSIllegally: false,
//       isMemberOfTotalitarianParty: false,
//       hasParticipatedInPersecution: false,
//       details: {
//         communicableDisease: '',
//         mentalDisorder: '',
//         drugAbuse: '',
//         criminalHistory: '',
//         arrestDetails: '',
//         drugViolationDetails: '',
//         prostitutionDetails: '',
//         moneyLaunderingDetails: '',
//         fraudDetails: '',
//         terroristConnections: '',
//         espionageDetails: '',
//         genocideDetails: '',
//         tortureDetails: '',
//         extrajudicialKillings: '',
//         overstayDetails: '',
//         deportationDetails: '',
//         illegalEntryAssistance: '',
//         totalitarianPartyDetails: '',
//         persecutionDetails: '',
//         otherDetails: '',
//       }
//     },
//     additionalContacts: {
//       contactInHomeCountry: {
//         fullName: '',
//         relationship: '',
//         address: '',
//         phone: '',
//         email: '',
//       },
//       emergencyContact: {
//         fullName: '',
//         relationship: '',
//         address: '',
//         phone: '',
//         email: '',
//       }
//     },
//     socialMedia: {
//       platforms: [],
//       phoneNumbersUsedLast5Years: [],
//       emailAddressesUsedLast5Years: [],
//       internationalIdentityNumbers: [],
//     },
//     applicantStatement: {
//       hasReadAndUnderstood: false,
//       agreesInformationIsCorrect: false,
//       signature: '',
//       dateSigned: null,
//     },
//     photograph: {
//       meetsRequirements: false,
//       uploadDate: null,
//       filePath: '',
//     },
//     additionalInformation: {
//       explanations: '',
//       otherComments: ''
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [mobileStepperOpen, setMobileStepperOpen] = useState(false);
//   const isMobile = useMediaQuery('(max-width:900px)');

//   useEffect(() => {
//     loadFormData();
//   }, []);

//   const loadFormData = async () => {
//     try {
//       setLoading(true);
//       const data = await getMyDs160();
//       if (data) {
//         setFormData(data);
//       }
//     } catch (err) {
//       setError('Failed to load DS-160 form data');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//     window.scrollTo(0, 0);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//     window.scrollTo(0, 0);
//   };

//   const handleChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleNestedChange = (section, subsection, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [subsection]: {
//           ...prev[section][subsection],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       setError('');
//       await updateMyDs160(formData);
//       setSuccess('Form saved successfully');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to save form');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setSaving(true);
//       setError('');
//       const result = await submitDs160ForReview();
//       setSuccess('Form submitted for review successfully!');
//       await loadFormData();
//     } catch (err) {
//       setError(err.message || 'Failed to submit form for review');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <PersonalInfoStep
//             data={formData.personalInfo}
//             onChange={(field, value) => handleChange('personalInfo', field, value)}
//           />
//         );
//       case 1:
//         return (
//           <PassportInfoStep
//             data={formData.passportInfo}
//             onChange={(field, value) => handleChange('passportInfo', field, value)}
//           />
//         );
//       case 2:
//         return (
//           <ContactInfoStep
//             data={formData.contactInfo}
//             onChange={(field, value) => handleChange('contactInfo', field, value)}
//             onNestedChange={(subsection, field, value) =>
//               handleNestedChange('contactInfo', subsection, field, value)
//             }
//           />
//         );
//       case 3:
//         return (
//           <TravelInfoStep
//             data={formData.travelInfo}
//             onChange={(field, value) => handleChange('travelInfo', field, value)}
//           />
//         );
//       case 4:
//         return (
//           <TravelHistoryStep
//             usTravelData={formData.previousUSTravel}
//             internationalTravelData={formData.internationalTravelHistory}
//             onChange={(section, field, value) => handleChange(section, field, value)}
//           />
//         );
//       case 5:
//         return (
//           <UsContactStep
//             data={formData.usContact}
//             onChange={(field, value) => handleChange('usContact', field, value)}
//           />
//         );
//       case 6:
//         return (
//           <FamilyInfoStep
//             data={formData.familyInfo}
//             onChange={(field, value) => handleChange('familyInfo', field, value)}
//             onNestedChange={(subsection, field, value) =>
//               handleNestedChange('familyInfo', subsection, field, value)
//             }
//           />
//         );
//       case 7:
//         return (
//           <WorkEducationStep
//             data={formData.workEducation}
//             onChange={(field, value) => handleChange('workEducation', field, value)}
//             onNestedChange={(subsection, field, value) =>
//               handleNestedChange('workEducation', subsection, field, value)
//             }
//           />
//         );
//       case 8:
//         return (
//           <SevisInfoStep
//             data={formData.sevisInfo}
//             onChange={(field, value) => handleChange('sevisInfo', field, value)}
//           />
//         );
//       case 9:
//         return (
//           <SecurityStep
//             data={formData.security}
//             onChange={(field, value) => handleChange('security', field, value)}
//             onNestedChange={(subsection, field, value) =>
//               handleNestedChange('security', subsection, field, value)
//             }
//           />
//         );
//       case 10:
//         return (
//           <SocialMediaStep
//             data={formData.socialMedia}
//             onChange={(field, value) => handleChange('socialMedia', field, value)}
//           />
//         );
//       case 11:
//         return (
//           <AdditionalContactsStep
//             data={formData.additionalContacts}
//             onChange={(field, value) => handleChange('additionalContacts', field, value)}
//             onNestedChange={(subsection, field, value) =>
//               handleNestedChange('additionalContacts', subsection, field, value)
//             }
//           />
//         );
//       case 12:
//         return (
//           <ApplicantStatementStep
//             data={formData.applicantStatement}
//             onChange={(field, value) => handleChange('applicantStatement', field, value)}
//           />
//         );
//       case 13:
//         return (
//           <PhotoUploadStep
//             data={formData.photograph}
//             onChange={(field, value) => handleChange('photograph', field, value)}
//           />
//         );
//       default:
//         return 'Unknown step';
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         bgcolor: grayPalette[50]
//       }}>
//         <Box sx={{ textAlign: 'center' }}>
//           <CircularProgress size={60} sx={{ color: greenPalette.main, mb: 2 }} />
//           <Typography variant="h6" color={greenPalette.dark}>
//             Loading DS-160 Form...
//           </Typography>
//         </Box>
//       </Box>
//     );
//   }

//   // Function to get status color based on status text
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return greenPalette.main;
//       case 'Submitted for Review':
//         return grayPalette[600];
//       case 'In Progress':
//         return grayPalette[700];
//       default:
//         return grayPalette[600];
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: grayPalette[50], minHeight: '100vh' }}>
       
//         <Toolbar>
//           <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//             <InfoIcon sx={{ mr: 1 ,color:
//               'green'
//             }} />
//             <Typography variant="h6" component="div">
//               DS-160 Application
//             </Typography>
//           </Box>
//           {formData.status && (
//             <Chip 
//               label={formData.status}
//               sx={{
//                 backgroundColor: getStatusColor(formData.status),
//                 color: 'white',
                
//               }}
//             />
//           )}
//         </Toolbar>
 
//       <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
//         {/* Header */}
//         <Paper
//           elevation={2}
//           sx={{
//             p: { xs: 2, md: 3 },
//             mb: 3,
//             // background: `linear-gradient(135deg, ${greenPalette.light} 0%, ${greenPalette.main} 100%)`,
//             color: 'gray',
//             borderRadius: 2
//           }}
//         >
//           <Box sx={{ textAlign: 'center' }}>
//             <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//               DS-160 Application Form
//             </Typography>
//             <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 2 }}>
//               Complete all sections of your nonimmigrant visa application
//             </Typography>

//             <Box sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexWrap: 'wrap',
//               gap: 2,
//               mt: 2
//             }}>
//               <Chip
//                 label={`Step ${activeStep + 1} of ${steps.length}`}
//                 variant="outlined"
//                 sx={{ color: 'gray', borderColor: 'green', font: "bold" }}
//               />
//               <Chip
//                 label={steps[activeStep]}
//                 variant="outlined"
//                 sx={{ color: 'gray', borderColor: 'green' }}
//               />
//             </Box>
//           </Box>
//         </Paper>

//         {/* Notifications */}
//         {error && (
//           <Alert severity="error" sx={{ mb: 2, bgcolor: grayPalette[100], color: grayPalette[900] }} onClose={() => setError('')}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2, bgcolor: greenPalette.light, color: 'white' }} onClose={() => setSuccess('')}>
//             {success}
//           </Alert>
//         )}

//         {/* Mobile Stepper Toggle */}
//         {isMobile && (
//           <Box sx={{ mb: 2, textAlign: 'center' }}>
//             <Button
//               variant="outlined"
//               onClick={() => setMobileStepperOpen(true)}
//               startIcon={<ViewWeekIcon />}
//               fullWidth
//               sx={{
//                 borderColor: greenPalette.main,
//                 color: greenPalette.main,
//                 '&:hover': {
//                   borderColor: greenPalette.dark,
//                   backgroundColor: greenPalette.light,
//                   color: 'white'
//                 }
//               }}
//             >
//               View All Steps
//             </Button>
//           </Box>
//         )}

//         {/* Stepper - Horizontal for desktop, vertical dialog for mobile */}
//         {!isMobile ? (
//           <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: grayPalette[100] }}>
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label, index) => (
//                 <Step key={label} onClick={() => setActiveStep(index)} sx={{ cursor: 'pointer' }}>
//                   <StepLabel
//                     StepIconProps={{
//                       sx: {
//                         '&.Mui-completed': { color: greenPalette.main },
//                         '&.Mui-active': { color: greenPalette.main },
//                         '&.Mui-disabled': { color: grayPalette[400] }
//                       }
//                     }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Paper>
//         ) : (
//           <Dialog
//             open={mobileStepperOpen}
//             onClose={() => setMobileStepperOpen(false)}
//             maxWidth="sm"
//             fullWidth
//           >
//             <DialogTitle sx={{ bgcolor: greenPalette.main, color: 'white' }}>
//               Select Step
//             </DialogTitle>
//             <DialogContent sx={{ bgcolor: grayPalette[50] }}>
//               <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 1 }}>
//                 {steps.map((label, index) => (
//                   <Step key={label}>
//                     <StepLabel
//                       onClick={() => {
//                         setActiveStep(index);
//                         setMobileStepperOpen(false);
//                       }}
//                       sx={{ cursor: 'pointer', py: 1 }}
//                       StepIconProps={{
//                         sx: {
//                           '&.Mui-completed': { color: greenPalette.main },
//                           '&.Mui-active': { color: greenPalette.main },
//                           '&.Mui-disabled': { color: grayPalette[400] }
//                         }
//                       }}
//                     >
//                       {label}
//                     </StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </DialogContent>
//             <DialogActions sx={{ bgcolor: grayPalette[50] }}>
//               <Button
//                 onClick={() => setMobileStepperOpen(false)}
//                 sx={{ color: greenPalette.main }}
//               >
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         {/* Mobile Progress Indicator */}
//         {isMobile && (
//           <Paper elevation={1} sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: grayPalette[100] }}>
//             <Typography variant="body2" color={greenPalette.dark} fontWeight="bold">
//               Current: {steps[activeStep]}
//             </Typography>
//             <Typography variant="caption" color={grayPalette[600]}>
//               Step {activeStep + 1} of {steps.length}
//             </Typography>
//             <Box sx={{ width: '100%', height: 4, bgcolor: grayPalette[300], borderRadius: 2, mt: 1 }}>
//               <Box
//                 sx={{
//                   height: '100%',
//                   bgcolor: greenPalette.main,
//                   borderRadius: 2,
//                   width: `${((activeStep + 1) / steps.length) * 100}%`
//                 }}
//               />
//             </Box>
//           </Paper>
//         )}

//         {/* Main Content */}
//         <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, mb: 3, bgcolor: 'white' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <Box sx={{
//               width: 40,
//               height: 40,
//               borderRadius: '50%',
//               bgcolor: greenPalette.main,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               mr: 2,
//               color: 'white',
//               fontSize: '1.2rem',
//               fontWeight: 'bold'
//             }}>
//               {activeStep + 1}
//             </Box>
//             <Box>
//               <Typography variant="h5" component="h2" color={greenPalette.dark}>
//                 {steps[activeStep]}
//               </Typography>
//               <Typography variant="body2" color={grayPalette[600]}>
//                 Complete this section to continue
//               </Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 3, borderColor: grayPalette[300] }} />

//           {getStepContent(activeStep)}

//           <Divider sx={{ mt: 3, mb: 2, borderColor: grayPalette[300] }} />

//           {/* Navigation Buttons */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             flexWrap: 'wrap',
//             gap: 1,
//             mt: 2
//           }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//               startIcon={<BackIcon />}
//               sx={{
//                 minWidth: { xs: '100%', sm: '120px' },
//                 borderColor: grayPalette[500],
//                 color: grayPalette[700],
//                 '&:hover': {
//                   borderColor: greenPalette.main,
//                   backgroundColor: greenPalette.light,
//                   color: 'white'
//                 },
//                 '&.Mui-disabled': {
//                   borderColor: grayPalette[300],
//                   color: grayPalette[400]
//                 }
//               }}
//             >
//               Back
//             </Button>

//             <Box sx={{
//               display: 'flex',
//               gap: 1,
//               flexWrap: 'wrap',
//               flex: 1,
//               justifyContent: { xs: 'center', sm: 'flex-end' }
//             }}>
//               <Button
//                 variant="contained"
//                 onClick={handleSave}
//                 disabled={saving}
//                 startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
//                 sx={{
//                   bgcolor: grayPalette[700],
//                   '&:hover': { bgcolor: grayPalette[800] },
//                   minWidth: { xs: '100%', sm: '140px' },
//                   '&.Mui-disabled': {
//                     bgcolor: grayPalette[400]
//                   }
//                 }}
//               >
//                 {saving ? 'Saving...' : 'Save Draft'}
//               </Button>

//               {activeStep === steps.length - 1 ? (
//                 <Button
//                   variant="contained"
//                   onClick={handleSubmit}
//                   disabled={saving || formData.status === 'Submitted for Review' || formData.status === 'Approved'}
//                   startIcon={saving ? <CircularProgress size={16} /> : <CheckCircleIcon />}
//                   sx={{
//                     bgcolor: greenPalette.main,
//                     '&:hover': { bgcolor: greenPalette.dark },
//                     minWidth: { xs: '100%', sm: '180px' },
//                     '&.Mui-disabled': {
//                       bgcolor: grayPalette[400]
//                     }
//                   }}
//                 >
//                   {saving ? 'Submitting...' : 'Submit for Review'}
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   endIcon={<NextIcon />}
//                   sx={{
//                     bgcolor: greenPalette.main,
//                     '&:hover': { bgcolor: greenPalette.dark },
//                     minWidth: { xs: '100%', sm: '120px' }
//                   }}
//                 >
//                   Next
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>

//         {/* Status Information */}
//         {formData.counselorFeedback && (
//           <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: grayPalette[100] }}>
//             <Typography variant="subtitle2" gutterBottom color={grayPalette[800]}>
//               <strong>Counselor Feedback:</strong>
//             </Typography>
//             <Typography variant="body2" color={grayPalette[700]}>
//               {formData.counselorFeedback}
//             </Typography>
//           </Paper>
//         )}

//         {/* Footer */}
//         <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
//           <Typography variant="body2" color={grayPalette[600]}>
//             © {new Date().getFullYear()} U.S. Department of State - DS-160 Nonimmigrant Visa Application
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Ds160Page;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  getMyDs160,
  updateMyDs160,
  submitDs160ForReview
} from '../services/ds160Service';
import PersonalInfoStep from '../components/tabs/formSteps/PersonalInfoStep';
import PassportInfoStep from '../components/tabs/formSteps/PassportInfoStep';
import ContactInfoStep from '../components/tabs/formSteps/ContactInfoStep';
import TravelInfoStep from '../components/tabs/formSteps/TravelInfoStep';
import TravelHistoryStep from '../components/tabs/formSteps/TravelHistoryStep';
import UsContactStep from '../components/tabs/formSteps/UsContactStep';
import FamilyInfoStep from '../components/tabs/formSteps/FamilyInfoStep';
import WorkEducationStep from '../components/tabs/formSteps/WorkEducationStep';
import SevisInfoStep from '../components/tabs/formSteps/SevisInfoStep';
import SecurityStep from '../components/tabs/formSteps/SecurityStep';
import SocialMediaStep from '../components/tabs/formSteps/SocialMediaStep';
import AdditionalContactsStep from '../components/tabs/formSteps/AdditionalContactsStep';
import ApplicantStatementStep from '../components/tabs/formSteps/ApplicantStatementStep';
import PhotoUploadStep from '../components/tabs/formSteps/PhotoUploadStep';

const steps = [
  'Personal Info',
  'Passport Info',
  'Contact Info',
  'Travel Info',
  'Travel History',
  'US Contact',
  'Family Info',
  'Work/Education',
  'SEVIS Info',
  'Security Background',
  'Social Media',
  'Additional Contacts',
  'Applicant Statement',
  'Photograph'
];

const Ds160Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      surname: '',
      givenNames: '',
      fullNameNative: '',
      telecode: '',
      hasOtherNames: false,
      otherNamesList: [],
      sex: '',
      maritalStatus: '',
      dateOfBirth: null,
      birthCity: '',
      birthState: '',
      birthCountry: '',
      nationality: '',
      hasOtherNationality: false,
      otherNationalities: [],
      nationalIdNumber: '',
      hasUsSocialSecurityNumber: false,
      usSocialSecurityNumber: '',
      hasUsTaxpayerId: false,
      usTaxpayerIdNumber: '',
    },
    passportInfo: {
      passportNumber: '',
      passportBookNumber: '',
      passportIssueDate: null,
      passportExpiryDate: null,
      passportIssueAuthority: '',
      passportIssueCity: '',
      passportIssueCountry: '',
      isPassportLostOrStolen: false,
      lostOrStolenDetails: '',
    },
    contactInfo: {
      homeAddress: {
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
      },
      isMailingAddressDifferent: false,
      mailingAddress: {
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
      },
      primaryPhoneNumber: '',
      secondaryPhoneNumber: '',
      email: '',
      additionalEmails: [],
    },
    travelInfo: {
      purposeOfTrip: '',
      hasSpecificTravelPlans: false,
      intendedArrivalDate: null,
      intendedLengthOfStay: '',
      addressInUS: '',
      personPayingForTrip: '',
      payerName: '',
      payerRelationship: '',
      payerAddress: '',
      payerPhone: '',
      payerEmail: '',
      travelCompanions: [],
    },
    previousUSTravel: {
      hasBeenToUS: false,
      visits: [],
      hasBeenIssuedUsVisa: false,
      visaIssueDate: null,
      visaFoilingNumber: '',
      hasVisaBeenLostOrStolen: false,
      lostOrStolenVisaDetails: '',
      hasBeenRefusedUsVisa: false,
      visaRefusalDetails: '',
      hasBeenRefusedAdmissionToUS: false,
      refusalDetails: '',
      hasFiledUSImmigrationPetition: false,
      immigrationPetitionDetails: '',
    },
    internationalTravelHistory: {
      hasTraveledInternationally: false,
      trips: [],
    },
    usContact: {
      organizationOrPerson: 'Person',
      contactName: '',
      organizationName: '',
      relationship: '',
      contactPhone: '',
      contactEmail: '',
      contactAddress: '',
    },
    familyInfo: {
      father: {
        surname: '',
        givenName: '',
        dateOfBirth: null,
        isInUS: false,
        usStatus: '',
      },
      mother: {
        surname: '',
        givenName: '',
        dateOfBirth: null,
        isInUS: false,
        usStatus: '',
      },
      hasSpouse: false,
      spouse: {
        fullName: '',
        dateOfBirth: null,
        nationality: '',
        address: '',
        isInUS: false,
        usStatus: '',
      },
      children: [],
      siblings: [],
      relativesInUS: [],
    },
    workEducation: {
      presentOccupation: '',
      isStudent: false,
      current: {
        occupation: '',
        employerOrSchool: '',
        address: '',
        monthlySalary: '',
        duties: '',
        startDate: null,
        supervisorName: '',
        supervisorPhone: '',
      },
      previousEmployment: [],
      educationalHistory: [],
      otherTraining: [],
      professionalMemberships: [],
      specializedSkills: [],
    },
    sevisInfo: {
      hasSevisId: false,
      sevisId: '',
      schoolProgramNumber: '',
      schoolName: '',
      courseOfStudy: '',
      schoolAddress: '',
      programStartDate: null,
      programEndDate: null,
    },
    security: {
      hasCommunicableDisease: false,
      hasHarmfulPhysicalOrMentalDisorder: false,
      isDrugAbuserOrAddict: false,
      hasBeenArrested: false,
      hasCriminalHistory: false,
      hasViolatedDrugLaws: false,
      hasBeenInvolvedInProstitution: false,
      hasEngagedInMoneyLaundering: false,
      hasCommitedFraud: false,
      hasTterroristConnections: false,
      hasEngagedInEspionage: false,
      hasEngagedInGenocide: false,
      hasBeenInvolvedInTorture: false,
      hasBeenInvolvedInExtrajudicialKillings: false,
      hasVisaOverstay: false,
      hasBeenDeported: false,
      hasHelpedOthersEnterUSIllegally: false,
      isMemberOfTotalitarianParty: false,
      hasParticipatedInPersecution: false,
      details: {
        communicableDisease: '',
        mentalDisorder: '',
        drugAbuse: '',
        criminalHistory: '',
        arrestDetails: '',
        drugViolationDetails: '',
        prostitutionDetails: '',
        moneyLaunderingDetails: '',
        fraudDetails: '',
        terroristConnections: '',
        espionageDetails: '',
        genocideDetails: '',
        tortureDetails: '',
        extrajudicialKillings: '',
        overstayDetails: '',
        deportationDetails: '',
        illegalEntryAssistance: '',
        totalitarianPartyDetails: '',
        persecutionDetails: '',
        otherDetails: '',
      }
    },
    additionalContacts: {
      contactInHomeCountry: {
        fullName: '',
        relationship: '',
        address: '',
        phone: '',
        email: '',
      },
      emergencyContact: {
        fullName: '',
        relationship: '',
        address: '',
        phone: '',
        email: '',
      }
    },
    socialMedia: {
      platforms: [],
      phoneNumbersUsedLast5Years: [],
      emailAddressesUsedLast5Years: [],
      internationalIdentityNumbers: [],
    },
    applicantStatement: {
      hasReadAndUnderstood: false,
      agreesInformationIsCorrect: false,
      signature: '',
      dateSigned: null,
    },
    photograph: {
      meetsRequirements: false,
      uploadDate: null,
      filePath: '',
    },
    additionalInformation: {
      explanations: '',
      otherComments: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mobileStepperOpen, setMobileStepperOpen] = useState(false);
  const isMobile = window.innerWidth < 900;

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const data = await getMyDs160();
      if (data) {
        setFormData(data);
      }
    } catch (err) {
      setError('Failed to load DS-160 form data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      await updateMyDs160(formData);
      setSuccess('Form saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');
      const result = await submitDs160ForReview();
      setSuccess('Form submitted for review successfully!');
      await loadFormData();
    } catch (err) {
      setError(err.message || 'Failed to submit form for review');
    } finally {
      setSaving(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(field, value) => handleChange('personalInfo', field, value)}
          />
        );
      case 1:
        return (
          <PassportInfoStep
            data={formData.passportInfo}
            onChange={(field, value) => handleChange('passportInfo', field, value)}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            data={formData.contactInfo}
            onChange={(field, value) => handleChange('contactInfo', field, value)}
            onNestedChange={(subsection, field, value) =>
              handleNestedChange('contactInfo', subsection, field, value)
            }
          />
        );
      case 3:
        return (
          <TravelInfoStep
            data={formData.travelInfo}
            onChange={(field, value) => handleChange('travelInfo', field, value)}
          />
        );
      case 4:
        return (
          <TravelHistoryStep
            usTravelData={formData.previousUSTravel}
            internationalTravelData={formData.internationalTravelHistory}
            onChange={(section, field, value) => handleChange(section, field, value)}
          />
        );
      case 5:
        return (
          <UsContactStep
            data={formData.usContact}
            onChange={(field, value) => handleChange('usContact', field, value)}
          />
        );
      case 6:
        return (
          <FamilyInfoStep
            data={formData.familyInfo}
            onChange={(field, value) => handleChange('familyInfo', field, value)}
            onNestedChange={(subsection, field, value) =>
              handleNestedChange('familyInfo', subsection, field, value)
            }
          />
        );
      case 7:
        return (
          <WorkEducationStep
            data={formData.workEducation}
            onChange={(field, value) => handleChange('workEducation', field, value)}
            onNestedChange={(subsection, field, value) =>
              handleNestedChange('workEducation', subsection, field, value)
            }
          />
        );
      case 8:
        return (
          <SevisInfoStep
            data={formData.sevisInfo}
            onChange={(field, value) => handleChange('sevisInfo', field, value)}
          />
        );
      case 9:
        return (
          <SecurityStep
            data={formData.security}
            onChange={(field, value) => handleChange('security', field, value)}
            onNestedChange={(subsection, field, value) =>
              handleNestedChange('security', subsection, field, value)
            }
          />
        );
      case 10:
        return (
          <SocialMediaStep
            data={formData.socialMedia}
            onChange={(field, value) => handleChange('socialMedia', field, value)}
          />
        );
      case 11:
        return (
          <AdditionalContactsStep
            data={formData.additionalContacts}
            onChange={(field, value) => handleChange('additionalContacts', field, value)}
            onNestedChange={(subsection, field, value) =>
              handleNestedChange('additionalContacts', subsection, field, value)
            }
          />
        );
      case 12:
        return (
          <ApplicantStatementStep
            data={formData.applicantStatement}
            onChange={(field, value) => handleChange('applicantStatement', field, value)}
          />
        );
      case 13:
        return (
          <PhotoUploadStep
            data={formData.photograph}
            onChange={(field, value) => handleChange('photograph', field, value)}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">Loading DS-160 Form...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-600';
      case 'Submitted for Review':
        return 'bg-gray-600';
      case 'In Progress':
        return 'bg-gray-700';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white ">
        <div className="container mx-auto border-2 rounded-sm border-green-300 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-800">DS-160 Application</h1>
          </div>
          {formData.status && (
            <span className={`px-3 py-1 rounded-sm text-xs font-medium text-white ${getStatusColor(formData.status)}`}>
              {formData.status}
            </span>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Header Card */}
        <div className="bg-white rounded-sm shadow-sm p-6 mb-6 border-2 border-green-300">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">DS-160 Application Form</h2>
            <p className="text-gray-600 mb-4">Complete all sections of your nonimmigrant visa application</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 border border-green-500 text-green-600 rounded-full text-sm font-medium">
                Step {activeStep + 1} of {steps.length}
              </span>
              <span className="px-3 py-1 border border-green-500 text-green-600 rounded-full text-sm font-medium">
                {steps[activeStep]}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            <button className="absolute top-0 right-0 p-3" onClick={() => setError('')}>
              <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{success}</span>
            <button className="absolute top-0 right-0 p-3" onClick={() => setSuccess('')}>
              <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile Stepper Toggle */}
        {isMobile && (
          <div className="mb-4 text-center  ">
            <button
              onClick={() => setMobileStepperOpen(true)}
              className="w-full flex items-center justify-center px-4 py-2  cursor-pointer text-green-600 hover:bg-green-50 transition-colors border-2 border-green-300 rounded-sm "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              View All Steps
            </button>
          </div>
        )}

        {/* Stepper - Horizontal for desktop, vertical dialog for mobile */}
        {!isMobile ? (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              {steps.map((label, index) => (
                <button
                  key={label}
                  onClick={() => setActiveStep(index)}
                  className={`flex flex-col items-center py-2 px-1 ${index === activeStep ? 'text-green-600' : 'text-gray-500'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index === activeStep ? 'bg-green-600 text-white' : index < activeStep ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {index < activeStep ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${mobileStepperOpen ? 'block' : 'hidden'}`}>
            <div className="relative top-20 mx-auto p-4 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-md">
                <h3 className="text-lg font-medium">Select Step</h3>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex flex-col space-y-2">
                  {steps.map((label, index) => (
                    <button
                      key={label}
                      onClick={() => {
                        setActiveStep(index);
                        setMobileStepperOpen(false);
                      }}
                      className={`flex items-center p-2 rounded ${index === activeStep ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${index === activeStep ? 'bg-green-600 text-white' : index < activeStep ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                        {index < activeStep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right rounded-b-md">
                <button
                  onClick={() => setMobileStepperOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Progress Indicator */}
        {isMobile && (
          <div className="bg-white border-2 border-green-300 rounded-sm shadow-sm p-4 mb-4 text-center">
            <p className="text-green-700 font-medium text-sm">Current: {steps[activeStep]}</p>
            <p className="text-gray-500 text-xs">Step {activeStep + 1} of {steps.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-green-600 h-1.5 rounded-full"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white border-2 border-green-300 rounded-sm shadow-sm p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg mr-4">
              {activeStep + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800">{steps[activeStep]}</h3>
              <p className="text-gray-500 text-sm">Complete this section to continue</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {getStepContent(activeStep)}

          <div className="border-t border-gray-200 my-4"></div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={`px-4 py-2 border rounded flex items-center justify-center ${activeStep === 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-gray-500 text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
              >
                {saving ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {saving ? 'Saving...' : 'Save Draft'}
              </button>

              {activeStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={saving || formData.status === 'Submitted for Review' || formData.status === 'Approved'}
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  {saving ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {saving ? 'Submitting...' : 'Submit for Review'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Information */}
        {formData.counselorFeedback && (
          <div className="bg-gray-100 rounded-lg shadow-sm p-4 mb-6">
            <p className="text-gray-800 font-medium text-sm mb-1">Counselor Feedback:</p>
            <p className="text-gray-700 text-sm">{formData.counselorFeedback}</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} U.S. Department of State - DS-160 Nonimmigrant Visa Application
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ds160Page;