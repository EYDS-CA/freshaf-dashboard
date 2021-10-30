import * as yup from 'yup';

export const NewProjectSchema = yup.object().shape({
  name: yup.string().required('Please Enter a Project Name'),
});
