import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(''); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState([]);
  // const el = useRef(); // accesing input element

  const handleChange = (e) => {
    const file = e.target.files[0]; // accesing file
    // console.log(file);
    setFile(file); // storing file
  }

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file); // appending file
    axios.post('http://localhost:5000/upload', formData)
      .then(res => {
          console.log(res.data);
          getFile(res.data)
      })
      .catch(err => console.log(err))
    // axios.get('https://swapi.co/api/people')
    //   .then(res => {
    //     console.log(res.data)
    //     getFile(res.data.results)
    //   })
  }

  const displayData = data.map(item => {
    const index = item.CRN
    return (
      <div key={index} className="data-item">
        <p>{item["Building and Room"]}</p>
        <p>{item.CRN}</p>
        <p>{item.Course}</p>
        <p>{item["Course Title"]}</p>
        <p>{item["Credit Hrs Min"]}</p>
        <p>{item.Instructor}</p>
        <p>{item["Maximum Enrollment"]}</p>
        <p>{item["Meeting Pattern"]}</p>
        <p>{item["Part of Term"]}</p>
        <p>{item["Schedule Type"]}</p>
        <p>{item.Section}</p>
        <p>{item.Term}</p>
        <p>{item.Title}</p>
      </div>
    )
  })
  // console.log(data[0])
  return (
      <div>
          <div className="file-upload">
              <input type="file" onChange={handleChange} />
              <button onClick={uploadFile} className="upbutton">Upload</button>
          <hr />
          {displayData ? displayData : null}
          </div>
      </div>
  );
}

export default FileUpload;