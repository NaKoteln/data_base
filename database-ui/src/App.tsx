import AppRouter from "./routes/AppRouter";
import AuthRouter from "./routes/AuthRouter";

function App() {
  const token = sessionStorage.getItem("token");
  if (token) return <AppRouter />;
  else return <AuthRouter />;
}

export default App;
