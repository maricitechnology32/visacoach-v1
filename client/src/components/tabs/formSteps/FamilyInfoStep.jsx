// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Typography,
//   Divider,
//   Alert,
//   Button,
//   IconButton,
//   Paper,
//   Chip,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

// const FamilyInfoStep = ({ data, onChange, onNestedChange }) => {
//   const [relativeInput, setRelativeInput] = useState({ name: '', relationship: '', status: '' });
//   const [childInput, setChildInput] = useState({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
//   const [siblingInput, setSiblingInput] = useState({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });

//   const usStatusOptions = [
//     'U.S. Citizen',
//     'Permanent Resident',
//     'Student Visa (F-1)',
//     'Work Visa (H-1B)',
//     'Tourist Visa (B-1/B-2)',
//     'Other Visa',
//     'Undocumented'
//   ];

//   // Parent Information Handlers
//   const handleParentChange = (parentType, field, value) => {
//     onNestedChange(parentType, field, value);
//   };

//   // Spouse Information Handlers
//   const handleSpouseChange = (field, value) => {
//     onNestedChange('spouse', field, value);
//   };

//   // Children Information Handlers
//   const handleAddChild = () => {
//     if (childInput.name.trim()) {
//       const updatedChildren = [...data.children, { ...childInput }];
//       onChange('children', updatedChildren);
//       setChildInput({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
//     }
//   };

//   const handleRemoveChild = (index) => {
//     const updatedChildren = data.children.filter((_, i) => i !== index);
//     onChange('children', updatedChildren);
//   };

//   const handleChildInputChange = (field, value) => {
//     setChildInput(prev => ({ ...prev, [field]: value }));
//   };

//   // Siblings Information Handlers
//   const handleAddSibling = () => {
//     if (siblingInput.name.trim()) {
//       const updatedSiblings = [...data.siblings, { ...siblingInput }];
//       onChange('siblings', updatedSiblings);
//       setSiblingInput({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
//     }
//   };

//   const handleRemoveSibling = (index) => {
//     const updatedSiblings = data.siblings.filter((_, i) => i !== index);
//     onChange('siblings', updatedSiblings);
//   };

//   const handleSiblingInputChange = (field, value) => {
//     setSiblingInput(prev => ({ ...prev, [field]: value }));
//   };

//   // Relatives in U.S. Handlers
//   const handleAddRelative = () => {
//     if (relativeInput.name.trim() && relativeInput.relationship.trim()) {
//       const updatedRelatives = [...data.relativesInUS, { ...relativeInput }];
//       onChange('relativesInUS', updatedRelatives);
//       setRelativeInput({ name: '', relationship: '', status: '' });
//     }
//   };

//   const handleRemoveRelative = (index) => {
//     const updatedRelatives = data.relativesInUS.filter((_, i) => i !== index);
//     onChange('relativesInUS', updatedRelatives);
//   };

//   const handleRelativeInputChange = (field, value) => {
//     setRelativeInput(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ mt: 2 }}>
//         <Alert severity="info" sx={{ mb: 3 }}>
//           Provide information about your immediate family members. This includes parents, spouse, children, and siblings.
//         </Alert>

//         <Grid container spacing={3}>
//           {/* Parents Information */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Parents Information
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle2" gutterBottom>Father's Information</Typography>
//                   <TextField
//                     fullWidth
//                     label="Surname"
//                     value={data.father?.surname || ''}
//                     onChange={(e) => handleParentChange('father', 'surname', e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Given Name"
//                     value={data.father?.givenName || ''}
//                     onChange={(e) => handleParentChange('father', 'givenName', e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                   <DatePicker
//                     label="Date of Birth"
//                     value={data.father?.dateOfBirth || null}
//                     onChange={(date) => handleParentChange('father', 'dateOfBirth', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth />}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={data.father?.isInUS || false}
//                         onChange={(e) => handleParentChange('father', 'isInUS', e.target.checked)}
//                       />
//                     }
//                     label="Currently in U.S."
//                     sx={{ mt: 1 }}
//                   />
//                   {data.father?.isInUS && (
//                     <FormControl fullWidth sx={{ mt: 1 }}>
//                       <InputLabel>U.S. Status</InputLabel>
//                       <Select
//                         value={data.father?.usStatus || ''}
//                         label="U.S. Status"
//                         onChange={(e) => handleParentChange('father', 'usStatus', e.target.value)}
//                       >
//                         {usStatusOptions.map((status) => (
//                           <MenuItem key={status} value={status}>{status}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle2" gutterBottom>Mother's Information</Typography>
//                   <TextField
//                     fullWidth
//                     label="Surname"
//                     value={data.mother?.surname || ''}
//                     onChange={(e) => handleParentChange('mother', 'surname', e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Given Name"
//                     value={data.mother?.givenName || ''}
//                     onChange={(e) => handleParentChange('mother', 'givenName', e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                   <DatePicker
//                     label="Date of Birth"
//                     value={data.mother?.dateOfBirth || null}
//                     onChange={(date) => handleParentChange('mother', 'dateOfBirth', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth />}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={data.mother?.isInUS || false}
//                         onChange={(e) => handleParentChange('mother', 'isInUS', e.target.checked)}
//                       />
//                     }
//                     label="Currently in U.S."
//                     sx={{ mt: 1 }}
//                   />
//                   {data.mother?.isInUS && (
//                     <FormControl fullWidth sx={{ mt: 1 }}>
//                       <InputLabel>U.S. Status</InputLabel>
//                       <Select
//                         value={data.mother?.usStatus || ''}
//                         label="U.S. Status"
//                         onChange={(e) => handleParentChange('mother', 'usStatus', e.target.value)}
//                       >
//                         {usStatusOptions.map((status) => (
//                           <MenuItem key={status} value={status}>{status}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid>

