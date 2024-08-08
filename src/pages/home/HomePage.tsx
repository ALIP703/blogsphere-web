import CategoriesComponent from "@/components/cards/categories/Categories";
import HomeCardComponent from "@/components/cards/homeCard/HomeCard";
import RecentPosts from "@/components/cards/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 justify-center mx-auto max-w-screen-xl px-4 md:px-8 gap-4">
        <div className="col-span-3">
          <HomeCardComponent />
        </div>
        <div className="hidden md:block sticky top-5 self-start">
          <CategoriesComponent />
          <RecentPosts />
        </div>
      </div>
    </>
  );
};

export default HomePage;
