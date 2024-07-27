
import { HOMEPAGE_HOOK_HELPERS } from "./Helpers";

const HomeCardComponent = () => {
  const { blogs, handleClickCard } = HOMEPAGE_HOOK_HELPERS.useManageHomePage();
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.results.map((item) => (
          <div
            key={item.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
            onClick={() => {
              handleClickCard(item.id.toString()); // Convert id to string here
            }}
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
