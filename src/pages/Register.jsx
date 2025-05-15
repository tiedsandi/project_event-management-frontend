import RegisterForm from "../components/RegisterForm";
import { redirect } from "react-router-dom";

/* eslint-disable react-refresh/only-export-components */
export default function RegisterPage() {
  return <RegisterForm />;
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const registrationData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const response = await fetch(
    "https://projectevent-management-backend-production.up.railway.app/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: result.message || "Registration failed." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const token = result.token;
  localStorage.setItem("token", token);

  const userResponse = await fetch(
    "https://projectevent-management-backend-production.up.railway.app/users/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userInfo = await userResponse.json();

  if (!userResponse.ok) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch user data after registration.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  localStorage.setItem("user", JSON.stringify(userInfo));

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
