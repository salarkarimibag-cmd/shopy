import InnerRegisterForm from "@/app/components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "@/app/contracts/auth";
import callApi from "@/app/helpers/callApi";
import { withFormik } from "formik";
import Router from "next/router";

import * as Yup from "yup";

interface RegisterFormProps {}
const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>(
  {
    mapPropsToValues: (props) => ({
      name: "",
      email: "",
      password: "",
    }),

    validationSchema: Yup.object({
      name: Yup.string().min(3, "حداقل ۳ کاراکتر").required("نام الزامی است"),
      email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("ایمیل الزامی است"),
      password: Yup.string()
        .min(6, "حداقل ۶ کاراکتر")
        .required("رمز عبور الزامی است"),
    }),
    handleSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await callApi().post("/auth/register", values);
        Router.push("/auth/login");
        console.log(res.data);
      } catch (error: any) {
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Server Message:", error.response.data);
        } else {
          console.log("Unexpected Error:", error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  },
)(InnerRegisterForm);

export default RegisterForm;
