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
//   Chip,
//   Button,
//   IconButton
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

// const ContactInfoStep = ({ data, onChange, onNestedChange }) => {
//   const [emailInput, setEmailInput] = useState('');

//   const handleAddEmail = () => {
//     if (emailInput.trim() && isValidEmail(emailInput)) {
//       const updatedEmails = [...data.additionalEmails, emailInput.trim()];
//       onChange('additionalEmails', updatedEmails);
//       setEmailInput('');
//     }
//   };

//   const handleRemoveEmail = (index) => {
//     const updatedEmails = data.additionalEmails.filter((_, i) => i !== index);
//     onChange('additionalEmails', updatedEmails);
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleHomeAddressChange = (field, value) => {
//     onNestedChange('homeAddress', field, value);
//   };

//   const handleMailingAddressChange = (field, value) => {
//     onNestedChange('mailingAddress', field, value);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Alert severity="success" sx={{ mb: 3 }}>
//         Provide your current contact information. This will be used for all communications regarding your visa application.
//       </Alert>

//       <Grid container spacing={3}>
//         {/* Primary Contact Information */}
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>
//             Primary Contact Information
//           </Typography>
//           <Divider />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Primary Phone Number"
//             value={data.primaryPhoneNumber || ''}
//             onChange={(e) => onChange('primaryPhoneNumber', e.target.value)}
//             required
//             placeholder="+977-9706127862"
//             helperText="Include country code"
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Secondary Phone Number (Optional)"
//             value={data.secondaryPhoneNumber || ''}
//             onChange={(e) => onChange('secondaryPhoneNumber', e.target.value)}
//             placeholder="++977-9706127862"
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Primary Email Address"
//             type="email"
//             value={data.email || ''}
//             onChange={(e) => onChange('email', e.target.value)}
//             required
//             error={data.email && !isValidEmail(data.email)}
//             helperText={data.email && !isValidEmail(data.email) ? "Please enter a valid email address" : ""}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Typography variant="subtitle2" gutterBottom>
//             Additional Email Addresses (if any)
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 1 }}>
//             <TextField
//               size="small"
//               value={emailInput}
//               onChange={(e) => setEmailInput(e.target.value)}
//               placeholder="Enter additional email"
//               onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
//               error={emailInput && !isValidEmail(emailInput)}
//               helperText={emailInput && !isValidEmail(emailInput) ? "Invalid email format" : ""}
//             />
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={handleAddEmail}
//               disabled={!emailInput || !isValidEmail(emailInput)}
//             >
//               Add
//             </Button>
//           </Box>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//             {data.additionalEmails.map((email, index) => (
//               <Chip
//                 key={index}
//                 label={email}
//                 onDelete={() => handleRemoveEmail(index)}
//                 deleteIcon={<DeleteIcon />}
//                 color="primary"
//                 variant="outlined"
//               />
//             ))}
//           </Box>
//         </Grid>

//         {/* Home Address */}
//         <Grid item xs={12}>
//           <Typography variant="h6" gutterBottom>
//             Home Address
//           </Typography>
//           <Divider />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Street Address"
//             value={data.homeAddress?.street || ''}
//             onChange={(e) => handleHomeAddressChange('street', e.target.value)}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="City"
//             value={data.homeAddress?.city || ''}
//             onChange={(e) => handleHomeAddressChange('city', e.target.value)}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="State/Province"
//             value={data.homeAddress?.stateProvince || ''}
//             onChange={(e) => handleHomeAddressChange('stateProvince', e.target.value)}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Postal/ZIP Code"
//             value={data.homeAddress?.postalCode || ''}
//             onChange={(e) => handleHomeAddressChange('postalCode', e.target.value)}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label="Country"
//             value={data.homeAddress?.country || ''}
//             onChange={(e) => handleHomeAddressChange('country', e.target.value)}
//             required
//           />
//         </Grid>

//         {/* Mailing Address */}
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={data.isMailingAddressDifferent || false}
//                 onChange={(e) => onChange('isMailingAddressDifferent', e.target.checked)}
//               />
//             }
//             label="Is your mailing address different from your home address?"
//           />
//         </Grid>

//         {data.isMailingAddressDifferent && (
//           <>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Mailing Address
//               </Typography>
//               <Divider />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Street Address"
//                 value={data.mailingAddress?.street || ''}
//                 onChange={(e) => handleMailingAddressChange('street', e.target.value)}
//                 required
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="City"
//                 value={data.mailingAddress?.city || ''}
//                 onChange={(e) => handleMailingAddressChange('city', e.target.value)}
//                 required
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="State/Province"
//                 value={data.mailingAddress?.stateProvince || ''}
//                 onChange={(e) => handleMailingAddressChange('stateProvince', e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Postal/ZIP Code"
//                 value={data.mailingAddress?.postalCode || ''}
//                 onChange={(e) => handleMailingAddressChange('postalCode', e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Country"
//                 value={data.mailingAddress?.country || ''}
//                 onChange={(e) => handleMailingAddressChange('country', e.target.value)}
//                 required
//               />
//             </Grid>
//           </>
//         )}

//         {/* Important Notes */}
//         <Grid item xs={12}>
//           <Alert severity="warning" sx={{ mt: 2 }}>
//             <Typography variant="body2" fontWeight="bold">
//               Important:
//             </Typography>
//             <Typography variant="body2">
//               • Ensure all contact information is current and accurate<br />
//               • You will receive important visa communications at these addresses<br />
//               • Notify the embassy immediately if your contact information changes<br />
//               • Use addresses where you can reliably receive mail and communications
//             </Typography>
//           </Alert>
//         </Grid>

