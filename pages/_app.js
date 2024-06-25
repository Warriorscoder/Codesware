import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart"))
        setCart(JSON.parse(localStorage.getItem("cart")));
      saveCart(JSON.parse(localStorage.getItem("cart")))
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (newcart) => {
    // console.log(newcart); 
    localStorage.setItem("cart",JSON.stringify(newcart));
    let subt = 0;
    let keys = Object.keys(newcart);

    // console.log(keys);
    for (let a = 0; a < keys.length; a++) {
      subt += newcart[keys[a]].price * newcart[keys[a]].qty;
    }

    setSubtotal(subt);
  };

  const addtocart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removefromcart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  return (
    <>
      <Navbar
        key={subtotal}
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        clearCart={clearCart}
        subtotal={subtotal}
      />
      <Component
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        clearCart={clearCart}
        subtotal={subtotal}
        {...pageProps}
      />
      ;
      <Footer />
    </>
  );
}
