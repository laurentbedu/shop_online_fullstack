import { Outlet } from "react-router-dom";
import NavBar from "../components/layouts/NavBar";
import Footer from "../components/layouts/Footer"

const BaseScreen = () => {
  return (
    <>
      
      <NavBar/>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default BaseScreen;