//         {/* Validation Check */}
//         <Grid item xs={12}>
//           <Alert
//             severity={
//               data.primaryPhoneNumber && data.email && data.homeAddress?.street &&
//                 data.homeAddress?.city && data.homeAddress?.country ? "success" : "info"
//             }
//             sx={{ mt: 2 }}
//           >
//             {data.primaryPhoneNumber && data.email && data.homeAddress?.street &&
//               data.homeAddress?.city && data.homeAddress?.country ?
//               "All required contact information is complete" :
//               "Please complete all required contact information fields"}
//           </Alert>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ContactInfoStep;


import React, { useState } from 'react';

const ContactInfoStep = ({ data, onChange, onNestedChange }) => {
  const [emailInput, setEmailInput] = useState('');

  const handleAddEmail = () => {
    if (emailInput.trim() && isValidEmail(emailInput)) {
      const updatedEmails = [...data.additionalEmails, emailInput.trim()];
      onChange('additionalEmails', updatedEmails);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = data.additionalEmails.filter((_, i) => i !== index);
    onChange('additionalEmails', updatedEmails);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleHomeAddressChange = (field, value) => {
    onNestedChange('homeAddress', field, value);
  };

  const handleMailingAddressChange = (field, value) => {
    onNestedChange('mailingAddress', field, value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        Provide your current contact information. This will be used for all communications regarding your visa application.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Contact Information */}
        <div className="col-span-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Primary Contact Information</h3>
          <div className="border-t border-gray-200 mb-4"></div>
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.primaryPhoneNumber || ''}
            onChange={(e) => onChange('primaryPhoneNumber', e.target.value)}
            placeholder="+977-9706127862"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Include country code</p>
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Phone Number (Optional)
          </label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.secondaryPhoneNumber || ''}
            onChange={(e) => onChange('secondaryPhoneNumber', e.target.value)}
            placeholder="+977-9706127862"
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${data.email && !isValidEmail(data.email) ? 'border-red-500' : 'border-gray-300'
              }`}
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
          {data.email && !isValidEmail(data.email) && (
            <p className="mt-1 text-xs text-red-500">Please enter a valid email address</p>
          )}
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Email Addresses (if any)
          </label>
          <div className="flex flex-col sm:flex-row gap-2 items-start mb-2">
            <input
              type="email"
              className={`flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${emailInput && !isValidEmail(emailInput) ? 'border-red-500' : 'border-gray-300'
                }`}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter additional email"
            />
            <button
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddEmail}
              disabled={!emailInput || !isValidEmail(emailInput)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add
            </button>
          </div>
          {emailInput && !isValidEmail(emailInput) && (
            <p className="mt-1 text-xs text-red-500 mb-2">Invalid email format</p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {data.additionalEmails.map((email, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {email}
                <button
                  type="button"
                  className="ml-1.5 rounded-full flex-shrink-0 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => handleRemoveEmail(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Home Address */}
        <div className="col-span-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Home Address</h3>
          <div className="border-t border-gray-200 mb-4"></div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.homeAddress?.street || ''}
            onChange={(e) => handleHomeAddressChange('street', e.target.value)}
            required
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.homeAddress?.city || ''}
            onChange={(e) => handleHomeAddressChange('city', e.target.value)}
            required
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.homeAddress?.stateProvince || ''}
            onChange={(e) => handleHomeAddressChange('stateProvince', e.target.value)}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal/ZIP Code
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.homeAddress?.postalCode || ''}
            onChange={(e) => handleHomeAddressChange('postalCode', e.target.value)}
          />
        </div>

        <div className="col-span-full md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.homeAddress?.country || ''}
            onChange={(e) => handleHomeAddressChange('country', e.target.value)}
            required
          />
        </div>

        {/* Mailing Address */}
        <div className="col-span-full">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={data.isMailingAddressDifferent || false}
              onChange={(e) => onChange('isMailingAddressDifferent', e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is your mailing address different from your home address?</span>
          </label>
        </div>

        {data.isMailingAddressDifferent && (
          <>
            <div className="col-span-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mailing Address</h3>
              <div className="border-t border-gray-200 mb-4"></div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={data.mailingAddress?.street || ''}
                onChange={(e) => handleMailingAddressChange('street', e.target.value)}
                required
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={data.mailingAddress?.city || ''}
                onChange={(e) => handleMailingAddressChange('city', e.target.value)}
                required
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={data.mailingAddress?.stateProvince || ''}
                onChange={(e) => handleMailingAddressChange('stateProvince', e.target.value)}
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal/ZIP Code
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={data.mailingAddress?.postalCode || ''}
                onChange={(e) => handleMailingAddressChange('postalCode', e.target.value)}
              />
            </div>

            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={data.mailingAddress?.country || ''}
                onChange={(e) => handleMailingAddressChange('country', e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Important Notes */}
        <div className="col-span-full">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
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
                    <li>Ensure all contact information is current and accurate</li>
                    <li>You will receive important visa communications at these addresses</li>
                    <li>Notify the embassy immediately if your contact information changes</li>
                    <li>Use addresses where you can reliably receive mail and communications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Check */}
        <div className="col-span-full">
          <div className={`rounded-md p-4 mt-4 ${data.primaryPhoneNumber && data.email && data.homeAddress?.street &&
              data.homeAddress?.city && data.homeAddress?.country
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}>
            {data.primaryPhoneNumber && data.email && data.homeAddress?.street &&
              data.homeAddress?.city && data.homeAddress?.country
              ? 'All required contact information is complete'
              : 'Please complete all required contact information fields'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;