import React from "react";
import { AxiosResponse } from "axios";
import { PUBLIC_DATA_SERVICES } from "@/utils/services/api/blogServices";
import { HomeCardComponentInterface } from "@/utils/helpers/constants/interfaces";
import { useNavigate } from "react-router-dom";

export const HOMEPAGE_HOOK_HELPERS = {
  useManageHomePage: () => {
    const [blogs, setBlogs] = React.useState<HomeCardComponentInterface>();
    const navigate = useNavigate();

    React.useEffect(() => {
      void PUBLIC_DATA_SERVICES.getBlogs()
        .then((res: AxiosResponse) => {
          setBlogs(res.data.data);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
          if (err?.response?.status) {
            navigate('login')
          }
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { blogs, setBlogs };
  },
};
