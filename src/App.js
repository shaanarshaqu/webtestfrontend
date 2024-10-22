import { useState } from "react";
import "./App.css";
import AllFiles from "./components/AllFiles";
import FileUpload from "./components/FileUpload";

function App() {
  const [isListView, setIsListView] = useState(false);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px 0px",
        }}
      >
        <button onClick={()=>setIsListView(false)}>UploadFiles</button>
        <button onClick={()=>setIsListView(true)}>ListAllImages</button>
      </div>
      {!isListView ? <FileUpload /> : <AllFiles />}
    </div>
  );
}

export default App;
