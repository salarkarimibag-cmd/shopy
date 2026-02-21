import InnerRegisterForm from "@/app/components/auth/innerRegisterForm";
import { RegisterFormValuesInterface } from "@/pages/auth";
import { withFormik } from "formik";
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

    handleSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  },
)(InnerRegisterForm);

export default RegisterForm;
