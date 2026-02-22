import InnerLoginForm from "@/app/components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "@/app/contracts/auth";
import { withFormik } from "formik";
import * as Yup from "yup";

const LoginForm = withFormik<{}, LoginFormValuesInterface>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validationSchema: Yup.object({
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: Yup.string()
      .min(6, "حداقل ۶ کاراکتر")
      .required("رمز عبور الزامی است"),
  }),

  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        values.email !== "salarkarimi.bag@gmail.com" ||
        values.password !== "123456"
      ) {
        setErrors({
          email: "ایمیل یا رمز اشتباه است",
        });
        return;
      }
      console.log("Login successful ✅");
    } finally {
      setSubmitting(false);
    }
  },
})(InnerLoginForm);

export default LoginForm;
