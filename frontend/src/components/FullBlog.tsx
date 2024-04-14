import { useEffect, useState } from 'react';
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avater } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string | null>(null);

  useEffect(() => {
    import('dompurify').then((module) => {
      const DOMPurify = module.default;
      const sanitized = DOMPurify.sanitize(blog.content);
      setSanitizedContent(sanitized);
    }).catch((error) => {
      console.error('Failed to load DOMPurify:', error);
    });
  }, [blog.content]);

  if (!sanitizedContent) {
    return null; 
  }

  return (
    <div>
      <Appbar />
      <div className="px-4 pt-8 max-w-screen-xl mx-auto">
        <div className="text-3xl font-extrabold">{blog.title}</div>
        <div className="text-slate-500 pt-2">
          Posted on 2nd December 2023
        </div>
        <div className="pt-8">
          <div className="text-slate-600 text-lg">Author</div>
          <div className="flex items-center pt-4">
            <Avater size="big" name={blog.author.name || "Anonymous"} />
            <div className="ml-4">
              <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
              <div className="text-slate-500">
                Here is some random bio for the author to catch the readers attention.
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
};
