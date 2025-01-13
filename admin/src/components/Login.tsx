import React, { useState } from "react";
import { backendURL } from "../App";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

type LoginProps = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${backendURL}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-base text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter your Gmail"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter your Passwod"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
