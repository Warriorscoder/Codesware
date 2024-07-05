import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlechange = (e) => {
    //   console.log(e);

    if (e.target.name == "password") setPassword(e.target.value);
    else if (e.target.name == "email") setEmail(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };
    let res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responce = await res.json();

    //   console.log(responce);
    setEmail("");
    setPassword("");

    if (responce.success) {
      localStorage.setItem("token", responce.token);

      toast.success("You logged in successfully!", {
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

      setTimeout(() => {
        router.push("http://localhost:3000");
      }, 1000);
    }
  };
  return (
    <section className="m-32">
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-fit lg:py-0">
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:0 dark:bord">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight te md:text-2xl ">
              Login in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium te "
                >
                  Your email
                </label>
                <input
                  onChange={handlechange}
                  type="email"
                  name="email"
                  id="email"
                  className=" border bor te rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placehold0  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@123.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium te "
                >
                  Password
                </label>
                <input
                  onChange={handlechange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border bord te rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border bord0 rounded  focus:ring-3 focus:ring-primary-300  dark:focus:ring-primary-600 dark:ring-offs"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href={"/forgot"}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button className="flex w-full justify-center mt-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
                Login
              </button>
              <p className="text-sm font-light ">
                Don’t have an account yet?{" "}
                <Link
                  href={"/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default login;
