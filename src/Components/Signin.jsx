import React, { useState } from 'react';
import { Autocomplete, Button, IconButton, InputAdornment, TextField } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as yup from "yup";
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Firebase/setup.js'
import { Link, useNavigate } from 'react-router-dom';
const auth = getAuth(app);

function Signin({}) {
    const [showPassword, setShowPassword] = useState(false)
    const [useMobileNo, setUseMobileNo]= useState(false)

    const navigate = useNavigate()

    const initialValues ={
      email:'',
      mobile_number:'',
      password:'',
    }


    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Invalid email"
        ),
        mobile_number: yup
        .string()
        .matches(/^[0-9]{12}$/, "Mobile number must be exactly 10 digits"),
      password: yup
        .string()
        .required("Please enter your password."),

    });

    const handleSubmit = async() =>{
      const email = formik.values.email
      const password = formik.values.password

      try {
        await signInWithEmailAndPassword(auth,email,password);
        alert("User Signed in Successfully")
        navigate('/app')
      } catch (error) {
        alert(error)
      }
    }

    const formik = useFormik({
      initialValues:initialValues,
      validationSchema:validationSchema,
      onSubmit: handleSubmit
    })




  return (
    <div className='min-h-screen bg-gray-200'>
    <div className="flex  flex-col items-center min-h-screen justify-center container mx-auto ">
    <div className=" bg-white shadow-2xl p-4 w-full sm:w-4/6 lg:w-2/6 mx-4">
    <div className="text-center my-4">
      <p className="text-2xl font-bold">Login Here</p>
    </div>

    <form className="flex flex-col" onSubmit={formik.handleSubmit}>



   {!useMobileNo && <TextField
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
      />}   

   
   {!useMobileNo &&       <TextField
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
      />}


{useMobileNo &&
<div>
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
                         </div>
                  }



  
    <Button
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
        Login
      </Button> 


    </form>

    <div className='text-center m-2'>
      <p>Do not have account? <Link to='/signup' className="text-blue-600">Create Account</Link></p>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Signin