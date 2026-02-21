import type { NextPage } from "next";
import Image from "next/image";
import LoginForm from "@/app/forms/auth/loginForm";

const Login: NextPage = () => {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/shopy-logo.png"
          alt="Shopy Logo"
          width={150}
          height={150}
          className="mx-auto"
          priority
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Login to Shop
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
