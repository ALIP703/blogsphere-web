import React from "react";
import { RegistrationUserData } from "@/utils/helpers/constants/interfaces";
import { AUTH_SERVICES } from "@/utils/services/api/authServices";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const SIGN_UP_PAGE_HOOK_HELPERS = {
  useManageSignUpPage: () => {
    const [userData, setUserData] = React.useState<RegistrationUserData>({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (userData.password !== userData.confirmPassword) {
        enqueueSnackbar("Passwords do not match!", {
          variant: "warning",
        });
        return;
      }

      await AUTH_SERVICES.registration(userData)
        .then((res) => {
          console.log(res.data);
          if (res?.data?.status === 201) {
            enqueueSnackbar("Account created Successfully!", {
              variant: "success",
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message || "Account creation failed!";
          enqueueSnackbar(errorMessage, {
            variant: "error",
          });
        });

      // Optionally reset the form after submission
      // setUserData({
      //   firstName: "",
      //   lastName: "",
      //   username: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    };

    return { userData, handleChange, handleSubmit };
  },
};
