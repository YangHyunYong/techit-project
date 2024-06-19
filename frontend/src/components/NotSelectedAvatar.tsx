import { Flex, Image } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

const images = [
  "./images/avatars/1.png",
  "./images/avatars/2.png",
  "./images/avatars/3.png",
  "./images/avatars/4.png",
  "./images/avatars/5.png",
  "./images/avatars/6.png",
  "./images/avatars/7.png",
  "./images/avatars/8.png",
  "./images/avatars/9.png",
  "./images/avatars/10.png",
  "./images/avatars/11.png",
  "./images/avatars/12.png",
  "./images/avatars/13.png",
];

interface NotSelectedAvatarProps {
  isStop: boolean;
}

const NotSelectedAvatar: FC<NotSelectedAvatarProps> = ({ isStop }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (!isStop) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStop]);

  return (
    <Flex>
      <Image src={images[currentImageIndex]} w="360px" alt="carousel" />
    </Flex>
  );
};

export default NotSelectedAvatar;
