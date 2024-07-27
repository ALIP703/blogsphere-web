import React from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import { BLOG_SERVICES } from "@/utils/services/api/blogServices";
import { HomeCardComponentInterface } from "@/utils/helpers/constants/interfaces";
import { useNavigate } from "react-router-dom";

export const HOMEPAGE_HOOK_HELPERS = {
  useManageHomePage: () => {
    const [blogs, setBlogs] = React.useState<HomeCardComponentInterface>();
    const navigate = useNavigate();
    const handleClickCard=(id:string)=>{
      navigate(`blog/${id}`)
    }
    React.useEffect(() => {
      void BLOG_SERVICES.getBlogs()
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
    React.useEffect(() => {
      const handleScroll = (e: Event) => {
        const target = e.target as Document | null; // Cast e.target to Document or null
  
        if (!target) {
          return; // Handle case where e.target is null
        }
        const scrollHeight = target.documentElement.scrollHeight;
        const currentHeight =
          target.documentElement.scrollTop + window.innerHeight;
        if (currentHeight + 1 >= scrollHeight) {
          if (blogs?.next) {
            axios
              .get(blogs.next)
              .then(function (response) {
                const data: HomeCardComponentInterface = response.data.data;
                setBlogs((prev) => ({
                  ...prev,
                  results: [...prev!.results, ...data.results],
                  count: data.count,
                  next: data.next,
                  previous: data.previous,
                }));
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [blogs, setBlogs]);
  
    return { blogs, setBlogs, handleClickCard };
  },
};
