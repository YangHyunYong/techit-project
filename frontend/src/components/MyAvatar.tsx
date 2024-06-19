import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import SelectedAvatar from "./SelectedAvatar";
import MintModal from "./MintModal";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import NotSelectedAvatar from "./NotSelectedAvatar";

// const AVATAR_OPTION = {
//   brows: ["variant06", "variant12", "variant01"],
//   eyes: ["variant01", "variant03", "variant05"],
//   background: ["d1d4f9", "ffffff", "ffdfbf"],
//   glasses: ["variant11", "variant01", "variant03"],
//   lips: ["variant01", "variant03", "variant04", "variant07", "variant12"],
//   nose: ["variant03", "variant06", "variant13"],
// };
const AVATAR_OPTION = {
  brows: ["variant12", "variant01"],
  eyes: ["variant01", "variant05"],
  background: ["d1d4f9", "ffffff"],
  glasses: ["variant11", "variant03"],
  lips: ["variant01", "variant03", "variant04", "variant07"],
  nose: ["variant06", "variant13"],
};

interface MyAvatarProps {
  answer: NftMetadata;
  mintContract: Contract | null;
  signer: JsonRpcSigner | null;
  isRoll: number;
  setIsRoll: Dispatch<SetStateAction<number>>;
}

const MyAvatar: FC<MyAvatarProps> = ({
  answer,
  mintContract,
  signer,
  isRoll,
  setIsRoll,
}) => {
  const [brows, setBrows] = useState<number>(-1);
  const [eyes, setEyes] = useState<number>(-1);
  const [background, setBackground] = useState<number>(-1);
  const [glasses, setGlasses] = useState<number>(-1);
  const [lips, setLips] = useState<number>(-1);
  const [nose, setNose] = useState<number>(-1);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [isStop, setIsStop] = useState<boolean>(true);
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rollAvatar, setRollAvatar] = useState<RollAvatar>({
    brows: [AVATAR_OPTION.brows[brows]],
    eyes: [AVATAR_OPTION.eyes[eyes]],
    background: [AVATAR_OPTION.background[background]],
    glasses: [AVATAR_OPTION.glasses[glasses]],
    lips: [AVATAR_OPTION.lips[lips]],
    nose: [AVATAR_OPTION.nose[nose]],
  });

  const getRandomValue = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const onClickRoll = () => {
    console.log("STOP", isStop);
    if (!isStop) setIsRoll(isRoll - 1);
    setIsStop(!isStop);
    setIsFirst(false);

    const newBrows = getRandomValue(2);
    const newEyes = getRandomValue(2);
    const newBackground = getRandomValue(2);
    const newGlasses = getRandomValue(2);
    const newLips = getRandomValue(4);
    const newNose = getRandomValue(2);

    setBrows(newBrows);
    setEyes(newEyes);
    setBackground(newBackground);
    setGlasses(newGlasses);
    setLips(newLips);
    setNose(newNose);

    if (!isStop) {
      setRollAvatar({
        brows: [AVATAR_OPTION.brows[1]],
        eyes: [AVATAR_OPTION.eyes[0]],
        background: [AVATAR_OPTION.background[1]],
        glasses: [AVATAR_OPTION.glasses[0]],
        lips: [AVATAR_OPTION.lips[3]],
        nose: [AVATAR_OPTION.nose[1]],
      });
    }

    // setRollAvatar({
    //   brows: [AVATAR_OPTION.brows[newBrows]],
    //   eyes: [AVATAR_OPTION.eyes[newEyes]],
    //   background: [AVATAR_OPTION.background[newBackground]],
    //   glasses: [AVATAR_OPTION.glasses[newGlasses]],
    //   lips: [AVATAR_OPTION.lips[newLips]],
    //   nose: [AVATAR_OPTION.nose[newNose]],
    // });
  };

  useEffect(() => {
    if (!answer) return;

    let cnt = 0;

    answer.attributes!.map((v, i) => {
      const traitType = answer.attributes![
        i
      ].trait_type.toLowerCase() as keyof RollAvatar;
      if (rollAvatar && rollAvatar[traitType][0] === v.value) {
        cnt += 1;
      }
      if (cnt == 6) {
        setIsSelected(true);
      }
    });
  }, [rollAvatar]);

  useEffect(() => {
    if (!isSelected) return;

    onOpen();
  }, [isSelected]);

  useEffect(() => {
    console.log("ROLL", isRoll);
  }, []);

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      w="360px"
    >
      {isStop || isSelected ? (
        <>
          {isFirst && (
            <Flex
              position="absolute"
              zIndex="1"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Flex>Insert Coin</Flex> <Flex>&</Flex>
              <Flex>Press the Start Button</Flex>
            </Flex>
          )}
          <SelectedAvatar
            isSelected={isSelected}
            answer={answer}
            rollAvatar={rollAvatar}
          />
        </>
      ) : (
        <NotSelectedAvatar isStop={isStop} />
      )}

      <Button
        isDisabled={isRoll === 0 ? true : false}
        onClick={onClickRoll}
        colorScheme={`${isStop ? "blue" : `${!isSelected ? "red" : "green"}`}`}
      >
        {isStop ? <Flex>Start</Flex> : <Flex>Stop</Flex>}
      </Button>

      <MintModal
        isOpen={isOpen}
        onClose={onClose}
        answer={answer}
        mintContract={mintContract}
        signer={signer}
      ></MintModal>
    </Flex>
  );
};

export default MyAvatar;
