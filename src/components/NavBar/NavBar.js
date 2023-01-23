import CartButton from "../CartButton/CartButton";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import Header from "../Header/Header";
import ProductMenu from "../ProductMenu/ProductMenu";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="navbar">
      <div>
        <Header />
      </div>
      <div>
        <ProductMenu />
      </div>
      {!isAuthenticated ? (
        <div>
          <LoginButton />
        </div>
      ) : (
        <div>
          <LogoutButton />
        </div>
      )}

      <div>
        <CartButton />
      </div>
    </nav>
  );
};

export default NavBar;