//           {/* Spouse Information */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Spouse Information
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={data.hasSpouse || false}
//                     onChange={(e) => onChange('hasSpouse', e.target.checked)}
//                   />
//                 }
//                 label="Are you married?"
//               />

//               {data.hasSpouse && (
//                 <Grid container spacing={2} sx={{ mt: 1 }}>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Spouse's Full Name"
//                       value={data.spouse?.fullName || ''}
//                       onChange={(e) => handleSpouseChange('fullName', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <DatePicker
//                       label="Date of Birth"
//                       value={data.spouse?.dateOfBirth || null}
//                       onChange={(date) => handleSpouseChange('dateOfBirth', date)}
//                       renderInput={(params) => <TextField {...params} fullWidth />}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Nationality"
//                       value={data.spouse?.nationality || ''}
//                       onChange={(e) => handleSpouseChange('nationality', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Address"
//                       value={data.spouse?.address || ''}
//                       onChange={(e) => handleSpouseChange('address', e.target.value)}
//                       multiline
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={data.spouse?.isInUS || false}
//                           onChange={(e) => handleSpouseChange('isInUS', e.target.checked)}
//                         />
//                       }
//                       label="Currently in U.S."
//                     />
//                     {data.spouse?.isInUS && (
//                       <FormControl fullWidth sx={{ mt: 1 }}>
//                         <InputLabel>U.S. Status</InputLabel>
//                         <Select
//                           value={data.spouse?.usStatus || ''}
//                           label="U.S. Status"
//                           onChange={(e) => handleSpouseChange('usStatus', e.target.value)}
//                         >
//                           {usStatusOptions.map((status) => (
//                             <MenuItem key={status} value={status}>{status}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     )}
//                   </Grid>
//                 </Grid>
//               )}
//             </Paper>
//           </Grid>

//           {/* Children Information */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Children Information
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Child's Name"
//                     value={childInput.name}
//                     onChange={(e) => handleChildInputChange('name', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <DatePicker
//                     label="Date of Birth"
//                     value={childInput.dateOfBirth}
//                     onChange={(date) => handleChildInputChange('dateOfBirth', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth size="small" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={childInput.isInUS || false}
//                         onChange={(e) => handleChildInputChange('isInUS', e.target.checked)}
//                       />
//                     }
//                     label="In U.S."
//                   />
//                   {childInput.isInUS && (
//                     <FormControl fullWidth sx={{ mt: 1 }}>
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         value={childInput.usStatus || ''}
//                         label="Status"
//                         onChange={(e) => handleChildInputChange('usStatus', e.target.value)}
//                         size="small"
//                       >
//                         {usStatusOptions.map((status) => (
//                           <MenuItem key={status} value={status}>{status}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     startIcon={<AddIcon />}
//                     onClick={handleAddChild}
//                     disabled={!childInput.name}
//                   >
//                     Add
//                   </Button>
//                 </Grid>
//               </Grid>

