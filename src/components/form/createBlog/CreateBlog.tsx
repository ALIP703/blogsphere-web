import Select from "react-select";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { CREATE_BLOG_HOOK_HELPERS } from "./Helper";

const CreateBlogComponent = () => {
  const {
    handleSubmit,
    editor,
    handleChangeFormData,
    handleSelectChange,
    handleContentChange,
    selectedOptions,
    options,
    blockNoteViewStyle,
    userData,
  } = CREATE_BLOG_HOOK_HELPERS.useManageCreateBlogPage();

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your title here..."
              value={userData.title}
              name="title"
              onChange={handleChangeFormData}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="subtitle"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your subtitle here..."
              value={userData.subtitle}
              onChange={handleChangeFormData}
              required
            />
          </div>
        </div>
        <div style={blockNoteViewStyle}>
          <BlockNoteView
            editor={editor}
            theme="light"
            onChange={handleContentChange} // Use the correct handler
          />
        </div>
        <div>
          <Select
            options={options}
            value={selectedOptions}
            onChange={handleSelectChange}
            isMulti={true}
            placeholder="Select your hash tags.."
          />
        </div>
        <div>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            id="file_input"
            name="thumbnail"
            type="file"
            // value={userData.thumbnail}
            onChange={handleChangeFormData}
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
