"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Gender } from "@/types/common";
import { FieldValues } from "react-hook-form";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SecurityIcon from "@mui/icons-material/Security";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Personal Info", icon: <PersonIcon /> },
    { label: "Professional Details", icon: <WorkIcon /> },
    { label: "Account Setup", icon: <SecurityIcon /> },
  ];

  const handleFormSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);

    console.log(values);
    const data = modifyPayload(values);
    console.log(data);

    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor created successfully!!!");
        setOpen(false);
        setActiveStep(0);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create doctor");
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      apointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.name"
                  label="Full Name"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.email"
                  type="email"
                  label="Email Address"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.contactNumber"
                  label="Contact Number"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHSelectField
                  items={Gender}
                  name="doctor.gender"
                  label="Gender"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <PHInput
                  name="doctor.address"
                  label="Address"
                  fullWidth={true}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
              Professional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.registrationNumber"
                  label="Registration Number"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.experience"
                  type="number"
                  label="Experience (Years)"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.qualification"
                  label="Qualification"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.designation"
                  label="Designation"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.currentWorkingPlace"
                  label="Current Working Place"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PHInput
                  name="doctor.apointmentFee"
                  type="number"
                  label="Appointment Fee ($)"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
              Account Security
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PHInput
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth={true}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    <strong>Review:</strong> Please verify all information before submission. 
                    The doctor will receive login credentials via email.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          background: theme.palette.background.paper,
          [theme.breakpoints.up('md')]: {
            minHeight: '600px'
          }
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}>
        <Typography variant="h6" component="h2" fontWeight="600">
          Create New Doctor Profile
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ width: '100%', p: 3, pb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel 
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: activeStep === index ? 'primary.main' : 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: activeStep === index ? 'white' : 'grey.600'
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>
          <PHForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Box sx={{ minHeight: '400px' }}>
              {renderStepContent(activeStep)}
            </Box>

            <Divider sx={{ my: 3 }} />

            <DialogActions sx={{ 
              p: 0, 
              gap: 2,
              justifyContent: activeStep === 0 ? 'flex-end' : 'space-between'
            }}>
              {activeStep > 0 && (
                <Button 
                  onClick={handleBack} 
                  disabled={isLoading}
                  variant="outlined"
                  size="large"
                >
                  Back
                </Button>
              )}
              
              {activeStep < steps.length - 1 ? (
                <Button 
                  onClick={handleNext} 
                  variant="contained"
                  size="large"
                  endIcon={<CheckIcon />}
                  sx={{ minWidth: 120 }}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={isLoading}
                  size="large"
                  sx={{ minWidth: 140 }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Creating...
                    </>
                  ) : (
                    "Create Doctor"
                  )}
                </Button>
              )}
            </DialogActions>
          </PHForm>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorModal;