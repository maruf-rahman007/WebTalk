import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avater } from "./BlogCard";
import DOMPurify from "dompurify";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-4">
              Posted on 2nd December 2023
            </div>
            <div
              className="pt-4"
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex justify-center">
              <div className="pr-4 flex justify-center flex-col">
                <Avater
                  size="big"
                  name={blog.author.name || "Anonymous"}
                />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Here is some random bio for the author to catch the readers
                  attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
