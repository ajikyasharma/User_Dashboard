import React, { useState } from 'react';
import { Autocomplete, Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as yup from "yup";
import { useFormik } from 'formik';
import {createUserWithEmailAndPassword, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import app from '../Firebase/setup.js'
import { db} from '../Firebase/setup.js'
import {setDoc, doc} from 'firebase/firestore'
import { Link } from 'react-router-dom';

const auth = getAuth(app);

function SignUp({}) {
    const [showPassword, setShowPassword] = useState(false)
    const [isOtpSend, setIsOtpSend] = useState(false)
    const [isVerified, setIsVerified]= useState(false)
    const [loading, setLoding] = useState(false)
    // const recaptcha = null;
    const initialValues ={
      name:'',
      email:'',
      mobile_number:'',
      password:'',
      otp:''
    }


    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .min(2,"Please enter name more than 2 characters")
        .required("Please enter your full name"),
      email: yup
        .string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Invalid email"
        )
        .required("Please enter your email"),
        mobile_number: yup
        .string()
        .matches(/^[0-9]{12}$/, "Mobile number must be exactly 10 digits")
        .required("Please enter your mobile number"),
      password: yup
        .string()
        .required("Please enter your password.")
        .min(6, "Password is too short - should be 6 chars minimum"),
    });

    const handleSubmit = async() =>{
      console.log("formik", formik)
      const name= formik.values.name
      const email = formik.values.email 
      const mobile_number = formik.values.mobile_number 
      const password = formik.values.password

      try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log("user", user);
          if(user){
            await setDoc(doc(db, "Users", user.uid ),{
              name:name,
              email: email,
              mobile_number: mobile_number,
              password:password

            })
          }
          alert("user Registered Successfully")
          formik.resetForm()
          setIsOtpSend(false)
          setIsVerified(false)
      } catch (error) {
        alert(error)
        console.log("Error in registration", error)
        
      }
    }

    const formik = useFormik({
      initialValues:initialValues,
      validationSchema:validationSchema,
      onSubmit: handleSubmit
    })

    const onCapchaVerify = ()=>{

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          console.log("gadbad ho gyii")
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      });
    }


    const sendOTP = () =>{
        onCapchaVerify()
      const phoneNumber = "+"+ formik.values.mobile_number
const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("OTP has been sent")
        setIsOtpSend(true)

        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
    }


    const verifyOTP = () =>{
      const code = formik.values.otp;
window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  alert("verification done")
  setIsVerified(true)
  // ...
}).catch((error) => {
  alert("invalid OTP")
  // User couldn't sign in (bad verification code?)
  // ...
});
    }

if(loading)
  {
    return <div className='h-screen w-screen flex justify-center items-center'>
          <CircularProgress />
    </div>
  }


  return (
    <div className='min-h-screen bg-gray-200'>
    <div className="flex  flex-col items-center min-h-screen justify-center container mx-auto">
    <div className=" bg-white shadow-2xl p-4 w-full sm:w-4/6 lg:w-2/6" >
    <div className="text-center my-4">
      <p className="text-2xl font-bold">Hey! Register Yourself Here.</p>
    </div>

    <form className="flex flex-col" onSubmit={formik.handleSubmit}>

    <TextField
        name='name'
        // className="w-4/5 sm:w-2/5 md:w-2/6"
        label="Name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'darkslategray',
            },
          },
        }}
      />

      <TextField
        name='email'
        // className="w-4/5 sm:w-2/5 md:w-2/6"
        label="Email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'darkslategray',
            },
          },
        }}
      />








      <TextField
        name='password'
        // className="w-4/5 sm:w-2/5 md:w-2/6"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'darkslategray',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

<PhoneInput
  name='mobile_number'
  country={'in'}
  value={formik.mobile_number}
  onChange={(value) => formik.setFieldValue('mobile_number', value)}
  inputStyle={{height:'55px', width:"100%", border:"1px solid darkslategray"}}
/>

{formik.touched.mobile_number &&
                  formik.errors.mobile_number && (
                    <p
                      style={{
                        fontSize: "13px",
                        padding: "0.75rem",
                        color: "red",
                      }}
                    >
                      {formik.errors.mobile_number}
                    </p>
                  )}

 { (!isVerified && isOtpSend) && <TextField
        name='otp'
        // className="w-4/5 sm:w-2/5 md:w-2/6"
        label="Enter OTP"
        type='text'
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.otp && Boolean(formik.errors.otp)}
        helperText={formik.touched.otp && formik.errors.otp}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'darkslategray',
            },
          },
        }}
      />}



  
     { !isVerified && <div id ="recaptcha-container" style={{width:"100%", marginTop:"10px",}}  className='sm:mt-4'></div>} 
  


      { (!isVerified && !isOtpSend) &&    <Button
        variant="contained"
        // color="secondary"
        className="md:w-1/2 "
        aria-label="Register"
        margin="normal"
        onClick={sendOTP}
        size="large"
      style={{ margin: "0 auto", marginTop:"5px" }}
      >
        Send OTP
      </Button>      }


      {(!isVerified && isOtpSend) && <Button
        variant="contained"
        // color="secondary"
        className="md:w-1/2 "
        aria-label="Register"
        margin="normal"
        onClick={verifyOTP}
        size="large"
      style={{ margin: "0 auto", marginTop:"5px" }}
      >
        Verify OTP
      </Button> }


      {isVerified &&   <Button
        variant="contained"
        // color="secondary"
        className="md:w-1/2 "
        aria-label="Register"
        type="submit"
        margin="normal"
        onClick={formik.handleSubmit}
        size="large"
      style={{ margin: "0 auto", marginTop:"5px" }}
      >
        Register
      </Button>}
 


    </form>
    <div className='text-center m-2'>
      <p>Already have account? <Link to='/' className="text-blue-600">Login</Link></p>
    </div>
  </div>
  </div>
  </div>
  )
}

export default SignUp