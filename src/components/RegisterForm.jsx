import { Form, Link, useActionData } from "react-router-dom";

import { useState } from "react";

const RegisterForm = () => {
  const actionData = useActionData();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Form method="post">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create a New Account
      </h2>

      {actionData?.error && (
        <div className="mb-4 text-sm font-medium text-center text-red-600">
          {actionData.error}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

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

      <div className="relative mb-4">
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
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="mb-6">
        <label
          htmlFor="role"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
      >
        Register
      </button>

      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
