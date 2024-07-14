import BlogComponent from "@/components/blog/BlogComponent";
import RelatedBlogsComponent from "@/components/cards/relatedBlogs/RelatedBlogs";

const BlogPage = () => {
  return (
    <div className=" md:px-44">
        <BlogComponent />
        <RelatedBlogsComponent />
    </div>
  );
};

export default BlogPage;
