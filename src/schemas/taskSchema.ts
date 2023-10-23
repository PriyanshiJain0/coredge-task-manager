import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().max(36).required("Title is required."),
  description: yup
    .string()
    .min(10)
    .max(255)
    .required("Discription is required."),
  dueDate: yup.date().required("Due date is required."),
});
