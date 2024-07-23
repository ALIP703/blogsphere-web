import React from "react";
import axios from "axios";
import { HOMEPAGE_HOOK_HELPERS } from "./Helpers";
import { HomeCardComponentInterface } from "@/utils/helpers/constants/interfaces";

const HomeCardComponent = () => {
  const { blogs, setBlogs } = HOMEPAGE_HOOK_HELPERS.useManageHomePage();
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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.results.map((item, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
          >
            <a href="#">
              <img
                className="rounded-t-lg"
                src={`${import.meta.env.VITE_BASE_URL}${item.thumbnail}`}
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {item.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCardComponent;
