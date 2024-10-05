// @ts-nocheck

import  { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import "./Insect2vect.scss";
const fileTypes = ["PKL"];
type FileInputType = File | FileList | File[];
export default function insects() {
  // const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (newFiles: FileInputType) => {
    console.log(newFiles);

    let fileArray: File[] = [];

    if (newFiles instanceof File) {
      fileArray = [newFiles];
    } else if (newFiles instanceof FileList) {
      fileArray = Array.from(newFiles);
    } else if (Array.isArray(newFiles)) {
      fileArray = newFiles;
    }

    setFiles(fileArray);
    setMessage("Running");
    setTimeout(() => {
      try {
        handleUpload(fileArray);
      } catch (error) {}
    }, 2000);
  };
  function handleUpload(fileArray: any) {
    if (!files) return;
    console.log(fileArray);
    const formData = new FormData();
    Array.from(fileArray).forEach((file) => {
      console.log(file);
      formData.append("files", file);
    });
    console.log(formData);
    try {
      let ak = "";
      axios
        .post("http://localhost:8000/insects/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMessage("Success:" + response.data);
        })
        .catch((error) => {
          setMessage("Error:" + error.message);
          if (error.response) {
            setMessage("Response error:" + error.response.data);
          } else if (error.request) {
            setMessage("Request error:" + error.request);
          }
        });
    } catch (error) {
      setMessage("Error: " + error);
    }
  }

  return (
    <div className="AppInsect">
      <h1 className="InsectHeading">Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <div id="wrapperInsect">
        <div id="InsectNames">
          {files.length > 0 ? (
            <ul>
              {files.map((file, index) => (
                <li key={index}>File name: {file.name}</li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet</p>
          )}
        </div>
        <div>
          Result:{" "}
          {(message || "").split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
