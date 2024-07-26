// SignUPComponent.tsx
import { Link } from "react-router-dom";
import { SIGN_UP_PAGE_HOOK_HELPERS } from "./Helper";

const SignUPComponent = () => {
  const { handleChange, userData, handleSubmit } =
    SIGN_UP_PAGE_HOOK_HELPERS.useManageSignUpPage();

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row">
      <div className="md:block hidden max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 lg:mr-8">
        <p className="mb-20 font-bold tracking-wider">BlogSphere</p>
        <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
          Start your <br />
          journey with us
        </p>
      </div>
      <div className="px-4 lg:px-12 py-14 w-full">
        <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-full">
            <div>
              <p className="mb-1 font-medium text-gray-500">First Name</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="text"
                    name="first_name"
                    id="signup-first-name"
                    onChange={handleChange}
                    value={userData.first_name}
                    placeholder="Enter your First Name"
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-500">Last Name</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="text"
                    name="last_name"
                    id="signup-last-name"
                    onChange={handleChange}
                    value={userData.last_name}
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your Last Name"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-500">Username</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="text"
                    name="username"
                    id="signup-username"
                    onChange={handleChange}
                    value={userData.username}
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-500">Email</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="email"
                    name="email"
                    id="signup-email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-500">Password</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="password"
                    name="password"
                    id="signup-password"
                    onChange={handleChange}
                    value={userData.password}
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Choose a password (minimum 8 characters)"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-500">Confirm Password</p>
              <div className="mb-4 flex flex-col">
                <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    id="signup-confirm-password"
                    value={userData.confirmPassword}
                    className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
          <button
            type="submit"
            className=" rounded-lg  text-gray-500 bg-gray-200 px-8 py-3 font-bold my-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUPComponent;
