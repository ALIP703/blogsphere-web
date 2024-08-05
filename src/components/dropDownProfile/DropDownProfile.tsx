import { useAppDispatch } from "@/utils/helpers/hook/ReduxHook";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "@/utils/helpers/auth/authSlice";
import "./DropDownProfile.css";

type DropDownProfileProps = {
    openProfileMenu: boolean;
    setOpenProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  };

  
const DropDownProfileComponent: React.FC<DropDownProfileProps>  = ({ openProfileMenu, setOpenProfileMenu }) => {
  const dispatch = useAppDispatch(); // Use the dispatch hook
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logOut());
    setOpenProfileMenu(!openProfileMenu);
    navigate("/login");
  };

  return (
    <div
      id="dropdown"
      className="flex flex-col dropDownProfile z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
    >
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg ">
            Profile
          </a>
        </li>
        <li>
          <Link
            to={"/create-blog"}
            className="block px-4 py-2 hover:bg-gray-100 rounded-lg "
            onClick={() => setOpenProfileMenu(!openProfileMenu)}
          >
            Write a blog
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 rounded-lg "
            onClick={handleSignOut}
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfileComponent;
