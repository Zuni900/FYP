import React, {useState} from 'react';
import WallpaperScreen2 from './WallpaperScreen2';

export default function Wallpaper() {
  const [imageUris, setImageUris] = useState([]);

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri])
  }

  const handleRemove = uri => {
    setImageUris(imageUris.filter(imageUri => imageUri !== uri))
  }

  return (
      <WallpaperScreen2 
        imageUris = {imageUris} 
        onAddImage = {handleAdd} 
        onRemoveImage = {handleRemove} 
      />
  )
}