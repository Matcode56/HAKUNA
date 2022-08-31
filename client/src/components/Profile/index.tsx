import { useState } from "react";



export const Profile = () => {
    const [isDisabled, setIsDisabled] = useState(true)

  return (
    <>
      <h1 className="text-center text-3xl underline pt-4 ">User Profile</h1>
      <div className="flex justify-center ml-8">
        <div className="container bg-white  py-20 mt-20 rounded-3xl shadow-xl w-4/5 px-12 grid h-screen">
          <div className="flex justify-center place-items-center">
            <div className="mr-20">
              <img src="/icons/placeholderImage.png"></img>
            </div>
            <div>
              <form>
                <div className="grid grid-cols-2 auto-cols-max  w-full">
                  <div className="">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
                        htmlFor="email"
                      >
                        Firstname
                      </label>
                      <input
                        className={isDisabled? "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400"}
                        id="email"
                        type="text"
                        placeholder="Hakuna"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
                        htmlFor="email"
                      >
                        Lastname
                      </label>
                      <input
                        className={isDisabled? "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400"}
                        id="email"
                        type="text"
                        placeholder="Matata"
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className="w-full ml-10">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={isDisabled? "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400"}
                        id="email"
                        type="text"
                        placeholder="Hakuna@dev.com"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 font-subtitle"
                        htmlFor="email"
                      >
                        Phone
                      </label>
                      <input
                        className={isDisabled? "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400"}
                        id="phone"
                        type="text"
                        placeholder="0700000001"
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center">
          <button
              className="custom-buttons justify-self-center font-paragraph inline-block mr-4"
              type="button"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {isDisabled ? <p>Modify</p> : <p>Save</p>}
            </button>
            {isDisabled ? null : <p className="mx-auto mb-0 inline-block">You can now modify your informations</p>}
            </div>
        </div>
      </div>
    </>
  );
};
