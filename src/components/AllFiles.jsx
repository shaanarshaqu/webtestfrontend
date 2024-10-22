import axios from "axios";
import React, { useEffect, useState } from "react";

const AllFiles = () => {
  const [resState, setResState] = useState([]);

  async function getAllFiles() {
    try {
      let req = await axios.get("https://localhost:7155/api/File/get-images");

      const res = req.data.map((x) => {
        const byteCharacters = atob(x.formFiles); // Decode base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray]); 
        const url = window.URL.createObjectURL(blob);
        return { ...x, url }; 
      });
      setResState(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <div>
      {resState.map((x, index) => (
        <img style={{width:"200px"}} key={index} src={x.url} alt="File" />
      ))}
    </div>
  );
};

export default AllFiles;
