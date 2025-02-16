"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "next-sanity";

import { topics } from "../utils/constants";

export default function UploadContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile } = useAuthStore();
  const router = useRouter();

  const upleadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setIsLoading(false);
      return;
    }
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
      return;
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
        hashtags,
      };

      await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(document),
      });

      setSavingPost(false);
      router.push("/");
    }
  };

  return (
    <div className="-z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#F8F8F8]">
      {savingPost ? (
        <div className="flex w-[80%] max-w-[1050px] flex-wrap items-center justify-evenly gap-6 rounded-xl bg-white p-20">
          <p className="text-2xl font-bold">Publicando vídeo...</p>
        </div>
      ) : (
        <div className="flex w-[80%] max-w-[1050px] flex-wrap items-center justify-evenly gap-6 rounded-xl bg-white p-20">
          <div>
            <div>
              <p className="text-2xl font-bold">Subir Video</p>
              <p className="mt-1 text-base text-gray-400">
                Publica un vídeo en tu cuenta
              </p>
            </div>
            <div className="mt-10 flex h-[460px] w-[260px] cursor-pointer flex-col items-center justify-center rounded-lg outline-none transition-all">
              {isLoading ? (
                <div className="flex h-full w-[290px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 p-10">
                  <p className="text-base font-semibold text-gray-400">
                    Subiendo video...
                  </p>
                </div>
              ) : (
                <div>
                  {videoAsset ? (
                    <div className="flex flex-col items-center justify-center">
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="max-h-[450px] w-full rounded-xl"
                      ></video>
                      <button
                        type="button"
                        className="mt-5 flex w-48 items-center justify-center rounded border-2 border-gray-300 p-2 text-base font-medium text-gray-400 outline-none hover:bg-gray-200"
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-10 hover:border-gray-400">
                        <div className="flex flex-col items-center justify-center">
                          <p>
                            <IoMdCloudUpload className="text-6xl text-gray-300" />
                          </p>
                          <p className="text-xl font-semibold">Subir Video</p>
                        </div>
                        <p className="mt-10 text-center text-sm leading-10 text-gray-400">
                          MP4 o WebM o ogg <br />
                          720 x 1280 o superior <br />
                          Hasta 10 minutos <br />
                          Menos de 2GB
                        </p>
                        <p className="text-md mt-10 w-52 rounded bg-gradient-to-b from-[#FFA600] to-[#FF007D] p-2 text-center font-medium text-white outline-none">
                          Seleccionar vídeo
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        onChange={upleadVideo}
                        id="upload-video"
                        className="h-0 w-0"
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-cl mt-4 w-[250px] text-center font-semibold text-red-400">
                  Por favor selecciona un archivo de video
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 flex w-[300px] flex-col gap-3 xl:mt-0">
            <label htmlFor="caption-video" className="text-base font-medium">
              Descripción
            </label>
            <input
              type="text"
              name="caption-video"
              value={caption}
              id="caption-video"
              onChange={(e) => setCaption(e.target.value)}
              className="rounded border-2 border-gray-200 p-2 text-base outline-none"
            />
            <label htmlFor="hashtags-video" className="text-base font-medium">
              Hashtags
            </label>
            <input
              type="text"
              name="hashtags-video"
              id="hashtags-video"
              onChange={(e) => setHashtags(e.target.value.split(" "))}
              className="rounded border-2 border-gray-200 p-2 text-base outline-none"
            />
            <label htmlFor="category-video" className="text-base font-medium">
              Selecciona una categoría
            </label>
            <select
              name="category-video"
              id="category-video"
              onChange={(e) => setCategory(e.target.value)}
              className="cursor-pointer rounded border-2 border-gray-200 p-2 text-base font-medium capitalize outline-none lg:p-4"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  value={topic.name}
                  className="bg-white p-2 text-base font-medium capitalize text-gray-700 outline-none hover:bg-slate-300"
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="mt-10 flex justify-evenly gap-6">
              <button
                type="button"
                onClick={() => {}}
                className="w-28 rounded border-2 border-gray-300 p-2 text-base font-medium text-gray-400 outline-none hover:bg-gray-200 lg:w-44"
              >
                Descartar
              </button>
              <button
                type="button"
                onClick={handlePost}
                className="w-28 rounded bg-gradient-to-b from-[#FFA600] to-[#FF007D] p-2 text-base font-medium text-white outline-none lg:w-44"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
