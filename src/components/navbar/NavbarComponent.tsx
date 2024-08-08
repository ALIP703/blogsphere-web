import * as React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/utils/helpers/hook/ReduxHook";
import { RootState } from "@/utils/helpers/auth/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the close icon
import DropDownProfileComponent from "../dropDownProfile/DropDownProfile";
import ToolTip from "../toolTip/ToolTip";

interface HeaderProps {
  title: string;
}

export default function NavbarComponent(props: HeaderProps) {
  const [openProfileMenu, setOpenProfileMenu] = React.useState<boolean>(false);
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
            <ToolTip message="Write">
              <Link to={"/create-blog"} className="mr-4 mt-1.5 hidden lg:block">
                <FontAwesomeIcon icon={faPenToSquare} className=" w-5 h-5" />
              </Link>
            </ToolTip>
            {user.username == "" || null ? (
              <Link to={"/login"}>
                <span className="font-semibold">Login</span>
              </Link>
            ) : (
              <div className="relative flex items-center">
                <ToolTip message="Profile">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    id="user-menu-button"
                    aria-expanded="false"
                    onClick={() => setOpenProfileMenu(!openProfileMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${import.meta.env.VITE_BASE_URL}${user?.image}`}
                      alt="user photo"
                    />
                  </button>
                </ToolTip>
                {openProfileMenu && (
                    <DropDownProfileComponent
                      openProfileMenu={openProfileMenu}
                      setOpenProfileMenu={setOpenProfileMenu}
                    />
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
