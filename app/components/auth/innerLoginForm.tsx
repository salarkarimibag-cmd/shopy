import { Form, FormikProps } from "formik";
import { LoginFormValuesInterface } from "../../contracts/auth";
import Input from "../shared/form/input";

const InnerLoginForm = (props: FormikProps<LoginFormValuesInterface>) => {
  const { status, isSubmitting } = props;

  return (
    <Form className="space-y-6">
      <div>
        <Input name="email" type="email" label="Email Address" />
      </div>

      <div>
        <Input name="password" type="password" label="Password" />
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
          {isSubmitting ? "Please wait..." : "Login"}
        </button>
      </div>
    </Form>
  );
};

export default InnerLoginForm;
