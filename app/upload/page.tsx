"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "next-sanity";

import { topics } from "../utils/constants";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
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
      };

      await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(document),
      });

      router.push("/");
    }
  };

  return (
    <div className="w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] flex justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[80%] max-w-[1050px] flex gap-6 flex-wrap justify-evenly items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Subir Video</p>
            <p className="text-base text-gray-400 mt-1">
              Publica un vídeo en tu cuenta
            </p>
          </div>
          <div className="flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer border-4 border-dashed border-gray-200 hover:border-gray-400 rounded-lg transition-all">
            {isLoading ? (
              <p className="text-lg text-gray-400">Subiendo...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p>
                          <IoMdCloudUpload className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Subir Video</p>
                      </div>
                      <p className="text-center text-gray-400 text-sm mt-10 leading-10">
                        MP4 o WebM o ogg <br />
                        720 x 1280 o superior <br />
                        Hasta 10 minutos <br />
                        Menos de 2GB
                      </p>
                      <p className="bg-gradient-to-b from-[#FFA600] to-[#FF007D] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Seleccionar Archivo
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={upleadVideo}
                      id="upload-video"
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-cl text-red-400 font-semibold mt-4 w-[250px]">
                Por favor selecciona un archivo de video
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 w-[300px]">
          <label htmlFor="caption-video" className="text-base font-medium">
            Descripción
          </label>
          <input
            type="text"
            name="caption-video"
            value={caption}
            id="caption-video"
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-base border-2 border-gray-200 p-2"
          />
          <label htmlFor="category-video" className="text-base font-medium">
            Selecciona una categoría
          </label>
          <select
            name="category-video"
            id="category-video"
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 border-gray-200 font-medium text-base capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize bg-white font-medium text-gray-700 text-base p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10 justify-evenly">
            <button
              type="button"
              onClick={() => {}}
              className="border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 text-gray-400 hover:bg-gray-200 outline-none"
            >
              Descartar
            </button>
            <button
              type="button"
              onClick={handlePost}
              className="bg-gradient-to-b from-[#FFA600] to-[#FF007D] text-base font-medium p-2 rounded w-28 lg:w-44 text-white outline-none"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
