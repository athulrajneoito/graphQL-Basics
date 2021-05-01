import * as yup from 'yup';

const title :yup.StringSchema= yup
    .string()
    .required('Title is required');

const content:yup.StringSchema = yup
    .string()
    .required('Content is required');

export const postValidation:yup.ObjectSchema<any> = yup.object().shape({
    title, content
});




