import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Divider,
  Alert,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TravelHistoryStep = ({ usTravelData, internationalTravelData, onChange }) => {
  const [usVisitDialogOpen, setUsVisitDialogOpen] = useState(false);
  const [internationalTripDialogOpen, setInternationalTripDialogOpen] = useState(false);
  const [currentUsVisit, setCurrentUsVisit] = useState(null);
  const [currentInternationalTrip, setCurrentInternationalTrip] = useState(null);
  const [isEditingUsVisit, setIsEditingUsVisit] = useState(false);
  const [isEditingInternationalTrip, setIsEditingInternationalTrip] = useState(false);

  // US Travel Functions
  const handleAddUsVisit = () => {
    setCurrentUsVisit({
      arrivalDate: null,
      departureDate: null,
      purpose: '',
      visaType: '',
      i94Number: '',
      statusMaintained: true
    });
    setIsEditingUsVisit(false);
    setUsVisitDialogOpen(true);
  };

  const handleEditUsVisit = (visit, index) => {
    setCurrentUsVisit({ ...visit, index });
    setIsEditingUsVisit(true);
    setUsVisitDialogOpen(true);
  };

  const handleSaveUsVisit = () => {
    const visits = [...usTravelData.visits];
    if (isEditingUsVisit) {
      visits[currentUsVisit.index] = currentUsVisit;
    } else {
      visits.push(currentUsVisit);
    }
    onChange('previousUSTravel', { ...usTravelData, visits });
    setUsVisitDialogOpen(false);
    setCurrentUsVisit(null);
  };

  const handleDeleteUsVisit = (index) => {
    const visits = usTravelData.visits.filter((_, i) => i !== index);
    onChange('previousUSTravel', { ...usTravelData, visits });
  };

  // International Travel Functions
  const handleAddInternationalTrip = () => {
    setCurrentInternationalTrip({
      country: '',
      dateFrom: null,
      dateTo: null,
      purpose: ''
    });
    setIsEditingInternationalTrip(false);
    setInternationalTripDialogOpen(true);
  };

  const handleEditInternationalTrip = (trip, index) => {
    setCurrentInternationalTrip({ ...trip, index });
    setIsEditingInternationalTrip(true);
    setInternationalTripDialogOpen(true);
  };

  const handleSaveInternationalTrip = () => {
    const trips = [...internationalTravelData.trips];
    if (isEditingInternationalTrip) {
      trips[currentInternationalTrip.index] = currentInternationalTrip;
    } else {
      trips.push(currentInternationalTrip);
    }
    onChange('internationalTravelHistory', { ...internationalTravelData, trips });
    setInternationalTripDialogOpen(false);
    setCurrentInternationalTrip(null);
  };

  const handleDeleteInternationalTrip = (index) => {
    const trips = internationalTravelData.trips.filter((_, i) => i !== index);
    onChange('internationalTravelHistory', { ...internationalTravelData, trips });
  };

  // US Visit Dialog
  const UsVisitDialog = () => (
    <Dialog open={usVisitDialogOpen} onClose={() => setUsVisitDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditingUsVisit ? 'Edit U.S. Visit' : 'Add U.S. Visit'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Arrival Date"
              value={currentUsVisit?.arrivalDate || null}
              onChange={(date) => setCurrentUsVisit(prev => ({ ...prev, arrivalDate: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Departure Date"
              value={currentUsVisit?.departureDate || null}
              onChange={(date) => setCurrentUsVisit(prev => ({ ...prev, departureDate: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={currentUsVisit?.arrivalDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Purpose of Visit"
              value={currentUsVisit?.purpose || ''}
              onChange={(e) => setCurrentUsVisit(prev => ({ ...prev, purpose: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Visa Type"
              value={currentUsVisit?.visaType || ''}
              onChange={(e) => setCurrentUsVisit(prev => ({ ...prev, visaType: e.target.value }))}
              placeholder="B1/B2, F1, J1, etc."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="I-94 Number"
              value={currentUsVisit?.i94Number || ''}
              onChange={(e) => setCurrentUsVisit(prev => ({ ...prev, i94Number: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUsVisit?.statusMaintained || false}
                  onChange={(e) => setCurrentUsVisit(prev => ({ ...prev, statusMaintained: e.target.checked }))}
                />
              }
              label="Maintained immigration status"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setUsVisitDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleSaveUsVisit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  // International Trip Dialog
  const InternationalTripDialog = () => (
    <Dialog open={internationalTripDialogOpen} onClose={() => setInternationalTripDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditingInternationalTrip ? 'Edit International Trip' : 'Add International Trip'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country Visited"
              value={currentInternationalTrip?.country || ''}
              onChange={(e) => setCurrentInternationalTrip(prev => ({ ...prev, country: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date From"
              value={currentInternationalTrip?.dateFrom || null}
              onChange={(date) => setCurrentInternationalTrip(prev => ({ ...prev, dateFrom: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date To"
              value={currentInternationalTrip?.dateTo || null}
              onChange={(date) => setCurrentInternationalTrip(prev => ({ ...prev, dateTo: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={currentInternationalTrip?.dateFrom}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Purpose of Trip"
              value={currentInternationalTrip?.purpose || ''}
              onChange={(e) => setCurrentInternationalTrip(prev => ({ ...prev, purpose: e.target.value }))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setInternationalTripDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleSaveInternationalTrip} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Provide complete and accurate information about your travel history. This includes all previous visits to the United States and international travel within the last 15 years.
        </Alert>

        <Grid container spacing={4}>
          {/* Previous U.S. Travel */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Previous U.S. Travel History
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={usTravelData.hasBeenToUS || false}
                    onChange={(e) => onChange('previousUSTravel', {
                      ...usTravelData,
                      hasBeenToUS: e.target.checked,
                      visits: e.target.checked ? usTravelData.visits : []
                    })}
                  />
                }
                label="Have you ever been to the United States?"
              />

              {usTravelData.hasBeenToUS && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddUsVisit}
                    sx={{ mb: 2 }}
                  >
                    Add U.S. Visit
                  </Button>

                  {usTravelData.visits.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Arrival</TableCell>
                            <TableCell>Departure</TableCell>
                            <TableCell>Purpose</TableCell>
                            <TableCell>Visa Type</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usTravelData.visits.map((visit, index) => (
                            <TableRow key={index}>
                              <TableCell>{visit.arrivalDate ? new Date(visit.arrivalDate).toLocaleDateString() : 'N/A'}</TableCell>
                              <TableCell>{visit.departureDate ? new Date(visit.departureDate).toLocaleDateString() : 'N/A'}</TableCell>
                              <TableCell>{visit.purpose || 'N/A'}</TableCell>
                              <TableCell>{visit.visaType || 'N/A'}</TableCell>
                              <TableCell>
                                <IconButton size="small" onClick={() => handleEditUsVisit(visit, index)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteUsVisit(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No U.S. visits added yet.
                    </Alert>
                  )}
                </>
              )}
            </Paper>
          </Grid>

          {/* International Travel History */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                International Travel History (Last 15 Years)
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={internationalTravelData.hasTraveledInternationally || false}
                    onChange={(e) => onChange('internationalTravelHistory', {
                      ...internationalTravelData,
                      hasTraveledInternationally: e.target.checked,
                      trips: e.target.checked ? internationalTravelData.trips : []
                    })}
                  />
                }
                label="Have you traveled internationally in the last 15 years?"
              />

              {internationalTravelData.hasTraveledInternationally && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddInternationalTrip}
                    sx={{ mb: 2 }}
                  >
                    Add International Trip
                  </Button>

                  {internationalTravelData.trips.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell>Date From</TableCell>
                            <TableCell>Date To</TableCell>
                            <TableCell>Purpose</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {internationalTravelData.trips.map((trip, index) => (
                            <TableRow key={index}>
                              <TableCell>{trip.country || 'N/A'}</TableCell>
                              <TableCell>{trip.dateFrom ? new Date(trip.dateFrom).toLocaleDateString() : 'N/A'}</TableCell>
                              <TableCell>{trip.dateTo ? new Date(trip.dateTo).toLocaleDateString() : 'N/A'}</TableCell>
                              <TableCell>{trip.purpose || 'N/A'}</TableCell>
                              <TableCell>
                                <IconButton size="small" onClick={() => handleEditInternationalTrip(trip, index)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteInternationalTrip(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No international trips added yet.
                    </Alert>
                  )}
                </>
              )}
            </Paper>
          </Grid>

          {/* Important Notes */}
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="body2" fontWeight="bold">
                Important:
              </Typography>
              <Typography variant="body2">
                • Provide complete and accurate travel history<br />
                • Include all countries visited in the last 15 years<br />
                • Be honest about previous U.S. visits and immigration status<br />
                • Incomplete or inaccurate information may delay your application
              </Typography>
            </Alert>
          </Grid>
        </Grid>

        {/* Dialogs */}
        <UsVisitDialog />
        <InternationalTripDialog />
      </Box>
    </LocalizationProvider>
  );
};

export default TravelHistoryStep;