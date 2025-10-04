import React from "react";
import Header from "../Common/Header";
import NavBar from "../Common/NavBar";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";
import CartDrawer from "../Layout/CartDrawer";



const UserLayout = () => {
  const [openCart, setOpenCart] = React.useState(false);

  const toggleCartDrawer = () => setOpenCart(!openCart);

  return (
    <div>
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
      <CartDrawer
        openCart={openCart}
        toggleCartDrawer={toggleCartDrawer}
      />
    </div>
  );
};

export default UserLayout;
