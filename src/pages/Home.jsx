export default function HomePage() {
  //  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  console.dir(userData);

  // const isAdmin = userData.role === "admin";
  return <h1>Home</h1>;
}
