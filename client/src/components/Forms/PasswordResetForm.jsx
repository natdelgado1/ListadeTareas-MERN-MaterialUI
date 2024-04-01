"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, Fragment } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";
import { Container, TextField } from "@mui/material";
import { passwordReset, passwordResetToken } from "@/app/api/route";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";

const steps = ["Request Token", "Validade Token", "New Password"];

const PasswordResetForm = () => {
    const router = useRouter();
    const [email, setEmail]= useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [activeStep, setActiveStep] = useState(0);


  const handleNext = async () => {
    if(activeStep === 0){
        try {
            const getToken = await passwordResetToken({email: email})
            console.log(getToken);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);            
        } catch (error) {
            console.log(error);
        }
    }else if(activeStep === 1){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);            
        
    }else if(activeStep === 2){
        try {
            const data={
                email: email,
                password: password,
                token: token
            }
            console.log(data);
            const updatePassword = await passwordReset(data);
            console.log(updatePassword);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setTimeout(() => {
                router.push("/login")
            }, 2000);            
            
        } catch (error) {
            console.log(error);
        }
    }
    
};

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
               Tu contraseña se actualizó correctamente
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
                <Box sx={{mt:4}}>
                    {
                        activeStep === 0  &&
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label= "Email"
                        />
                    }
                    {
                        activeStep === 1&&
                        <MuiOtpInput length={6} value={token} onChange={setToken}  />
                    }
                     {
                        activeStep === 2  &&
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label= "New password"
                            type="password "
                        />
                    }

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
                    </Box>
            </Fragment>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default PasswordResetForm;