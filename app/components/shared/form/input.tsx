import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}
const Input: FC<InputProps> = ({
  label,
  name,
  type = "text",
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 sm:text-sm"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};
export default Input;
