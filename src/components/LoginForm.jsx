import { Form, Link, useActionData } from "react-router-dom";

import { useState } from "react";

const LoginForm = () => {
  const actionData = useActionData();
  // console.dir(actionData);
  // console.log(JSON.stringify(actionData, null, 2));

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form method="post">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Login ke Akun Anda
      </h2>

      {actionData?.error && (
        <div className="mb-4 text-sm font-medium text-center text-red-600">
          {actionData.error}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="relative mb-6">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          required
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute text-sm text-gray-500 right-3 top-9"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Login
      </button>

      <p className="mt-4 text-sm text-center text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Daftar di sini
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
