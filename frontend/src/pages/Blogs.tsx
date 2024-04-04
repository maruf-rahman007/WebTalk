import { useEffect } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/Blogskeliton";
import { useAuth, useBlogs } from "../hooks"
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate()
    if(!isLoggedIn) {
        useEffect(()=>{
            navigate('/signin')
        },[])
    }
    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
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