import React, { useState } from "react";
import { XCircle } from "lucide-react";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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

const AddSong = ({ open, close }: any) => {
  const [audioInfo, setAudioInfo] = useState<AudioFormFields>({
    ...defaultForm,
  });

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const finalData = await audioInfoSchema.validate(audioInfo);
      const formData = new FormData();

      formData.append("title", finalData.title);
      formData.append("about", finalData.about);
      if (finalData.category) formData.append("category", finalData.category);
      if (finalData.file) formData.append("file", finalData.file as Blob);
      if (finalData.poster) formData.append("poster", finalData.poster as Blob);

      const client = await getClient({ "Content-Type": "multipart/form-data" });
      const { data } = await client.post(apiList.addAudio, formData);
      console.log(data);
      setAudioInfo(defaultForm);
      close();
      toast({
        title: "Audio added successfully",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center  bg-opacity-60">
          <form
            onSubmit={handleUpload}
            className="my-4 space-y-4 rounded border bg-white px-6 py-3 text-base shadow-md"
          >
            <div className="flex items-center justify-between border-b py-2">
              <h1 className="text-xl font-semibold">Add Song</h1>
              <XCircle
                onClick={() => close()}
                className="cursor-pointer hover:text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Title</label>
              <input
                value={audioInfo.title}
                onChange={(e) =>
                  setAudioInfo({ ...audioInfo, title: e.target.value })
                }
                className="rounded-lg border py-2 px-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">About</label>
              <input
                value={audioInfo.about}
                onChange={(e) =>
                  setAudioInfo({ ...audioInfo, about: e.target.value })
                }
                className="rounded-lg border py-2 px-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Category</label>
              <select
                name="categories"
                id="categories"
                className="rounded-lg border py-2.5 px-3 focus:border-blue-500 focus:outline-none"
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

            <div className="flex flex-col space-y-1">
              <label className="text-lg font-semibold">Audio File</label>
              <input
                type="file"
                onChange={(e) =>
                  setAudioInfo({ ...audioInfo, file: e.target.files?.[0] })
                }
                className="rounded-lg border py-2 px-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-lg font-semibold">Poster (Optional)</label>
              <input
                type="file"
                onChange={(e) =>
                  setAudioInfo({ ...audioInfo, poster: e.target.files?.[0] })
                }
                className="rounded-lg border py-2 px-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <Button type="submit">Upload</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddSong;