//               {data.children.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2" gutterBottom>Your Children:</Typography>
//                   {data.children.map((child, index) => (
//                     <Chip
//                       key={index}
//                       label={`${child.name} (${child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString() : 'DOB unknown'})`}
//                       onDelete={() => handleRemoveChild(index)}
//                       deleteIcon={<DeleteIcon />}
//                       color="primary"
//                       variant="outlined"
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Siblings Information */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Siblings Information
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Sibling's Name"
//                     value={siblingInput.name}
//                     onChange={(e) => handleSiblingInputChange('name', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <DatePicker
//                     label="Date of Birth"
//                     value={siblingInput.dateOfBirth}
//                     onChange={(date) => handleSiblingInputChange('dateOfBirth', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth size="small" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={siblingInput.isInUS || false}
//                         onChange={(e) => handleSiblingInputChange('isInUS', e.target.checked)}
//                       />
//                     }
//                     label="In U.S."
//                   />
//                   {siblingInput.isInUS && (
//                     <FormControl fullWidth sx={{ mt: 1 }}>
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         value={siblingInput.usStatus || ''}
//                         label="Status"
//                         onChange={(e) => handleSiblingInputChange('usStatus', e.target.value)}
//                         size="small"
//                       >
//                         {usStatusOptions.map((status) => (
//                           <MenuItem key={status} value={status}>{status}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     startIcon={<AddIcon />}
//                     onClick={handleAddSibling}
//                     disabled={!siblingInput.name}
//                   >
//                     Add
//                   </Button>
//                 </Grid>
//               </Grid>

//               {data.siblings.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2" gutterBottom>Your Siblings:</Typography>
//                   {data.siblings.map((sibling, index) => (
//                     <Chip
//                       key={index}
//                       label={`${sibling.name} (${sibling.dateOfBirth ? new Date(sibling.dateOfBirth).toLocaleDateString() : 'DOB unknown'})`}
//                       onDelete={() => handleRemoveSibling(index)}
//                       deleteIcon={<DeleteIcon />}
//                       color="secondary"
//                       variant="outlined"
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Relatives in U.S. */}
//           <Grid item xs={12}>
//             <Paper elevation={2} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Relatives in the United States
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Relative's Name"
//                     value={relativeInput.name}
//                     onChange={(e) => handleRelativeInputChange('name', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Relationship"
//                     value={relativeInput.relationship}
//                     onChange={(e) => handleRelativeInputChange('relationship', e.target.value)}
//                     placeholder="e.g., Uncle, Cousin, Aunt"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>U.S. Status</InputLabel>
//                     <Select
//                       value={relativeInput.status || ''}
//                       label="U.S. Status"
//                       onChange={(e) => handleRelativeInputChange('status', e.target.value)}
//                     >
//                       {usStatusOptions.map((status) => (
//                         <MenuItem key={status} value={status}>{status}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     startIcon={<AddIcon />}
//                     onClick={handleAddRelative}
//                     disabled={!relativeInput.name || !relativeInput.relationship}
//                   >
//                     Add
//                   </Button>
//                 </Grid>
//               </Grid>

//               {data.relativesInUS.length > 0 && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="subtitle2" gutterBottom>Relatives in U.S.:</Typography>
//                   {data.relativesInUS.map((relative, index) => (
//                     <Chip
//                       key={index}
//                       label={`${relative.name} (${relative.relationship}) - ${relative.status}`}
//                       onDelete={() => handleRemoveRelative(index)}
//                       deleteIcon={<DeleteIcon />}
//                       color="info"
//                       variant="outlined"
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Important Notes */}
//           <Grid item xs={12}>
//             <Alert severity="warning">
//               <Typography variant="body2" fontWeight="bold">
//                 Important:
//               </Typography>
//               <Typography variant="body2">
//                 • Provide complete and accurate information about your family members<br />
//                 • Include all immediate family members (parents, spouse, children)<br />
//                 • List all relatives who are currently in the United States<br />
//                 • Be honest about immigration status of family members in the U.S.<br />
//                 • Incomplete or inaccurate information may affect your visa application
//               </Typography>
//             </Alert>
//           </Grid>
//         </Grid>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default FamilyInfoStep;


import React, { useState } from 'react';

