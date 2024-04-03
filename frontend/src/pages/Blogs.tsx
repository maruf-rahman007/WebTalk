import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }
    return<div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard authorName={blog.author.name || "anonymous"} title={blog.title} content={blog.title} publishedDate="3 April 2024" id={blog.id}/>)}
            </div>
        </div>
    </div>
}