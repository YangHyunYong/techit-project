import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

interface SelectedAvatarProps {
  rollAvatar: RollAvatar;
  answer: NftMetadata;
  isSelected: boolean;
}

const SelectedAvatar: FC<SelectedAvatarProps> = ({ answer, isSelected }) => {
  return (
    <>
      {isSelected ? (
        <Image src={answer.image} w="360px"></Image>
      ) : (
        <Flex w="300px" h="300px"></Flex>
      )}
    </>
  );
};

export default SelectedAvatar;
