import React, { useState } from "react";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { apiList, getClient } from "@/utils/apiServices";
import { categories } from "@/utils/categories";

interface AudioFormFields {
  title: string;
  category: string;
  about: string;
  file?: File;
  poster?: File;
}

const defaultForm: AudioFormFields = {
  title: "",
  category: "",
  about: "",
  file: undefined,
  poster: undefined,
};

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required("Title is missing!"),
  category: yup.string().oneOf(categories, "Category is missing!"),
  about: yup.string().trim().required("About is missing!"),
  file: yup.mixed().required("Audio file is missing!"),
  poster: yup.mixed().nullable(),
});

const AddSong = () => {
  const [audioInfo, setAudioInfo] = useState<AudioFormFields>({
    ...defaultForm,
  });

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const finalData = await audioInfoSchema.validate(audioInfo);
      const formData = new FormData();

      // Ensure `finalData.file` is a valid File object before appending
      if (finalData.file) {
        formData.append("file", finalData.file as Blob);
      }

      // Append other data (title, about, category, poster)
      formData.append("title", finalData.title);
      formData.append("about", finalData.about);
      if (finalData.category) {
        formData.append("category", finalData.category);
      }
      if (finalData.poster) {
        formData.append("poster", finalData.poster as Blob);
      }

      const client = await getClient({ "Content-Type": "multipart/form-data" });
      const { data } = await client.post(apiList.addAudio, formData);
      console.log(data);
      // Implement your backend logic here (e.g., using fetch or an HTTP library)
      // to send the form data to your server for processing and upload

      console.log("Song uploaded successfully!", formData);
      setAudioInfo(defaultForm);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <div>
      <h1>Add Song</h1>

      <form
        onSubmit={handleUpload}
        className="my-1 space-y-2 rounded border px-10 py-2"
      >
        <label>Title</label>
        <input
          value={audioInfo.title}
          onChange={(e) =>
            setAudioInfo({ ...audioInfo, title: e.target.value })
          }
        />
        <label>About</label>
        <input
          value={audioInfo.about}
          onChange={(e) =>
            setAudioInfo({ ...audioInfo, about: e.target.value })
          }
        />
        <div className="flex flex-col space-y-2">
          <label>Categories</label>
          <select
            name="categories"
            id="categories"
            className="rounded-lg border py-2.5"
            value={audioInfo.category}
            onChange={(e) =>
              setAudioInfo({ ...audioInfo, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <label>Audio File</label>
        <input
          type="file"
          onChange={(e) =>
            setAudioInfo({ ...audioInfo, file: e.target.files?.[0] })
          }
        />
        <label>Poster (Optional)</label>
        <input
          type="file"
          onChange={(e) =>
            setAudioInfo({ ...audioInfo, poster: e.target.files?.[0] })
          }
        />

        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};

export default AddSong;
