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
  Paper,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Collapse,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SecurityStep = ({ data, onChange, onNestedChange }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleYesNoChange = (field, value) => {
    onChange(field, value);
    // If changing from Yes to No, clear the details
    if (value === false && data.details && data.details[field.toLowerCase()]) {
      onNestedChange('details', field.toLowerCase(), '');
    }
  };

  const handleDetailsChange = (field, value) => {
    onNestedChange('details', field, value);
  };

  const securityQuestions = [
    {
      field: 'hasCommunicableDisease',
      label: 'Do you have a communicable disease of public health significance?',
      detailsField: 'communicableDisease',
      explanation: 'Includes tuberculosis, syphilis, gonorrhea, Hansen\'s disease (leprosy), and other diseases as determined by the Secretary of Health and Human Services'
    },
    {
      field: 'hasHarmfulPhysicalOrMentalDisorder',
      label: 'Do you have a physical or mental disorder that poses or is likely to pose a threat to the safety or welfare of yourself or others?',
      detailsField: 'mentalDisorder',
      explanation: 'Includes disorders associated with harmful behavior'
    },
    {
      field: 'isDrugAbuserOrAddict',
      label: 'Are you or have you ever been a drug abuser or addict?',
      detailsField: 'drugAbuse',
      explanation: 'Includes use of illegal drugs or misuse of prescription drugs'
    },
    {
      field: 'hasBeenArrested',
      label: 'Have you ever been arrested or convicted of any offense or crime, even though subject of a pardon, amnesty, or other similar action?',
      detailsField: 'arrestDetails',
      explanation: 'Includes all arrests, even if charges were dropped or dismissed'
    },
    {
      field: 'hasCriminalHistory',
      label: 'Have you ever committed a crime of moral turpitude or a drug-related offense?',
      detailsField: 'criminalHistory',
      explanation: 'Includes crimes such as fraud, theft, assault, etc.'
    },
    {
      field: 'hasViolatedDrugLaws',
      label: 'Have you ever violated any law related to possessing, using, or distributing illegal drugs?',
      detailsField: 'drugViolationDetails',
      explanation: 'Includes any drug-related offenses'
    },
    {
      field: 'hasBeenInvolvedInProstitution',
      label: 'Have you ever been involved in prostitution or procuring others for prostitution?',
      detailsField: 'prostitutionDetails',
      explanation: 'Includes any involvement in commercial sex work'
    },
    {
      field: 'hasEngagedInMoneyLaundering',
      label: 'Have you ever engaged in money laundering?',
      detailsField: 'moneyLaunderingDetails',
      explanation: 'Includes hiding the source of illegally obtained money'
    },
    {
      field: 'hasCommitedFraud',
      label: 'Have you ever committed fraud or misrepresented yourself to obtain immigration benefits?',
      detailsField: 'fraudDetails',
      explanation: 'Includes providing false information on visa applications'
    },
    {
      field: 'hasTerroristConnections',
      label: 'Have you ever been or are you now involved in terrorist activities, espionage, sabotage, or genocide?',
      detailsField: 'terroristConnections',
      explanation: 'Includes any association with terrorist organizations'
    },
    {
      field: 'hasEngagedInEspionage',
      label: 'Have you ever engaged in espionage, sabotage, or export control violations?',
      detailsField: 'espionageDetails',
      explanation: 'Includes sharing sensitive information without authorization'
    },
    {
      field: 'hasEngagedInGenocide',
      label: 'Have you ever engaged in genocide or severe violations of religious freedom?',
      detailsField: 'genocideDetails',
      explanation: 'Includes participation in mass killings or persecution'
    },
    {
      field: 'hasBeenInvolvedInTorture',
      label: 'Have you ever been involved in torture or extrajudicial killings?',
      detailsField: 'tortureDetails',
      explanation: 'Includes participation in or ordering of torture'
    },
    {
      field: 'hasBeenInvolvedInExtrajudicialKillings',
      label: 'Have you been involved in extrajudicial killings, political killings, or other acts of violence?',
      detailsField: 'extrajudicialKillings',
      explanation: 'Includes participation in unlawful killings'
    },
    {
      field: 'hasVisaOverstay',
      label: 'Have you ever overstayed your authorized period of stay in the United States?',
      detailsField: 'overstayDetails',
      explanation: 'Includes staying beyond your I-94 expiration date'
    },
    {
      field: 'hasBeenDeported',
      label: 'Have you ever been deported, removed, or excluded from the United States?',
      detailsField: 'deportationDetails',
      explanation: 'Includes formal removal proceedings'
    },
    {
      field: 'hasHelpedOthersEnterUSIllegally',
      label: 'Have you ever helped someone else enter or try to enter the United States illegally?',
      detailsField: 'illegalEntryAssistance',
      explanation: 'Includes smuggling or assisting undocumented entry'
    },
    {
      field: 'isMemberOfTotalitarianParty',
      label: 'Are you now or have you ever been a member of a totalitarian party?',
      detailsField: 'totalitarianPartyDetails',
      explanation: 'Includes Communist Party or other totalitarian organizations'
    },
    {
      field: 'hasParticipatedInPersecution',
      label: 'Have you ever participated in the persecution of any person because of race, religion, nationality, political opinion, or membership in a particular social group?',
      detailsField: 'persecutionDetails',
      explanation: 'Includes any form of discrimination or persecution'
    }
  ];

  const hasAnyYesAnswer = () => {
    return securityQuestions.some(question => data[question.field] === true);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="bold">
          Important: Answer these questions truthfully and completely.
        </Typography>
        <Typography variant="body2">
          Providing false information can result in permanent ineligibility for a U.S. visa.
          Even if you answer "Yes" to any question, you may still be eligible for a visa.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Main Security Questions */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="error">
              Security and Background Questions
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Alert severity="info" sx={{ mb: 3 }}>
              Please carefully answer each question. If you answer "Yes" to any question,
              you must provide complete details in the space provided.
            </Alert>

            {securityQuestions.map((question, index) => (
              <Box key={question.field} sx={{ mb: 3 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {index + 1}. {question.label}
                  </FormLabel>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {question.explanation}
                  </Typography>
                  <RadioGroup
                    row
                    value={data[question.field] === true ? 'yes' : data[question.field] === false ? 'no' : ''}
                    onChange={(e) => handleYesNoChange(question.field, e.target.value === 'yes')}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>

                <Collapse in={data[question.field] === true}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Please provide complete details"
                    value={data.details?.[question.detailsField] || ''}
                    onChange={(e) => handleDetailsChange(question.detailsField, e.target.value)}
                    sx={{ mt: 2 }}
                    helperText="Include dates, locations, circumstances, and outcomes"
                  />
                </Collapse>

                {index < securityQuestions.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Additional Information Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <IconButton onClick={() => toggleSection('additional')}>
                {expandedSections.additional ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Collapse in={expandedSections.additional}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Any other information you would like to provide regarding these questions"
                value={data.details?.otherDetails || ''}
                onChange={(e) => handleDetailsChange('otherDetails', e.target.value)}
                helperText="You may provide any additional explanations or context here"
              />
            </Collapse>
          </Paper>
        </Grid>

        {/* Legal Warning */}
        <Grid item xs={12}>
          <Alert severity="error">
            <Typography variant="body2" fontWeight="bold">
              Legal Warning:
            </Typography>
            <Typography variant="body2">
              • Willfully providing false information on this application is a criminal offense<br />
              • False statements can result in permanent visa ineligibility<br />
              • You may be subject to criminal prosecution for fraud<br />
              • All information provided is subject to verification<br />
              • You must disclose all relevant information, even if you think it might negatively affect your application
            </Typography>
          </Alert>
        </Grid>

        {/* Consultation Advice */}
        {hasAnyYesAnswer() && (
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="body2" fontWeight="bold">
                Important Notice:
              </Typography>
              <Typography variant="body2">
                Since you answered "Yes" to one or more questions, you may want to consult with an immigration attorney
                before submitting your application. Some "Yes" answers may not necessarily make you ineligible for a visa,
                but they do require careful review and complete disclosure.
              </Typography>
            </Alert>
          </Grid>
        )}

        {/* Final Confirmation */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.truthfulDeclaration || false}
                  onChange={(e) => onChange('truthfulDeclaration', e.target.checked)}
                  required
                />
              }
              label={
                <Typography variant="body2" fontWeight="bold">
                  I declare under penalty of perjury that all information I have provided
                  on this form is true and correct to the best of my knowledge and belief.
                </Typography>
              }
            />
          </Paper>
        </Grid>

        {/* Completion Status */}
        <Grid item xs={12}>
          <Alert
            severity={
              data.truthfulDeclaration &&
                securityQuestions.every(q => data[q.field] !== undefined) ?
                "success" : "warning"
            }
          >
            {data.truthfulDeclaration &&
              securityQuestions.every(q => data[q.field] !== undefined) ?
              "All security questions answered and declaration signed" :
              "Please answer all security questions and confirm the declaration"}
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityStep;