import NavBar from "./NavBar";
import Footer from "./Footer";

const NavbarAndFooter = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default NavbarAndFooter;
