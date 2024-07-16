import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      router.push('/')
    }
  
  }, [])

  const handlechange = (e) => {
    // console.log(e);

    if (e.target.name == "name") setName(e.target.value);
    else if (e.target.name == "password") setPassword(e.target.value);
    else setEmail(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responce = await res.json();

    // console.log(responce);
    setEmail("");
    setName("");
    setPassword("");
    if (responce.success) {
      toast.success("Your account has been created!", {
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

      router.push('/login')
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
              Sign in to create an account
            </h1>
            <form
              onSubmit={handlesubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium te "
                >
                  Your name
                </label>
                <input
                  onChange={handlechange}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  className=" border bor te rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placehold0  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium te "
                >
                  Your email
                </label>
                <input
                  onChange={handlechange}
                  value={email}
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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium te "
                >
                  Password
                </label>
                <input
                  onChange={handlechange}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border bord te rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button className="flex w-full justify-center mt-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
                Submit
              </button>
              <p className="text-sm font-light ">
                Already have an account ?{" "}
                <Link
                  href={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default signup;
