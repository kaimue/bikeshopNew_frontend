import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav>
      <div>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</div>
    </nav>
  );
};

export default Protected;
