import CategoriesComponent from "@/components/cards/categories/Categories";
import HomeCardComponent from "@/components/cards/homeCard/HomeCard";
import RecentPosts from "@/components/cards/recentPosts/RecentPosts";
import NavbarComponent from "@/components/navbar/NavbarComponent";

const HomePage = () => {
  return (
    <>
      <NavbarComponent title="blogsphere" />
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
