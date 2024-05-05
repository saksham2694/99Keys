import { createContext, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import AddImage from './components/addImage';
import DisplayImage from './components/displayImage';
import EditZone from './components/editZone';

const API_URL = "http://localhost:3000/api/v1/floor_plans";




function App() {
  const [images, setImages] = useState([])
  const [currImage, setCurrImage] = useState(null)

  function getAPIData() {
    return axios.get(API_URL).then(response => {
      return response.data
    })
  }

  useEffect(()=>{
    let mounted = true
    getAPIData().then((items) => {
      if (mounted) {
        setImages(items)
      }
    })
    return () => (mounted = false)
  }, [])
  return (
    <div style={{backgroundColor:'rgb(226,226,226)', height:'100vh', align:'center', margin:'auto', overflow:'hidden'}}>
      <div style={{width:'85vw', height:'85vh', display:'flex', flexDirection:'column', align:'center', margin:'auto'}}>
        <div style={{height:'8vh', width:'85vw'}}><h3>Adding Floor Plans</h3></div>
        <div style={{height:'75vh', width:'85vw', display:'flex',flexDirection:'row'}}>
          <div style={{backgroundColor:'white', width: '20vw', height:'85vh'}}>
            <div style={{height:'80vh', width:'20vw', display:'flex', overflow:'scroll', flexDirection:'column', padding:'2vh 1.5vw'}}>
            <AddImage API_URL={API_URL} setCurrImageID={setCurrImage} reload={getAPIData}></AddImage>
              {images.map((image)=> (
              <DisplayImage image={image} setCurrImage={setCurrImage}/>
              ))}
              
            </div>
          </div>
          <div style={{backgroundColor:'rgb(226,226,226)', width:'3vw', height:'80vh'}}></div>
          <div style={{backgroundColor:'white', width: '75vw', height:'85vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <EditZone currImage={currImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
