import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeliton } from "../components/FullBlogSkeliton";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id:id || ""
    });
    
    if(loading || !blog){
        return <div>
            <FullBlogSkeliton />
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}   