import Select from "react-select";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { CREATE_BLOG_HOOK_HELPERS } from "./Helper";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    previewImage,
  } = CREATE_BLOG_HOOK_HELPERS.useManageCreateBlogPage();

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-6 justify-center mx-auto gap-5">
          <div style={blockNoteViewStyle} className="col-span-4">
            <div className="mt-3">
              <BlockNoteView
                editor={editor}
                theme="light"
                onChange={handleContentChange} // Use the correct handler
              />
            </div>
          </div>
          <div className="space-y-5 col-span-2 sticky top-5 self-start w-full">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-72 border-gray-300 border rounded-lg cursor-pointer bg-gray-50">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {!previewImage ? (
                    <>
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="w-10 h-10 text-gray-500"
                      />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or JPEG (MAX. 800x400px)
                      </p>
                    </>
                  ) : (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-fill rounded-lg"
                    />
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="thumbnail"
                  onChange={handleChangeFormData}
                  accept=".jpeg, .jpg, .png"
                />
              </label>
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
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogComponent;