const FamilyInfoStep = ({ data, onChange, onNestedChange }) => {
  const [relativeInput, setRelativeInput] = useState({ name: '', relationship: '', status: '' });
  const [childInput, setChildInput] = useState({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
  const [siblingInput, setSiblingInput] = useState({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });

  const usStatusOptions = [
    'U.S. Citizen',
    'Permanent Resident',
    'Student Visa (F-1)',
    'Work Visa (H-1B)',
    'Tourist Visa (B-1/B-2)',
    'Other Visa',
    'Undocumented'
  ];

  // Parent Information Handlers
  const handleParentChange = (parentType, field, value) => {
    onNestedChange(parentType, field, value);
  };

  // Spouse Information Handlers
  const handleSpouseChange = (field, value) => {
    onNestedChange('spouse', field, value);
  };

  // Children Information Handlers
  const handleAddChild = () => {
    if (childInput.name.trim()) {
      const updatedChildren = [...data.children, { ...childInput }];
      onChange('children', updatedChildren);
      setChildInput({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
    }
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = data.children.filter((_, i) => i !== index);
    onChange('children', updatedChildren);
  };

  const handleChildInputChange = (field, value) => {
    setChildInput(prev => ({ ...prev, [field]: value }));
  };

  // Siblings Information Handlers
  const handleAddSibling = () => {
    if (siblingInput.name.trim()) {
      const updatedSiblings = [...data.siblings, { ...siblingInput }];
      onChange('siblings', updatedSiblings);
      setSiblingInput({ name: '', dateOfBirth: null, isInUS: false, usStatus: '' });
    }
  };

  const handleRemoveSibling = (index) => {
    const updatedSiblings = data.siblings.filter((_, i) => i !== index);
    onChange('siblings', updatedSiblings);
  };

  const handleSiblingInputChange = (field, value) => {
    setSiblingInput(prev => ({ ...prev, [field]: value }));
  };

  // Relatives in U.S. Handlers
  const handleAddRelative = () => {
    if (relativeInput.name.trim() && relativeInput.relationship.trim()) {
      const updatedRelatives = [...data.relativesInUS, { ...relativeInput }];
      onChange('relativesInUS', updatedRelatives);
      setRelativeInput({ name: '', relationship: '', status: '' });
    }
  };

  const handleRemoveRelative = (index) => {
    const updatedRelatives = data.relativesInUS.filter((_, i) => i !== index);
    onChange('relativesInUS', updatedRelatives);
  };

  const handleRelativeInputChange = (field, value) => {
    setRelativeInput(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (date) => {
    if (!date) return 'DOB unknown';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="mt-4">
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
        Provide information about your immediate family members. This includes parents, spouse, children, and siblings.
      </div>

      <div className="space-y-6">
        {/* Parents Information */}
        <div className="bg-white border-2 border-green-300 rounded-sm shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Parents Information</h3>
          <div className="border-t border-gray-200 mb-4"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Father's Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Father's Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.father?.surname || ''}
                    onChange={(e) => handleParentChange('father', 'surname', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.father?.givenName || ''}
                    onChange={(e) => handleParentChange('father', 'givenName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.father?.dateOfBirth ? new Date(data.father.dateOfBirth).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleParentChange('father', 'dateOfBirth', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={data.father?.isInUS || false}
                    onChange={(e) => handleParentChange('father', 'isInUS', e.target.checked)}
                  />
                  <label className="ml-2 block text-sm text-gray-700">Currently in U.S.</label>
                </div>
                {data.father?.isInUS && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">U.S. Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={data.father?.usStatus || ''}
                      onChange={(e) => handleParentChange('father', 'usStatus', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      {usStatusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Mother's Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Mother's Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.mother?.surname || ''}
                    onChange={(e) => handleParentChange('mother', 'surname', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.mother?.givenName || ''}
                    onChange={(e) => handleParentChange('mother', 'givenName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={data.mother?.dateOfBirth ? new Date(data.mother.dateOfBirth).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleParentChange('mother', 'dateOfBirth', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={data.mother?.isInUS || false}
                    onChange={(e) => handleParentChange('mother', 'isInUS', e.target.checked)}
                  />
                  <label className="ml-2 block text-sm text-gray-700">Currently in U.S.</label>
                </div>
                {data.mother?.isInUS && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">U.S. Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={data.mother?.usStatus || ''}
                      onChange={(e) => handleParentChange('mother', 'usStatus', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      {usStatusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spouse Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Spouse Information</h3>
          <div className="border-t border-gray-200 mb-4"></div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={data.hasSpouse || false}
              onChange={(e) => onChange('hasSpouse', e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-700">Are you married?</label>
          </div>

          {data.hasSpouse && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spouse's Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={data.spouse?.fullName || ''}
                  onChange={(e) => handleSpouseChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={data.spouse?.dateOfBirth ? new Date(data.spouse.dateOfBirth).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleSpouseChange('dateOfBirth', e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={data.spouse?.nationality || ''}
                  onChange={(e) => handleSpouseChange('nationality', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={data.spouse?.address || ''}
                  onChange={(e) => handleSpouseChange('address', e.target.value)}
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={data.spouse?.isInUS || false}
                    onChange={(e) => handleSpouseChange('isInUS', e.target.checked)}
                  />
                  <label className="ml-2 block text-sm text-gray-700">Currently in U.S.</label>
                </div>
                {data.spouse?.isInUS && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">U.S. Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={data.spouse?.usStatus || ''}
                      onChange={(e) => handleSpouseChange('usStatus', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      {usStatusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Children Information */}
        <div className="bg-white border-2 border-green-300 rounded-sm shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Children Information</h3>
          <div className="border-t border-gray-200 mb-4"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={childInput.name}
                onChange={(e) => handleChildInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={childInput.dateOfBirth ? new Date(childInput.dateOfBirth).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChildInputChange('dateOfBirth', e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            <div>
              <div className="flex items-center h-full pt-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={childInput.isInUS || false}
                  onChange={(e) => handleChildInputChange('isInUS', e.target.checked)}
                />
                <label className="ml-2 block text-sm text-gray-700">In U.S.</label>
              </div>
              {childInput.isInUS && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={childInput.usStatus || ''}
                    onChange={(e) => handleChildInputChange('usStatus', e.target.value)}
                  >
                    <option value="">Select Status</option>
                    {usStatusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddChild}
                disabled={!childInput.name}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {data.children.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Your Children:</h4>
              <div className="flex flex-wrap gap-2">
                {data.children.map((child, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {child.name} ({formatDate(child.dateOfBirth)})
                    <button
                      type="button"
                      className="ml-1.5 rounded-full flex-shrink-0 text-green-500 hover:text-green-700 focus:outline-none"
                      onClick={() => handleRemoveChild(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Siblings Information */}
        <div className="bg-white  border-2 border-green-300 rounded-sm shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Siblings Information</h3>
          <div className="border-t border-gray-200 mb-4"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sibling's Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={siblingInput.name}
                onChange={(e) => handleSiblingInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={siblingInput.dateOfBirth ? new Date(siblingInput.dateOfBirth).toISOString().split('T')[0] : ''}
                onChange={(e) => handleSiblingInputChange('dateOfBirth', e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            <div>
              <div className="flex items-center h-full pt-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={siblingInput.isInUS || false}
                  onChange={(e) => handleSiblingInputChange('isInUS', e.target.checked)}
                />
                <label className="ml-2 block text-sm text-gray-700">In U.S.</label>
              </div>
              {siblingInput.isInUS && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={siblingInput.usStatus || ''}
                    onChange={(e) => handleSiblingInputChange('usStatus', e.target.value)}
                  >
                    <option value="">Select Status</option>
                    {usStatusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddSibling}
                disabled={!siblingInput.name}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {data.siblings.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Your Siblings:</h4>
              <div className="flex flex-wrap gap-2">
                {data.siblings.map((sibling, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {sibling.name} ({formatDate(sibling.dateOfBirth)})
                    <button
                      type="button"
                      className="ml-1.5 rounded-full flex-shrink-0 text-green-500 hover:text-green-700 focus:outline-none"
                      onClick={() => handleRemoveSibling(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Relatives in U.S. */}
        <div className="bg-white border-2 border-green-300 rounded-sm shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatives in the United States</h3>
          <div className="border-t border-gray-200 mb-4"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relative's Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={relativeInput.name}
                onChange={(e) => handleRelativeInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={relativeInput.relationship}
                onChange={(e) => handleRelativeInputChange('relationship', e.target.value)}
                placeholder="e.g., Uncle, Cousin, Aunt"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">U.S. Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={relativeInput.status || ''}
                onChange={(e) => handleRelativeInputChange('status', e.target.value)}
              >
                <option value="">Select Status</option>
                {usStatusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddRelative}
                disabled={!relativeInput.name || !relativeInput.relationship}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {data.relativesInUS.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Relatives in U.S.:</h4>
              <div className="flex flex-wrap gap-2">
                {data.relativesInUS.map((relative, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800"
                  >
                    {relative.name} ({relative.relationship}) - {relative.status}
                    <button
                      type="button"
                      className="ml-1.5 rounded-full flex-shrink-0 text-cyan-500 hover:text-cyan-700 focus:outline-none"
                      onClick={() => handleRemoveRelative(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important:</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide complete and accurate information about your family members</li>
                  <li>Include all immediate family members (parents, spouse, children)</li>
                  <li>List all relatives who are currently in the United States</li>
                  <li>Be honest about immigration status of family members in the U.S.</li>
                  <li>Incomplete or inaccurate information may affect your visa application</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyInfoStep;