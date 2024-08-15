import React, { useState } from 'react';
import axios from 'axios';



const insects: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        if (!selectedFiles) return;

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append('files', file);
        });

        try {
            let ak = ""
            axios.post('http://localhost:8000/insects/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                setMessage('Success:' + response.data);
            }).catch(error => {
                setMessage('Error:' + error.message);
                if (error.response) {
                    setMessage('Response error:' + error.response.data);
                } else if (error.request) {
                    setMessage('Request error:' + error.request);
                }
            });
            //            setMessage("Response: " + JSON.stringify(response.data));
        } catch (error) {
            setMessage("dsa" + error);
        }
        /*
         try {
             // const response = await axios.post('http://localhost:8000/upload/', formData, {
             //     headers: {
             //         'Content-Type': 'multipart/form-data',
             //     },
             // });
             axios
                 .post("http://localhost:8000/upload", formData, {
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     },
                 })
                 .then((res) => {
                     console.log(res.data.test);
 
                     setMessage("a");
                     // Result: test
                 })
                 .catch((err) => {
                     console.log(err.response)
                     setMessage("hb" + err.response);
 
                 });
             // let k = response.data 
         } catch (error) {
             //      console.log(error)
             //   setMessage('Error uploading files or running scripts');
             setMessage("h" + error)
         }*/
    };

    return (
        <div>
            <h1>Upload .pkl Files</h1>
            <input type="file" multiple onChange={handleFileChange} accept=".pkl" />
            <button onClick={handleUpload}>Upload and Run Scripts</button>
            <p>       {(message || '').split('\n').map((line, index) => (
                <p key={index}>{line}</p>
            ))}</p>
        </div>
    );
};

export default insects;