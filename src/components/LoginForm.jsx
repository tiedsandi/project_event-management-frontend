import { Form, Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <Form method="post">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Login ke Akun Anda
      </h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Daftar di sini
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
