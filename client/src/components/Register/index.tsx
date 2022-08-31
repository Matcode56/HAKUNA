import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="flex justify-center ml-8">
      <div className="container bg-white  py-10 mt-5 rounded-3xl shadow-xl w-1/3 px-12 grid max-h-screen overflow-scroll mb-10">
        <img
          src="/icons/HakunaLogo.png"
          alt="logo"
          className="justify-self-center ml-8 -mb-16"
        />
        <form>
          <h1 className="text-center font-title mb-5 uppercase text-xl underline">
            Create an account
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="example@mail.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="password"
            >
              Confirm your password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="fName"
            >
              Firstname
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fName"
              type="text"
              placeholder="John"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="lName"
            >
             Lastname
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lName"
              type="text"
              placeholder="Doe"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4 font-subtitle"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="0700000001"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="custom-buttons justify-self-center font-paragraph"
              type="button"
            >
              Register
            </button>
            <div className="flex flex-col">
              <Link
                className="inline-block align-baseline font-bold text-sm text-lavender font-paragraph hover:text-blue-800"
                to="/"
              >
                Already have an account ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
