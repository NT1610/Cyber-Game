import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null)
  const onImageChange = (event) => {
    //codition to check if input is empty
    if(event.target.files){
      const files = Array.from(event.target.files)
      //create an url to show image in return <img/>
      setImage(URL.createObjectURL(files[0]));
      for (let index = 0; index < files.length; index++) {
        //append all files from input with key:index, value:file
        localStorage.setItem(index,files[index])
    }
    //check values of localStorage in console
    console.log("check:  ",localStorage)
    }
    // clear localStorage for display component
    
  }
  const clearData =() =>{
    localStorage.clear()
  }
  
  return(
    <div className='App-header'>
      <h3>Upload files</h3>
      {/* set mutiple in order to select mutiple files at once */}
      <input type="file" onChange={onImageChange} />
      {/* return img */}
      <img alt="preview" src={image}/>
      <button alt="clear" onClick={clearData}>clear localStorage</button>
      <img alt="preview" src={'./image/background/back1.jpg'}/>

    </div>
  );
};


export default App;
