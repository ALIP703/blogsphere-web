import { BLOG_SERVICES } from "@/utils/services/api/blogServices";
import { PUBLIC_DATA_SERVICES } from "@/utils/services/api/dataServices";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";
import { MultiValue } from "react-select";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { OptionType, UserData } from "@/utils/helpers/constants/interfaces";

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);

  try {
    const res = await BLOG_SERVICES.uploadBlogFile(body);
    const url = `${import.meta.env.VITE_BASE_URL}` + res.data.file;
    return url; // Ensure the URL is returned
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Ensure errors are properly propagated
  }
}

export const CREATE_BLOG_HOOK_HELPERS = {
  useManageCreateBlogPage: () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = React.useState<
      MultiValue<OptionType>
    >([]);
    const [options, setOptions] = React.useState<OptionType[]>();
    const [userData, setUserData] = React.useState<UserData>({
      title: "",
      subtitle: "",
      content: "",
      tags: [],
      thumbnail: null,
    });

    // Style for BlockNoteView component
    const blockNoteViewStyle = {
      minHeight: "400px", // Example minimum height
      background: "white", // White background
      border: "1px solid #e5e7eb", // Example border
      borderRadius: "0.5rem", // Example border radius
      padding: "1rem", // Example padding
    };
    
    // handling content change
    const editor = useCreateBlockNote({
      initialContent: [
        {
          type: "paragraph",
          content: "Welcome to this demo!",
        },
        {
          type: "paragraph",
          content: "Upload an image using the button below",
        },
        {
          type: "image",
        },
        {
          type: "paragraph",
        },
      ],
      uploadFile,
    });
    // Define the content handler for BlockNoteView
    const handleContentChange = async () => {
      if (editor) {
        try {
          // Assuming editor.document.toJSON() returns the content in JSON format
          const content = editor.document
          const serializedContent = JSON.stringify(content); // Convert the object to a JSON string
          setUserData((prevState) => ({
            ...prevState,
            content: serializedContent, // Use the resolved JSON string content
          }));
          console.log(userData);
          
        } catch (error) {
          console.error("Failed to convert blocks to markdown:", error);
        }
      }
    };
    // handling multi select
    const handleSelectChange = (selectedOptions: MultiValue<OptionType>) => {
      setSelectedOptions(selectedOptions);
      setUserData((prevState) => ({
        ...prevState,
        tags: [...selectedOptions.map((option) => option.id)],
      }));
    };

    // handling form change values
    const handleChangeFormData = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value, type } = event.target;

      if (type === "file" && event.target instanceof HTMLInputElement) {
        const file = event.target.files ? event.target.files[0] : null;
        setUserData((prevState) => ({
          ...prevState,
          [name]: file,
        }));
      }  else {
        // Handle other inputs (text, textarea, etc.)
        setUserData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Create a new FormData instance
      const formData = new FormData();
  
      // Append each field from userData to formData
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          const value = userData[key as keyof UserData];
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach((val) => formData.append(`${key}`, val.toString()));
            } else {
              formData.append(key, value as string | Blob);
            }
          }
        }
      }
  
      // Make the API call using the FormData
      try {
        const res = await BLOG_SERVICES.createBlog(formData);
        console.log(res.data);
  
        if (res?.data?.status === 201) {
          enqueueSnackbar("Blog created Successfully!", {
            variant: "success",
          });
          navigate("/");
        }
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          const errorMessage =
            err.response?.data?.message || "Blog creation failed!";
          enqueueSnackbar(errorMessage, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("An unexpected error occurred!", {
            variant: "error",
          });
        }
      }
    };

    React.useEffect(() => {
      void PUBLIC_DATA_SERVICES.getTags().then((res)=>{
        setOptions(res?.data?.data?.results)
      })
      return () => {};
    }, []);

    // };

    return {
      editor,
      userData,
      options,
      selectedOptions,
      blockNoteViewStyle,
      handleSubmit,
      handleChangeFormData,
      handleContentChange,
      handleSelectChange,
      setSelectedOptions,
    };
  },
};
