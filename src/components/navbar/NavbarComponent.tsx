import * as React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/utils/helpers/hook/ReduxHook";
import { RootState } from "@/utils/helpers/auth/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the close icon

interface HeaderProps {
  title: string;
}

export default function NavbarComponent(props: HeaderProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);
  let { title } = props;
  title = title.toUpperCase();

  return (
    <React.Fragment>
      <nav className="bg-white border-gray-200 border">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
          <Link
            className="flex items-center space-x-3 rtl:space-x-reverse"
            to={"/"}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {title}
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to={"/create-blog"} className="mr-4 mt-1.5">
              <FontAwesomeIcon icon={faPenToSquare} className=" w-5 h-5" />
            </Link>
            {user.username == "" || null ? (
              <Link to={"/login"}>
                <span className="font-semibold">Login</span>
              </Link>
            ) : (
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`${import.meta.env.VITE_BASE_URL}${user?.image}`}
                    alt="user photo"
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">
                      {user?.username}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
