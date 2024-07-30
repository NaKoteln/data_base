import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../features/auth/pages/AuthPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((x) => (
          <Route key={x.path} path={x.path} element={x.page} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

const pages = [
  {
    path: "*",
    page: <Navigate to="/auth" replace={true} />,
  },
  {
    path: "auth",
    page: <AuthPage />,
  },
];

export default AppRouter;
