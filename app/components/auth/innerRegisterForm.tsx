import { Form, FormikProps, ErrorMessage } from "formik";
import { RegisterFormValuesInterface } from "../../contracts/auth";
import Input from "../shared/form/input";

const InnerRegisterForm = (props: FormikProps<RegisterFormValuesInterface>) => {
  const { status, isSubmitting } = props;

  return (
    <Form className="space-y-6">
      <div>
        <Input name="name" label="Your name" />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <Input name="email" type="email" label="Email Address" />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <Input name="password" type="password" label="Password" />
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {status && (
        <div className="text-red-500 text-sm text-center">{status}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Please wait..." : "Register"}
        </button>
      </div>
    </Form>
  );
};

export default InnerRegisterForm;
