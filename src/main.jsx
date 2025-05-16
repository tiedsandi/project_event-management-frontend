import "./index.css";

import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
//  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
// const userData = JSON.parse(localStorage.getItem("user") || "{}");
// console.dir(userData);

// const isAdmin = userData.role === "admin";

// TODO Frontend
// [ ] rapihin readme,

// TODO General
// [ ] masukin ke portofolio
// [ ] rapihin backend

// TODO Backend
// [ ] Rapihin documentation
// [ ] Rapihin Readme
// [ ] Direction path "/"
