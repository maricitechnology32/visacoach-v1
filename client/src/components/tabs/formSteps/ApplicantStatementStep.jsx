import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Divider,
  Alert,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SignaturePad from 'react-signature-canvas';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ApplicantStatementStep = ({ data, onChange }) => {
  const [signatureDate, setSignatureDate] = useState(data.dateSigned || null);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);
  const [signaturePad, setSignaturePad] = useState(null);

  const handleDateChange = (date) => {
    setSignatureDate(date);
    onChange('dateSigned', date);
  };

  const handleSignatureClear = () => {
    if (signaturePad) {
      signaturePad.clear();
    }
  };

  const handleSignatureSave = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      const signatureData = signaturePad.getTrimmedCanvas().toDataURL('image/png');
      onChange('signature', signatureData);
      setSignatureDialogOpen(false);
    }
  };

  const handleReadAndUnderstoodChange = (checked) => {
    onChange('hasReadAndUnderstood', checked);
    if (!checked) {
      // If unchecking, also uncheck the agreement
      onChange('agreesInformationIsCorrect', false);
    }
  };

  const handleAgreementChange = (checked) => {
    onChange('agreesInformationIsCorrect', checked);
    // Can only agree if they've read and understood
    if (checked && !data.hasReadAndUnderstood) {
      onChange('hasReadAndUnderstood', true);
    }
  };

  const isStatementComplete = () => {
    return data.hasReadAndUnderstood &&
      data.agreesInformationIsCorrect &&
      data.signature &&
      data.dateSigned;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold">
            Applicant Statement and Certification
          </Typography>
          <Typography variant="body2">
            This is your legal declaration. Read carefully before signing. Providing false information
            may result in permanent visa ineligibility.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* Terms and Conditions */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Terms and Conditions
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                mb: 2
              }}>
                <Typography variant="body2" paragraph>
                  <strong>APPLICANT CERTIFICATION</strong>
                </Typography>

                <Typography variant="body2" paragraph>
                  I certify that I have read and understood all the questions set forth in this application
                  and the answers I have furnished are true and correct to the best of my knowledge and belief.
                  I understand that any false or misleading statement may result in the permanent refusal of
                  a visa or denial of entry into the United States.
                </Typography>

                <Typography variant="body2" paragraph>
                  I understand that possession of a visa does not entitle the bearer to enter the United States
                  of America upon arrival at a port of entry if he or she is found inadmissible.
                </Typography>

                <Typography variant="body2" paragraph>
                  I understand that the information I provide is collected pursuant to INA 221(g) and 222(f).
                  This information may be used by other U.S. Government agencies in connection with the issuance
                  of visas and related immigration benefits.
                </Typography>

                <Typography variant="body2" paragraph>
                  I authorize the release of any information from my records that the U.S. Citizenship and
                  Immigration Services needs to determine my eligibility for the immigration benefit I am seeking.
                </Typography>

                <Typography variant="body2">
                  <strong>Penalty for Perjury:</strong> I understand that willful false statements made
                  on this application may be punishable by fine or imprisonment under U.S. law (18 U.S.C. 1001),
                  and may render me permanently ineligible for a U.S. visa or for admission to the United States.
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={() => setTermsDialogOpen(true)}
                startIcon={<AssignmentIcon />}
              >
                View Full Terms and Conditions
              </Button>
            </Paper>
          </Grid>

          {/* Certification and Agreement */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Certification and Agreement
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.hasReadAndUnderstood || false}
                      onChange={(e) => handleReadAndUnderstoodChange(e.target.checked)}
                      required
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="bold">
                      I have read and understood all the questions in this application and the accompanying instructions
                    </Typography>
                  }
                  sx={{ mb: 2 }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.agreesInformationIsCorrect || false}
                      onChange={(e) => handleAgreementChange(e.target.checked)}
                      required
                      disabled={!data.hasReadAndUnderstood}
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="bold">
                      I certify that all information I have provided is true and correct to the best of my knowledge and belief.
                      I understand that false or misleading information may result in permanent visa ineligibility.
                    </Typography>
                  }
                />
              </FormGroup>
            </Paper>
          </Grid>

          {/* Signature Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Signature
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="outlined"
                    onClick={() => setSignatureDialogOpen(true)}
                    fullWidth
                    sx={{ height: '100px', mb: 2 }}
                  >
                    {data.signature ? (
                      <Box>
                        <Typography variant="body2">Signature Added</Typography>
                        <Typography variant="caption" color="success.main">
                          Click to modify
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2">
                        Click to Provide Signature
                      </Typography>
                    )}
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date Signed"
                    value={signatureDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        helperText="Today's date or date of completion"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      Your signature certifies that you have read and understood the questions in this application
                      and that all information provided is true and correct to the best of your knowledge.
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Final Review */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Final Review
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Alert
                severity={isStatementComplete() ? "success" : "warning"}
                sx={{ mb: 2 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {isStatementComplete() ? "Ready to Submit" : "Review Required"}
                </Typography>
                <Typography variant="body2">
                  {isStatementComplete()
                    ? "Your application is complete and ready for submission. Please review all information before submitting."
                    : "Please complete all required sections above before submitting your application."
                  }
                </Typography>
              </Alert>

              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Completion Checklist:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Box component="li" sx={{ color: data.hasReadAndUnderstood ? 'success.main' : 'error.main' }}>
                    Read and understood all questions and instructions
                  </Box>
                  <Box component="li" sx={{ color: data.agreesInformationIsCorrect ? 'success.main' : 'error.main' }}>
                    Certified information is true and correct
                  </Box>
                  <Box component="li" sx={{ color: data.signature ? 'success.main' : 'error.main' }}>
                    Provided electronic signature
                  </Box>
                  <Box component="li" sx={{ color: data.dateSigned ? 'success.main' : 'error.main' }}>
                    Provided date of signature
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Legal Warning */}
          <Grid item xs={12}>
            <Alert severity="error">
              <Typography variant="body2" fontWeight="bold">
                Legal Warning:
              </Typography>
              <Typography variant="body2">
                • Willfully providing false information is a federal crime punishable by fine and/or imprisonment<br />
                • False statements may result in permanent visa ineligibility<br />
                • You may be subject to criminal prosecution for perjury<br />
                • All information is subject to verification by U.S. government agencies<br />
                • You must disclose all relevant information completely and truthfully
              </Typography>
            </Alert>
          </Grid>
        </Grid>

        {/* Terms and Conditions Dialog */}
        <Dialog
          open={termsDialogOpen}
          onClose={() => setTermsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Full Terms and Conditions</DialogTitle>
          <DialogContent>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', p: 1 }}>
              <Typography variant="h6" gutterBottom>
                Complete Terms and Conditions
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>1. APPLICATION CERTIFICATION</strong><br />
                By signing this application, I certify that I have read and understood all the questions
                set forth in this application and the answers I have furnished are true and correct to
                the best of my knowledge and belief. I understand that any false or misleading statement
                may result in the permanent refusal of a visa or denial of entry into the United States.
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>2. LIMitations of Visa</strong><br />
                I understand that possession of a visa does not entitle the bearer to enter the United States
                of America upon arrival at a port of entry if he or she is found inadmissible under the
                provisions of U.S. immigration law.
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>3. Information Collection and Use</strong><br />
                I understand that the information I provide is collected pursuant to INA 221(g) and 222(f).
                This information may be used by other U.S. Government agencies in connection with the issuance
                of visas and related immigration benefits, and for law enforcement and immigration purposes.
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>4. Authorization for Information Release</strong><br />
                I authorize the release of any information from my records that the U.S. Citizenship and
                Immigration Services needs to determine my eligibility for the immigration benefit I am seeking.
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>5. Penalty for Perjury</strong><br />
                I understand that willful false statements made on this application may be punishable by
                fine or imprisonment under U.S. law (18 U.S.C. 1001), and may render me permanently ineligible
                for a U.S. visa or for admission to the United States.
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>6. Privacy Act Notice</strong><br />
                The information you provide is collected pursuant to INA 221(g) and 222(f). The primary purpose
                for collecting the information is to determine your eligibility for a visa. The information may
                also be used for law enforcement and immigration purposes, or in the interests of national security.
              </Typography>

              <Typography variant="body2">
                <strong>7. Routine Uses</strong><br />
                The information on this form may be shared with other federal, state, local, and foreign government
                agencies and authorized organizations in accordance with approved routine uses, as described in the
                associated system of records notices [DHS/USCIS-007 - Benefits Information System and DHS/USCIS-001 -
                Alien File, Index, and National File Tracking System] and as permitted by law.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTermsDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Signature Dialog */}
        <Dialog
          open={signatureDialogOpen}
          onClose={() => setSignatureDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Provide Your Signature</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Sign in the box below using your mouse or touchscreen
              </Typography>

              <Box sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mb: 2
              }}>
                <SignaturePad
                  ref={(ref) => setSignaturePad(ref)}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'signatureCanvas'
                  }}
                />
              </Box>

              <Typography variant="caption" color="error.main">
                Your signature certifies that all information provided is true and correct
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignatureClear}>Clear</Button>
            <Button
              onClick={handleSignatureSave}
              variant="contained"
              disabled={signaturePad && signaturePad.isEmpty()}
            >
              Save Signature
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default ApplicantStatementStep;