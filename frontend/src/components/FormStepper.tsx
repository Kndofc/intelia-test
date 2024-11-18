import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

interface FormStepperProps {
  activeStep: number;
  steps: string[];
}

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: '100%', marginBottom: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;
