import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setuser] = useState({ value: null, email:'' });
  const [key, setKey] = useState(0);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart"))
        setCart(JSON.parse(localStorage.getItem("cart")));
      saveCart(JSON.parse(localStorage.getItem("cart")));
    } catch (error) {
      console.log(error);
      // localStorage.clear();
      setCart({});
      saveCart({});
    }
    const token = localStorage.getItem("token");
    const email = localStorage.getItem('email')
    if (token) {
      setuser({ value: token , email: email});
    }
    setKey(Math.random());
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setKey(Math.random());
    setuser({ value: null, email:''});
    router.push("/");
  };
  const saveCart = (newcart) => {
    // console.log(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
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

  const buynow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {}

    newCart[itemCode] =  { qty: 1, price, name, size, variant } ;
    // console.log(newCart);
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
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
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && (
        <Navbar
          key={key}
          logout={logout}
          user={user}
          cart={cart}
          addtocart={addtocart}
          removefromcart={removefromcart}
          clearCart={clearCart}
          subtotal={subtotal}
        />
      )}
      <Component
        user={user}
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        clearCart={clearCart}
        subtotal={subtotal}
        buynow={buynow}
        {...pageProps}
      />
      
      <Footer />
    </>
  );
}
