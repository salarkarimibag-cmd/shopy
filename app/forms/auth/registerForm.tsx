import { withFormik } from "formik";
import Router from "next/router";
import * as yup from "yup";
import InnerRegisterForm from "../../components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "../../contracts/auth";
import callApi from "../../helpers/callApi";

const registerFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("نام الزامی است")
    .min(4, "نام باید حداقل ۴ کاراکتر باشد"),

  email: yup
    .string()
    .trim()
    .required("ایمیل الزامی است")
    .email("فرمت ایمیل صحیح نیست"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد",
    ),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد"),
});

interface RegisterFormProps {}

const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>(
  {
    mapPropsToValues: () => ({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),

    validationSchema: registerFormValidationSchema,

    handleSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm },
    ) => {
      try {
        const { confirmPassword, ...formData } = values;
        console.log("Form Data:", formData);

        const response = await callApi().post("/auth/register", formData);
        console.log("Server Response:", response);

        if (response.status === 201) {
          resetForm();
          Router.replace("/auth/login");
        }
      } catch (error: any) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response?.data?.message) {
          setStatus(error.response.data.message);
        } else {
          setStatus("خطای غیرمنتظره رخ داد");
        }
      } finally {
        setSubmitting(false);
      }
    },
  },
)(InnerRegisterForm);

export default RegisterForm;
