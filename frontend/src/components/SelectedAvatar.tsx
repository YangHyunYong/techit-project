import { Image } from "@chakra-ui/react";
import { notionistsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { FC, useState } from "react";

interface SelectedAvatarProps {
  rollAvatar: RollAvatar;
}

const SelectedAvatar: FC<SelectedAvatarProps> = ({ rollAvatar }) => {
  const avatar = createAvatar(notionistsNeutral, {
    brows: rollAvatar.brows,
    eyes: rollAvatar.eyes,
    backgroundColor: rollAvatar.background,
    glasses: rollAvatar.glasses,
    lips: rollAvatar.lips,
    nose: rollAvatar.nose,
  });

  const dataUri = avatar.toDataUri();

  return <Image src={dataUri} w="360px"></Image>;
};

export default SelectedAvatar;
