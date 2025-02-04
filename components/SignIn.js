import React, { useContext } from "react";
import { authContext } from "@/lib/store/auth-contex";

import { FcGoogle as GoogleIcon } from "react-icons/fc";

export default function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome &#128075;</h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
        <div className="h-52 ">
          <img
            className="object-cover w-full h-full"
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple127/v4/e4/99/61/e49961f0-fdbd-5e69-9183-a2159415730b/source/512x512bb.jpg"
          />
        </div>
        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Please Sign In To Continue</h3>

          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"
          >
            <GoogleIcon className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </main>
  );
}
