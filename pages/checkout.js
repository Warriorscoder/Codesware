import React, { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import Head from "next/head";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function checkout({ cart, addtocart, removefromcart, subtotal }) {
  // console.log("cart" , cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [check, setCheck] = useState(true);
  const router = useRouter();

  const handlechandge = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    }

    setTimeout(() => {
      if (
        (name.length > 3,
        email.length > 3,
        phone.length > 3,
        pincode.length > 3,
        address.length > 3)
      ) {
        setCheck(false);
      } else setCheck(true);
    }, 100);
  };

  const handlepay = async () => {
    let orderId = JSON.stringify(Math.floor(Math.random() * 100001 + 1));
    let status = "Pending";
    let products = [];

    Object.keys(cart).map((items) => {
      let temp = { title: items, quantity: cart[items].qty, price:cart[items].price };

      products.push(temp);
    });
      let amount = subtotal;
    const data = { email, orderId, products, address, amount, status };

    // console.log(data)
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/setorders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let responce = await res.json();
    // console.log(responce)

    if (responce.success) {
      toast.success("Your order has been created!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setAddress('')
      setEmail('')
      setEmail('')
      setName('')
      setPhone('')
      setPincode('')

      setTimeout(() => {

        router.push(`/order?id=${responce.id}`)
        
      }, 2000);
    }
  };
  return (
    <div className=" container m-auto my-5">
        <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div className="text-3xl text-center font-bold ">Checkout</div>
      <h1 className="font-bold text-xl">1. Delivery Details</h1>

      <div className="flex mx-auto">
        <div className="mb-4 w-1/2 m-2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            onChange={handlechandge}
            value={name}
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="mb-4  w-1/2 m-2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            onChange={handlechandge}
            value={email}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="textarea">
        <div className=" mb-4 m-2">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handlechandge}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      <div className="flex mx-auto">
        <div className="mb-4 w-1/2 m-2">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Phone
          </label>
          <input
            onChange={handlechandge}
            value={phone}
            type="phone"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="mb-4  w-1/2 m-2">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            onChange={handlechandge}
            value={pincode}
            type="number"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="flex mx-auto">
        <div className="mb-4  w-1/2 m-2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="mb-4  w-1/2 m-2">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <h1 className="font-bold text-xl">2. Review your cart</h1>

      <div className="cart  bg-pink-200 m-2 p-5">
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="mt-2 text-center font-semibold">
              Your cart is empty!!{" "}
            </div>
          )}

          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="items flex">
                  <div className="flex w-2/3 my-5">{`${cart[k].name} ( ${cart[k].size}/${cart[k].variant})`}</div>
                  <div className=" flex w-1/3 items-center justify-center">
                    <FaCircleMinus
                      onClick={() => {
                        removefromcart(k, 1, 499, "Wear the code", "XL", "red");
                      }}
                      className="text-pink-500"
                    />
                    <span className="mx-2">{cart[k].qty}</span>
                    <FaCirclePlus
                      onClick={() => {
                        addtocart(k, 1, 499, "Wear the code", "XL", "red");
                      }}
                      className="text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <span className="font-bold">Subtotal: ₹{subtotal}</span>
      </div>
      <button
        onClick={handlepay}
        disabled={check}
        className=" disabled:bg-pink-300 flex mx-2 mt-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm"
      >
        Pay ₹{subtotal}
      </button>
    </div>
  );
}

export default checkout;
