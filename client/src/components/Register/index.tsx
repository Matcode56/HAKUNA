import { Link } from "react-router-dom";

export const  Register = () => {
    return(
        <div className="flex justify-center ml-8">
        <div className="container bg-white  py-10 mt-20 rounded-3xl shadow-xl w-1/3 px-12 grid">
          <img
            src="/icons/HakunaLogo.png"
            alt="logo"
            className="justify-self-center ml-8"
          />
          <form>
            <h1 className="text-center font-title mb-10 uppercase text-xl underline">Create an account</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
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
              <p className="text-red-500 text-xs italic">Please enter a mail.</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
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
              <p className="text-red-500 text-xs italic">
                Please enter a password.
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
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
              <p className="text-red-500 text-xs italic">
                Passwords must match.
              </p>
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
                  Already have  an account ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}