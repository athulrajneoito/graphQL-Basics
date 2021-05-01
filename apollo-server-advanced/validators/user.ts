import * as yup from 'yup';

const username:yup.StringSchema = yup
    .string()
    .required('username is required');

const name :yup.StringSchema= yup
    .string()
    .required('Name is required');

const email:yup.StringSchema = yup
    .string()
    .required('Email is required')
    .email('Invalid Email');

const password:yup.StringSchema = yup
    .string()
    .required('Password is required')
    .min(8,'Password minimun 8 characters');

export const signupValidation:yup.ObjectSchema<any>  = yup.object().shape({
    username,
    name,
    email,
    password
});

export const loginValidation:yup.ObjectSchema<any>  = yup.object().shape({
    username,
    password
});
    

