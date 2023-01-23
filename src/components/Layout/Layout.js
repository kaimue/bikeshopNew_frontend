import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export const Layout = () => {
  return (
    <div className="site">
      <div className="content">
        <NavBar />
        <Outlet />
      </div>
      <Footer className="footer" />
    </div>
  );
};
