import { useEffect, useState } from "react";
import { sendNotification } from "../../../utils/notifications";
import api from "../../../utils/axios";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      let res = await api.get("/blogs");
      console.log(res?.status === 200);
      if (res?.status === 200) {
        sendNotification("success", res?.data?.message);
        setBlogs(res?.data?.blogs);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <section className="bg-slate-500 ">
      <div className="custom__container flex__center flex-col h-screen">
        {blogs?.map((blog: { content: string }) => {
          return <FroalaEditorView model={blog.content} />;
        })}
      </div>
    </section>
  );
};

export default BlogsPage;
