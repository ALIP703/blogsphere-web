import CategoriesComponent from "@/components/cards/categories/Categories";
import HomeCardComponent from "@/components/cards/homeCard/HomeCard";
import RecentPosts from "@/components/cards/recentPosts/RecentPosts";

const HomePage = () => {
  return (
    <>
      <div className="container ml-10 mt-5 flex flex-row space-x-4">
        <div className="w-[75%]">
          <HomeCardComponent />
        </div>
        <div className="w-[25%]">
          <CategoriesComponent />
          <RecentPosts />
        </div>
      </div>
    </>
  );
};

export default HomePage;
