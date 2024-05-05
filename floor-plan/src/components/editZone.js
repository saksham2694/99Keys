import { useState } from "react";
import {
    TransformWrapper,
    TransformComponent,
    useControls
} from "react-zoom-pan-pinch";


const EditZone = (props) => {
    const [floorName, setFloorName] = useState("")
    if (props.currImage && props.currImage.name) {
        setFloorName(props.currImage.name)
    }
    const [interiorSize, setInteriorSize] = useState("")
    if (props.currImage && props.currImage.interior_size) {
        setInteriorSize(props.currImage.interior_size)
    }
    const [exteriorSize, setExteriorSize] = useState("")
    if (props.currImage && props.currImage.exterior_size) {
        setExteriorSize(props.currImage.exterior_size)
    }
    const [exteriorType, setExteriorType] = useState("")
    if (props.currImage && props.currImage.exterior_type) {
        setExteriorType(props.currImage.exterior_type)
    }
    const [direction, setDirection] = useState("North")
    if (props.currImage && props.currImage.facing_direction) {
        setDirection(props.currImage.facing_direction)
    }
    const [floorType, setFloorType] = useState("Studio")
    if (props.currImage && props.currImage.floor_type) {
        setFloorType(props.currImage.floorType)
    }

    const handleSubmit = () => {
        
        const formData = new FormData()
        formData.append('floor_plan[image]', props.currImage, props.currImage.name)
        formData.append('floor_plan[name]', floorName)
        formData.append('floor_plan[interior_size]', interiorSize)
        formData.append('floor_plan[exterior_size]', exteriorSize)
        formData.append('floor_plan[exterior_type]', exteriorType)
        formData.append('floor_plan[facing_direction]', direction)
        formData.append('floor_plan[floor_type]', floorType)
        fetch("http://localhost:3000/api/v1/floor_plans", {
            method: 'POST', 
            body: formData,
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            window.alert(`Floor Plan Added Successfully!`)
        })
        .catch(error => {
            console.error('Error:', error)
            window.alert(`Error!, Couldn't add Floor Plan`)
        });
        handleDelete()
    }

    const handleDelete = () => {
        fetch(`http://localhost:3000/api/v1/floor_plans/${props.currImage.id}`, {
        method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        console.log('FLoor Plan deleted successfully');
        
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
    }


    return (
    <div style={{ width: '60vw', height:'80vh', display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <div style={{ width:'60vw', height:'10vh'}}>
            <div style={{width:'60vw', height:'6vh'}}>
                <a style={{fontSize:'150%'}}>Adjust Floor Plans</a>
            </div>
            <div style={{width:'40vw', height:'4vh',  display:'flex', flexDirection:'row', alignItems:'right', justifyContent:'right'}}>
                <a>Select Floor Plan from the pane in the left</a>
            </div>
        </div>
        <div style={{ width: '60vw', height:'70vh', display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
            {!props.currImage &&
            <div style={{ width:'40vw', height:'70vh'}}>
            <div style={{background:'rgb(226,226,226)', width:'39vw', height:'40vh', border:'2px dashed rgb(176,176,176)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{ width:'20vw', height:'25vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                </div>
            </div>
            </div>
            }
            {props.currImage && <EditImage currImage={props.currImage} />}
            <ImageForm floorName={floorName} setFloorName={setFloorName} interiorSize={interiorSize} setInteriorSize={setInteriorSize} exteriorSize={exteriorSize} setExteriorSize={setExteriorSize} exteriorType={exteriorType} setExteriorType={setExteriorType} direction={direction} setDirection={setDirection} floorType={floorType} setFloorType={setFloorType} handleSubmit={handleSubmit} handleDelete={handleDelete}/> 
        </div>
    </div>
    )
}

const ImageForm = (props) => {
    return (
        <div style={{ width:'20vw', height:'70vh'}}>
            <form style={{zIndex:'1000'}}>
                <label htmlFor="fname">Floor Name</label><br></br>
                <input style={{border:'1px solid rgb(176,176,176)', borderRadius:'5px', width:'12vw', height:'2.5vh'}} type="text" id="fname" name="fname" value={props.floorName} onChange={(e) => props.setFloorName(e.target.value)}></input>
                <br></br><br></br>
                <label htmlFor="isize">Interior Size</label><br></br>
                <input style={{border:'1px solid rgb(176,176,176)', borderRadius:'5px', width:'12vw', height:'2.5vh'}} type="text" id="isize" name="isize" value={props.interiorSize} onChange={(e) => props.setInteriorSize(e.target.value)}></input>
                <br></br><br></br>
                <label htmlFor="esize">Exterior Size</label><br></br>
                <input style={{border:'1px solid rgb(176,176,176)', borderRadius:'5px', width:'12vw', height:'2.5vh'}} type="text" id="esize" name="esize" value={props.exteriorSize} onChange={(e) => props.setExteriorSize(e.target.value)}></input>
                <br></br><br></br>
                <label htmlFor="etype">Exterior Type</label><br></br>
                <input style={{border:'1px solid rgb(176,176,176)', borderRadius:'5px', width:'12vw', height:'2.5vh'}} type="text" id="etype" name="etype" value={props.exteriorType} onChange={(e) => props.setExteriorType(e.target.value)}></input>
                <br></br><br></br>
                <label htmlFor="direction">Facing Direction</label><br></br>
                <select id="direction" name="direction" value={props.direction} onChange={(e) => props.setDirection(e.target.value)}>
                    <option value={"North"}>North</option>
                    <option value={"South"}>South</option>
                    <option value={"East"}>East</option>
                    <option value={"West"}>West</option>
                </select>
                <br></br><br></br>
                <label htmlFor="floor">Floor Type</label><br></br>
                <select id="floor" name="floor" value={props.floorType} onChange={(e)=> props.setFloorType(e.target.value)}>
                    <option value={"Studio"}>Studio</option>
                    <option value={"One Bed One Bath"}>One Bed One Bath</option>
                    <option value={"Two Bed One Bath"}>Two Bed One Bath</option>
                    <option value={"Three Bed 2 Bath"}>Three Bed 2 Bath</option>
                </select>
                <br></br><br></br><br></br><br></br><br></br>
                <button style={{border:'1px solid rgb(176,176,176)', width:'5vw', height:'3vh', borderRadius:'5px'}} onClick={() => props.handleSubmit()}>Save</button>
                <br></br><br></br><br></br>
                <button style={{border:'1px solid rgb(176,176,176)', width:'5vw', height:'3vh', borderRadius:'5px'}} onClick={() => props.handleDelete()}>Delete</button>
            </form>
        </div>
    )
}

const EditImage = (props) =>{
    const [rotation, setRotation] = useState(0)
    const Controls = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
        <div style={{display:'flex', justifyContent:'right'}}>
            <button onClick={() => zoomIn()}>Zoom In</button>
            <button onClick={() => zoomOut()}>Zoom Out</button>
            <button onClick={() => resetTransform()}>Reset</button>
            <button onClick={() => {
                let newRotation = rotation + 90
                setRotation(newRotation)
            }}>Rotate</button>
        </div>
        );
    };
    return (
        <TransformWrapper>
        <div style={{ width:'40vw', height:'70vh'}}>
        <div style={{background:'rgb(226,226,226)', width:'39vw', height:'40vh', border:'2px dashed rgb(176,176,176)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{ width:'20vw', height:'35vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <TransformComponent>
                <img
                    style={{transform: `rotate(${rotation}deg)`}}
                    width="100%"
                    height="100%"
                    src={props.currImage.image_url}>

                </img>
                </TransformComponent>
            </div>
        </div>
        <Controls />
        </div>
        </TransformWrapper>
    )
}

export default EditZone