/* eslint-disable react-refresh/only-export-components */
import { redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

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
  const token = resData.token;
  localStorage.setItem("token", token);
  // console.log(resData);

  return redirect("/");
}
