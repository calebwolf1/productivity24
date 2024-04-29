import { useEffect, useState } from 'react';
import CheckedIcon from '../checked.png';
import UncheckedIcon from '../unchecked.png';

const ImageSwitcher = ({ initialImage }) => {
  const [currentImage, setCurrentImage] = useState(initialImage);

  const handleClick = () => {
    setCurrentImage(currentImage === CheckedIcon ? UncheckedIcon : CheckedIcon);
  };

  return (
    <div>
      <img
        src={currentImage}
        alt="Switchable Image"
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageSwitcher;
