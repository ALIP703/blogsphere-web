import BlogComponent from "@/components/blog/BlogComponent";
import RelatedBlogsComponent from "@/components/cards/relatedBlogs/RelatedBlogs";

const BlogPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
        <BlogComponent />
        <RelatedBlogsComponent />
    </div>
  );
};

export default BlogPage;
