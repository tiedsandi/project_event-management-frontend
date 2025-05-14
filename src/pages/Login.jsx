/* eslint-disable react-refresh/only-export-components */

import LoginForm from "../components/LoginForm";
import { redirect } from "react-router-dom";

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://projectevent-management-backend-production.up.railway.app/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  const resData = await response.json();

  if (!response.ok) {
    if (resData.errors && Array.isArray(resData.errors)) {
      return new Response(JSON.stringify({ error: resData.errors[0].msg }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: resData.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  localStorage.setItem("token", resData.token);
  return redirect("/");
}
