import { withFormik } from "formik";
import Router from "next/router";
import * as yup from "yup";
import InnerLoginForm from "../../components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "../../contracts/auth";
import callApi from "../../helpers/callApi";

const loginFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("ایمیل الزامی است")
    .email("فرمت ایمیل صحیح نیست"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

interface LoginFormProps {
  setCookie: any;
}

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validationSchema: loginFormValidationSchema,

  handleSubmit: async (
    values,
    { props, setSubmitting, setErrors, setStatus },
  ) => {
    try {
      const { data, status } = await callApi().post("/auth/login", values);

      if (status === 200) {
        props.setCookie("shopy-token", data.token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
          sameSite: "lax",
        });

        Router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus("ایمیل یا رمز عبور اشتباه است");
      }
    } finally {
      setSubmitting(false);
    }
  },
})(InnerLoginForm);

export default LoginForm;
