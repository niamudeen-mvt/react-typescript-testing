// import { useState } from "react";
// import FroalaEditorComponent from "react-froala-wysiwyg";
// // Require Editor CSS files.
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/js/plugins/image.min.js";
// import "froala-editor/js/plugins/char_counter.min.js";

// // Import all Froala Editor plugins;
// import "froala-editor/js/plugins.pkgd.min.js";
// import { sendNotification } from "../../../utils/notifications";
// import api from "../../../utils/axios";

// // import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

// const BlogsPage = () => {
//   const [model, setModel] = useState("");

//   const handleSubmit = async () => {
//     try {
//       let res = await api.post("/blog/create", {
//         content: model,
//       });
//       console.log(res?.status === 200);
//       if (res?.status === 200) {
//         sendNotification("success", res?.data?.message);
//         setModel("");
//       }
//     } catch (error) {}
//   };

//   return (
//     <section className="bg-slate-500 ">
//       <div className="custom__container flex__center flex-col h-screen">
//         <div className="mb-6">
//           <FroalaEditorComponent
//             model={model}
//             tag="textarea"
//             onModelChange={(e: string) => setModel(e)}
//           />
//           {/* <FroalaEditorView model={model} /> */}
//         </div>
//         {/* <div dangerouslySetInnerHTML={{ __html: model }}></div> */}
//         <button
//           type="button"
//           className="px-5 py-2 bg-white text-black rounded-lg"
//           onClick={handleSubmit}
//         >
//           Create Blog
//         </button>
//       </div>
//     </section>
//   );
// };

// export default BlogsPage;
const BlogsPage = () => {
  return <div>BlogsPage</div>;
};

export default BlogsPage;
