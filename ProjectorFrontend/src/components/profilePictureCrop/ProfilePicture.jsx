import supabase from '../../config/supabaseClient';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import { useState, useRef } from 'react'
import 'react-image-crop/src/ReactCrop.scss'
import setCanvasPreview from "../../utilityFunctions/setCanvasPreview";

function CropDemo({src, MIN_DIMENSION, setAvatarURL, uId}) {
  const imgRef = useRef(null)
  const canvasPreviewRef = useRef(null)
  const shrinkedCanvasRef = useRef(null)
  const [crop, setCrop] = useState()

  async function uploadCanvasImage(canvas) {
    try {
      // Convert canvas to a Blob (PNG format)
      const blob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
  
      // Generate a unique filename
      const fileName = `avatar.png`; // Example: profile_1623456789000.png
  
      // Upload the Blob to Supabase Storage (profile_photos bucket)
      const { data, error } = await supabase.storage
        .from('profile_photos')
        .upload(`${uId}/${fileName}`, blob, {
          cacheControl: '3600', // optional, cache for 1 hour
          upsert: true, // optional, do not overwrite if exists
          contentType: 'image/png', // optional, specify content type
        });
  
      if (error) {
        throw error;
      }
  
      console.log('Image uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  }

  const onImageLoad = (e) => {
    const {width, height} = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION/width) * 100;

    const crop = makeAspectCrop (
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop)
  }


  return (<>
    <ReactCrop crop={crop} aspect={1} circularCrop={true} minWidth={MIN_DIMENSION} ruleOfThirds={true} onChange={(crop, percentCrop) => setCrop(percentCrop)}>
      <img ref={imgRef} src={src} alt='Upload' onLoad={onImageLoad}/>
    </ReactCrop>
  <button onClick={ () => {
    setCanvasPreview(shrinkedCanvasRef.current,
      imgRef.current,
      canvasPreviewRef.current,
      convertToPixelCrop(crop,
        imgRef.current.width,
        imgRef.current.height)
    );
    setAvatarURL(shrinkedCanvasRef.current.toDataURL());
    uploadCanvasImage(shrinkedCanvasRef.current)

  }
}>We should have it all cause the night ...</button>
<canvas ref={shrinkedCanvasRef}
style={{display: 'none',}}/>
{crop && <canvas ref={canvasPreviewRef}
style={{
  display: 'none',
  border: "1px solid black",
  objectFit: "contain",
  width: 150,
  height: 150,
}}/>}</>
  )
}

export default CropDemo