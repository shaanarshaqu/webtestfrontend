import axios from "axios";
import React, { useEffect, useState } from "react";

function FileUpload() {
  const [imageslist, setImageslist] = useState([]);
  const [data, setData] = useState({
    UserName: "",
    formFiles: [],
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  function handleImage(e) {
    console.log(e);
    setData((x) => ({ ...x, formFiles: [...x.formFiles, e.target.files[0]] }));

    var reader = new FileReader();
    reader.onloadend = (y) => {
      setImageslist((old) => [...old, y.target.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const uploadFileAsync = async () => {
    try {
      console.log();
      let formdata = new FormData();
      formdata.append("userName", data.UserName);
      console.log(data.formFiles);
      if (data.formFiles && data.formFiles.length > 0) {
        data.formFiles.forEach((file) => {
          formdata.append("formFiles", file);
        });
      }
      let req = await axios.post("https://localhost:7155/api/File", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageslist([]);
      setData({ UserName: "", formFiles: [] });
      document.getElementById("inpuser").value=""
      document.getElementById("filecollector").value=""
      console.log(req.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User Name"
        id="inpuser"
        onChange={(e) => setData((o) => ({ ...o, UserName: e.target.value }))}
      />
      <input
        type="file"
        accept="image/*"
        id="filecollector"
        onChange={(e) => handleImage(e)}
      ></input>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
      >
        {imageslist.map((i) => (
          <img
            style={{ width: "200px", height: "auto", marginBottom: "10px" }}
            src={i}
          />
        ))}
      </div>
      <button onClick={uploadFileAsync}>Save</button>
    </div>
  );
}

export default FileUpload;
