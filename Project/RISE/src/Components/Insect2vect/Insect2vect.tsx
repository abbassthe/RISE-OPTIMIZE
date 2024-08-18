import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./Insect2vect.scss";
import Background from "three/examples/jsm/renderers/common/Background.js";

const fileTypes = ["JPEG", "PNG", "GIF"];
type FileInputType = File | FileList | File[];
export default function App() {
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
  };

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
        <div>Result:</div>
      </div>
    </div>
  );
}
