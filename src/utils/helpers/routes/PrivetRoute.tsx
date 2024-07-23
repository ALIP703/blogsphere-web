import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/utils/helpers/hook/ReduxHook";
import { RootState } from "@/utils/helpers/auth/store";

interface PrivetRouteProps {
  children: ReactNode;
}

const PrivetRoute: React.FC<PrivetRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return user.access ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivetRoute;
