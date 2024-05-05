

const DisplayImage = (props) => {
    return (
        <div onClick={() => props.setCurrImage(props.image)} id={props.image.key} style={{border:'2px dashed rgb(176,176,176)', width:'17vw', height:'18vh', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'10px', cursor:'pointer'}}>
            <div style={{width:'14vw', height:'17vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <img
                    width={"95%"}
                    src={props.image.image_url}
                    />
                    <br />
            </div>
        </div>
    )
}

export default DisplayImage
