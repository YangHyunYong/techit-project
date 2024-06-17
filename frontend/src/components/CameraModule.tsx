import { FC, useState } from "react"
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from "./ImagePreview";

const CameraModule:FC = () => {
  const [dataUri, setDataUri] = useState('');


  function handleTakePhotoAnimationDone (dataUri:string) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
          />
          : <Camera
          onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
          isMaxResolution = {true}
          isImageMirror = {false}
          isSilentMode = {false}
          sizeFactor = {1}
        />
      }
    </div>
  );
}

export default CameraModule;