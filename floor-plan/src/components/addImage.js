import { useState, useEffect } from "react";


const AddImage = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (selectedImage) {
            handleSubmit()
        }
    }, [selectedImage])

    const onSubmit = (event) => {
        setSelectedImage(event.target.files[0])
        console.log(event.target.files[0])
    }

    const handleSubmit = () => {
        console.log(selectedImage)
        const formData = new FormData()
        formData.append('floor_plan[image]', selectedImage, selectedImage.name);
        fetch("http://localhost:3000/api/v1/floor_plans", {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            props.setCurrImage(data)
            props.reload()
        })
        .catch(error => (error) => console.error('Error:', error))
    }
    

    return (
        <div style={{border:'2px dashed rgb(176,176,176)', width:'17vw', height:'18vh', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'10px'}}>
            <div style={{ width:'14vw', height:'17vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{ width:'5vw', height:'10vh'}}>
            <label htmlFor="upload-floor-plan" style={{cursor:'pointer'}}>
                <img
                    style={{alignSelf:'center'}}
                    width={"100%"}
                    src={process.env.PUBLIC_URL + '/plus2.jpg'}
                />
            </label>
            <input style={{opacity:'0', position:'absolute', zIndex:'-1'}}
            type="file"
            name="floor-plan"
            id="upload-floor-plan"
            onChange={(event) => onSubmit(event)}/>
            </div>
            
            </div>
        </div>);
}

export default AddImage
