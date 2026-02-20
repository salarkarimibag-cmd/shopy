import Input from "@/app/components/shared/form/input";
import { Form, FormikProps, withFormik } from "formik";
import * as Yup from "yup";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}
const InnerRegisterForm = (props: FormikProps<RegisterFormValues>) => {
  const { isSubmitting } = props;

  return (
    <Form className="space-y-6">
      <Input label="Name" name="name" autoComplete="name" />
      <Input
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </Form>
  );
};

interface RegisterFormProps {
  name?: string;
}
const RegisterForm = withFormik<RegisterFormProps, RegisterFormValues>({
  mapPropsToValues: (props) => ({
    name: props.name??"",
    email: "",
    password: "",
  }),

  validationSchema: Yup.object({
    name: Yup.string().min(3, "حداقل ۳ کاراکتر").required("نام الزامی است"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: Yup.string()
      .min(6, "حداقل ۶ کاراکتر")
      .required("رمز عبور الزامی است"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },
})(InnerRegisterForm);

export default RegisterForm;
