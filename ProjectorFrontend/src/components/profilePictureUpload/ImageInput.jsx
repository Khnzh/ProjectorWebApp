import { useState, useEffect } from "react";
import CropDemo from "../profilePictureCrop/ProfilePicture";
import supabase from '../../config/supabaseClient';

const MIN_DIMENSION = 150


function ImageInput ({styleName, uId}){
  const [avatarURL, setAvatarURL] = useState()
  const [imgSrc, setImgSrc] = useState('')
  const [error, setError] = useState()

  useEffect(()=>{
    const { data, error } = supabase.storage
    .from('profile_photos')
    .getPublicUrl(`${uId}/avatar.png`);


    if (error) {
      console.error('Error generating public URL:', error.message);
      return null;
    } else {
      console.log('Public URL:', data.publicUrl);
      setAvatarURL(data.publicUrl);
    }
  
  }, [uId])

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageURL = reader.result?.toString() || '';
      imageElement.src = imageURL;

      imageElement.addEventListener('load', (e) => {
        const {naturalWidth, naturalHeight} = e.currentTarget;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('Image must be at least 150 x 150 pixels.');
          return setImgSrc('');
        }
      })

      setError('')
      setImgSrc(imageURL)
    });

    reader.readAsDataURL(file);
  }

  function defaultImage (e) {
    e.target.src='/profilePicPlaceholder.png';
  }


  return ( <><label htmlFor="profile-pic-upload" className={styleName}>
  {(!avatarURL) ? <img src="/profilePicPlaceholder.png" alt="none1" style={{
    borderRadius: '50%',
    border: '3px solid white'}}/> :
  <img src={avatarURL} alt="none2" style={{
    borderRadius: '50%',
    border: '2px solid #fff5da',
    width: '170px',
    height: '170px',
  }} onError={(e)=>(defaultImage(e))}/>}
  </label>
  <input id="profile-pic-upload" type="file" accept='image/*' 
  onChange={onSelectFile}
  />
  {error && (<p className="validation-message">{error}</p>)}
  <div>
    {imgSrc &&
    <CropDemo
    uId={uId}
    setAvatarURL={setAvatarURL}
    src={imgSrc}
    MIN_DIMENSION={MIN_DIMENSION}
    />}
  </div>
  </>)
}

export default ImageInput