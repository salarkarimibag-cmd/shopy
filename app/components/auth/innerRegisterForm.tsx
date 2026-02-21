import { RegisterFormValuesInterface } from "@/pages/auth";
import { Form, FormikProps } from "formik";
import Input from "../shared/form/input";

const InnerRegisterForm = (props: FormikProps<RegisterFormValuesInterface>) => {
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

export default InnerRegisterForm;
