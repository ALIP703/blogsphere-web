import { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const CreateBlogComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const editor = useCreateBlockNote(); // Hook to create BlockNote editor instance

  // Style for BlockNoteView component
  const blockNoteViewStyle = {
    // minWidth: '300px', // Example minimum width
    minHeight: "400px", // Example minimum height
    background: "white", // White background
    border: "1px solid #e5e7eb", // Example border
    borderRadius: "0.5rem", // Example border radius
    padding: "1rem", // Example padding
  };

  return (
    <div>
      <form className="space-y-8">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="first_name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="last_name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your subtitle here..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={blockNoteViewStyle}>
          <BlockNoteView editor={editor} theme="light" />
        </div>
        <div>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            id="file_input"
            type="file"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogComponent;
