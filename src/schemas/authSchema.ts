import * as yup from "yup";

export const signUpSchema = yup.object().shape({
    username: yup.string().required('Name is required'),
    email: yup.string().email('Please enter valid email').required('Email is required'),
    password: yup.string().min(8).max(16).required('Password is required'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email is required'),
  password: yup.string().min(8).max(16).required('Password is required'),
});

